import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getService } from "@/content/services";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { serviceSchema } from "@/lib/schema";
import { PageHero } from "@/components/PageHero";
import { ServiceSheet } from "@/components/Illustrations";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { CheckIcon, PhoneIcon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const index = services.findIndex((x) => x.slug === s.slug);
  const related = s.related.map(getService).filter((x) => x !== undefined);
  const noun = s.short.toLowerCase().replace(/s$/, "");
  const aNoun = `${/^[aeiou]/.test(noun) ? "an" : "a"} ${noun}`;
  const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <PageHero
        label={`Service ${String(index + 1).padStart(2, "0")}`}
        title={s.h1}
        lede={s.intro[0]}
        crumbs={[
          { name: "Services", href: "/services" },
          { name: s.name, href: `/services/${s.slug}` },
        ]}
        art={<ServiceSheet name={s.illustration} title={s.name} sheet={`S-${index + 1}`} />}
      >
        <div className="btn-row">
          <Link
            href={`/contact?project=${s.slug}`}
            className="btn btn--lg"
            data-track="estimate_cta"
            data-track-location={`service_hero_${s.slug}`}
          >
            Request {aNoun} estimate
          </Link>
          <a href={`tel:${site.phone.e164}`} className="btn btn--light btn--lg" data-track-location={`service_hero_${s.slug}`}>
            <PhoneIcon />
            {site.phone.display}
          </a>
        </div>
      </PageHero>

      <section className="section">
        <div className="container service-layout">
          <article className="prose" style={{ maxWidth: "none" }}>
            {s.intro.slice(1).map((p) => (
              <p key={p} className="lede">
                {p}
              </p>
            ))}

            <h2>What {s.name.toLowerCase()} can include</h2>
            <ul className="checklist">
              {s.includes.map((inc) => (
                <li key={inc}>
                  <CheckIcon />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            {s.sections.map((sec) => (
              <section key={sec.heading} aria-labelledby={`h-${slugify(sec.heading)}`}>
                <h2 id={`h-${slugify(sec.heading)}`}>{sec.heading}</h2>
                {sec.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </section>
            ))}

            <h2 id="service-faq">
              {s.name} questions
            </h2>
            <Faq items={s.faqs} />
          </article>

          <aside aria-label="Request an estimate">
            <div className="aside-card">
              <p className="label">Estimate</p>
              <h2>Planning {aNoun} project?</h2>
              <p>
                Tell us what you have in mind. We&rsquo;ll follow up to talk it through and arrange a time to see the
                space.
              </p>
              <Link
                href={`/contact?project=${s.slug}`}
                className="btn btn--block"
                data-track="estimate_cta"
                data-track-location={`service_aside_${s.slug}`}
              >
                Request an Estimate
              </Link>
              <p className="center" style={{ margin: 0 }}>
                or call
              </p>
              <a className="phone-big" href={`tel:${site.phone.e164}`} data-track-location={`service_aside_${s.slug}`} style={{ justifySelf: "center" }}>
                <PhoneIcon />
                {site.phone.display}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--tight section--paper-2" aria-labelledby="related-title">
          <div className="container">
            <p className="label">Often paired with</p>
            <h2 id="related-title" className="mt-4" style={{ fontSize: "var(--fs-h3)", marginBottom: "var(--s-5)" }}>
              Related services
            </h2>
            <ul className="related">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/services/${r.slug}`}>
                    <strong>{r.name}</strong>
                    <span>{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        heading={`Ready to talk about your ${noun} project?`}
        location={`service_footer_${s.slug}`}
      />
    </>
  );
}
