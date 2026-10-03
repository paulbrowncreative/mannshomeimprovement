"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Project } from "@/content/projects";

export function ProjectGallery({
  projects,
  serviceNames,
}: {
  projects: Project[];
  serviceNames: Record<string, string>;
}) {
  const categories = useMemo(() => Array.from(new Set(projects.map((p) => p.service))), [projects]);
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? projects.filter((p) => p.service === active) : projects;
  const showFilters = categories.length > 1 && projects.length >= 6;

  return (
    <>
      {showFilters && (
        <div className="filters" role="group" aria-label="Filter projects by service">
          <button type="button" aria-pressed={active === null} onClick={() => setActive(null)}>
            All
          </button>
          {categories.map((c) => (
            <button key={c} type="button" aria-pressed={active === c} onClick={() => setActive(c)}>
              {serviceNames[c] ?? c}
            </button>
          ))}
        </div>
      )}
      <p className="visually-hidden" aria-live="polite">
        Showing {shown.length} projects
      </p>
      <ul className="gallery">
        {shown.map((p) => (
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
                  <Link href={`/services/${p.service}`}>{serviceNames[p.service]}</Link>
                  {p.location ? ` · ${p.location}` : ""}
                </span>
                <span style={{ display: "block", marginTop: 4 }}>{p.summary}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
