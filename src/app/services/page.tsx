import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import PricingGrid from "@/components/sections/PricingGrid";
import RateCard from "@/components/sections/RateCard";
import FaqList from "@/components/sections/FaqList";
import CTASection from "@/components/sections/CTASection";
import Button from "@/components/ui/Button";
import { pexels } from "@/lib/site";
import {
  PIERCINGS,
  PIERCING_ENTRY_PRICE,
  SERVICES,
  TATTOO_PRICING,
  TATTOO_SIZE_TIERS,
  inr,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Services | Inkspiration",
  description:
    "Two services, priced in the open — permanent tattoo at a flat ₹800 per inch, and seventeen ear, face and body piercings from ₹350 with jewellery included.",
};

const FAQS = [
  {
    question: "What services do you offer?",
    answer:
      "Two. Permanent tattoo, priced at a flat ₹800 per inch of the final design across every style from fine line to full-colour realism. And body piercing — seventeen ear, face and body placements, each individually priced, with jewellery included in the price.",
  },
  {
    question: "How is a permanent tattoo priced?",
    answer:
      "Every permanent tattoo is charged at ₹800 per inch of the final design. We measure the design on your skin at the stencil stage and confirm the exact figure with you before any work begins. A larger piece is simply the same rate applied over a larger measurement.",
  },
  {
    question: "Is jewellery included with a piercing?",
    answer:
      `Yes. Every listed piercing price covers the procedure plus a pair of jewellery in implant-grade titanium or 14k gold. Placements start from ${inr(
    PIERCING_ENTRY_PRICE,
  )}. If you would like a different piece, we quote the difference up front.`,
  },
  {
    question: "Do you use piercing guns?",
    answer:
      "No. Every piercing is performed with a sterile, single-use hollow needle. Needles are more precise and far cleaner than guns, which cannot be autoclaved properly and force the tissue rather than displacing it.",
  },
  {
    question: "How do I book, and what happens next?",
    answer:
      "Get in touch through the contact page or by phone. We will confirm your placement, quote the exact price, and find a time that suits you. Consultations are free, and there is no obligation to go ahead with the work.",
  },
  {
    question: "Do you offer aftercare support?",
    answer:
      "Always. You leave with an aftercare kit and a printed guide, and you can come back for free check-ups for as long as you are healing. If anything looks wrong in the weeks that follow, contact us — aftercare advice never costs anything.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Our <span className="gradient-text">Services</span>
          </>
        }
        breadcrumb={
          <>
            Home / <span>Services</span>
          </>
        }
        image="/images/permanent-tattoos/shiv-krishna.jpeg"
        imageAlt="Tattoo services"
      />

      {/* The two services */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title">
              Two Services, <span className="gradient-text">Priced In The Open</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              We do two things, and we publish every price. No consultation fees, no hourly
              surprises, no quote that changes once you are in the chair.
            </p>
          </div>

          <div className="services-grid main-services-grid">
            {SERVICES.map((service) => (
              <div className="service-card" key={service.slug} data-bg={service.image}>
                <div className="service-card-icon">
                  <i className={`fas ${service.icon}`} />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <div className="service-card-price">{service.priceLabel}</div>
                <p className="service-card-desc">{service.desc}</p>
                <ul className="service-card-benefits">
                  {service.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
                <Link href={service.href} className="service-card-link">
                  Explore <span className="arrow">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tattoo rate */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center" }}>
            <span className="section-label">Permanent Tattoo</span>
            <h2 className="section-title">
              A Flat <span className="gradient-text">Rate Per Inch</span>
            </h2>
          </div>

          <RateCard
            label="Every style, every artist"
            amount={TATTOO_PRICING.rateLabel}
            unit={TATTOO_PRICING.unitLabel}
            note={TATTOO_PRICING.blurb}
          />
        </div>
      </section>

      {/* Size guide */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">Size Guide</span>
            <h2 className="section-title">
              What It <span className="gradient-text">Works Out At</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              The same rate, applied to the size of your design.
            </p>
          </div>

          <PricingGrid plans={TATTOO_SIZE_TIERS} className="pricing-grid--four" />
        </div>
      </section>

      {/* Piercing snapshot */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">Piercing</span>
            <h2 className="section-title">
              {PIERCINGS.length} Placements, <span className="gradient-text">All Priced</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Jewellery included with every piercing. Here are the six most requested — the full
              menu is on the piercing page.
            </p>
          </div>

          <div className="services-grid">
            {[...PIERCINGS]
              .sort((a, b) => a.price - b.price)
              .slice(0, 6)
              .map((piercing) => (
                <div
                  className="service-card"
                  key={piercing.slug}
                  data-bg={piercing.image}
                >
                  <div className="service-card-icon">
                    <i className={`fas ${piercing.icon}`} />
                  </div>
                  <h3 className="service-card-title">{piercing.name}</h3>
                  <div className="service-card-price">{inr(piercing.price)}</div>
                  <p className="service-card-desc">{piercing.desc}</p>
                  <Link
                    href={`/services/piercing#${piercing.slug}`}
                    className="service-card-link"
                  >
                    Details <span className="arrow">→</span>
                  </Link>
                </div>
              ))}
          </div>

          <div className="reveal" style={{ textAlign: "center", marginTop: 48 }}>
            <Button href="/services/piercing" variant="gold">
              See All {PIERCINGS.length} Piercings
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <FaqList items={FAQS} />
        </div>
      </section>

      <CTASection
        image={pexels(15130380, 1920)}
        imageAlt="Tattoo"
        title={
          <>
            Ready to Start Your <span className="gradient-text">Journey</span>?
          </>
        }
        desc="Book a consultation with our team and let's create something extraordinary together. Consultations are free and you are under no obligation."
        ctaHref="tel:9045538809"
        ctaLabel="Call Now"
      />
    </>
  );
}
