import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Netlify sets CONTEXT during Git-connected builds; keep deploy previews and
  // branch deploys out of search. Local/zip builds are treated as production.
  const ctx = process.env.CONTEXT;
  const isProd = !ctx || ctx === "production";
  return {
    rules: isProd ? [{ userAgent: "*", allow: "/" }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
