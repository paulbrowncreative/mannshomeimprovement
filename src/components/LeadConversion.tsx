"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Fires generate_lead once per successful submission (reloads don't double count). */
export function LeadConversion() {
  useEffect(() => {
    try {
      const project = sessionStorage.getItem("mhi_lead");
      if (project === null) return;
      // Give the GA script a moment to load on a fresh navigation.
      const t = setTimeout(() => {
        sessionStorage.removeItem("mhi_lead");
        track("generate_lead", { project_type: project });
      }, 800);
      return () => clearTimeout(t);
    } catch {}
  }, []);
  return null;
}
