"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "visible" | "hidden" | "gone";

/**
 * Port of the original `Loader` class (js/main.js).
 *
 * Keying on the pathname remounts the intro on every client-side navigation, so
 * it replays exactly as it did when every navigation was a full document load.
 */
export default function Loader() {
  const pathname = usePathname();
  return <LoaderRun key={pathname} />;
}

function LoaderRun() {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    let progress = 0;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let removeTimer: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        hideTimer = setTimeout(() => setPhase("hidden"), 400);
        removeTimer = setTimeout(() => setPhase("gone"), 1000);
      }
      setPercent(Math.floor(progress));
    }, 200);

    return () => {
      clearInterval(interval);
      if (hideTimer) clearTimeout(hideTimer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div className={`loader${phase === "hidden" ? " hidden" : ""}`} aria-hidden="true">
      <div className="loader-logo">Inkspiration</div>
      <div className="loader-bar">
        <div className="loader-bar-fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="loader-progress">
        <span className="loader-counter">{percent}%</span>
      </div>
    </div>
  );
}
