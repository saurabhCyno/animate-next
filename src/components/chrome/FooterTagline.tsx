"use client";

import { usePathname } from "next/navigation";

/**
 * index.html carries an extra sentence in the footer tagline that no other page
 * has, so the tagline has to be route-aware to stay pixel-accurate.
 */
export default function FooterTagline() {
  const pathname = usePathname();
  const suffix = pathname === "/" ? " Where vision meets skin." : "";

  return <p className="footer-desc">Premium tattoo studio crafting timeless art since 2014.{suffix}</p>;
}
