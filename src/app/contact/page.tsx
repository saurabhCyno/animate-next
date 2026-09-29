import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact | Inkspiration",
  description:
    "Book your tattoo consultation at Inkspiration — studio address, phone, email, opening hours and an online enquiry form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Let&apos;s Create Something <span className="gradient-text">Extraordinary</span>
          </>
        }
        breadcrumb={
          <>
            Home / <span>Contact</span>
          </>
        }
        image="https://images.pexels.com/photos/15130380/pexels-photo-15130380.jpeg?auto=compress&cs=tinysrgb&w=1920"
        imageAlt="Contact Inkspiration"
      />

      <ContactSection />
    </>
  );
}
