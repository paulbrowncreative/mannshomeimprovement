# SEO strategy: Mann's Home Improvement

## Situation (research, October 2026)

- **No existing website and no Google Business Profile found.** The business's only public presence is a Facebook page.
- **Name collision:** several unrelated "Mann" contractors exist (Manns Home Improvement LLC in Milwaukee, Mann's Home Improvement & Repair in Waterford MI, MANS Lumber & Home in SE Michigan). Consistent NAP (name, address, phone) plus a verified Google Business Profile is the main defense.
- **Monroe search results** are dominated by directories (HomeAdvisor, Thumbtack, Angi) and a handful of local remodelers. A fast, specific, locally grounded site has a real opening, especially for service + "Monroe MI" searches.

## Keyword map

One primary theme per page, so pages don't compete with each other.

| Page | Primary theme | Secondary themes | Intent |
|---|---|---|---|
| `/` | home improvement contractor Monroe MI | remodeling contractor Monroe Michigan; home remodeling Monroe | Local / commercial |
| `/services` | home remodeling services Monroe MI | renovation contractor near Monroe | Commercial investigation |
| `/services/kitchen-remodeling` | kitchen remodeling Monroe MI | kitchen remodel cost, kitchen cabinets installation, kitchen renovation permit | Transactional |
| `/services/bathroom-remodeling` | bathroom remodeling Monroe MI | tub to shower conversion, shower remodel, bathroom tile | Transactional |
| `/services/basement-remodeling` | basement finishing Monroe MI | basement remodel, egress window bedroom, basement waterproofing before finishing | Transactional |
| `/services/hardwood-flooring` | hardwood floor installation Monroe MI | engineered vs solid hardwood, hardwood stairs | Transactional |
| `/services/finish-carpentry` | finish carpenter Monroe MI | crown molding installation, trim carpentry, wainscoting, built-ins | Transactional |
| `/services/decks` | deck builder Monroe MI | composite deck, deck replacement, deck permit Michigan | Transactional |
| `/services/home-additions` | home additions Monroe MI | room addition contractor, addition vs basement | Commercial investigation |
| `/service-areas` | contractor Monroe Michigan (local relevance hub) | nearby community names once confirmed | Local |
| `/projects` | remodeling projects Monroe | (noindex until it has real projects) | Navigational / trust |

## What's implemented

- A unique, intent-matched title and meta description on every page; one H1 per page; no skipped heading levels.
- Canonical URLs, Open Graph and Twitter cards (generated share image), `robots.txt`, XML sitemap.
- Structured data:
  - `GeneralContractor` (LocalBusiness subtype) site-wide, with only verified fields
  - `WebSite`
  - `Service` on each service page
  - `BreadcrumbList` on interior pages
- **Not used on purpose:**
  - `FAQPage` markup. Google shows FAQ rich results only for well-known government and health sites, so the markup adds weight with no benefit. The FAQs are still on the pages as visible content.
  - Review / AggregateRating markup. There are no approved reviews yet, and self-serving review markup isn't eligible for rich results anyway.
- Thin-content control: `/projects` is `noindex` and out of the sitemap until it has real projects. The thank-you page is `noindex`.
- No city doorway pages. Individual town pages should be added only after the service area is confirmed, and only with genuinely local content (projects in that town, local permit notes, neighborhood housing stock).
- Internal linking: service ↔ related services, service-area page → service pages in context, footer links to all services.

## Google Business Profile (highest-impact next step)

For a local contractor, the Google Business Profile drives more calls than the website. Recommended setup:

1. Create or claim the profile as a **service-area business** (hide the street address if there's no storefront). Primary category: **Remodeler**. Secondary: **Kitchen remodeler**, **Bathroom remodeler**, **Carpenter**, **Deck builder** (only for services that are offered).
2. Use exactly the same name and phone as the site: *Mann's Home Improvement LLC*, (734) 770-7531.
3. Set the service area to the confirmed towns. Link the website, and add `/contact` as the appointment link.
4. Upload project photos regularly and ask every happy customer for a Google review (a short text with the review link works well).
5. Once it's live, add its URL to `googleBusinessProfileUrl` in `src/content/site.ts`. It flows into the schema's `sameAs` automatically.

## Content plan (only if someone will keep it up)

A blog isn't included, because an abandoned blog does more harm than good. If the owner or the agency will publish roughly monthly, these topics support the service pages:

1. What does a kitchen remodel cost in Monroe County? (ranges by scope, with what drives cost) → kitchen
2. Tub-to-shower conversions: what's involved and what to decide → bath
3. Finishing a basement in Southeast Michigan: moisture checks first → basement
4. Egress windows: when a basement bedroom needs one → basement
5. Engineered vs. solid hardwood in Michigan homes → flooring
6. Matching trim in an older Monroe home → finish carpentry
7. Composite vs. pressure-treated decking after Michigan winters → decks
8. Deck permits in Monroe: what usually needs one → decks
9. Addition or basement? Comparing ways to add space → additions
10. Project spotlights: one real project per post, with photos, scope and the town → all (also feeds the gallery)

Each post should link to its service page and end with the estimate CTA.

## Measurement

GA4 events: `generate_lead` and `phone_click` are the key events. Add a Search Console property and track:
- impressions and clicks for "[service] Monroe MI" searches
- Google Business Profile calls and website clicks
- lead volume by `project_type`
