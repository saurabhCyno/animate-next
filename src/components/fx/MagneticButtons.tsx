"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Port of the original `MagneticButtons` class (js/main.js). */
export default function MagneticButtons() {
  const pathname = usePathname();

  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic-wrap");

    const onMove = (e: MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      (e.currentTarget as HTMLElement).style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const onLeave = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
    };

    buttons.forEach((btn) => {
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
    });

    return () => {
      buttons.forEach((btn) => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
        btn.style.transform = "";
      });
    };
  }, [pathname]);

  return null;
}
