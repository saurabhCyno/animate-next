import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServiceCards from "@/components/sections/ServiceCards";
import PortfolioExplorer from "@/components/sections/PortfolioExplorer";
import FeaturedArtist, {
  type FeaturedArtistData,
} from "@/components/sections/FeaturedArtist";
import TestimonialsSwiper, {
  type TestimonialData,
} from "@/components/sections/TestimonialsSwiper";
import CTASection from "@/components/sections/CTASection";
import { pexels } from "@/lib/site";
import { HOME_PRIMARY_SERVICES } from "@/lib/services";
import {
  PORTFOLIO_FILTERS as HOME_FILTERS,
  PORTFOLIO_FILTER_LABELS as HOME_FILTER_LABELS,
  PORTFOLIO_MEDIA as HOME_WORK,
} from "@/lib/gallery";

const FEATURED_ARTIST: FeaturedArtistData = {
  name: "Karan Bakshi",
  role: "Founder",
  specialty: "Founder & Master Artist — Inkspiration",
  image: '/images/artist/artist-on-duty.jpeg',
  imageAlt: "Karan Bakshi, founder and lead artist",
  bio: [
    "With years of experience behind the machine, Karan Bakshi has built Inkspiration around one belief: great tattooing is where artistry, precision, and individuality come together.",
    "As the founder and master artist, Karan approaches every tattoo as a custom piece of art — carefully considering composition, flow, placement, and the way a design naturally works with the body. From the first concept to the final detail, his focus stays on creating work that feels personal, balanced, and timeless.",
    "Every tattoo begins with a conversation. Karan takes the time to understand your idea, refine the concept, and recommend the right size, placement, and approach for your skin. The goal isn't simply to create a striking tattoo — it's to create a piece that belongs to you."
  ],
  stats: [
    { value: "5+", label: "Years Behind The Needle" },
    { value: "900+", label: "Permanent Pieces" },
    { value: "5+", label: "Industry Recognitions" },
  ],
  socials: [
    ["fa-instagram", "Instagram", "https://www.instagram.com/inkspiration_by_bakshi"],
    ["fa-twitter", "Twitter"],
    ["fa-pinterest", "Pinterest"],
  ],
};

const TESTIMONIALS: TestimonialData[] = [
  {
    stars: "★★★★★",
    text: '"Karan read the brief out of two lines and turned it into the best work I own. Quoted me ₹800 an inch, nothing extra at the chair, and the touch-up two months later was free. What more do you want from a studio?"',
    name: "Rohan Mehta",
    title: "Realism Portrait",
    avatar: pexels(15130380, 120),
  },
  {
    stars: "★★★★★",
    text: '"I came in with a half-formed idea and a fixed budget. The consultation cost nothing, the design came back for revision twice before a single line went in, and the fine linework has barely moved since. The most professional process I have been through."',
    name: "Ananya Iyer",
    title: "Fine Line Piece",
    avatar: pexels(1304469, 120),
  },
  {
    stars: "★★★★★",
    text: '"Got a tragus and a standard earlobe done in one sitting — ₹1,000 and ₹350, jewellery already included. Hollow needle, no gun, and they checked in twice while it was healing. Nobody else has followed up after the appointment."',
    name: "Arjun Nair",
    title: "Tragus & Earlobe Piercing",
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
        perPage={6}
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
              One master artist, a singular standard. Five years of permanent work
              taught him that fewer, better pieces outlast a wall of forgettable ink.
            </p>
          </div>
          <FeaturedArtist artist={FEATURED_ARTIST} />
        </div>
      </section>

      <TestimonialsSwiper items={TESTIMONIALS} />

      <CTASection
        image='/images/artist/tattoo-artist.jpeg'
        imageAlt="Tattoo Equipment"
        title={
          <>
            Ready For Your Next <span className="gradient-text">Masterpiece</span>?
          </>
        }
        desc="Your vision deserves the highest level of artistry. Book a consultation with our award-winning team and let's create something extraordinary together."
        ctaHref="tel:9045538809"
        ctaLabel="Call Now"
      />
    </>
  );
}
