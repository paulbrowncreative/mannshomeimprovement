# Mann's Home Improvement — website

Marketing and lead-generation site for Mann's Home Improvement LLC (Monroe, Michigan).

- **Stack:** Next.js 16 (App Router), React 19, TypeScript, plain CSS with design tokens. No UI framework, no CSS framework, no client-side data fetching.
- **Rendering:** every page is statically generated. The only server code is the estimate-form endpoint (`/api/estimate`).
- **Runtime dependencies:** `next`, `react` and `react-dom`, nothing else.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional for local dev
npm run dev                  # http://localhost:3000
npm run typecheck
npm run build && npm start   # production build
```

In development, if no delivery is configured, estimate requests are written to the server console so you can test the form.

## Deploying

The site needs a Node-capable host for the form endpoint. **Vercel** is the simplest choice: import the GitHub repo and accept the defaults. Netlify and any Node 20+ server running `npm run build && npm start` also work.

Set these environment variables on the host:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes** | Production origin, e.g. `https://www.mannshomeimprovement.com`. Drives canonicals, sitemap, Open Graph and schema. |
| `RESEND_API_KEY` | One delivery method required | [Resend](https://resend.com) API key, used to email each estimate request. |
| `ESTIMATE_TO_EMAIL` | With Resend | Where leads go. Comma-separate multiple addresses. |
| `ESTIMATE_FROM_EMAIL` | Recommended | Sender on a domain verified in Resend, e.g. `Website <estimates@mannshomeimprovement.com>`. |
| `ESTIMATE_WEBHOOK_URL` | Alternative or extra | Receives each lead as JSON. Works with Zapier, Make, a CRM or Google Sheets. |
| `NEXT_PUBLIC_GA_ID` | Optional | GA4 measurement ID (`G-…`). Analytics loads only when this is set. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console HTML-tag verification token. |

> **The form will not deliver leads in production until Resend or a webhook is configured.** Until then it shows visitors an honest error with the phone number, and it never pretends to have sent anything. After deploying, submit a test request.

On Vercel, `robots.txt` blocks indexing on preview deployments automatically. Production allows crawling and lists the sitemap.

### Domain and launch steps
1. Point the domain at the host and enforce HTTPS. Pick the www or apex version and redirect the other one to it (configured in the host's domain settings).
2. Set `NEXT_PUBLIC_SITE_URL` to that exact origin and redeploy.
3. Verify the site in Google Search Console and submit `/sitemap.xml`.
4. Set the website URL on the Google Business Profile.

## Editing content

All content lives in `src/content/`. Pages update automatically from it.

| File | What it controls |
|---|---|
| `site.ts` | Business name, phone, email, hours, license, service areas, Facebook/Google links, the estimate process steps |
| `services.ts` | The seven service pages: copy, FAQs, related services. Removing an entry removes its page, links, form option and sitemap entry. |
| `projects.ts` | Project gallery. The gallery and homepage "Recent projects" section switch on, and `/projects` becomes indexable, once entries exist. |
| `faqs.ts` | Homepage FAQ |

Optional fields such as `email`, `hours`, `licenseNumber` and `foundedYear` are hidden everywhere until they're filled in. Nothing displays as a placeholder.

### Adding project photos
1. Put the originals in `public/images/projects/<project-slug>/`. JPGs from a phone are fine; Next.js generates AVIF/WebP at responsive sizes.
2. Add an entry to `src/content/projects.ts` with descriptive alt text (what's in the photo, not "photo of kitchen").

## Analytics and conversion events

GA4 loads only when `NEXT_PUBLIC_GA_ID` is set, and never for visitors whose browser sends a Global Privacy Control signal. Events (see `src/lib/analytics.ts`):

| Event | When | Mark as GA4 key event? |
|---|---|---|
| `generate_lead` | Estimate form submitted successfully (fires on `/contact/thank-you`, param `project_type`) | **Yes** |
| `phone_click` | Any `tel:` link tapped (param `location`) | **Yes** |
| `estimate_cta_click` | Any "Request an Estimate" link (param `location`) | No (engagement) |
| `form_error` | Submission failed (param `status`) | No (diagnostics) |

The `/contact/thank-you` page view can also serve as a Google Ads conversion. If you switch to Google Tag Manager, the same events go to `dataLayer` when `gtag` is absent.

## Project structure

```
src/
  app/            routes, metadata, sitemap.ts, robots.ts, opengraph-image.tsx, api/estimate
  components/     Header, Footer, MobileBar, EstimateForm, PageHero, Illustrations, …
  content/        all business content (edit here)
  lib/            schema.org builders, metadata helper, form validation, analytics
docs/             client checklist, SEO strategy, QA report
```
