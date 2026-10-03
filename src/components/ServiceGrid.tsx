import Link from "next/link";
import { services } from "@/content/services";
import { ServiceIcon } from "./Illustrations";
import { ArrowIcon } from "./Icons";

export function ServiceGrid({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <ul className="services-grid">
      {services.map((s, i) => (
        <li key={s.slug} className="service-card">
          <span className="service-card__num">{String(i + 1).padStart(2, "0")}</span>
          <ServiceIcon name={s.illustration} className="service-card__icon" />
          <div>
            <H>
              <Link href={`/services/${s.slug}`}>{s.name}</Link>
            </H>
            <p className="mt-4">{s.summary}</p>
          </div>
          <span className="service-card__more" aria-hidden="true">
            Learn about {s.short.toLowerCase()} <ArrowIcon />
          </span>
        </li>
      ))}
      <li className="service-card service-card--cta">
        <span className="service-card__num">Not listed?</span>
        <div>
          <H>
            <Link href="/contact" data-track="estimate_cta" data-track-location="service_grid">
              Something else around the house
            </Link>
          </H>
          <p className="mt-4">Describe the project in the estimate form and we&rsquo;ll tell you honestly whether it&rsquo;s a fit.</p>
        </div>
        <span className="service-card__more" aria-hidden="true">
          Request an estimate <ArrowIcon />
        </span>
      </li>
    </ul>
  );
}
