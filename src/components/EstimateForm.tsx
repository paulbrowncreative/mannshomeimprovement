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

const serverErrors: Record<string, string> = {
  invalid: "Some required details were missing. Please check the form and try again.",
  rate: "Too many requests from this connection.",
  send: "Something went wrong on our end.",
};

export function EstimateForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState("");
  const [ts, setTs] = useState("");
  const [project, setProject] = useState("");
  const [method, setMethod] = useState<string>("call");

  useEffect(() => {
    setTs(String(Date.now()));
    const params = new URLSearchParams(window.location.search);
    const p = params.get("project");
    if (p && projectOptions.some((o) => o.value === p)) setProject(p);
    const err = params.get("error");
    if (err && serverErrors[err]) {
      setStatus("error");
      setMessage(serverErrors[err]);
    }
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
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: FieldErrors; message?: string };
      if (res.ok && json.ok) {
        try {
          sessionStorage.setItem("mhi_lead", input.project);
        } catch {}
        router.push("/contact/thank-you");
        return;
      }
      if (json.errors) {
        setErrors(json.errors);
        focusFirstError(json.errors);
      }
      setStatus("error");
      setMessage(json.message ?? serverErrors.send);
      track("form_error", { status: res.status });
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server — check your connection and try again.");
      track("form_error", { status: 0 });
    }
  }

  const clearError = (k: keyof EstimateInput) => errors[k] && setErrors(({ [k]: _, ...rest }) => rest);

  const errProps = (k: keyof EstimateInput, hintId?: string) => ({
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": [hintId, errors[k] ? `${k}-error` : undefined].filter(Boolean).join(" ") || undefined,
    onInput: () => clearError(k),
  });

  const ErrorText = ({ k }: { k: keyof EstimateInput }) =>
    errors[k] ? (
      <p className="field-error" id={`${k}-error`}>
        <AlertIcon className="" />
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      action="/api/estimate"
      method="post"
      noValidate
      onSubmit={onSubmit}
      aria-labelledby="estimate-form-title"
    >
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
          <ErrorText k="name" />
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
          <ErrorText k="phone" />
        </div>

        <div className="field">
          <label htmlFor="email">
            Email <span className="optional">(optional)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={limits.email} {...errProps("email")} />
          <ErrorText k="email" />
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
          <ErrorText k="town" />
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
          <ErrorText k="project" />
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
          <ErrorText k="details" />
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
          <ErrorText k="contactMethod" />
        </fieldset>
      </div>

      {/* Spam protection: hidden from people, tempting to bots */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="ts" value={ts} />

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
