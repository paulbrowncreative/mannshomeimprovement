import { NextResponse } from "next/server";
import { site } from "@/content/site";
import { readInput, validate, formatPhone, projectOptions, contactMethods, type EstimateInput } from "@/lib/estimate";

/**
 * Estimate request handler.
 *
 * Delivery (configure at least one in production — see README):
 *  - RESEND_API_KEY + ESTIMATE_TO_EMAIL (+ ESTIMATE_FROM_EMAIL): emails the lead.
 *  - ESTIMATE_WEBHOOK_URL: POSTs the lead as JSON (Zapier, Make, a CRM, Google Sheets…).
 *
 * Works with and without JavaScript: JSON clients get JSON; plain form posts
 * are redirected to the thank-you page or back to the form.
 */

export const runtime = "nodejs";

const MIN_FILL_MS = 2500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function summarize(input: EstimateInput) {
  const project = projectOptions.find((o) => o.value === input.project)?.label ?? input.project;
  const method = contactMethods.find((m) => m.value === input.contactMethod)?.label ?? input.contactMethod;
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Phone", formatPhone(input.phone)],
    ["Email", input.email || "—"],
    ["Prefers", method],
    ["Project", project],
    ["Town", input.town || "—"],
    ["Details", input.details || "—"],
  ];
  return { project, rows };
}

async function deliver(input: EstimateInput) {
  const { project, rows } = summarize(input);
  const tasks: Promise<void>[] = [];

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ESTIMATE_TO_EMAIL;
  if (key && to) {
    const from = process.env.ESTIMATE_FROM_EMAIL ?? `${site.shortName} Website <onboarding@resend.dev>`;
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    const html = `<h2 style="font-family:sans-serif">New estimate request</h2><table cellpadding="6" style="font-family:sans-serif;border-collapse:collapse">${rows
      .map(
        ([k, v]) =>
          `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${esc(k)}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("")}</table>`;
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: to.split(",").map((s) => s.trim()),
          reply_to: input.email || undefined,
          subject: `Estimate request: ${project} — ${input.name}`,
          text,
          html,
        }),
      }).then(async (r) => {
        if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
      }),
    );
  }

  const hook = process.env.ESTIMATE_WEBHOOK_URL;
  if (hook) {
    tasks.push(
      fetch(hook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, phoneFormatted: formatPhone(input.phone), projectLabel: project, submittedAt: new Date().toISOString() }),
      }).then((r) => {
        if (!r.ok) throw new Error(`Webhook ${r.status}`);
      }),
    );
  }

  if (tasks.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[estimate] No delivery configured — logging lead (dev only):\n", rows);
      return;
    }
    throw new Error("NOT_CONFIGURED");
  }

  // Succeed if at least one channel delivered; log the rest.
  const results = await Promise.allSettled(tasks);
  const failed = results.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
  failed.forEach((f) => console.error("[estimate] delivery failed:", f.reason));
  if (failed.length === results.length) throw new Error("DELIVERY_FAILED");
}

export async function POST(req: Request) {
  const wantsJson = (req.headers.get("accept") ?? "").includes("application/json");
  const back = (path: string) => NextResponse.redirect(new URL(path, req.url), 303);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return wantsJson ? NextResponse.json({ ok: false, message: "Invalid submission." }, { status: 400 }) : back("/contact?error=invalid");
  }

  // Spam: honeypot + minimum fill time. Pretend success so bots learn nothing.
  const ts = Number(form.get("ts"));
  const tooFast = Number.isFinite(ts) && ts > 0 && Date.now() - ts < MIN_FILL_MS;
  if (form.get("website") || tooFast) {
    return wantsJson ? NextResponse.json({ ok: true }) : back("/contact/thank-you");
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    const message = "Too many requests from this connection.";
    return wantsJson ? NextResponse.json({ ok: false, message }, { status: 429 }) : back("/contact?error=rate");
  }

  const input = readInput((k) => form.get(k));
  const errors = validate(input);
  if (Object.keys(errors).length) {
    return wantsJson
      ? NextResponse.json({ ok: false, errors, message: "Please fix the highlighted fields." }, { status: 422 })
      : back("/contact?error=invalid");
  }

  try {
    await deliver(input);
  } catch (err) {
    console.error("[estimate]", err);
    const message = "Something went wrong on our end.";
    return wantsJson ? NextResponse.json({ ok: false, message }, { status: 503 }) : back("/contact?error=send");
  }

  return wantsJson ? NextResponse.json({ ok: true }) : back("/contact/thank-you");
}
