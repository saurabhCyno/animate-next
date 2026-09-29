import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PortfolioExplorer, {
  type PortfolioItemData,
} from "@/components/sections/PortfolioExplorer";
import HorizontalScroll, { type HorizontalItem } from "@/components/sections/HorizontalScroll";
import CompareSection from "@/components/sections/CompareSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Work | Inkspiration",
  description:
    "Browse the Inkspiration portfolio — realism, blackwork, traditional, Japanese, geometric, fine line and color work.",
};

const FILTERS = [
  "all",
  "blackwork",
  "realism",
  "traditional",
  "japanese",
  "geometric",
  "fine-line",
  "color",
];

const WORK: PortfolioItemData[] = [
  { image: "https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Realism Tattoo", title: "Lion Portrait", meta: "Realism · 8 hours", category: "realism" },
  { image: "https://images.pexels.com/photos/6593483/pexels-photo-6593483.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Blackwork Tattoo", title: "Geometric Wolf", meta: "Blackwork · 6 hours", category: "blackwork", span: "wide" },
  { image: "https://images.pexels.com/photos/35172671/pexels-photo-35172671.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Traditional Tattoo", title: "Classic Rose", meta: "Traditional · 4 hours", category: "traditional", span: "tall" },
  { image: "https://images.pexels.com/photos/32225187/pexels-photo-32225187.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Japanese Tattoo", title: "Koi Dragon", meta: "Japanese · 12 hours", category: "japanese" },
  { image: "https://images.pexels.com/photos/18078748/pexels-photo-18078748.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Fine Line Tattoo", title: "Botanical Study", meta: "Fine Line · 3 hours", category: "fine-line" },
  { image: "https://images.pexels.com/photos/4121065/pexels-photo-4121065.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Geometric Tattoo", title: "Sacred Geometry", meta: "Geometric · 5 hours", category: "geometric" },
  { image: "https://images.pexels.com/photos/10552040/pexels-photo-10552040.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Color Tattoo", title: "Vibrant Koi", meta: "Color · 10 hours", category: "color" },
  { image: "https://images.pexels.com/photos/7147780/pexels-photo-7147780.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Realism Portrait", title: "Marilyn Monroe", meta: "Realism · 14 hours", category: "realism" },
  { image: "https://images.pexels.com/photos/13765704/pexels-photo-13765704.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Blackwork Design", title: "Mandalas", meta: "Blackwork · 4 hours", category: "blackwork" },
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
