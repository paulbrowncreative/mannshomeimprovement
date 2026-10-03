import Link from "next/link";
import { site, serviceAreas } from "@/content/site";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ServiceSheet } from "@/components/Illustrations";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";

export const metadata = pageMeta({
  title: "Home Improvement Contractor in Monroe, MI",
  description: `${site.name} is based in Monroe, Michigan. Remodeling, finish carpentry, floors, decks and additions for Monroe-area homes — call ${site.phone.display}.`,
  path: "/service-areas",
});

const localFaqs = [
  {
    q: "Do you work outside the City of Monroe?",
    a: "Send the estimate form with your town, or call — we'll tell you straight away whether your project is in range.",
  },
  {
    q: "Who issues building permits for my project?",
    a: "Whichever city or township your home is in. Inside Monroe city limits, that's the City of Monroe; surrounding townships have their own requirements. Permit needs are reviewed as part of planning the project.",
  },
];

export default function ServiceAreasPage() {
  const areas = serviceAreas.filter((a) => a.confirmed);
  return (
    <>
      <PageHero
        label="Service area"
        title={`Home improvement in ${site.location.city}, ${site.location.regionName}`}
        lede={`${site.name} is based in ${site.location.city} and works on homes in and around the city.`}
        crumbs={[{ name: "Service Area", href: "/service-areas" }]}
        art={<ServiceSheet name="addition" title={`Site plan — ${site.location.city}`} sheet="C-1" />}
      >
        <div className="btn-row">
          <Link href="/contact" className="btn btn--lg" data-track="estimate_cta" data-track-location="areas_hero">
            Check if you&rsquo;re in range
          </Link>
        </div>
      </PageHero>

      <section className="section" aria-labelledby="where-title">
        <div className="container split">
          <div className="prose">
            <p className="label">Where we work</p>
            <h2 id="where-title">Monroe and nearby</h2>
            <p>
              {site.location.city} sits between Detroit and Toledo where the River Raisin meets Lake Erie, and it&rsquo;s
              home base for Mann&rsquo;s Home Improvement. Most work happens in and around the city.
            </p>
            <p>
              If you live in a nearby community and aren&rsquo;t sure whether your project is in range, include your
              town in the estimate form — you&rsquo;ll get a straight answer either way.
            </p>
            <ul className="area-tags" aria-label="Communities served">
              {areas.map((a) => (
                <li key={a.name}>
                  {a.name}, {site.location.region}
                  {a.note && <small>· {a.note}</small>}
                </li>
              ))}
            </ul>
          </div>
          <div className="prose">
            <p className="label">Local homes</p>
            <h2>Remodeling Monroe-area houses</h2>
            <p>
              <strong>Older homes need a careful hand.</strong> Many Monroe neighborhoods are full of houses that have
              settled for decades. Walls bow, floors slope and corners aren&rsquo;t square — which is exactly where{" "}
              <Link href="/services/finish-carpentry">finish carpentry</Link> skill shows.
            </p>
            <p>
              <strong>Lake Erie weather is hard on wood and water.</strong> Humid summers, freeze-thaw winters and
              heavy spring rain affect everything from{" "}
              <Link href="/services/hardwood-flooring">hardwood floors</Link> to{" "}
              <Link href="/services/decks">deck footings</Link> to{" "}
              <Link href="/services/basement-remodeling">basement moisture</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper-2" aria-labelledby="services-here">
        <div className="container">
          <p className="label">Services in {site.location.city}</p>
          <h2 id="services-here" className="mt-4" style={{ marginBottom: "var(--s-6)" }}>
            What we do in {site.location.city}
          </h2>
          <ul className="related">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>
                  <strong>{s.name}</strong>
                  <span>{s.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="area-faq">
        <div className="container split">
          <div>
            <p className="label">Questions</p>
            <h2 id="area-faq" className="mt-4">
              Service area questions
            </h2>
          </div>
          <Faq items={localFaqs} />
        </div>
      </section>

      <CtaBand location="service_areas" />
    </>
  );
}
