import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PortfolioExplorer, {
  type PortfolioItemData,
} from "@/components/sections/PortfolioExplorer";
import HorizontalScroll, { type HorizontalItem } from "@/components/sections/HorizontalScroll";
import CompareSection from "@/components/sections/CompareSection";
import CTASection from "@/components/sections/CTASection";
import { pexels } from "@/lib/site";
import { inr } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Work | Inkspiration",
  description:
    "Browse the Inkspiration portfolio — permanent tattoo work and professional piercing across seventeen placements.",
};

const FILTERS = ["all", "permanent-tattoos", "piercing"];

const FILTER_LABELS: Record<string, string> = {
  "permanent-tattoos": "Permanent Tattoos",
  piercing: "Piercing",
};

const WORK: PortfolioItemData[] = [
  { image: pexels(1304469, 800), alt: "Realism tattoo", title: "Lion Portrait", meta: "Realism · 8 hours", category: "permanent-tattoos" },
  { image: pexels(6593483, 800), alt: "Blackwork tattoo", title: "Geometric Wolf", meta: "Blackwork · 6 hours", category: "permanent-tattoos", span: "wide" },
  { image: pexels(35172671, 600), alt: "Traditional colour tattoo", title: "Classic Rose", meta: "Traditional · 4 hours", category: "permanent-tattoos", span: "tall" },
  { image: pexels(32225187, 600), alt: "Japanese tattoo", title: "Koi Dragon", meta: "Japanese · 12 hours", category: "permanent-tattoos" },
  { image: pexels(18078748, 600), alt: "Fine line tattoo", title: "Botanical Study", meta: "Fine Line · 3 hours", category: "permanent-tattoos" },
  { image: pexels(4121065, 600), alt: "Geometric tattoo", title: "Sacred Geometry", meta: "Geometric · 5 hours", category: "permanent-tattoos" },
  { image: pexels(10552040, 600), alt: "Colour tattoo", title: "Vibrant Koi", meta: "Colour · 10 hours", category: "permanent-tattoos" },
  { image: pexels(7147780, 600), alt: "Realism portrait tattoo", title: "Marilyn Monroe", meta: "Realism · 14 hours", category: "permanent-tattoos" },
  { image: pexels(13765704, 600), alt: "Blackwork mandala tattoo", title: "Mandalas", meta: "Blackwork · 4 hours", category: "permanent-tattoos" },
  { image: pexels(39842853, 600), alt: "Septum piercing", title: "Septum Piercing", meta: `Septum · ${inr(1200)}`, category: "piercing" },
  { image: pexels(18491011, 600), alt: "Belly piercing", title: "Belly Piercing", meta: `Belly · ${inr(1400)}`, category: "piercing", span: "wide" },
  { image: pexels(36587163, 600), alt: "Industrial piercing", title: "Industrial Piercing", meta: `Industrial · ${inr(1800)}`, category: "piercing", span: "tall" },
  { image: pexels(9164794, 600), alt: "Nose piercing", title: "Nose Piercing", meta: `Nose · ${inr(600)}`, category: "piercing" },
  { image: pexels(20858257, 600), alt: "Tragus piercing", title: "Tragus Piercing", meta: `Tragus · ${inr(1000)}`, category: "piercing" },
  { image: pexels(7400018, 600), alt: "Standard earlobe piercing", title: "Standard Earlobe", meta: `Earlobe · ${inr(350)}`, category: "piercing" },
  { image: pexels(34041395, 600), alt: "Dermal piercing", title: "Dermal Piercing", meta: `Dermal · ${inr(2500)}`, category: "piercing" },
  { image: pexels(37722196, 600), alt: "Labret piercing", title: "Labret Piercing", meta: `Labret · ${inr(1000)}`, category: "piercing" },
];

const SCROLL_ITEMS: HorizontalItem[] = [
  {
    image: "https://images.pexels.com/photos/15130380/pexels-photo-15130380.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Full Sleeve Realism",
    text: "A cinematic journey through light and shadow",
  },
  {
    image: "https://images.pexels.com/photos/35702114/pexels-photo-35702114.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Japanese Full Back",
    text: "Ancient tradition meets modern technique",
  },
  {
    image: "https://images.pexels.com/photos/20519299/pexels-photo-20519299.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Geometric Patterns",
    text: "Where mathematics becomes art",
  },
  {
    image: "https://images.pexels.com/photos/32225187/pexels-photo-32225187.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Color Masterpiece",
    text: "Vibrant storytelling on skin",
  },
];

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Our <span className="gradient-text">Portfolio</span>
          </>
        }
        breadcrumb={
          <>
            Home / <span>Our Work</span>
          </>
        }
        image="https://images.pexels.com/photos/35172671/pexels-photo-35172671.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Portfolio"
      />

      <PortfolioExplorer
        items={WORK}
        filters={FILTERS}
        filterLabels={FILTER_LABELS}
        variant="page"
        label="Gallery"
        title={
          <>
            Selected <span className="gradient-text">Works</span>
          </>
        }
      />

      <HorizontalScroll items={SCROLL_ITEMS} />

      <CompareSection />

      <CTASection
        image="https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Tattoo Equipment"
        title={
          <>
            Want Art Like <span className="gradient-text">This</span>?
          </>
        }
        desc="Your vision deserves the highest level of artistry. Book a consultation with our award-winning team."
        ctaHref="tel:9876543210"
        ctaLabel="Call Now"
      />
    </>
  );
}
