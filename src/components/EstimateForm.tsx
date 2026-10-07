"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  contactMethods,
  limits,
  projectOptions,
  readInput,
  validate,
  type EstimateInput,
  type FieldErrors,
} from "@/lib/estimate";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { AlertIcon } from "./Icons";

/** Must match the `name` on the <form> — Netlify Forms routes submissions by it. */
export const FORM_NAME = "estimate";

const encode = (data: FormData) =>
  new URLSearchParams(
    Array.from(data.entries()).filter((e): e is [string, string] => typeof e[1] === "string"),
  ).toString();

export function EstimateForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");
  const [project, setProject] = useState("");
  const [method, setMethod] = useState<string>("call");

  useEffect(() => {
    // Without JS the browser's native `required` validation applies; with JS we
    // take over so errors are inline and specific.
    if (formRef.current) formRef.current.noValidate = true;
    const p = new URLSearchParams(window.location.search).get("project");
    if (p && projectOptions.some((o) => o.value === p)) setProject(p);
  }, []);

  useEffect(() => {
    if (status === "error") alertRef.current?.focus();
  }, [status, message]);

  const focusFirstError = (errs: FieldErrors) => {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = readInput((k) => data.get(k));
    const errs = validate(input);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("idle");
      focusFirstError(errs);
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      // Netlify Forms: URL-encoded POST including the hidden form-name field.
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });
      if (res.ok) {
        try {
          sessionStorage.setItem("mhi_lead", input.project);
        } catch {}
        router.push("/contact/thank-you");
        return;
      }
      setStatus("error");
      setMessage("Something went wrong on our end.");
      track("form_error", { status: res.status });
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server — check your connection.");
      track("form_error", { status: 0 });
    }
  }

  const clearError = (k: keyof EstimateInput) => errors[k] && setErrors(({ [k]: _, ...rest }) => rest);

  const errProps = (k: keyof EstimateInput, hintId?: string) => ({
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": [hintId, errors[k] ? `${k}-error` : undefined].filter(Boolean).join(" ") || undefined,
    onInput: () => clearError(k),
  });

  const errorText = (k: keyof EstimateInput) =>
    errors[k] ? (
      <p className="field-error" id={`${k}-error`}>
        <AlertIcon className="" />
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      name={FORM_NAME}
      action="/contact/thank-you"
      method="post"
      data-netlify="true"
      netlify-honeypot="website"
      onSubmit={onSubmit}
      aria-labelledby="estimate-form-title"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {status === "error" && message && (
        <div className="form-alert form-alert--error" role="alert" tabIndex={-1} ref={alertRef}>
          <strong>We couldn&rsquo;t send your request.</strong>
          <span>
            {message} Please try again, or call{" "}
            <a href={`tel:${site.phone.e164}`} data-track-location="form_error">
              {site.phone.display}
            </a>
            .
          </span>
        </div>
      )}

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" autoComplete="name" required maxLength={limits.name} {...errProps("name")} />
          {errorText("name")}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            {...errProps("phone")}
          />
          {errorText("phone")}
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span className="optional">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={limits.email} {...errProps("email")} />
          {errorText("email")}
        </div>

        <div className="field">
          <label htmlFor="town">
            Town or city <span className="optional">(optional)</span>
          </label>
          <input
            id="town"
            name="town"
            type="text"
            autoComplete="address-level2"
            maxLength={limits.town}
            placeholder={site.location.city}
            {...errProps("town")}
          />
          {errorText("town")}
        </div>

        <div className="field span-2">
          <label htmlFor="project">Type of project</label>
          <select
            id="project"
            name="project"
            required
            value={project}
            onChange={(e) => {
              setProject(e.target.value);
              clearError("project");
            }}
            {...errProps("project")}
          >
            <option value="" disabled>
              Choose one…
            </option>
            {projectOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errorText("project")}
        </div>

        <div className="field span-2">
          <label htmlFor="details">
            Tell us about the project <span className="optional">(optional)</span>
          </label>
          <textarea
            id="details"
            name="details"
            maxLength={limits.details}
            placeholder="What would you like to change? Rough size of the space, timing, anything we should know."
            {...errProps("details", "details-hint")}
          />
          <p className="hint" id="details-hint">
            Have photos? Mention it and we&rsquo;ll tell you where to send them.
          </p>
          {errorText("details")}
        </div>

        <fieldset className="field span-2">
          <legend>Best way to reach you</legend>
          <div className="radio-row">
            {contactMethods.map((m) => (
              <label key={m.value}>
                <input
                  type="radio"
                  name="contactMethod"
                  value={m.value}
                  checked={method === m.value}
                  onChange={() => {
                    setMethod(m.value);
                    clearError("contactMethod");
                    clearError("email");
                  }}
                />
                {m.label}
              </label>
            ))}
          </div>
          {errorText("contactMethod")}
        </fieldset>
      </div>

      {/* Spam protection: hidden from people, tempting to bots */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-foot">
        <button type="submit" className="btn btn--lg btn--block" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send My Estimate Request"}
        </button>
        <p className="fine">
          We&rsquo;ll use your details only to respond about your project — never sold or shared. See our{" "}
          <a href="/privacy">privacy policy</a>.
        </p>
        <p className="visually-hidden" aria-live="polite">
          {status === "submitting" ? "Sending your request…" : ""}
        </p>
      </div>
    </form>
  );
}
