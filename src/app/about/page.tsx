import Link from "next/link";
import { site, estimateProcess } from "@/content/site";
import { services } from "@/content/services";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ServiceSheet } from "@/components/Illustrations";
import { CtaBand } from "@/components/CtaBand";
import { FacebookProof } from "@/components/FacebookProof";

export const metadata = pageMeta({
  title: "About Us",
  description: `${site.name} is a home improvement company in ${site.location.city}, ${site.location.regionName}, focused on ${site.specialty}.`,
  path: "/about",
});

/**
 * Owner story — leave empty until the owner supplies it (history, why they
 * started, background in the trades). The section renders only when filled.
 */
const ownerStory: string[] = [];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title={`${site.location.city} remodeling, built around the finish work`}
        lede={`${site.name} is based in ${site.location.city}, ${site.location.regionName}, and specializes in ${site.specialty}.`}
        crumbs={[{ name: "About", href: "/about" }]}
        art={<ServiceSheet name="trim" title="Detail — casing & base" sheet="D-1" />}
      />

      {ownerStory.length > 0 && (
        <section className="section" aria-labelledby="story-title">
          <div className="container-narrow prose">
            <p className="label">Our story</p>
            <h2 id="story-title">{site.ownerName ? `Meet ${site.ownerName}` : "How we got here"}</h2>
            {ownerStory.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="focus-title">
        <div className="container split split--wide-left">
          <div className="prose">
            <p className="label">What we focus on</p>
            <h2 id="focus-title">Interior work that has to look right up close</h2>
            <p>
              Some contractors are built for volume. Mann&rsquo;s Home Improvement is focused on the inside of the house
              — kitchens, bathrooms and the trim, casing and molding that tie a room together.
            </p>
            <p>
              That focus carries into the other work too. A basement is mostly finish work once it&rsquo;s framed. A
              hardwood floor is only as good as the transitions and base around it. Even an addition comes down to how
              well the new rooms blend with the old ones.
            </p>
          </div>
          <div>
            <p className="label">Services</p>
            <ul className="specialty-list mt-4">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>
                      <Link href={`/services/${s.slug}`}>{s.name}</Link>
                    </strong>
                    <span>{s.summary}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="how-title">
        <div className="container">
          <div className="section-head">
            <p className="label">How we work</p>
            <h2 id="how-title">Straightforward from the first call</h2>
          </div>
          <ol className="process">
            {estimateProcess.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FacebookProof
            heading="Follow along on Facebook"
            body="Mann's Home Improvement shares project photos and updates on Facebook — the best place to see recent work while our project gallery is being built."
          />
        </div>
      </section>

      <CtaBand location="about" />
    </>
  );
}
