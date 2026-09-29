import Hero from "@/components/sections/Hero";
import AboutPreview from "@/components/sections/AboutPreview";
import ServiceCards, { type ServiceCardData } from "@/components/sections/ServiceCards";
import PortfolioExplorer, {
  type PortfolioItemData,
} from "@/components/sections/PortfolioExplorer";
import ArtistsGrid, { type ArtistData } from "@/components/sections/ArtistsGrid";
import TestimonialsSwiper, {
  type TestimonialData,
} from "@/components/sections/TestimonialsSwiper";
import CTASection from "@/components/sections/CTASection";

const SERVICES: ServiceCardData[] = [
  {
    icon: "fa-pen-nib",
    title: "Custom Tattoos",
    desc: "Unique designs crafted from your vision. Every line tells a story.",
    href: "/services",
    image: "https://images.pexels.com/photos/37023014/pexels-photo-37023014.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: "fa-camera",
    title: "Realism",
    desc: "Photographic precision that captures every detail and emotion.",
    href: "/services",
    image: "https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: "fa-droplet",
    title: "Black & Grey",
    desc: "Timeless monochromatic art with stunning depth and contrast.",
    href: "/services",
    image: "https://images.pexels.com/photos/6593483/pexels-photo-6593483.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: "fa-palette",
    title: "Color Tattoos",
    desc: "Vibrant, bold colors that stand the test of time.",
    href: "/services",
    image: "https://images.pexels.com/photos/10552040/pexels-photo-10552040.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: "fa-circle",
    title: "Piercings",
    desc: "Professional body piercing with the highest safety standards.",
    href: "/services",
    image: "https://images.pexels.com/photos/4121065/pexels-photo-4121065.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    icon: "fa-undo-alt",
    title: "Cover-Ups",
    desc: "Transform old ink into something you'll love again.",
    href: "/services",
    image: "https://images.pexels.com/photos/18078748/pexels-photo-18078748.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const HOME_FILTERS = ["all", "realism", "blackwork", "japanese", "traditional", "fine-line", "geometric"];

const HOME_WORK: PortfolioItemData[] = [
  { image: "https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Realism Tattoo", title: "Lion Portrait", meta: "Realism", category: "realism" },
  { image: "https://images.pexels.com/photos/6593483/pexels-photo-6593483.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Blackwork Tattoo", title: "Geometric Wolf", meta: "Blackwork", category: "blackwork" },
  { image: "https://images.pexels.com/photos/35172671/pexels-photo-35172671.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Traditional Tattoo", title: "Classic Rose", meta: "Traditional", category: "traditional" },
  { image: "https://images.pexels.com/photos/32225187/pexels-photo-32225187.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Japanese Tattoo", title: "Koi Dragon", meta: "Japanese", category: "japanese" },
  { image: "https://images.pexels.com/photos/18078748/pexels-photo-18078748.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Fine Line Tattoo", title: "Botanical Study", meta: "Fine Line", category: "fine-line" },
  { image: "https://images.pexels.com/photos/4121065/pexels-photo-4121065.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Geometric Tattoo", title: "Sacred Geometry", meta: "Geometric", category: "geometric" },
];

const ARTISTS: ArtistData[] = [
  { name: "Marcus Chen", specialty: "Founder & Lead Artist — Realism", image: "https://images.pexels.com/photos/20519299/pexels-photo-20519299.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-twitter", "Twitter"]] },
  { name: "Sofia Reyes", specialty: "Senior Artist — Black & Grey", image: "https://images.pexels.com/photos/35702114/pexels-photo-35702114.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-tiktok", "TikTok"]] },
  { name: "James Okafor", specialty: "Artist — Japanese & Traditional", image: "https://images.pexels.com/photos/37023014/pexels-photo-37023014.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-youtube", "YouTube"]] },
  { name: "Lena Kim", specialty: "Artist — Fine Line & Geometric", image: "https://images.pexels.com/photos/6593509/pexels-photo-6593509.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-facebook", "Facebook"]] },
];

const TESTIMONIALS: TestimonialData[] = [
  {
    stars: "★★★★★",
    text: '"Absolutely incredible work. The level of detail and artistry is unmatched. I came in with a vague idea and left with a masterpiece that exceeds every expectation."',
    name: "David Mitchell",
    title: "Full Sleeve Realism",
    avatar: "https://images.pexels.com/photos/15130380/pexels-photo-15130380.jpeg?auto=compress&cs=tinysrgb&w=120",
  },
  {
    stars: "★★★★★",
    text: '"The studio atmosphere is incredible — clean, professional, and genuinely artistic. Sofia’s black and grey work is phenomenal. I’m already planning my next piece."',
    name: "Emma Watson",
    title: "Black & Grey Portrait",
    avatar: "https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=120",
  },
  {
    stars: "★★★★★",
    text: '"I traveled over 200 miles to get tattooed here, and it was worth every mile. Marcus is a true artist. The consultation process was thorough and the result is breathtaking."',
    name: "Alex Rivera",
    title: "Japanese Full Back",
    avatar: "https://images.pexels.com/photos/6593483/pexels-photo-6593483.jpeg?auto=compress&cs=tinysrgb&w=120",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />

      <ServiceCards services={SERVICES} />

      <PortfolioExplorer
        items={HOME_WORK}
        filters={HOME_FILTERS}
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
              Our <span className="gradient-text">Artists</span>
            </h2>
            <p className="section-subtitle">
              A collective of award-winning artists, each with a distinct style and vision.
            </p>
          </div>
          <ArtistsGrid artists={ARTISTS} />
        </div>
      </section>

      <TestimonialsSwiper items={TESTIMONIALS} />

      <CTASection
        image="https://images.pexels.com/photos/35172671/pexels-photo-35172671.jpeg?auto=compress&cs=tinysrgb&w=1920"
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
