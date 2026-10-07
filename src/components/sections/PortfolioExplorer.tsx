"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLightbox } from "@/components/chrome/LightboxProvider";

/** Portfolio media is stills or clips; the lightbox picks a viewer off the same field. */
export type MediaType = "image" | "video";

export type PortfolioItemData = {
  /** Servable path under `/images` or `/videos` — also the lightbox `src`. */
  image: string;
  type: MediaType;
  alt: string;
  title: string;
  /** Page grid renders "Realism · 8 hours"; home grid renders just "Realism". */
  meta: string;
  category: string;
  /** `wide` / `tall` are only used by the portfolio page grid. */
  span?: "wide" | "tall";
  /** Escape hatch for the one-off inline grid spans used on the sub-page. */
  style?: CSSProperties;
};

type Props = {
  items: PortfolioItemData[];
  /** Omit to render the plain heading with no filter bar (custom-tattoos page). */
  filters?: string[];
  /** Maps a filter value to its visible label, e.g. `permanent-tattoos` -> `Permanent Tattoos`. */
  filterLabels?: Record<string, string>;
  variant: "home" | "page";
  label: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Some galleries in the source have no item overlay at all. */
  overlay?: boolean;
  sectionClassName?: string;
  headerStyle?: CSSProperties;
  /**
   * Paginate the grid: one page holds this many items of the current filter.
   * Omit for galleries that render in full (permanent-tattoo page). Controls
   * only appear once a filter holds more than one page.
   */
  perPage?: number;
};

/**
 * Port of the `PortfolioFilter` + `Lightbox` classes (js/main.js).
 *
 * `variant` switches between the home `.portfolio-grid` overlay markup and the
 * `.portfolio-page-grid` markup used on /our-work.
 */
export default function PortfolioExplorer({
  items,
  filters,
  filterLabels,
  variant,
  label,
  title,
  subtitle,
  overlay = true,
  sectionClassName,
  headerStyle,
  perPage,
}: Props) {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const settled = useRef(false);
  const { register, open } = useLightbox();

  useEffect(() => {
    register(items.map((item) => item.image));
  }, [items, register]);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [filter, items],
  );

  const pageCount = perPage ? Math.max(1, Math.ceil(visible.length / perPage)) : 1;
  const currentPage = Math.min(Math.max(page, 1), pageCount);
  const pageItems =
    pageCount > 1 && perPage
      ? visible.slice((currentPage - 1) * perPage, currentPage * perPage)
      : visible;

  // Swapping pages resizes the document, so pins and scrubs below the grid are
  // re-measured; and a shorter page can drop the section header off-screen, in
  // which case jump back to it (instant — Lenis owns the scroll position).
  // Skipped on mount, where GsapEffects has not necessarily run yet.
  useEffect(() => {
    if (!settled.current) {
      settled.current = true;
      return;
    }
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
    const section = sectionRef.current;
    if (section && section.getBoundingClientRect().top < 0) {
      section.scrollIntoView({ block: "start" });
    }
  }, [filter, currentPage]);

  const gridClass = variant === "home" ? "portfolio-grid" : "portfolio-page-grid";
  const itemClass = variant === "home" ? "portfolio-item" : "portfolio-page-item";
  const sectionClasses = (
    variant === "home" ? "section" : "section portfolio-hero"
  ).concat(sectionClassName ? ` ${sectionClassName}` : "");

  const heading = (
    <>
      <span className="section-label">{label}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </>
  );

  return (
    <section className={sectionClasses} ref={sectionRef}>
      <div className="container">
        {filters ? (
          <div className="portfolio-header reveal">
            <div>
              <span className="section-label">{label}</span>
              <h2 className="section-title">{title}</h2>
            </div>
            <div className="portfolio-filters">
              {filters.map((f) => (
                <button
                  className={`filter-btn${filter === f ? " active" : ""}`}
                  data-filter={f}
                  key={f}
                  onClick={() => {
                    setFilter(f);
                    setPage(1);
                  }}
                >
                  {f === "all" ? "All" : filterLabels?.[f] ?? f}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="reveal" style={headerStyle}>
            {heading}
          </div>
        )}

        <div className={gridClass}>
          {pageItems.length === 0 ? (
            <p className="portfolio-empty">No work in this category yet.</p>
          ) : null}
          {pageItems.map((item) => {
            const index = items.indexOf(item);
            return (
              <div
                className={`${itemClass}${item.span ? ` ${item.span}` : ""}`}
                data-category={item.category}
                style={item.style}
                key={item.image}
                onClick={() => open(index)}
              >
                {item.type === "video" ? (
                  <video
                    src={item.image}
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={item.alt}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={item.alt} />
                )}
                {item.type === "video" ? (
                  <span className="portfolio-play" aria-hidden="true">
                    <i className="fas fa-play" />
                  </span>
                ) : null}
                {overlay &&
                  (variant === "home" ? (
                    <div className="portfolio-item-overlay">
                      <h3 className="portfolio-item-title">{item.title}</h3>
                      <span className="portfolio-item-category">{item.meta}</span>
                    </div>
                  ) : (
                    <div className="overlay">
                      <h3>{item.title}</h3>
                      <span>{item.meta}</span>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>

        {pageCount > 1 ? (
          <nav className="portfolio-pagination" aria-label="Gallery pages">
            <button
              type="button"
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              aria-label="Previous page"
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
              <button
                type="button"
                className={`page-btn${n === currentPage ? " active" : ""}`}
                key={n}
                onClick={() => setPage(n)}
                aria-current={n === currentPage ? "page" : undefined}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className="page-btn"
              disabled={currentPage === pageCount}
              onClick={() => setPage(currentPage + 1)}
              aria-label="Next page"
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
