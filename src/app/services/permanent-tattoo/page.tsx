import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import MissionGrid from "@/components/sections/MissionGrid";
import PricingGrid from "@/components/sections/PricingGrid";
import RateCard from "@/components/sections/RateCard";
import FaqList from "@/components/sections/FaqList";
import CTASection from "@/components/sections/CTASection";
import PortfolioExplorer from "@/components/sections/PortfolioExplorer";
import { pexels } from "@/lib/site";
import {
  TATTOO_FAQS,
  TATTOO_OVERVIEW,
  TATTOO_PRICING,
  TATTOO_PROCESS,
  TATTOO_SIZE_TIERS,
} from "@/lib/services";
import { TATTOO_MEDIA } from "@/lib/gallery";

/** Gallery order puts stills before clips, so these are the first of each. */
const TATTOO_VIDEO = TATTOO_MEDIA.find((item) => item.type === "video");
const TATTOO_POSTER = TATTOO_MEDIA.find((item) => item.type === "image");

export const metadata: Metadata = {
  title: "Permanent Tattoo | Inkspiration",
  description:
    "Permanent tattoo at Inkspiration — a flat ₹800 per inch, our six-step custom process, the styles we specialise in, and aftercare support.",
};

const COMPARE = [
  {
    label: "Industry Standard",
    labelStyle: { background: "rgba(0,0,0,0.7)" },
    image: pexels(18078748, 800),
    alt: "Industry Standard",
  },
  {
    label: "Inkspiration Difference",
    labelStyle: { background: "rgba(212,160,23,0.85)" },
    image: pexels(19548529, 800),
    alt: "Inkspiration Difference",
  },
];

const DIFFERENCES = [
  [
    {
      icon: "fa-award",
      title: "Award-Winning Artists",
      text: "Our team has won multiple industry awards for design and execution.",
    },
    {
      icon: "fa-shield-alt",
      title: "Medical-Grade Sterilisation",
      text: "Autoclave-sterilised equipment with single-use needles and weekly spore testing.",
    },
    {
      icon: "fa-ruler-combined",
      title: "One Flat Rate",
      text: `${TATTOO_PRICING.rateLabel} per inch of design, whatever the style. No hourly surprises.`,
    },
    {
      icon: "fa-smile",
      title: "100% Satisfaction",
      text: "Unlimited revisions during design and a complimentary touch-up after healing.",
    },
  ],
  [
    {
      icon: "fa-clock",
      title: "Flexible Scheduling",
      text: "We work around your availability, including weekends and evening appointments.",
    },
    {
      icon: "fa-hand-holding-heart",
      title: "Personalised Experience",
      text: "Private studio rooms with your choice of music and atmosphere.",
    },
    {
      icon: "fa-file-invoice",
      title: "Quoted Before We Start",
      text: "You approve the final measurement and price before a single line is tattooed.",
    },
    {
      icon: "fa-infinity",
      title: "Lifetime Support",
      text: "We are here long after your tattoo heals — questions, touch-ups, everything.",
    },
  ],
] as const;

const COMPARE_LABEL_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 20,
  left: 20,
  padding: "8px 16px",
  fontSize: "0.7rem",
  letterSpacing: "2px",
  textTransform: "uppercase",
  borderRadius: 2,
};

const COMPARE_IMG_STYLE: React.CSSProperties = {
  width: "100%",
  height: 400,
  objectFit: "cover",
  display: "block",
};

const CHECK_LIST_STYLE: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const CHECK_ICON_STYLE: React.CSSProperties = {
  color: "var(--accent-gold)",
  fontSize: "1.4rem",
  marginTop: 2,
};

