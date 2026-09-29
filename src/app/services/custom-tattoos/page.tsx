import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import MissionGrid, { type MissionItem } from "@/components/sections/MissionGrid";
import PricingGrid, { type PricingPlan } from "@/components/sections/PricingGrid";
import FaqList, { type FaqItemData } from "@/components/sections/FaqList";
import CTASection from "@/components/sections/CTASection";
import PortfolioExplorer, {
  type PortfolioItemData,
} from "@/components/sections/PortfolioExplorer";

export const metadata: Metadata = {
  title: "Custom Tattoos | Inkspiration",
  description:
    "Bespoke tattoo design at Inkspiration — our six-step custom process, what sets us apart, pricing and FAQs.",
};

const OVERVIEW = [
  "Every custom tattoo begins with a conversation. Our artists take the time to understand your vision, style, and story before putting pencil to paper. From the first sketch to the final needle, you are part of every step.",
  "Whether you have a detailed reference or just a spark of an idea, we'll guide you through design, placement, sizing, and aftercare to ensure a result you'll be proud to wear for life.",
];

const PROCESS: MissionItem[] = [
  {
    icon: "fa-comments",
    title: "1. Consultation",
    text: "We sit down together to discuss your ideas, reference images, placement, size, and budget. This is where your vision starts taking shape.",
  },
  {
    icon: "fa-pencil-alt",
    title: "2. Design",
    text: "Our artist creates a custom sketch tailored to your anatomy. We refine the design with your feedback until it's exactly what you want.",
  },
  {
    icon: "fa-print",
    title: "3. Stencil",
    text: "A precise stencil is applied to your skin so you can see exactly how the design will look. Placement and size are adjusted until perfect.",
  },
  {
    icon: "fa-tint",
    title: "4. Tattooing",
    text: "Using premium inks and sterile equipment, our artist brings your design to life with precision, care, and artistic mastery.",
  },
  {
    icon: "fa-heart",
    title: "5. Aftercare",
    text: "You'll receive detailed aftercare instructions and a complimentary care kit. We're always available for questions during healing.",
  },
  {
    icon: "fa-check-circle",
    title: "6. Touch-Up",
    text: "After full healing, we offer a free touch-up session to ensure your tattoo looks as vibrant and crisp as the day it was done.",
  },
];

const DIFFERENCES = [
  [
    { icon: "fa-award", title: "Award-Winning Artists", text: "Our team has won multiple industry awards for design and execution." },
    { icon: "fa-shield-alt", title: "Medical-Grade Sterilization", text: "Autoclave sterilized equipment with weekly spore testing for your safety." },
    { icon: "fa-palette", title: "Premium Materials", text: "We use only the highest quality inks, needles, and aftercare products." },
    { icon: "fa-smile", title: "100% Satisfaction", text: "Unlimited revisions during design and complimentary touch-ups after healing." },
  ],
  [
    { icon: "fa-clock", title: "Flexible Scheduling", text: "We work around your availability, including weekends and evening appointments." },
    { icon: "fa-hand-holding-heart", title: "Personalized Experience", text: "Private, comfortable studio rooms with your choice of music and ambiance." },
    { icon: "fa-wallet", title: "Transparent Pricing", text: "No hidden fees — you'll receive a detailed quote before any work begins." },
    { icon: "fa-infinity", title: "Lifetime Support", text: "We're here for you long after your tattoo heals — questions, touch-ups, everything." },
  ],
] as const;

const COMPARE = [
  {
    label: "Industry Standard",
    labelStyle: { background: "rgba(0,0,0,0.7)" },
    image: "https://images.pexels.com/photos/18078748/pexels-photo-18078748.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Industry Standard",
  },
  {
    label: "Inkspiration Difference",
    labelStyle: { background: "rgba(212,160,23,0.85)" },
    image: "https://images.pexels.com/photos/19548529/pexels-photo-19548529.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Inkspiration Difference",
  },
];

const COMPARE_LABEL_STYLE: React.CSSProperties = {
  position: "absolute",
  top: 20,
  left: 20,
  padding: "8px 16px",
  fontSize: "0.7rem",
  letterSpacing: "2px",
  textTransform: "uppercase",
  borderRadius: 2,
};

const COMPARE_IMG_STYLE: React.CSSProperties = {
  width: "100%",
  height: 400,
  objectFit: "cover",
  display: "block",
};

const CHECK_LIST_STYLE: React.CSSProperties = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const CHECK_ICON_STYLE: React.CSSProperties = {
  color: "var(--accent-gold)",
  fontSize: "1.4rem",
  marginTop: 2,
};

const GALLERY: PortfolioItemData[] = [
  { image: "https://images.pexels.com/photos/37023014/pexels-photo-37023014.jpeg?auto=compress&cs=tinysrgb&w=800", alt: "Custom Tattoo", title: "Custom Tattoo", meta: "", category: "custom", style: { gridColumn: "span 2", gridRow: "span 2" } },
  { image: "https://images.pexels.com/photos/32225187/pexels-photo-32225187.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Custom Tattoo", title: "Custom Tattoo 2", meta: "", category: "custom" },
  { image: "https://images.pexels.com/photos/6593483/pexels-photo-6593483.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Custom Tattoo", title: "Custom Tattoo 3", meta: "", category: "custom" },
  { image: "https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Custom Tattoo", title: "Custom Tattoo 4", meta: "", category: "custom" },
  { image: "https://images.pexels.com/photos/13765704/pexels-photo-13765704.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Custom Tattoo", title: "Custom Tattoo 5", meta: "", category: "custom" },
  { image: "https://images.pexels.com/photos/15130380/pexels-photo-15130380.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Custom Tattoo", title: "Custom Tattoo 6", meta: "", category: "custom" },
];

