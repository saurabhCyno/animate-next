"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS, PHONE_HREF } from "@/lib/site";

function isActive(href: string, pathname: string): boolean {
  if (href === pathname) return true;
  return pathname.startsWith(`${href}/`);
}

/**
 * Port of the original `Navigation` class plus the hardcoded `active` class
 * that `ActiveNav` (js/main.js) re-applied on load.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Storing the route the menu was opened on makes it self-close on navigation
  // without a setState-in-effect.
  const [menuRoute, setMenuRoute] = useState<string | null>(null);
  const open = menuRoute === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const close = useCallback(() => setMenuRoute(null), []);
  const toggle = useCallback(() => setMenuRoute(pathname), [pathname]);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="nav-logo">
          Inkspiration
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${isActive(link.href, pathname) ? " active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <a href={PHONE_HREF} className="nav-cta">
            Call Now
          </a>
        </div>

        <div
          className={`nav-toggle${open ? " active" : ""}`}
          onClick={toggle}
          role="button"
          tabIndex={0}
          aria-label="Toggle menu"
          aria-expanded={open}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggle();
            }
          }}
        >
          <span />
          <span />
          <span />
        </div>
      </nav>

      <div className={`mobile-menu${open ? " active" : ""}`}>
        <button className="mobile-menu-close" aria-label="Close menu" onClick={close}>
          &times;
        </button>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link${isActive(link.href, pathname) ? " active" : ""}`}
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
        <a href={PHONE_HREF} className="nav-cta">
          Call Now
        </a>
      </div>
    </>
  );
}
