"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Port of `initServiceCardImages()` from js/main.js. */
export default function ServiceCardBackgrounds() {
  const pathname = usePathname();

  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>(".service-card[data-bg]")
      .forEach((card) => {
        card.style.setProperty("--bg-img", `url(${card.dataset.bg})`);
      });
  }, [pathname]);

  return null;
}