const PLANS: PricingPlan[] = [
  {
    name: "Small",
    amount: "$200",
    features: ["1-2 hour sessions", "Up to 4 inches", "Custom design included", "Aftercare kit included", "One free touch-up"],
  },
  {
    name: "Medium",
    amount: "$250",
    features: ["2-4 hour sessions", "Up to 10 inches", "Extended consultation", "Premium aftercare kit", "Two free touch-ups"],
    featured: true,
  },
  {
    name: "Large",
    amount: "$300",
    features: ["4+ hour sessions", "Unlimited size", "Priority scheduling", "VIP aftercare package", "Unlimited touch-ups"],
  },
];

const FAQS: FaqItemData[] = [
  {
    question: "How long does the custom design process take?",
    answer:
      "Most custom designs are completed within 1-2 weeks of your consultation, depending on complexity. We'll share the artwork digitally for your review and revisions before your appointment.",
  },
  {
    question: "Can I bring my own reference images?",
    answer:
      "Absolutely! Reference images, sketches, or even photos of other tattoos you like are incredibly helpful. They give our artists a clear sense of your style and expectations.",
  },
  {
    question: "What if I don't like the initial design?",
    answer:
      "No problem at all. We offer unlimited revisions during the design phase. Your satisfaction is our priority — we won't tattoo anything until you're 100% happy.",
  },
  {
    question: "Do I need to pay for the design consultation?",
    answer:
      "Initial consultations are free. A deposit is required to book your appointment, which is applied toward the final cost of your tattoo.",
  },
  {
    question: "How do I prepare for my custom tattoo session?",
    answer:
      "Stay hydrated, eat a good meal beforehand, avoid alcohol for 24 hours, and get plenty of rest. Wear comfortable clothing that allows access to the tattoo area.",
  },
];

export default function CustomTattoosPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Custom <span className="gradient-text">Tattoos</span>
          </>
        }
        breadcrumb={
          <>
            Home / <a href="/services">Services</a> / <span>Custom Tattoos</span>
          </>
        }
        videoSrc="/videos/hero-bg.mp4"
        poster="https://images.pexels.com/photos/37023014/pexels-photo-37023014.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="about-preview" style={{ alignItems: "center" }}>
            <div className="about-content reveal-left">
              <span className="section-label">Bespoke Artwork</span>
              <h2 className="section-title">
                Designed <span className="gradient-text">For You</span>
              </h2>
              {OVERVIEW.map((text) => (
                <p className="about-text" key={text}>
                  {text}
                </p>
              ))}
            </div>
            <div className="about-image-wrapper reveal-right">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/6593509/pexels-photo-6593509.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Tattoo Design Process"
                style={{ width: "100%", borderRadius: 4, display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">How It Works</span>
            <h2 className="section-title">
              Our Design <span className="gradient-text">Process</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              From concept to completion, we ensure every detail is perfect.
            </p>
          </div>
          <MissionGrid items={PROCESS} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">Why Inkspiration</span>
            <h2 className="section-title">
              What Sets Us <span className="gradient-text">Apart</span>
            </h2>
          </div>

          <div className="compare-container">
            <div
              className="compare-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 60,
                marginTop: 60,
              }}
            >
              {COMPARE.map((item) => (
                <div
                  className="compare-item"
                  key={item.label}
                  style={{ position: "relative", overflow: "hidden", borderRadius: 4 }}
                >
                  <span
                    className="compare-label"
                    style={{ ...COMPARE_LABEL_STYLE, ...item.labelStyle }}
                  >
                    {item.label}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.alt} style={COMPARE_IMG_STYLE} />
                </div>
              ))}
            </div>
          </div>

          <div className="about-preview" style={{ marginTop: 60, gap: 60 }}>
            {DIFFERENCES.map((column, i) => (
              <div className="about-content" key={i}>
                <ul style={CHECK_LIST_STYLE}>
                  {column.map((entry) => (
                    <li
                      key={entry.title}
                      style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                    >
                      <i className={`fas ${entry.icon}`} style={CHECK_ICON_STYLE} />
                      <div>
                        <strong style={{ color: "var(--text-primary)" }}>{entry.title}</strong>
                        <br />
                        <span style={{ color: "var(--text-secondary)" }}>{entry.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortfolioExplorer
        items={GALLERY}
        variant="home"
        overlay={false}
        label="Portfolio"
        title={
          <>
            Custom Work <span className="gradient-text">Gallery</span>
          </>
        }
        subtitle="A selection of our recent custom tattoo projects."
        headerStyle={{ textAlign: "center", marginBottom: 60 }}
      />

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">Investment</span>
            <h2 className="section-title">
              Custom Tattoo <span className="gradient-text">Pricing</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Premium artistry at transparent pricing. Every custom piece is quoted individually.
            </p>
          </div>
          <PricingGrid plans={PLANS} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">FAQ</span>
            <h2 className="section-title">
              Custom Tattoo <span className="gradient-text">FAQs</span>
            </h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      <CTASection
        image="https://images.pexels.com/photos/20519299/pexels-photo-20519299.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Tattoo Art"
        title={
          <>
            Start Your <span className="gradient-text">Custom Piece</span>
          </>
        }
        desc="Your vision deserves the highest level of artistry. Book a consultation with our award-winning team today."
        ctaHref="tel:9876543210"
        ctaLabel="Call Now"
      />
    </>
  );
}
