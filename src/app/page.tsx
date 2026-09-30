import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServiceCards from "@/components/sections/ServiceCards";
import PortfolioExplorer, {
  type PortfolioItemData,
} from "@/components/sections/PortfolioExplorer";
import FeaturedArtist, {
  type FeaturedArtistData,
} from "@/components/sections/FeaturedArtist";
import TestimonialsSwiper, {
  type TestimonialData,
} from "@/components/sections/TestimonialsSwiper";
import CTASection from "@/components/sections/CTASection";
import { pexels } from "@/lib/site";
import { HOME_PRIMARY_SERVICES } from "@/lib/services";

const HOME_FILTERS = ["all", "permanent-tattoos", "piercing"];

const HOME_FILTER_LABELS: Record<string, string> = {
  "permanent-tattoos": "Permanent Tattoos",
  piercing: "Piercing",
};

const HOME_WORK: PortfolioItemData[] = [
  { image: pexels(1304469, 800), alt: "Realism permanent tattoo", title: "Lion Portrait", meta: "Realism", category: "permanent-tattoos" },
  { image: pexels(6593483, 600), alt: "Blackwork permanent tattoo", title: "Geometric Wolf", meta: "Blackwork", category: "permanent-tattoos" },
  { image: pexels(35172671, 600), alt: "Colour permanent tattoo", title: "Classic Rose", meta: "Colour", category: "permanent-tattoos" },
  { image: pexels(39842853, 600), alt: "Septum piercing", title: "Septum Piercing", meta: "Septum", category: "piercing" },
  { image: pexels(18491011, 600), alt: "Belly piercing", title: "Belly Piercing", meta: "Belly", category: "piercing" },
  { image: pexels(36587163, 600), alt: "Industrial piercing", title: "Industrial Piercing", meta: "Industrial", category: "piercing" },
];

const FEATURED_ARTIST: FeaturedArtistData = {
  name: "Marcus Chen",
  role: "Founder",
  specialty: "Founder & Lead Artist — Realism, Black & Grey",
  image: pexels(20519299, 900),
  imageAlt: "Marcus Chen, founder and lead artist",
  bio: [
    "Marcus has spent over a decade refining a single craft: permanent tattooing. Working almost entirely in realism and black & grey, he treats skin as a canvas and light as the medium — building depth with nothing but shadow, negative space and an instinct for anatomy.",
    "Every piece begins the same way, in a free consultation. Marcus sketches until the idea on the page matches the idea behind your eyes, then talks you through placement, scale and session length honestly — including when a design needs less than you had in mind.",
  ],
  stats: [
    { value: "12+", label: "Years Behind The Needle" },
    { value: "900+", label: "Permanent Pieces" },
    { value: "6", label: "Industry Awards" },
  ],
  socials: [
    ["fa-instagram", "Instagram"],
    ["fa-twitter", "Twitter"],
    ["fa-pinterest", "Pinterest"],
  ],
};

const TESTIMONIALS: TestimonialData[] = [
  {
    stars: "★★★★★",
    text: '"Absolutely incredible work. The level of detail and artistry is unmatched. I came in with a vague idea and left with a masterpiece that exceeds every expectation."',
    name: "David Mitchell",
    title: "Full Sleeve Realism",
    avatar: pexels(15130380, 120),
  },
  {
    stars: "★★★★★",
    text: '"The studio atmosphere is incredible — clean, professional, and genuinely artistic. Sofia’s black and grey work is phenomenal. I’m already planning my next piece."',
    name: "Emma Watson",
    title: "Black & Grey Portrait",
    avatar: pexels(1304469, 120),
  },
  {
    stars: "★★★★★",
    text: '"I traveled over 200 miles to get tattooed here, and it was worth every mile. Marcus is a true artist. The consultation process was thorough and the result is breathtaking."',
    name: "Alex Rivera",
    title: "Japanese Full Back",
    avatar: pexels(6593483, 120),
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />

      <ServiceCards services={HOME_PRIMARY_SERVICES} gridClassName="services-grid--two" />

      <PortfolioExplorer
        items={HOME_WORK}
        filters={HOME_FILTERS}
        filterLabels={HOME_FILTER_LABELS}
        variant="home"
        label="Our Portfolio"
        title={
          <>
            Featured <span className="gradient-text">Work</span>
          </>
        }
      />

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal">
            <span className="section-label">Meet The Team</span>
            <h2 className="section-title">
              Our <span className="gradient-text">Artist</span>
            </h2>
            <p className="section-subtitle">
              One master artist, a singular standard. Fifteen years of permanent work
              taught him that fewer, better pieces outlast a wall of forgettable ink.
            </p>
          </div>
          <FeaturedArtist artist={FEATURED_ARTIST} />
        </div>
      </section>

      <TestimonialsSwiper items={TESTIMONIALS} />

      <CTASection
        image={pexels(35172671, 1920)}
        imageAlt="Tattoo Equipment"
        title={
          <>
            Ready For Your Next <span className="gradient-text">Masterpiece</span>?
          </>
        }
        desc="Your vision deserves the highest level of artistry. Book a consultation with our award-winning team and let's create something extraordinary together."
        ctaHref="tel:9876543210"
        ctaLabel="Call Now"
      />
    </>
  );
}
