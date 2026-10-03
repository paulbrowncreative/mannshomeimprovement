import type { Metadata } from "next";
import { site } from "@/content/site";

export function pageMeta({
  title,
  description,
  path,
  noindex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      siteName: site.shortName,
      locale: "en_US",
      url: path,
      title,
      description,
      // Page-level openGraph replaces the inherited object, so re-attach the shared image.
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} — ${site.location.city}, ${site.location.region}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
