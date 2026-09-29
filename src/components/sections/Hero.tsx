import { pexels } from "@/lib/site";
import Button from "@/components/ui/Button";
import Marquee from "./Marquee";

/** Port of the `.hero` block in index.html. */
export default function Hero() {
  return (
    <>
      <section className="hero" id="home">
        <video
          className="hero-bg parallax-image"
          autoPlay
          muted
          loop
          playsInline
          poster={pexels(15130380, 1920)}
          aria-hidden="true"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="hero-badge">Est. 2025</div>
          <h1 className="hero-title">
            <span className="line">
              <span>Your Skin.</span>
            </span>
            <span className="line">
              <span>
                Our <span className="highlight">Canvas.</span>
              </span>
            </span>
          </h1>
          <p className="hero-desc">
            Where visionary artistry meets the human form. Award-winning tattoo studio
            crafting timeless masterpieces since 2025.
          </p>
          <div className="hero-actions">
            <Button href="tel:9876543210">Call Now</Button>
            <Button href="/our-work" variant="secondary">
              Explore Our Work
            </Button>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <Marquee />
    </>
  );
}