export default function PermanentTattooPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Permanent <span className="gradient-text">Tattoo</span>
          </>
        }
        breadcrumb={
          <>
            Home / <a href="/services">Services</a> / <span>Permanent Tattoo</span>
          </>
        }
        videoSrc="/videos/permanent-tattoos/The Real Gangsta Tattoo.mp4"
        poster={pexels(37023014, 1920)}
      />

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="about-preview" style={{ alignItems: "center" }}>
            <div className="about-content reveal-left">
              <span className="section-label">Bespoke Artwork</span>
              <h2 className="section-title">
                Designed <span className="gradient-text">For You</span>
              </h2>
              {TATTOO_OVERVIEW.map((text) => (
                <p className="about-text" key={text}>
                  {text}
                </p>
              ))}
            </div>
            <div className="about-image-wrapper reveal-right">
              {/* First tattoo clip in the media library; a still stands in as the
                  poster so the section never opens on a black box. */}
              <video
                src={TATTOO_VIDEO?.image}
                poster={TATTOO_POSTER?.image}
                autoPlay
                muted
                loop
                playsInline
                aria-label={TATTOO_VIDEO?.alt ?? "Permanent tattoo in progress"}
                style={{ width: "100%", borderRadius: 4, display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The headline rate */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center" }}>
            <span className="section-label">Investment</span>
            <h2 className="section-title">
              One Rate, <span className="gradient-text">Every Inch</span>
            </h2>
          </div>

          <RateCard
            label="Permanent tattoo, all styles"
            amount={TATTOO_PRICING.rateLabel}
            unit={TATTOO_PRICING.unitLabel}
            note={TATTOO_PRICING.blurb}
          />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">Size Guide</span>
            <h2 className="section-title">
              What It <span className="gradient-text">Works Out At</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              The same per-inch rate, applied to the size of your design. The final figure is
              confirmed once the stencil is on your skin.
            </p>
          </div>

          <PricingGrid plans={TATTOO_SIZE_TIERS} className="pricing-grid--four" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">How It Works</span>
            <h2 className="section-title">
              Our Design <span className="gradient-text">Process</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              From concept to completion, we ensure every detail is right.
            </p>
          </div>

          <MissionGrid items={TATTOO_PROCESS} />
        </div>
      </section>

      {/* <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">Styles</span>
            <h2 className="section-title">
              What We <span className="gradient-text">Specialise In</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              All priced at the same {TATTOO_PRICING.rateLabel} per inch. Pick the style that fits
              your idea.
            </p>
          </div>

          <MissionGrid items={TATTOO_STYLES} />
        </div>
      </section> */}

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">Why Inkspiration</span>
            <h2 className="section-title">
              What Sets Us <span className="gradient-text">Apart</span>
            </h2>
          </div>

          <div className="compare-container">
            <div
              className="compare-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 60,
                marginTop: 60,
              }}
            >
              {COMPARE.map((item) => (
                <div
                  className="compare-item"
                  key={item.label}
                  style={{ position: "relative", overflow: "hidden", borderRadius: 4 }}
                >
                  <span
                    className="compare-label"
                    style={{ ...COMPARE_LABEL_STYLE, ...item.labelStyle }}
                  >
                    {item.label}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.alt} style={COMPARE_IMG_STYLE} />
                </div>
              ))}
            </div>
          </div>

          <div className="about-preview" style={{ marginTop: 60, gap: 60 }}>
            {DIFFERENCES.map((column, i) => (
              <div className="about-content" key={i}>
                <ul style={CHECK_LIST_STYLE}>
                  {column.map((entry) => (
                    <li
                      key={entry.title}
                      style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                    >
                      <i className={`fas ${entry.icon}`} style={CHECK_ICON_STYLE} />
                      <div>
                        <strong style={{ color: "var(--text-primary)" }}>{entry.title}</strong>
                        <br />
                        <span style={{ color: "var(--text-secondary)" }}>{entry.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioExplorer
        items={TATTOO_MEDIA}
        variant="home"
        overlay={false}
        label="Portfolio"
        title={
          <>
            Permanent <span className="gradient-text">Work</span>
          </>
        }
        subtitle="A selection of our recent permanent tattoo projects."
        headerStyle={{ textAlign: "center", marginBottom: 60 }}
      />

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Permanent Tattoo <span className="gradient-text">FAQs</span>
            </h2>
          </div>

          <FaqList items={TATTOO_FAQS} />
        </div>
      </section>

      <CTASection
        image={pexels(20519299, 1920)}
        imageAlt="Tattoo art"
        title={
          <>
            Start Your <span className="gradient-text">Permanent Piece</span>
          </>
        }
        desc={`Bespoke artwork at ${TATTOO_PRICING.rateLabel} per inch. Book a consultation with our artists and let's create something extraordinary together.`}
        ctaHref="tel:9045538809"
        ctaLabel="Call Now"
      />
    </>
  );
}
