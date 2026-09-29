import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServiceBlocks, { type ServiceBlockData } from "@/components/sections/ServiceBlocks";
import PricingGrid, { type PricingPlan } from "@/components/sections/PricingGrid";
import FaqList, { type FaqItemData } from "@/components/sections/FaqList";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Services | Inkspiration",
  description:
    "Custom tattoos, realism, black & grey, traditional & Japanese, cover-ups and piercings — with transparent pricing and aftercare support.",
};

const BLOCKS: ServiceBlockData[] = [
  {
    number: "01",
    title: "Custom Tattoos",
    desc: "Every great tattoo starts with a vision. Our custom design process is a collaborative journey where your ideas are transformed into a unique piece of art. From the initial sketch to the final shading, we work closely with you to ensure every detail reflects your personality and story.",
    benefits: [
      "Personalized one-on-one consultation",
      "Original hand-drawn or digital artwork",
      "Unlimited revisions until perfection",
      "Placement consultation and stencil fitting",
    ],
    price: "From $200/hr · 2-8 hour sessions",
    ctaLabel: "Learn More",
    ctaHref: "/services/custom-tattoos",
    ctaVariant: "primary",
    image: "https://images.pexels.com/photos/37023014/pexels-photo-37023014.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Custom Tattoo",
  },
  {
    number: "02",
    title: "Realism",
    desc: "Our realism specialists are masters of light, shadow, and texture. Whether you want a portrait that captures a loved one's essence or a hyper-realistic animal, we deliver photographic precision that brings your chosen subject to life on your skin.",
    benefits: [
      "High-contrast black & grey and color realism",
      "Portrait, animal, and wildlife specialization",
      "Photorealistic texture and depth",
      "Fine detail preservation techniques",
    ],
    price: "From $250/hr · 3-12 hour sessions",
    ctaLabel: "Call Now",
    ctaHref: "tel:9876543210",
    ctaVariant: "primary",
    image: "https://images.pexels.com/photos/1304469/pexels-photo-1304469.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Realism Tattoo",
    reversed: true,
  },
  {
    number: "03",
    title: "Black & Grey",
    desc: "The timeless elegance of black and grey tattooing. Our artists use sophisticated shading techniques — from smooth gradients to bold contrast — to create stunning monochromatic pieces that age beautifully and maintain their integrity for decades.",
    benefits: [
      "Traditional and illustrative black & grey",
      "Pointillism and stippling techniques",
      "Chiaroscuro and dramatic lighting",
      "Fine line and bold contrast styles",
    ],
    price: "From $200/hr · 2-10 hour sessions",
    ctaLabel: "Call Now",
    ctaHref: "tel:9876543210",
    ctaVariant: "primary",
    image: "https://images.pexels.com/photos/6593483/pexels-photo-6593483.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Black and Grey Tattoo",
  },
  {
    number: "04",
    title: "Traditional & Japanese",
    desc: "Bold lines, vibrant colors, and timeless designs rooted in centuries of tattooing tradition. Our traditional and Japanese specialists honor the heritage of these styles while bringing a contemporary edge to every piece.",
    benefits: [
      "American Traditional and Neo-Traditional",
      "Japanese Irezumi and Tebori techniques",
      "Authentic motifs and symbolism",
      "Full body suit and large-scale projects",
    ],
    price: "From $200/hr · 2-20+ hour sessions",
    ctaLabel: "Call Now",
    ctaHref: "tel:9876543210",
    ctaVariant: "primary",
    image: "https://images.pexels.com/photos/32225187/pexels-photo-32225187.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Japanese Tattoo",
    reversed: true,
  },
  {
    number: "05",
    title: "Cover-Ups & Touch-Ups",
    desc: "Don't settle for ink you no longer love. Our cover-up specialists are experts in transforming unwanted tattoos into beautiful new artwork. We also offer touch-up services to restore and revitalize your existing tattoos.",
    benefits: [
      "Expert cover-up design and execution",
      "Color and black ink coverage solutions",
      "Laser removal consultation referrals",
      "Touch-up and restoration services",
    ],
    price: "From $200/hr · 2-6 hour sessions",
    ctaLabel: "Call Now",
    ctaHref: "tel:9876543210",
    ctaVariant: "primary",
    image: "https://images.pexels.com/photos/18078748/pexels-photo-18078748.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Cover Up Tattoo",
  },
  {
    number: "06",
    title: "Piercings",
    desc: "Professional body piercing performed in a sterile, comfortable environment. Our piercers use only the highest quality jewelry and follow strict sanitation protocols to ensure a safe and positive experience.",
    benefits: [
      "Ear, facial, and body piercings",
      "Implant-grade titanium and 14k gold jewelry",
      "APP member piercers",
      "Aftercare guidance and support",
    ],
    price: "From $50 · Includes jewelry",
    ctaLabel: "Book Appointment",
    ctaHref: "/contact",
    ctaVariant: "primary",
    image: "https://images.pexels.com/photos/4121065/pexels-photo-4121065.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Piercing",
    reversed: true,
  },
];

