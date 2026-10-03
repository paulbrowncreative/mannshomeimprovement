import Link from "next/link";
import { mainNav, site, serviceAreas } from "@/content/site";
import { services } from "@/content/services";
import { Brand } from "./Header";
import { FacebookIcon } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-about">
          <Brand />
          <p>
            Home improvement in {site.location.city}, {site.location.regionName} — focused on {site.specialty}.
          </p>
          <a className="footer-phone" href={`tel:${site.phone.e164}`} data-track-location="footer">
            {site.phone.display}
          </a>
          {site.email && (
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          )}
        </div>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company">
          <h2 id="footer-company">Company</h2>
          <ul>
            {mainNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2>Service area</h2>
          <ul>
            {serviceAreas
              .filter((a) => a.confirmed)
              .map((a) => (
                <li key={a.name}>
                  {a.name}, {site.location.region}
                </li>
              ))}
            <li>
              <Link href="/service-areas">Nearby? Ask us</Link>
            </li>
          </ul>
          <h2 className="mt-6">Follow</h2>
          <ul>
            <li>
              <a href={site.social.facebook} rel="noopener" target="_blank">
                <FacebookIcon className="" />
                <span style={{ marginLeft: 6 }}>Facebook</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {year} {site.name}. All rights reserved.
        </span>
        {site.licenseNumber && <span>Michigan license #{site.licenseNumber}</span>}
      </div>
    </footer>
  );
}
