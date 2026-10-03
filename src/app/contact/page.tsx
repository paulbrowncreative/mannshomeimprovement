import { site, serviceAreas, estimateProcess } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { EstimateForm } from "@/components/EstimateForm";
import { FacebookIcon, PhoneIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Request an Estimate",
  description: `Request a home improvement estimate from ${site.name} in ${site.location.city}, ${site.location.region}. Call ${site.phone.display} or send a few details about your project.`,
  path: "/contact",
});

export default function ContactPage() {
  const areas = serviceAreas.filter((a) => a.confirmed).map((a) => a.name);
  return (
    <>
      <PageHero
        label="Contact"
        title="Request an estimate"
        lede="A few details is all it takes. We'll follow up to talk through the project and set up a time to see the space."
        crumbs={[{ name: "Contact", href: "/contact" }]}
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="form-card">
            <h2 id="estimate-form-title" style={{ fontSize: "var(--fs-h3)", marginBottom: "var(--s-2)" }}>
              Tell us about your project
            </h2>
            <p style={{ marginBottom: "var(--s-6)", color: "var(--ink-3)" }}>
              Name, phone and project type are required. Everything else helps but is optional.
            </p>
            <EstimateForm />
          </div>

          <aside className="contact-aside" aria-label="Other ways to reach us">
            <div className="contact-block">
              <h2>Prefer to talk?</h2>
              <a className="btn btn--outline btn--lg btn--block" href={`tel:${site.phone.e164}`} data-track-location="contact_aside">
                <PhoneIcon />
                Call {site.phone.display}
              </a>
            </div>

            <div className="contact-block">
              <h2>Contact details</h2>
              <dl>
                <div>
                  <dt>Business</dt>
                  <dd>{site.name}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${site.phone.e164}`} data-track-location="contact_details">
                      {site.phone.display}
                    </a>
                  </dd>
                </div>
                {site.email && (
                  <div>
                    <dt>Email</dt>
                    <dd>
                      <a href={`mailto:${site.email}`}>{site.email}</a>
                    </dd>
                  </div>
                )}
                {site.hours && (
                  <div>
                    <dt>Hours</dt>
                    {site.hours.map((h) => (
                      <dd key={h.days}>
                        {h.days}: {h.time}
                      </dd>
                    ))}
                  </div>
                )}
                <div>
                  <dt>Based in</dt>
                  <dd>
                    {site.location.city}, {site.location.regionName}
                  </dd>
                </div>
                <div>
                  <dt>Service area</dt>
                  <dd>{areas.join(", ")} and nearby — ask if you&rsquo;re unsure</dd>
                </div>
                <div>
                  <dt>Facebook</dt>
                  <dd>
                    <a href={site.social.facebook} target="_blank" rel="noopener">
                      <FacebookIcon className="" /> Mann&rsquo;s Home Improvement
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="contact-block">
              <h2>What happens next</h2>
              <ol className="specialty-list">
                {estimateProcess.slice(1).map((p, i) => (
                  <li key={p.title}>
                    <span className="num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{p.title}</strong>
                      <span>{p.body}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
