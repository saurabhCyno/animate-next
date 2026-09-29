"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Port of the original `CounterAnimation` class (js/main.js). */
export default function CounterAnimation() {
  const pathname = usePathname();

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>(".stat-number");
    if (!counters.length) return;

    const animated = new Set<Element>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.has(entry.target)) {
            animated.add(entry.target);
            animateCounter(entry.target as HTMLElement);
          }
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((counter) => observer.observe(counter));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

function animateCounter(el: HTMLElement) {
  const target = parseInt(el.getAttribute("data-target") ?? "", 10) || 0;
  const suffix = el.getAttribute("data-suffix") ?? "+";
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * eased);
    el.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  };

  requestAnimationFrame(update);
}
