# QA report

**Date:** October 3, 2026. **Build tested:** production (`next build && next start`), Chromium (Playwright), Lighthouse.

## Results

### Lighthouse (measured, local production build)

| Page | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| `/` | Mobile | 96 | 100 | 100 | 100 | 2.8 s | 0 | 160 ms |
| `/` | Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |
| `/services/kitchen-remodeling` | Mobile | 97 | 100 | 100 | 100 | 2.6 s | 0 | 40 ms |
| `/services/kitchen-remodeling` | Desktop | 100 | 100 | 100 | 100 | 0.5 s | 0 | 0 ms |
| `/contact` | Mobile | 97 | 100 | 100 | 100 | 2.6 s | 0 | 40 ms |
| `/contact` | Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |

These are lab numbers from Lighthouse's simulated slow 4G and CPU throttling, run on localhost. Real-world numbers depend on hosting and CDN; check PageSpeed Insights after launch.

### Functional (automated, all passing)
- The estimate form preselects the service from `?project=` links on service pages.
- An empty submit shows inline errors, moves focus to the first invalid field, and sets `aria-invalid`.
- Phone format validation works, and email becomes required when "Email" is the chosen contact method.
- **Successful submit:**
  - the lead reached a test webhook with every field present
  - the visitor is redirected to `/contact/thank-you`
- **Delivery not configured (production):** the visitor sees an honest error with the phone number, and the form keeps their input.
- **No-JavaScript submit:**
  - a valid post redirects to the thank-you page (303)
  - an invalid post redirects back to the form with an error message
- Server validation returns 422 with field errors, and the honeypot drops spam silently.
- **Mobile menu:**
  - opens with `aria-expanded` set
  - Escape closes it and returns focus to the toggle
  - it closes after a link is tapped
- The skip link is the first tab stop.
- The sticky mobile call bar is hidden on `/contact`.

### Responsive
- 10 pages × 6 widths (320, 390, 768, 1024, 1440, 1920) gave **0 horizontal overflow and 0 console errors**.
- Screens reviewed visually: homepage (mobile and desktop), service page, contact, services index (tablet), mobile menu.

### SEO (automated audit of every sitemap URL)
- Every page returns 200, has a unique title and description, a self-referencing canonical, exactly one H1, no skipped heading levels, an Open Graph image, valid JSON-LD, no images missing alt text, and no empty links.
- `/projects` and `/contact/thank-you` are `noindex`, and both are left out of the sitemap.
- `robots.txt` allows crawling in production, blocks `/api/`, and blocks everything on preview deployments.

## Issues found and fixed during QA
1. On mobile, the menu filled only the header strip. The header's `backdrop-filter` became the containing block for the fixed-position menu, so I made the header opaque.
2. Long single-line drawing captions widened grid columns past the viewport. Fixed with `min-width: 0` on grid children.
3. Buttons that wouldn't wrap overflowed 320px screens. Button text now wraps below 400px.
4. Labels on the dark page heroes had low contrast. They now use the brass accent.
5. The first section heading on service pages had no top spacing.
6. The hero's entrance animation delayed the LCP paint. Removed from the headline.
7. The logo link's accessible name didn't match its visible text.
8. Interior pages lost the shared Open Graph image because page-level metadata replaced it. Now re-attached.
9. Some titles and descriptions were too long, and the About title was redundant. Shortened.
10. The form's error message repeated the phone number.

## Outstanding / requires client or hosting setup
| Item | Status |
|---|---|
| Form email/webhook delivery | **Needs `RESEND_API_KEY` + `ESTIMATE_TO_EMAIL`, or `ESTIMATE_WEBHOOK_URL`.** Until then the form shows an error with the phone number. |
| Production domain | Set `NEXT_PUBLIC_SITE_URL` (defaults to `https://www.mannshomeimprovement.com`). |
| Phone, services, service area | From public listings. **Confirm** (see CLIENT-CHECKLIST.md). |
| Project photos, reviews, license, insurance, owner story | Not available. Each section appears automatically once the data is added. |
| GA4 / Search Console | Ready. Add the IDs as env vars, then mark `generate_lead` and `phone_click` as key events. |
| Rate limiting | Per server instance, in memory (good enough for spam bursts). For heavy abuse, add Vercel Firewall or Upstash rate limiting. |
| Photo uploads in the form | Deliberately not built: secure file storage would be needed. Visitors are told they'll get instructions for sending photos. |

## Not tested
- Real email delivery through Resend (no API key in this environment). The code path is exercised up to the HTTP call, and the webhook path was verified end to end.
- Physical iOS/Android devices and Safari/Firefox. Testing used Chromium at mobile viewport sizes.
- Screen readers (VoiceOver/NVDA). Semantics were checked through automated audits and keyboard testing only.
