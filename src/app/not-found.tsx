import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-narrow">
        <p className="label">Error 404</p>
        <h1 className="mt-4" style={{ fontSize: "var(--fs-h2)" }}>
          That page isn&rsquo;t here.
        </h1>
        <p className="lede mt-5">
          The link may be old, or the address may have a typo. Here are the most useful places to go instead.
        </p>
        <div className="btn-row mt-6">
          <Link href="/" className="btn btn--lg">
            Go to the homepage
          </Link>
          <Link href="/contact" className="btn btn--outline btn--lg" data-track="estimate_cta" data-track-location="404">
            Request an Estimate
          </Link>
        </div>
        <h2 className="mt-7" style={{ fontSize: "var(--fs-h4)" }}>
          Services
        </h2>
        <ul className="related mt-4">
          {services.slice(0, 6).map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`}>
                <strong>{s.name}</strong>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          Or call <a href={`tel:${site.phone.e164}`}>{site.phone.display}</a>.
        </p>
      </div>
    </section>
  );
}
