/**
 * Project gallery. Empty until the owner supplies real project photos.
 *
 * To add a project:
 *  1. Put images in /public/images/projects/<slug>/ (JPG/PNG, longest side ≥ 2000px —
 *     Next.js generates AVIF/WebP and responsive sizes automatically).
 *  2. Add an entry below. `service` must match a slug in services.ts.
 *
 * The gallery, the homepage "Recent work" section and the sitemap entry for
 * /projects all switch on automatically once this list has entries.
 */

export type Project = {
  slug: string;
  title: string;
  service: string;
  /** e.g. "Monroe" — only list a town if the homeowner is fine with it */
  location?: string;
  summary: string;
  images: { src: string; alt: string; width: number; height: number }[];
};

export const projects: Project[] = [];
