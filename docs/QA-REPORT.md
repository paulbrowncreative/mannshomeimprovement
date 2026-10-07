# QA report

**Date:** October 7, 2026.
**Build tested:** the exact static export shipped in `mannshomeimprovement-netlify.zip`.
**Test setup:** a local server emulating Netlify (clean URLs, `404.html`, gzip, Netlify Forms POST handling), Chromium via Playwright, and Lighthouse.

## Summary

| Area | Result |
|---|---|
| Functional tests | **31 / 31 pass** |
| Links and assets | 28 URLs crawled, **0 broken**, 0 broken in-page anchors |
| Responsive | 15 pages × 6 widths (320–1920px): **0 horizontal overflow, 0 console errors** |
| SEO audit | 15 pages: unique titles and descriptions, 1 H1 each, canonical, OG image, valid JSON-LD, no heading skips |
| Lighthouse (4 pages × mobile/desktop) | Performance 95–97 mobile / 100 desktop; **Accessibility, Best Practices, SEO 100 on all 8 runs**; CLS 0 |

### Lighthouse detail (lab, simulated slow 4G and CPU throttling)

| Page | Mobile perf | Mobile LCP | Desktop perf | Desktop LCP | A11y / BP / SEO |
|---|---|---|---|---|---|
| `/` | 96 | 2.8 s | 100 | 0.6 s | 100 / 100 / 100 |
| `/services/kitchen-remodeling` | 95 | 2.5 s | 100 | 0.5 s | 100 / 100 / 100 |
| `/contact` | 97 | 2.4 s | 100 | 0.5 s | 100 / 100 / 100 |
| `/about` | 97 | 2.6 s | 100 | 0.5 s | 100 / 100 / 100 |

The remaining Lighthouse flags are framework baseline (about 29 KB of unused Next.js runtime) and nothing that can be addressed without changing frameworks. Re-check with PageSpeed Insights once the site is live on Netlify's CDN.

### Functional tests (all passing)
- **Form validation:**
  - inline errors on empty submit, with focus moved to the first invalid field
  - name, phone and email rules enforced
  - errors clear while the visitor types
- **Service links:** service-page CTAs preselect the matching project type through `?project=`.
- **Submitting with JavaScript:**
  - the URL-encoded POST includes `form-name=estimate`
  - every field arrives intact, including `&` characters
  - the visitor is redirected to the thank-you page
- **Netlify outage:**
  - an error alert appears and receives focus
  - the visitor's input is kept
  - the phone number is offered as a fallback
- **Submitting without JavaScript:**
  - native `required` validation blocks an empty form
  - a valid submit reaches the thank-you page and the lead is delivered
- **Mobile menu:**
  - opens with the page behind it made `inert`, and focus moves into the menu
  - Escape closes it and returns focus to the toggle
  - it closes and releases the scroll lock after navigation
- **Navigation and keyboard:**
  - desktop nav marks the active section with `aria-current`
  - the skip link is the first tab stop and moves focus to the main content
  - FAQ accordions open
- **404:** unknown URLs get the custom 404 page with a 404 status.

## Issues found and fixed in this pass
1. **Netlify compatibility:** the form posted to a server endpoint that a static or drag-and-drop deploy can't run. I rebuilt the site as a static export and moved the form to Netlify Forms (`data-netlify`, honeypot, `form-name`), with a no-JS fallback.
2. **Share image:** it exported as an extensionless file (`/opengraph-image`) and rendered in a generic font. It's now a static `og-image.png` rendered with the site's own fonts, referenced in every page's metadata and in the schema.
3. **Drawing line weights:** the service drawings rendered chunky at large sizes, because `vector-effect` isn't inherited. It's now applied to every shape, so all drawings share one line weight.
4. **Mobile menu focus:** keyboard and screen-reader focus could reach the page hidden behind the open menu. The background is now `inert` while the menu is open.
5. **Homepage "Recent work" label:** the section was labelled by its entire text block. It's now labelled by its heading.
6. **Projects page:** two blocks said the same thing. They're merged into one empty state with a Facebook link.
7. **Copy:**
   - the About headline wrapped to five lines on desktop, so I shortened it
   - the Services intro repeated "interior"
   - "Seven kinds of work" was hard-coded, so the count now comes from the service list
8. **Re-rendering bug:** the error-message component was re-created on every keystroke. It's now a plain render helper.
9. **Dead code:** removed server-only code (rate limiter, email sender, unused helpers) that no longer applies.
10. **Hosting config:** HTTP security headers and asset caching moved to `public/_headers`, which Netlify applies. `robots.txt` blocks Netlify deploy previews automatically.

## Requires action in Netlify (cannot be done in code)
| Item | Steps |
|---|---|
| **Form detection** | Project configuration → Forms → **Enable form detection**, then **deploy again**. Until then, submissions show the "couldn't send" message with the phone number. |
| **Lead emails** | Forms → Form notifications → Email notification → form `estimate` → recipient address |
| **Custom domain** | Domain management. If the domain isn't `www.mannshomeimprovement.com`, rebuild with `NEXT_PUBLIC_SITE_URL` set to it. |

## Requires client input (see CLIENT-CHECKLIST.md)
Confirm the phone number, services, service area and domain. Then supply the license and insurance details, project photos, reviews and the owner's story. Each section appears automatically once its data is added.

## Not tested
- Live Netlify Forms processing. It was tested against an emulator that follows Netlify's documented behaviour; submit one real test request after deploying.
- Physical iOS/Android devices and Safari/Firefox. Testing used Chromium at phone, tablet and desktop sizes.
- Screen readers (VoiceOver/NVDA). Semantics were checked through automated audits and keyboard testing.
