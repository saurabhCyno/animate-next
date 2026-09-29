import type { ReactNode } from "react";
import Button, { type ButtonVariant } from "@/components/ui/Button";

type CTASectionProps = {
  image: string;
  imageAlt: string;
  title: ReactNode;
  desc: string;
  ctaHref: string;
  ctaLabel: string;
  variant?: ButtonVariant;
};

/** Shared `.cta-section`; `.cta-bg` is what GSAP parallaxes. */
export default function CTASection({
  image,
  imageAlt,
  title,
  desc,
  ctaHref,
  ctaLabel,
  variant = "primary",
}: CTASectionProps) {
  return (
    <section className="cta-section">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={imageAlt} className="cta-bg" />
      <div className="cta-overlay" />
      <div className="cta-content reveal">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-desc">{desc}</p>
        <Button href={ctaHref} variant={variant}>
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
