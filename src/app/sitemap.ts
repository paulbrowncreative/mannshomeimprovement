import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => `${site.url}${p}`;
  const pages: MetadataRoute.Sitemap = [
    { url: u("/"), changeFrequency: "monthly", priority: 1 },
    { url: u("/services"), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: u(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: u("/service-areas"), changeFrequency: "yearly", priority: 0.7 },
    { url: u("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: u("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: u("/privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];
  // /projects is noindex until it has content, so it stays out of the sitemap too.
  if (projects.length) pages.push({ url: u("/projects"), changeFrequency: "weekly", priority: 0.7 });
  return pages;
}
