"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, site } from "@/content/site";
import { services } from "@/content/services";
import { PhoneIcon } from "./Icons";

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Brand() {
  return (
    <Link href="/" className="brand">
      {/* Official logo (from the business's Facebook page). Decorative: the name is in the text beside it. */}
      <img
        className="brand__mark"
        src="/images/logo-96.webp"
        srcSet="/images/logo-96.webp 2x, /images/logo-144.webp 3x"
        width={44}
        height={44}
        alt=""
        decoding="async"
      />
      <span className="brand__text">
        <span className="brand__name">Mann&rsquo;s</span>
        <span className="brand__sub">Home Improvement</span>
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Keep keyboard and screen-reader focus inside the open menu.
    const background = document.querySelectorAll<HTMLElement>("#main, .site-footer, .mobile-bar");
    background.forEach((el) => el.setAttribute("inert", ""));
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1000 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      background.forEach((el) => el.removeAttribute("inert"));
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Brand />

        <nav className="nav-desktop" aria-label="Main">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${site.phone.e164}`} data-track-location="header">
            <PhoneIcon />
            {site.phone.display}
          </a>
          <Link href="/contact" className="btn header-cta" data-track="estimate_cta" data-track-location="header">
            Request an Estimate
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="mobile-menu"
        hidden={!open}
        ref={menuRef}
        onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}
      >
        <nav aria-label="Mobile">
          <ul className="mobile-menu__primary">
            <li>
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
                Home
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-menu__services">
            <span className="label">Services</span>
            <ul>
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="mobile-menu__actions">
          <Link href="/contact" className="btn btn--lg btn--block" data-track="estimate_cta" data-track-location="mobile_menu">
            Request an Estimate
          </Link>
          <a href={`tel:${site.phone.e164}`} className="btn btn--outline btn--lg btn--block" data-track-location="mobile_menu">
            <PhoneIcon />
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}
