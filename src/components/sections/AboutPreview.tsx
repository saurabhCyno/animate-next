import Button from "@/components/ui/Button";
import StatsGrid from "./StatsGrid";

const ABOUT_PARAGRAPHS = [
  "Founded in 2025, Inkspiration has grown from a passion project into one of the most acclaimed tattoo studios in the world. Our team of award-winning artists brings together diverse expertise in realism, blackwork, Japanese, and fine line styles.",
  "Every tattoo we create is a collaborative journey — from the initial consultation to the final reveal. We believe that the best tattoos are born from trust, creativity, and an uncompromising commitment to excellence.",
];

const STATS = [
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 5000, suffix: "+", label: "Tattoos Completed" },
  { target: 1000, suffix: "+", label: "Happy Clients" },
  { target: 20, suffix: "+", label: "Awards Won" },
];

/** Port of the `.about-preview` block on index.html. */
export default function AboutPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="about-preview">
          <div className="about-image-wrapper reveal-left parallax-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/37023010/pexels-photo-37023010.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Tattoo Studio Interior"
              className="parallax-image"
            />
            <div className="about-image-accent" />
          </div>
          <div className="about-content reveal-right">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              Where Art Meets <span className="gradient-text">Skin</span>
            </h2>
            {ABOUT_PARAGRAPHS.map((text) => (
              <p className="about-text" key={text}>
                {text}
              </p>
            ))}
            <Button href="/about" variant="gold">
              Discover Our Story
            </Button>
            <StatsGrid stats={STATS} />
          </div>
        </div>
      </div>
    </section>
  );
}
