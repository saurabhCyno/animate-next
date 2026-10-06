"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LightboxContextValue = {
  /** Publish the page's gallery sources so prev/next can cycle through them. */
  register: (sources: string[]) => void;
  open: (index: number) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

/**
 * The gallery registers bare paths, so the extension is what tells us whether a
 * slide is a still to show or a clip to play. `gallery.ts` is server-only, so
 * this cannot import the media type from there.
 */
const VIDEO_PATTERN = /\.(mp4|webm|mov|m4v|ogv)$/i;

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return ctx;
}

/** Port of the original `Lightbox` class (js/main.js). */
export default function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(false);

  const register = useCallback((sources: string[]) => {
    setItems(sources);
    setCurrentIndex(0);
  }, []);

  const close = useCallback(() => {
    setActive(false);
    document.body.style.overflow = "";
  }, []);

  const open = useCallback(
    (index: number) => {
      if (items.length === 0) return;
      setCurrentIndex(index);
      setActive(true);
      document.body.style.overflow = "hidden";
    },
    [items.length],
  );

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, close, prev, next]);

  const value = useMemo(() => ({ register, open }), [register, open]);
  const current = items[currentIndex];

  return (
    <LightboxContext.Provider value={value}>
      {children}

      <div
        id="lightbox"
        className={`lightbox${active ? " active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <span className="lightbox-close" onClick={close}>
          &times;
        </span>
        <span className="lightbox-prev" onClick={prev}>
          &#10094;
        </span>
        <span className="lightbox-next" onClick={next}>
          &#10095;
        </span>
        {/* Rendered only while open, so a clip is unmounted — and stops playing —
            the moment the lightbox closes. */}
        {active && current ? (
          VIDEO_PATTERN.test(current) ? (
            <video src={current} controls autoPlay playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img id="lightbox-img" src={current} alt="" />
          )
        ) : null}
      </div>
    </LightboxContext.Provider>
  );
}
