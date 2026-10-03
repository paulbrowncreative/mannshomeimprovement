import Link from "next/link";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { FacebookProof } from "@/components/FacebookProof";
import { CtaBand } from "@/components/CtaBand";
import { ServiceSheet } from "@/components/Illustrations";

const hasProjects = projects.length > 0;

export const metadata = pageMeta({
  title: "Remodeling Projects in Monroe, MI",
  description: `Kitchen, bathroom, basement, flooring, trim and deck projects completed by ${site.name} in the ${site.location.city}, ${site.location.region} area.`,
  path: "/projects",
  // Keep the page out of search results until it has real projects on it.
  noindex: !hasProjects,
});

export default function ProjectsPage() {
  const serviceNames = Object.fromEntries(services.map((s) => [s.slug, s.name]));
  return (
    <>
      <PageHero
        label="Projects"
        title="Recent projects"
        lede={`Kitchens, bathrooms, trim, floors and more from ${site.location.city}-area homes.`}
        crumbs={[{ name: "Projects", href: "/projects" }]}
      />

      <section className="section">
        <div className="container">
          {hasProjects ? (
            <ProjectGallery projects={projects} serviceNames={serviceNames} />
          ) : (
            <div className="empty-state">
              <div className="prose">
                <p className="label">Gallery in progress</p>
                <h2>Project photos are on the way</h2>
                <p>
                  We&rsquo;re gathering photos of completed projects for this gallery. In the meantime, recent work is
                  posted on the Mann&rsquo;s Home Improvement Facebook page.
                </p>
                <p>
                  Want to see work similar to your project? Ask when you{" "}
                  <Link href="/contact">request an estimate</Link>.
                </p>
              </div>
              <ServiceSheet name="kitchen" title="Gallery — in progress" sheet="P-1" tone="paper" />
            </div>
          )}
          {!hasProjects && (
            <div className="mt-7">
              <FacebookProof />
            </div>
          )}
        </div>
      </section>

      <CtaBand heading="Want yours to be the next project here?" location="projects" />
    </>
  );
}