const PLANS: PricingPlan[] = [
  {
    name: "Small",
    amount: "$200",
    features: [
      "1-2 hour sessions",
      "Up to 4 inches",
      "Single consultation",
      "Aftercare kit included",
      "One free touch-up",
    ],
  },
  {
    name: "Medium",
    amount: "$250",
    features: [
      "2-4 hour sessions",
      "Up to 10 inches",
      "Extended consultation",
      "Premium aftercare kit",
      "Two free touch-ups",
    ],
    featured: true,
  },
  {
    name: "Large",
    amount: "$300",
    features: [
      "4+ hour sessions",
      "Unlimited size",
      "Priority scheduling",
      "VIP aftercare package",
      "Unlimited touch-ups",
    ],
  },
];

const FAQS: FaqItemData[] = [
  {
    question: "How do I prepare for my tattoo appointment?",
    answer:
      "Stay hydrated, eat a good meal beforehand, avoid alcohol for 24 hours, and get plenty of rest. Wear comfortable clothing that allows access to the tattoo area. Moisturize the area for a few days before your appointment.",
  },
  {
    question: "Does getting a tattoo hurt?",
    answer:
      "Pain tolerance varies by individual and placement. Most describe it as a scratching or vibrating sensation. Areas with more nerve endings or thinner skin tend to be more sensitive. We offer numbing options for your comfort.",
  },
  {
    question: "How do I care for my new tattoo?",
    answer:
      "Keep it clean with mild soap, moisturize with unscented lotion, avoid direct sunlight, no swimming or soaking for 2-3 weeks, and don't pick at any scabs. We provide a detailed aftercare guide and a premium aftercare kit.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require 48 hours notice for cancellations. Late cancellations may result in a loss of deposit. We understand emergencies happen, so please communicate with us as early as possible.",
  },
  {
    question: "Do you offer consultations?",
    answer:
      "Yes! We offer free initial consultations where we'll discuss your ideas, placement, size, and pricing. This is also a great opportunity to meet your artist and tour the studio.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Our <span className="gradient-text">Services</span>
          </>
        }
        breadcrumb={
          <>
            Home / <span>Services</span>
          </>
        }
        image="https://images.pexels.com/photos/20519299/pexels-photo-20519299.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Tattoo Services"
      />

      <section className="section">
        <ServiceBlocks blocks={BLOCKS} />
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <span className="section-label">Investment</span>
            <h2 className="section-title">
              Pricing <span className="gradient-text">Plans</span>
            </h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Premium artistry at transparent pricing. Every consultation includes a detailed
              quote.
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
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>
          <FaqList items={FAQS} />
        </div>
      </section>

      <CTASection
        image="https://images.pexels.com/photos/15130380/pexels-photo-15130380.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Tattoo"
        title={
          <>
            Ready to Start Your <span className="gradient-text">Journey</span>?
          </>
        }
        desc="Book a consultation with our award-winning team and let's create something extraordinary together."
        ctaHref="tel:9876543210"
        ctaLabel="Call Now"
      />
    </>
  );
}
