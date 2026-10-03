/**
 * Single source of truth for business facts.
 *
 * Anything marked `CONFIRM` came from public listings (not the owner) and must be
 * verified before launch — see docs/CLIENT-CHECKLIST.md. Optional fields left
 * `undefined` are simply not rendered anywhere on the site or in structured data.
 */

export const site = {
  name: "Mann's Home Improvement LLC",
  shortName: "Mann's Home Improvement",

  // Production origin. Set NEXT_PUBLIC_SITE_URL in the hosting environment.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mannshomeimprovement.com").replace(/\/$/, ""),

  // CONFIRM: number taken from the public Facebook listing.
  phone: {
    display: "(734) 770-7531",
    e164: "+17347707531",
  },

  // Not public yet. When set, it appears in the footer, contact page and schema.
  email: undefined as string | undefined,

  // Service-area business: no street address is published. If Mann's has a
  // storefront/office customers visit, add it here and to Google Business Profile.
  location: {
    city: "Monroe",
    region: "MI",
    regionName: "Michigan",
    county: "Monroe County",
    country: "US",
  },

  // Positioning taken from the public Facebook page description.
  specialty: "interior finishes, kitchens and bathrooms",

  // CONFIRM: leave undefined until the owner provides them.
  hours: undefined as { days: string; time: string }[] | undefined,
  foundedYear: undefined as number | undefined,
  licenseNumber: undefined as string | undefined, // Michigan LARA residential builder / M&A license
  insured: undefined as boolean | undefined,
  ownerName: undefined as string | undefined,

  social: {
    facebook: "https://www.facebook.com/BillMannsHomeImprovement/",
  },

  // Set once the Google Business Profile exists/is verified.
  googleBusinessProfileUrl: undefined as string | undefined,
} as const;

export type NavItem = { href: string; label: string };

export const mainNav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/service-areas", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Communities served. Only Monroe is confirmed. Add nearby communities here
 * ONLY after the owner confirms they take work there.
 */
export const serviceAreas: { name: string; note?: string; confirmed: boolean }[] = [
  { name: "Monroe", note: "Home base", confirmed: true },
  // { name: "Frenchtown Township", confirmed: false },
  // { name: "Monroe Charter Township", confirmed: false },
  // { name: "LaSalle Township", confirmed: false },
  // { name: "Carleton", confirmed: false },
  // { name: "Dundee", confirmed: false },
  // { name: "Temperance / Bedford Township", confirmed: false },
  // { name: "Newport / Berlin Township", confirmed: false },
];

/**
 * How an estimate request moves forward. CONFIRM the steps match how the
 * owner actually works (e.g. whether site visits are free, typical turnaround).
 */
export const estimateProcess = [
  {
    title: "Tell us about the project",
    body: "Call, text or send the estimate form. A few sentences and a rough idea of timing is plenty to start.",
  },
  {
    title: "Talk it through",
    body: "We follow up to ask the questions that matter — what's there now, what you want changed, and what you want to spend.",
  },
  {
    title: "See the space",
    body: "Remodeling estimates depend on what's behind the walls and under the floor, so we look at the room in person.",
  },
  {
    title: "Get a written estimate",
    body: "You get the scope in writing, so you know exactly what's included before any work is scheduled.",
  },
];
