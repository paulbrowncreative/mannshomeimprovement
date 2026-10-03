import Link from "next/link";
import Image from "next/image";
import { site, estimateProcess, serviceAreas } from "@/content/site";
import { projects } from "@/content/projects";
import { homeFaqs } from "@/content/faqs";
import { getService } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { HouseElevation, ServiceSheet } from "@/components/Illustrations";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { FacebookProof } from "@/components/FacebookProof";
import { ArrowIcon, ClipboardIcon, PhoneIcon, PinIcon, RulerIcon } from "@/components/Icons";

export const metadata = pageMeta({
  title: `${site.shortName} | Remodeling & Carpentry in Monroe, MI`,
  absoluteTitle: true,
  description:
    "Monroe, MI home improvement: kitchen and bath remodeling, basements, hardwood floors, crown molding and trim, decks and additions. Request an estimate.",
  path: "/",
});

const focus = [
  {
    slug: "kitchen-remodeling",
    title: "Kitchens",
    body: "Cabinets, counters and layout changes, finished with trim that looks built-in.",
  },
  {
    slug: "bathroom-remodeling",
    title: "Bathrooms",
    body: "Showers and tile waterproofed properly behind the finish, not just on the surface.",
  },
  {
    slug: "finish-carpentry",
    title: "Interior finishes",
    body: "Crown molding, casing, baseboard and built-ins fitted to walls that aren't quite square.",
  },
];

export default function HomePage() {
  const featured = projects.slice(0, 3);
  const areas = serviceAreas.filter((a) => a.confirmed);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div>
            <p className="label">
              {site.location.city}, {site.location.regionName}
            </p>
            <h1 id="hero-title">
              Remodeling &amp; finish carpentry <em>for Monroe homes.</em>
            </h1>
            <p className="hero__lede">
              {site.name} remodels kitchens, bathrooms and basements, installs hardwood floors, trim, decks and
              additions — with a focus on the interior finish work that makes a room look done right.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn--lg" data-track="estimate_cta" data-track-location="hero">
                Request an Estimate
              </Link>
              <a href={`tel:${site.phone.e164}`} className="btn btn--light btn--lg" data-track-location="hero">
                <PhoneIcon />
                Call {site.phone.display}
              </a>
            </div>
            <ul className="hero__meta">
              <li>
                <PinIcon /> Based in {site.location.city}, {site.location.region}
              </li>
              <li>
                <RulerIcon /> Interior finish specialists
              </li>
              <li>
                <ClipboardIcon /> Written estimates
              </li>
            </ul>
          </div>
          <figure className="hero__figure rise rise-2">
            <div className="sheet">
              <div style={{ padding: "6% 5% 2%" }}>
                <HouseElevation className="sheet__art" />
              </div>
              <figcaption className="sheet__titleblock">
                <span>
                  {site.shortName} — {site.location.city}, {site.location.region}
                </span>
                <span aria-hidden="true">Sheet A-2</span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head section-head--split">
            <div>
              <p className="label">01 — Services</p>
              <h2 id="services-title" className="mt-4">
                Seven kinds of work, one standard for the details
              </h2>
            </div>
            <p className="lede">
              From a single room of crown molding to a full addition. Each service page covers what to expect, what
              to decide up front, and the questions homeowners ask most.
            </p>
          </div>
          <ServiceGrid />
        </div>
      </section>

      {/* ---------- Focus ---------- */}
      <section className="section section--paper-2" aria-labelledby="focus-title">
        <div className="container split split--wide-left">
          <div>
            <p className="label">02 — Focus</p>
            <h2 id="focus-title" className="mt-4">
              The finish work is the part you live with
            </h2>
            <div className="prose mt-5">
              <p>
                Mann&rsquo;s Home Improvement specializes in {site.specialty}. That&rsquo;s where a remodel either
                looks custom or looks assembled: the reveal around a cabinet door, a coped corner on the crown, tile
                that lines up with the window instead of fighting it.
              </p>
              <p>
                It&rsquo;s also where shortcuts hide. Caulk filling a bad miter or grout over a shower with no
                waterproofing behind it look fine on day one. Doing those parts properly is what keeps a room looking
                right years later.
              </p>
            </div>
            <ul className="specialty-list mt-6">
              {focus.map((f, i) => (
                <li key={f.slug}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>
                      <Link href={`/services/${f.slug}`}>{f.title}</Link>
                    </strong>
                    <span>{f.body}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ServiceSheet name="trim" title="Detail — crown at inside corner" sheet="D-4" tone="paper" />
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="section section--dark" aria-labelledby="process-title">
        <div className="container">
          <div className="section-head">
            <p className="label">03 — How it works</p>
            <h2 id="process-title">From first call to a written estimate</h2>
            <p className="lede">No pressure and no guesswork — just the steps it takes to price a project accurately.</p>
          </div>
          <ol className="process">
            {estimateProcess.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
          <div className="btn-row mt-7">
            <Link href="/contact" className="btn btn--lg" data-track="estimate_cta" data-track-location="process">
              Start with step one
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Recent work ---------- */}
      <section className="section" aria-labelledby="work-title">
        <div className="container">
          {featured.length > 0 ? (
            <>
              <div className="section-head section-head--split">
                <div>
                  <p className="label">04 — Recent work</p>
                  <h2 id="work-title" className="mt-4">
                    Recent projects
                  </h2>
                </div>
                <p>
                  <Link href="/projects" className="text-link">
                    See all projects <ArrowIcon className="" />
                  </Link>
                </p>
              </div>
              <ul className="gallery">
                {featured.map((p) => (
                  <li key={p.slug}>
                    <figure>
                      <div className="photo">
                        <Image
                          src={p.images[0].src}
                          alt={p.images[0].alt}
                          width={p.images[0].width}
                          height={p.images[0].height}
                          sizes="(min-width: 1040px) 380px, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <figcaption>
                        <strong>{p.title}</strong>
                        <span>
                          {getService(p.service)?.name}
                          {p.location ? ` · ${p.location}` : ""}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div id="work-title">
              <FacebookProof />
            </div>
          )}
        </div>
      </section>

      {/* ---------- Service area ---------- */}
      <section className="section section--paper-2" aria-labelledby="area-title">
        <div className="container area">
          <div>
            <p className="label">05 — Service area</p>
            <h2 id="area-title" className="mt-4">
              Based in {site.location.city}, {site.location.regionName}
            </h2>
            <p className="lede mt-5">
              Mann&rsquo;s Home Improvement works on homes in and around {site.location.city}. If you&rsquo;re nearby
              and not sure whether your project is in range, just ask — include your town in the estimate form.
            </p>
            <ul className="area-tags" aria-label="Communities served">
              {areas.map((a) => (
                <li key={a.name}>
                  {a.name}
                  {a.note && <small>· {a.note}</small>}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link href="/service-areas" className="text-link">
                About our service area <ArrowIcon className="" />
              </Link>
            </p>
          </div>
          <ServiceSheet name="addition" title={`Site — ${site.location.city}, ${site.location.region}`} sheet="C-1" />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section" aria-labelledby="faq-title">
        <div className="container split">
          <div>
            <p className="label">06 — Questions</p>
            <h2 id="faq-title" className="mt-4">
              Common questions
            </h2>
            <p className="lede mt-5">
              Don&rsquo;t see yours? Call{" "}
              <a href={`tel:${site.phone.e164}`} data-track-location="faq">
                {site.phone.display}
              </a>
              .
            </p>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      <CtaBand location="home_footer" />
    </>
  );
}
