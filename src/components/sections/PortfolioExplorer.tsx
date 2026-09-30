"use client";

import { useEffect, useMemo, useState, type ReactNode, type CSSProperties } from "react";
import { useLightbox } from "@/components/chrome/LightboxProvider";

export type PortfolioItemData = {
  image: string;
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
}: Props) {
  const [filter, setFilter] = useState("all");
  const { register, open } = useLightbox();

  useEffect(() => {
    register(items.map((item) => item.image));
  }, [items, register]);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [filter, items],
  );

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
    <section className={sectionClasses}>
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
                  onClick={() => setFilter(f)}
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
          {visible.map((item) => {
            const index = items.indexOf(item);
            return (
              <div
                className={`${itemClass}${item.span ? ` ${item.span}` : ""}`}
                data-category={item.category}
                style={item.style}
                key={item.title}
                onClick={() => open(index)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.alt} />
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
      </div>
    </section>
  );
}
