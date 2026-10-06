import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import MissionGrid, { type MissionItem } from "@/components/sections/MissionGrid";
import PiercingGrid, { type PiercingGroup } from "@/components/sections/PiercingGrid";
import PiercingDetailList from "@/components/sections/PiercingDetailList";
import FaqList from "@/components/sections/FaqList";
import CTASection from "@/components/sections/CTASection";
import { pexels } from "@/lib/site";
import {
  PIERCINGS,
  PIERCING_CATEGORIES,
  PIERCING_ENTRY_PRICE,
  PIERCING_FAQS,
  PIERCING_INTRO,
  inr,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Piercing | Inkspiration",
  description:
    "Seventeen ear, face and body piercings from ₹350. Ear, facial and body placements performed with a sterile hollow needle, with implant-grade titanium and 14k gold jewellery included.",
};

const GROUPS: PiercingGroup[] = PIERCING_CATEGORIES.map((category) => ({
  id: category.id,
  label: category.label,
  blurb: category.blurb,
  items: PIERCINGS.filter((p) => p.category === category.id),
}));

const STANDARDS: MissionItem[] = [
  {
    icon: "fa-shield-alt",
    title: "Hollow Needles Only",
    text: "Every piercing is performed with a sterile, single-use hollow needle. We never use a piercing gun — guns cannot be autoclaved properly and force the tissue instead of displacing it.",
  },
  {
    icon: "fa-gem",
    title: "Jewellery Included",
    text: `Every listed price covers the procedure plus a pair of jewellery in implant-grade titanium or 14k gold. Prices start from ${inr(PIERCING_ENTRY_PRICE)} and nothing is added at the chair.`,
  },
  {
    icon: "fa-heart",
    title: "Placement, Not A Firing",
    text: "We mark every placement with you in a mirror before we begin, checking your anatomy for symmetry and long-term stability. We will talk you out of a placement if it will not suit you.",
  },
  {
    icon: "fa-user-md",
    title: "Dedicated Piercers",
    text: "Your piercing is performed by a professional who works exclusively in body piercing, not as an add-on between tattoo appointments. A calm environment, no spectators.",
  },
  {
    icon: "fa-print",
    title: "Aftercare Kit",
    text: "You leave with sterile saline, a printed aftercare guide and a written checklist of what is normal and what is not. Free aftercare checks for as long as you are healing.",
  },
  {
    icon: "fa-phone",
    title: "We Are Here Afterwards",
    text: "Swelling, tenderness and a little clear discharge in the first weeks are normal, not infection. If you are ever unsure, message or call us — aftercare advice is always free.",
  },
];

const AFTERCARE: MissionItem[] = [
  {
    icon: "fa-soap",
    title: "Clean, Once A Day",
    text: "Wash with sterile saline or a fragrance-free cleanser, then pat dry with a clean paper towel. Never rub, and never pick at any crust that forms.",
  },
  {
    icon: "fa-hand-sparkles",
    title: "Hands Off",
    text: "Avoid touching, twisting or playing with your jewellery. If you must handle it, wash and dry your hands first — this is the single biggest cause of avoidable infections.",
  },
  {
    icon: "fa-ban",
    title: "Leave It Alone",
    text: "No swimming, baths, saunas or swimming pools until the piercing is fully healed. Keep it out of the sun and avoid sleeping on that side where possible.",
  },
  {
    icon: "fa-calendar-check",
    title: "Keep The Jewellery In",
    text: "Do not change or remove the initial jewellery before the piercing has fully healed. The tunnel needs months to form — early removal is the most common cause of a collapsed hole.",
  },
];

export default function PiercingPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Professional <span className="gradient-text">Piercing</span>
          </>
        }
        breadcrumb={
          <>
            Home / <a href="/services">Services</a> / <span>Piercing</span>
          </>
        }
        videoSrc="/videos/piercing/ear-piercing/Ear Piercing.mp4"
        poster={pexels(4121065, 1920)}
      />

      {/* Intro */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="about-preview" style={{ alignItems: "center" }}>
            <div className="about-content reveal-left">
              <span className="section-label">Every Placement, Priced</span>
              <h2 className="section-title">
                No Guessing. <span className="gradient-text">No Surprises.</span>
              </h2>
              {PIERCING_INTRO.map((text) => (
                <p className="about-text" key={text}>
                  {text}
                </p>
              ))}
            </div>
            <div className="about-image-wrapper reveal-right">
              {/* Local lip-piercing clip; the old still stands in as the poster
                  so the section never opens on a black box. */}
              <video
                src="/videos/piercing/lip-piercing/lip-piercing.mp4"
                poster={pexels(32187703, 800)}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Lip piercing close-up"
                style={{ width: "100%", borderRadius: 4, display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The catalogue */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">The Full Menu</span>
            <h2 className="section-title">
              {PIERCINGS.length} Piercings, <span className="gradient-text">One List</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Every price below is the price you pay — it already includes your jewellery. Grouped
              by where the piercing goes.
            </p>
          </div>

          <PiercingGrid groups={GROUPS} />
        </div>
      </section>

      {/* Full detail per placement */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">In Detail</span>
            <h2 className="section-title">
              What To <span className="gradient-text">Expect</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Healing times, jewellery options and the reasoning behind each placement.
            </p>
          </div>

          <PiercingDetailList items={PIERCINGS} />
        </div>
      </section>

      {/* Standards */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">Our Standards</span>
            <h2 className="section-title">
              How We <span className="gradient-text">Pierce</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              A short list of things we will not compromise on, at any price point.
            </p>
          </div>

          <MissionGrid items={STANDARDS} />
        </div>
      </section>

      {/* Aftercare */}
      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">Aftercare</span>
            <h2 className="section-title">
              Healing <span className="gradient-text">Well</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Four rules that cover almost every problem we are asked about.
            </p>
          </div>

          <MissionGrid items={AFTERCARE} />
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 20 }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Piercing <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <FaqList items={PIERCING_FAQS} />
        </div>
      </section>

      <CTASection
        image={pexels(4121065, 1920)}
        imageAlt="Professional piercing"
        title={
          <>
            Ready to Get <span className="gradient-text">Pierced</span>?
          </>
        }
        desc={`Book a piercing appointment from ${inr(PIERCING_ENTRY_PRICE)}. Every price includes jewellery, an aftercare kit and a free check-up while you heal.`}
        ctaHref="/contact"
        ctaLabel="Book Appointment"
      />
    </>
  );
}
