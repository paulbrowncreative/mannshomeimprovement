"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { PhoneIcon } from "./Icons";

/** Persistent call + estimate actions on phones, where most contractor leads start. */
export function MobileBar() {
  // The contact page already is the estimate form; don't cover it.
  if (usePathname().startsWith("/contact")) return null;
  return (
    <div className="mobile-bar">
      <a href={`tel:${site.phone.e164}`} className="btn btn--outline" data-track-location="mobile_bar">
        <PhoneIcon />
        Call
      </a>
      <Link href="/contact" className="btn" data-track="estimate_cta" data-track-location="mobile_bar">
        Request an Estimate
      </Link>
    </div>
  );
}
