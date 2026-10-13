import Link from "next/link";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { LeadConversion } from "@/components/LeadConversion";
import { CheckIcon, PhoneIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Request received",
  description: "Thanks — your estimate request was received.",
  path: "/contact/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="section">
      <LeadConversion />
      <div className="container-narrow center">
        <div
          style={{
            width: 64,
            height: 64,
            margin: "0 auto var(--s-5)",
            borderRadius: "50%",
            background: "var(--accent)",
            color: "var(--on-accent)",
            display: "grid",
            placeItems: "center",
          }}
          aria-hidden="true"
        >
          <CheckIcon className="icon-28" />
        </div>
        <h1 style={{ fontSize: "var(--fs-h2)" }}>Thanks — your request is in.</h1>
        <p className="lede mt-5" style={{ marginInline: "auto" }}>
          Mann&rsquo;s Home Improvement will follow up to talk through your project. If it&rsquo;s time-sensitive,
          call{" "}
          <a href={`tel:${site.phone.e164}`} data-track-location="thank_you">
            {site.phone.display}
          </a>
          .
        </p>
        <div className="btn-row mt-7" style={{ justifyContent: "center" }}>
          <Link href="/services" className="btn btn--outline btn--lg">
            Browse services
          </Link>
          <a href={`tel:${site.phone.e164}`} className="btn btn--lg" data-track-location="thank_you">
            <PhoneIcon /> Call now
          </a>
        </div>
      </div>
    </section>
  );
}
