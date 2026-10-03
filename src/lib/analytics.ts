/**
 * Thin wrapper around gtag / dataLayer. Safe to call when analytics is not
 * configured (no-op). Event names follow GA4 recommended events where one exists.
 *
 *  generate_lead      – estimate form submitted successfully (key event)
 *  phone_click        – any tel: link clicked (key event)
 *  estimate_cta_click – any "Request an estimate" link clicked
 *  form_error         – estimate form submission failed
 */
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  if (window.gtag) {
    window.gtag("event", event, params);
  } else if (window.dataLayer) {
    window.dataLayer.push({ event, ...params });
  }
}
