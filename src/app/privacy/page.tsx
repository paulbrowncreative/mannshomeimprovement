import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description: `How ${site.name} handles information submitted through this website.`,
  path: "/privacy",
});

const updated = "October 3, 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy policy" lede={`Last updated ${updated}.`} crumbs={[{ name: "Privacy", href: "/privacy" }]} />
      <section className="section">
        <div className="container-narrow prose">
          <h2>What we collect</h2>
          <p>
            When you send an estimate request, we collect what you enter: your name, phone number, email address (if
            provided), town, project type, project description and preferred contact method.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your information only to respond to your request and discuss your project. We do not sell, rent or
            share your information with third parties for marketing.
          </p>
          <p>
            Form submissions are received and stored by our website host, Netlify, which processes them only to deliver
            them to us. They are kept only as long as needed to respond to you.
          </p>
          <h2>Analytics</h2>
          <p>
            This site may use Google Analytics to understand how visitors use it — for example, which pages are viewed
            and whether the estimate form is submitted. Analytics does not receive the contents of the form. If your
            browser sends a Global Privacy Control signal, analytics is not loaded. You can also use Google&rsquo;s{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener">
              opt-out browser add-on
            </a>
            .
          </p>
          <h2>Your choices</h2>
          <p>
            To ask what information we have about you, or to have it deleted, call{" "}
            <a href={`tel:${site.phone.e164}`}>{site.phone.display}</a>
            {site.email ? (
              <>
                {" "}
                or email <a href={`mailto:${site.email}`}>{site.email}</a>
              </>
            ) : null}
            .
          </p>
          <h2>Changes</h2>
          <p>If this policy changes, the updated version will be posted on this page with a new date.</p>
        </div>
      </section>
    </>
  );
}
