"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const cursorEnter = () => document.body.classList.add("cursor-hover");
const cursorLeave = () => document.body.classList.remove("cursor-hover");

/**
 * Port of the original `CustomCursor` class (js/main.js).
 * The pointer follower runs once; hover-target binding is re-run on every
 * route change because the static site re-executed main.js per page load.
 */
export default function CustomCursor() {
  const pathname = usePathname();

  useEffect(() => {
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;

    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const speed = 0.15;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };

    document.addEventListener("mousemove", onMove);

    const animate = () => {
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;
      ring.style.left = pos.x + "px";
      ring.style.top = pos.y + "px";
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      "a, button, .service-card, .portfolio-item, .artist-card, .filter-btn, .portfolio-page-item",
    );
    targets.forEach((el) => {
      el.addEventListener("mouseenter", cursorEnter);
      el.addEventListener("mouseleave", cursorLeave);
    });
    return () => {
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", cursorEnter);
        el.removeEventListener("mouseleave", cursorLeave);
      });
      document.body.classList.remove("cursor-hover");
    };
  }, [pathname]);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor-dot" />
      <div className="cursor-ring" />
    </div>
  );
}
