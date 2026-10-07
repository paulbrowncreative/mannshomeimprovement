# Client checklist: what we need from Mann's Home Improvement

The site is built so nothing unverified appears as fact. The items below either need confirming (they came from public listings) or are missing. Each is marked with what it unlocks on the site.

## 1. Confirm before launch (blocking)

| # | Item | Current state | Where it's used |
|---|---|---|---|
| 1 | **Phone number:** is (734) 770-7531 correct, and is it the number customers should call? Can it receive texts? | Taken from the public Facebook listing | Header, every CTA, schema, mobile call bar |
| 2 | **Services:** confirm each of the seven services is offered. Anything to add or remove? | Kitchen, bathroom, basement, hardwood flooring, finish carpentry/crown molding, decks, additions (from the Facebook listing) | Service pages, nav, form options |
| 3 | **Service area:** which cities and townships do you take work in? (e.g. Frenchtown Twp, Monroe Twp, LaSalle, Carleton, Dundee, Temperance/Bedford, Newport) | Only Monroe is listed | Service-area page, schema `areaServed`, footer |
| 4 | **Estimate process:** do the four steps on the site match how you work? Are site visits and estimates free? (If so, we'll say "free estimates", which helps conversions.) | Neutral wording, no "free" claim | Homepage, About, Contact |
| 5 | **Where leads should go:** which email address(es) should receive estimate requests? | Netlify Forms is built in; the notification email gets set in the Netlify dashboard | Form notifications |
| 6 | **Domain:** which domain will the site live on? | Assumed `mannshomeimprovement.com` | Canonicals, sitemap, schema |

## 2. High-impact trust signals (add as soon as possible)

| Item | Why it matters |
|---|---|
| **Michigan LARA license number** (residential builder or maintenance & alteration) | Michigan requires a license for most residential work over $600, and homeowners check. It shows in the footer and can be mentioned on service pages. |
| **Proof of insurance** (yes/no, and the general liability carrier if you're comfortable sharing) | "Licensed and insured" is the trust line people look for most |
| **Year founded / years in business** | Shown on About and in schema |
| **Owner name, photo, and a short story** (how you got started, trade background) | Turns the About page from a company description into a person homeowners can trust |
| **Customer reviews** you're comfortable publishing (Facebook recommendations, Google reviews, texts or emails from happy customers), with the customer's permission and first name + town | Testimonials section. No reviews are on the site now, and none will be made up. |
| **Warranty on workmanship**, if you offer one | Only stated if real |

## 3. Photos (the biggest visual upgrade)

The site uses line drawings in place of photos. That was deliberate, so stock photos aren't passed off as your work. Real project photos will lift it considerably.

- **10–30 photos of completed projects**: kitchens, bathrooms, trim work, floors, decks. The originals from your phone are best, not screenshots or Facebook downloads (Facebook compresses them heavily).
- Before/after pairs, if you have them.
- 1–2 photos of you on a job site, for the About page.
- For each project: type of work, town, and a sentence about what was done.

Easiest way to get them over: a shared Google Drive or Dropbox folder.

## 4. Optional

- Business hours (if you want them shown)
- A public email address
- Logo, if you have one (the site uses a simple "M" roofline mark that can be replaced)
- Google Business Profile: set one up or confirm you have one (see SEO-STRATEGY.md)
- GA4 and Search Console access (we can set these up)
