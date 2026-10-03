"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads GA4 only when NEXT_PUBLIC_GA_ID is set and the visitor has not sent a
 * Global Privacy Control signal. Click tracking is delegated, so links stay
 * plain server-rendered <a> elements.
 */
export function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    setEnabled(Boolean(GA_ID) && !gpc);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const location = a.getAttribute("data-track-location") ?? undefined;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) track("phone_click", { location });
      else if (a.getAttribute("data-track") === "estimate_cta") track("estimate_cta_click", { location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
