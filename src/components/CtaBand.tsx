import Link from "next/link";
import { site } from "@/content/site";
import { PhoneIcon } from "./Icons";

export function CtaBand({
  heading = "Have a project in mind?",
  body = "Tell us what you'd like to change. We'll follow up to talk it through and set up a time to see the space.",
  location = "cta_band",
}: {
  heading?: string;
  body?: string;
  location?: string;
}) {
  return (
    <section className="cta-band" aria-labelledby={`cta-${location}`}>
      <div className="container cta-band__inner">
        <div>
          <h2 id={`cta-${location}`}>{heading}</h2>
          <p>{body}</p>
        </div>
        <div className="btn-row">
          <Link href="/contact" className="btn btn--lg" data-track="estimate_cta" data-track-location={location}>
            Request an Estimate
          </Link>
          <a href={`tel:${site.phone.e164}`} className="btn btn--light btn--lg" data-track-location={location}>
            <PhoneIcon />
            {site.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
