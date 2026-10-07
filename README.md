# Mann's Home Improvement — website

Marketing and lead-generation site for Mann's Home Improvement LLC (Monroe, Michigan).

- **Stack:** Next.js 16 (App Router) with static export, React 19, TypeScript, plain CSS with design tokens.
- **Output:** a folder of static HTML/CSS/JS (`out/`). There's no server to maintain.
- **Estimate form:** handled by [Netlify Forms](https://docs.netlify.com/forms/setup/). No API keys, no backend.
- **Runtime dependencies:** `next`, `react` and `react-dom`, nothing else.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck
npm run build        # writes the static site to out/
```

The form only submits for real on Netlify. Locally, a submission shows the "couldn't send" error with the phone number, which is the expected fallback.

## Deploying to Netlify

### Option A: drag and drop (no Git, no build)
1. Unzip `mannshomeimprovement-netlify.zip`. You get a folder containing `index.html`.
2. In Netlify, go to **Add new project → Deploy manually** and drag the **folder** in. (For an existing site: **Deploys** tab → drag the folder onto the drop zone.)
3. **Turn on form detection.** Go to **Project configuration → Forms → Enable form detection**, then deploy the folder **once more**. Netlify only registers forms on deploys made after detection is enabled.
4. **Set up lead notifications.** Go to **Forms → Form notifications → Add notification → Email notification**, choose the `estimate` form, and enter the address that should receive leads. Every submission is also stored under **Forms → estimate**.
5. Submit a test request on the live site and confirm the email arrives.

### Option B: connect the GitHub repository (recommended long term)
Netlify reads `netlify.toml`: build command `npm run build`, publish directory `out`, Node 22. Every push to the main branch redeploys. Deploy previews are automatically blocked from search engines through `robots.txt`. Steps 3–5 above still apply.

### Build-time settings
These are baked in when the site is built. For Option B, set them under **Project configuration → Environment variables**. For a drag-and-drop zip, they have to be set before building it.

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.mannshomeimprovement.com` | Production origin. Drives canonicals, sitemap, social cards and schema. **Must match the real domain.** |
| `NEXT_PUBLIC_GA_ID` | (none) | GA4 measurement ID (`G-…`). Analytics loads only when this is set. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | (none) | Google Search Console HTML-tag token. (Verifying with a DNS record instead needs no rebuild.) |

### Domain
1. Under **Domain management**, add the custom domain and follow Netlify's DNS steps. HTTPS is issued automatically.
2. Make the www version (or the apex, whichever matches `NEXT_PUBLIC_SITE_URL`) the primary domain. Netlify redirects the other one to it.
3. Submit `https://<domain>/sitemap.xml` in Google Search Console, and add the website URL to the Google Business Profile.

`public/_headers` sets the security headers and long-term caching for hashed assets. Netlify applies it on both deploy methods.

## Editing content

All content lives in `src/content/`. Pages update automatically from it.

| File | What it controls |
|---|---|
| `site.ts` | Business name, phone, email, hours, license, service areas, Facebook/Google links, the estimate process steps |
| `services.ts` | The service pages: copy, FAQs, related services. Removing an entry removes its page, links, form option and sitemap entry. |
| `projects.ts` | Project gallery. The gallery and homepage "Recent projects" switch on, and `/projects` becomes indexable, once entries exist. |
| `faqs.ts` | Homepage FAQ |

Optional fields such as `email`, `hours`, `licenseNumber` and `foundedYear` are hidden everywhere until filled in. Nothing shows as a placeholder.

### Adding project photos
The static export doesn't resize images, so prepare them first:
1. Resize to **2000px on the long side**, export as **WebP or JPG at about 80% quality** (Squoosh.app works well), and aim for under 400 KB each.
2. Put them in `public/images/projects/<project-slug>/`.
3. Add an entry to `src/content/projects.ts` with the image's `width`/`height` and descriptive alt text (what's in the photo, not "photo of kitchen").

## Analytics and conversion events

GA4 loads only when `NEXT_PUBLIC_GA_ID` is set, and never for visitors whose browser sends a Global Privacy Control signal. Events (see `src/lib/analytics.ts`):

| Event | When | Mark as GA4 key event? |
|---|---|---|
| `generate_lead` | Estimate submitted successfully (fires on `/contact/thank-you`, param `project_type`) | **Yes** |
| `phone_click` | Any `tel:` link tapped (param `location`) | **Yes** |
| `estimate_cta_click` | Any "Request an Estimate" link (param `location`) | No (engagement) |
| `form_error` | Submission failed (param `status`) | No (diagnostics) |

## Project structure

```
src/
  app/            routes, metadata, sitemap.ts, robots.ts
  components/     Header, Footer, MobileBar, EstimateForm, PageHero, Illustrations, …
  content/        all business content (edit here)
  lib/            schema.org builders, metadata helper, form validation, analytics
public/           _headers, og-image.png, images/
docs/             client checklist, SEO strategy, QA report
netlify.toml      build settings for Git-connected deploys
```
