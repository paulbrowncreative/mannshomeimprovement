import { site, serviceAreas } from "@/content/site";
import type { Service } from "@/content/services";

export const businessId = `${site.url}/#business`;

/** GeneralContractor (a LocalBusiness subtype). Only verified/known fields are emitted. */
export function businessSchema() {
  const sameAs = [site.social.facebook, site.googleBusinessProfileUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": businessId,
    name: site.name,
    url: site.url,
    telephone: site.phone.e164,
    ...(site.email ? { email: site.email } : {}),
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og-image.png`,
    description: `Home improvement company in ${site.location.city}, ${site.location.regionName}, focused on ${site.specialty}.`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: serviceAreas
      .filter((a) => a.confirmed)
      .map((a) => ({ "@type": "City", name: `${a.name}, ${site.location.region}` })),
    ...(site.foundedYear ? { foundingDate: String(site.foundedYear) } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.shortName,
    publisher: { "@id": businessId },
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: `${site.location.city}, ${site.location.region}` },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.href}`,
    })),
  };
}
