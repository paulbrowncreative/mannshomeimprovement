import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ServiceSheet } from "@/components/Illustrations";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Home Remodeling Services in Monroe, MI",
  description:
    "Kitchen and bathroom remodeling, basement finishing, hardwood flooring, crown molding and finish carpentry, decks and home additions in Monroe, Michigan.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={`Home remodeling services in ${site.location.city}, ${site.location.region}`}
        lede={`Interior remodeling and finish carpentry are the core of the work — ${site.specialty} — along with basements, floors, decks and additions.`}
        crumbs={[{ name: "Services", href: "/services" }]}
      />

      <section className="section">
        <div className="container">
          <ul className="service-rows">
            {services.map((s, i) => (
              <li key={s.slug} className="service-row">
                <div className="service-row__art">
                  <ServiceSheet
                    name={s.illustration}
                    title=""
                    sheet={`S-${i + 1}`}
                    tone="paper"
                  />
                </div>
                <div>
                  <h2>
                    <Link href={`/services/${s.slug}`}>{s.name}</Link>
                  </h2>
                  <p>{s.intro[0]}</p>
                  <Link href={`/services/${s.slug}`} className="text-link">
                    {s.name} in {site.location.city} <ArrowIcon />
                  </Link>
                </div>
                <div>
                  <p className="label">Typical work</p>
                  <ul className="mt-4">
                    {s.includes.slice(0, 5).map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Not sure which category your project fits?"
        body="Most projects touch more than one — a kitchen often includes flooring and trim. Describe the whole thing and we'll sort it out together."
        location="services_index"
      />
    </>
  );
}
