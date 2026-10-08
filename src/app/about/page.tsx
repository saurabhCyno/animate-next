import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import MissionGrid, { type MissionItem } from "@/components/sections/MissionGrid";
import FeaturedArtist, {
  type FeaturedArtistData,
} from "@/components/sections/FeaturedArtist";
import StudioGallery from "@/components/sections/StudioGallery";
import CertificationsGrid, { type CertItem } from "@/components/sections/CertificationsGrid";
import StatsGrid from "@/components/sections/StatsGrid";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us | Inkspiration",
  description:
    "The Inkspiration legacy, our mission and vision, meet the artists, tour the studio, and review our certifications.",
};

const STORY = [
  "What began as a single artist's vision in a small downtown studio has evolved into one of the most respected names in the tattoo industry. Karan Bakshi founded Inkspiration with a simple belief: that every tattoo should be a work of art.",
  "Over the past decade, we've grown from a one-man operation into a collective of world-class artists, each bringing their unique perspective and expertise. Our studio has been featured in numerous publications and has received multiple industry awards for both artistry and studio excellence.",
  "Today, Inkspiration stands as a destination for collectors who seek the highest quality tattooing in an environment that balances professionalism with creative freedom.",
];

const STATS = [
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 5000, suffix: "+", label: "Tattoos Completed" },
  { target: 1000, suffix: "+", label: "Happy Clients" },
  { target: 20, suffix: "+", label: "Awards Won" },
];

const MISSIONS: MissionItem[] = [
  {
    icon: "fa-bullseye",
    title: "Our Mission",
    text: "To provide an unparalleled tattooing experience where artistry, safety, and client collaboration converge. We are committed to pushing the boundaries of what's possible on skin while maintaining the highest standards of hygiene and professionalism.",
  },
  {
    icon: "fa-eye",
    title: "Our Vision",
    text: "To be recognized globally as a premier destination for fine tattoo art — a studio where tradition meets innovation, and where every client leaves with not just a tattoo, but a cherished piece of art that tells their unique story.",
  },
];

const ARTISTS: FeaturedArtistData[] = [
  {
    name: "Karan Bakshi",
    role: "Founder",
    specialty: "Founder & Master Artist — Inkspiration",
    image: "/images/artist/artist-work.jpeg",
    imageAlt: "Karan Bakshi, founder and master artist",
    bio: [
      "Karan Bakshi built Inkspiration around a single belief: great tattooing is where artistry, precision and individuality come together. As founder and master artist, he approaches every tattoo as a custom piece of art, weighing composition, flow and the way a design sits on the body.",
      "Every tattoo begins with a conversation. Karan refines the concept with you, then recommends the size, placement and approach for your skin. Revisions before the stencil are unlimited, the rate is a flat ₹800 an inch, and the touch-up once it has healed is free.",
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
  }
];

const STUDIO = [
  { src: "/images/studio/studio-1.jpeg", alt: "Inkspiration Studio Interior" },
  { src: "/images/studio/studio-2.jpeg", alt: "Tattoo Station" },
  { src: "/images/studio/studio-3.jpeg", alt: "Studio Workspace" },
  { src: "/images/studio/studio-4.jpeg", alt: "Studio Detail" },
];

const CERTS: CertItem[] = [
  { icon: "fa-certificate", title: "BBP Certified", desc: "Bloodborne Pathogens certified by the American Red Cross" },
  { icon: "fa-shield-alt", title: "OSHA Compliant", desc: "Full OSHA safety standards and workplace compliance" },
  { icon: "fa-award", title: "Licensed Facility", desc: "Licensed and inspected by the California Department of Public Health" },
  { icon: "fa-syringe", title: "Sterilization", desc: "Medical-grade autoclave sterilization with weekly spore testing" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Our <span className="gradient-text">Story</span>
          </>
        }
        breadcrumb={
          <>
            Home / <span>About Us</span>
          </>
        }
        image="/images/artist/art-tattoo-artist.jpeg"
      />

      <section className="section">
        <div className="container">
          <div className="about-preview">
            <div className="about-content reveal-left">
              <span className="section-label">Since 2014</span>
              <h2 className="section-title">
                The Inkspiration <span className="gradient-text">Legacy</span>
              </h2>
              {STORY.map((text) => (
                <p className="about-text" key={text}>
                  {text}
                </p>
              ))}
              <StatsGrid stats={STATS} style={{ marginTop: 32 }} />
            </div>
            <div className="about-image-wrapper reveal-right parallax-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ik.imagekit.io/ovwcb90gc/where-art-meets-skin.jpeg?updatedAt=1791200423976"
                alt="Tattoo Studio"
                className="parallax-image"
              />
              <div
                className="about-image-accent"
                style={{ bottom: "auto", top: -20, right: -20 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">Our Philosophy</span>
            <h2 className="section-title">
              Mission & <span className="gradient-text">Vision</span>
            </h2>
          </div>
          <MissionGrid items={MISSIONS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">
              Meet The <span className="gradient-text">Artist</span>
            </h2>
            <p className="section-subtitle">
              One artist, one standard. Every tattoo and piercing is performed in-house by Karan Bakshi — the founder and master artist behind Inkspiration.
            </p>
          </div>
          <div className="artist-roster">
            {ARTISTS.map((artist, i) => (
              <FeaturedArtist
                artist={artist}
                key={artist.name}
                reverse={i % 2 === 1}
                compact
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ marginBottom: 60 }}>
            <span className="section-label">Take A Tour</span>
            <h2 className="section-title">
              Our <span className="gradient-text">Studio</span>
            </h2>
            <p className="section-subtitle">
              Step inside our award-winning space designed for creativity and comfort.
            </p>
          </div>
          <StudioGallery images={STUDIO} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center" }}>
            <span className="section-label">Our Standards</span>
            <h2 className="section-title">
              Certifications & <span className="gradient-text">Safety</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Your health and safety are our highest priority. We maintain the strictest standards
              in the industry.
            </p>
          </div>
          <CertificationsGrid items={CERTS} />
        </div>
      </section>

      <CTASection
        image="/images/artist/artist-art.jpeg"
        imageAlt="Tattoo Art"
        title={
          <>
            Trust The <span className="gradient-text">Experts</span>
          </>
        }
        desc="With over a decade of experience and thousands of satisfied clients, your safety and satisfaction are guaranteed. Book a consultation and experience the difference."
        ctaHref="tel:9045538809"
        ctaLabel="Call Now"
      />
    </>
  );
}
