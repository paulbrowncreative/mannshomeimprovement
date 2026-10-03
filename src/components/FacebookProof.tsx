import { site } from "@/content/site";
import { FacebookIcon } from "./Icons";

/**
 * Bridges to real social proof until reviews and project photos are approved
 * for use on the site. Replace with a testimonials section once available.
 */
export function FacebookProof({
  heading = "See recent work on Facebook",
  body = "Project photos, updates and recommendations from homeowners are posted on the Mann's Home Improvement Facebook page.",
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <div className="proof">
      <div>
        <p className="label">Recent work</p>
        <h2 className="mt-4">{heading}</h2>
        <p>{body}</p>
      </div>
      <a className="btn btn--outline btn--lg" href={site.social.facebook} target="_blank" rel="noopener">
        <FacebookIcon />
        Visit our Facebook page
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
