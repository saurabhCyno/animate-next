import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import MissionGrid, { type MissionItem } from "@/components/sections/MissionGrid";
import ArtistsGrid, { type ArtistData } from "@/components/sections/ArtistsGrid";
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
  "What began as a single artist's vision in a small downtown studio has evolved into one of the most respected names in the tattoo industry. Marcus Chen founded Inkspiration with a simple belief: that every tattoo should be a work of art.",
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

const ARTISTS: ArtistData[] = [
  { name: "Marcus Chen", specialty: "Founder & Lead Artist — 12 yrs", image: "https://images.pexels.com/photos/20519299/pexels-photo-20519299.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-twitter", "Twitter"]] },
  { name: "Sofia Reyes", specialty: "Senior Artist — 9 yrs", image: "https://images.pexels.com/photos/37023014/pexels-photo-37023014.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-tiktok", "TikTok"]] },
  { name: "James Okafor", specialty: "Artist — 7 yrs", image: "https://images.pexels.com/photos/32225187/pexels-photo-32225187.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-youtube", "YouTube"]] },
  { name: "Lena Kim", specialty: "Artist — 6 yrs", image: "https://images.pexels.com/photos/13765704/pexels-photo-13765704.jpeg?auto=compress&cs=tinysrgb&w=600", socials: [["fa-instagram", "Instagram"], ["fa-facebook", "Facebook"]] },
];

const STUDIO = [
  { src: "https://images.pexels.com/photos/19548529/pexels-photo-19548529.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Studio Interior" },
  { src: "https://images.pexels.com/photos/7147780/pexels-photo-7147780.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Tattoo Station" },
  { src: "https://images.pexels.com/photos/10552040/pexels-photo-10552040.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Studio Waiting Area" },
  { src: "https://images.pexels.com/photos/6593509/pexels-photo-6593509.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Equipment" },
  { src: "https://images.pexels.com/photos/18078748/pexels-photo-18078748.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Art Display" },
  { src: "https://images.pexels.com/photos/4121065/pexels-photo-4121065.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Gallery Wall" },
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
        image="https://images.pexels.com/photos/35702114/pexels-photo-35702114.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="About Inkspiration"
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
                src="https://images.pexels.com/photos/37023010/pexels-photo-37023010.jpeg?auto=compress&cs=tinysrgb&w=800"
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
              Meet The <span className="gradient-text">Artists</span>
            </h2>
            <p className="section-subtitle">
              Award-winning artists dedicated to their craft, each with a unique style and vision.
            </p>
          </div>
          <ArtistsGrid artists={ARTISTS} style={{ marginTop: 60 }} />
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
        image="https://images.pexels.com/photos/6593483/pexels-photo-6593483.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Tattoo Art"
        title={
          <>
            Trust The <span className="gradient-text">Experts</span>
          </>
        }
        desc="With over a decade of experience and thousands of satisfied clients, your safety and satisfaction are guaranteed. Book a consultation and experience the difference."
        ctaHref="tel:9876543210"
        ctaLabel="Call Now"
      />
    </>
  );
}
