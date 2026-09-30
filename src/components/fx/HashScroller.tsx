"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The App Router scrolls to the top on client navigation and ignores the hash,
 * so deep links such as `/services/piercing#nose` land at the top of the page
 * instead of on the requested placement. Scroll them by hand.
 *
 * The jump is instant rather than smooth: Lenis owns the scroll position, and
 * a native smooth scroll fights it.
 */
export default function HashScroller() {
  const pathname = usePathname();

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const jump = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ block: "start" });
    };

    jump();
    // Hot-linked imagery above the target can still be resizing the document.
    const settle = window.setTimeout(jump, 350);
    return () => window.clearTimeout(settle);
  }, [pathname]);

  return null;
}
