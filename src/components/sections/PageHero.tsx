import type { ReactNode } from "react";

type PageHeroProps = {
  title: ReactNode;
  breadcrumb: ReactNode;
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  poster?: string;
};

/** Shared `.page-hero` used by about / services / our-work / contact / custom. */
export default function PageHero({
  title,
  breadcrumb,
  image,
  imageAlt = "",
  videoSrc,
  poster,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      {videoSrc ? (
        <video
          className="page-hero-bg"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={imageAlt} className="page-hero-bg parallax-image" />
      )}
      <div className="page-hero-overlay" />
      <div className="page-hero-content reveal">
        <p className="page-hero-breadcrumb">{breadcrumb}</p>
        <h1 className="page-hero-title">{title}</h1>
      </div>
    </section>
  );
}
