import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PortfolioExplorer from "@/components/sections/PortfolioExplorer";
import CompareSection from "@/components/sections/CompareSection";
import CTASection from "@/components/sections/CTASection";
import {
  PORTFOLIO_FILTERS as FILTERS,
  PORTFOLIO_FILTER_LABELS as FILTER_LABELS,
  PORTFOLIO_MEDIA as WORK,
} from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Our Work | Inkspiration",
  description:
    "Browse the Inkspiration portfolio — permanent tattoo work and professional piercing across seventeen placements.",
};

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
