import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Crumb = { name: string; href: string };

export function PageHero({
  label,
  title,
  lede,
  crumbs,
  art,
  children,
}: {
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs: Crumb[];
  art?: ReactNode;
  children?: ReactNode;
}) {
  const all = [{ name: "Home", href: "/" }, ...crumbs];
  return (
    <section className={`page-hero${art ? " page-hero--with-art" : ""}`}>
      <JsonLd data={breadcrumbSchema(all)} />
      <div className="container page-hero__inner">
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <ol>
              {all.map((c, i) =>
                i === all.length - 1 ? (
                  <li key={c.href} aria-current="page">
                    {c.name}
                  </li>
                ) : (
                  <li key={c.href}>
                    <Link href={c.href}>{c.name}</Link>
                  </li>
                ),
              )}
            </ol>
          </nav>
          <p className="label mt-6">{label}</p>
          <h1>{title}</h1>
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
        {art && <div className="rise rise-2">{art}</div>}
      </div>
    </section>
  );
}
