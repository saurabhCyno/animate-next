import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import type { ReactNode } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "./globals.css";

import SiteHeader from "@/components/chrome/SiteHeader";
import SiteFooter from "@/components/chrome/SiteFooter";
import CustomCursor from "@/components/chrome/CustomCursor";
import Loader from "@/components/chrome/Loader";
import WhatsAppFloat from "@/components/chrome/WhatsAppFloat";
import LightboxProvider from "@/components/chrome/LightboxProvider";

import SmoothScroll from "@/components/fx/SmoothScroll";
import ScrollReveal from "@/components/fx/ScrollReveal";
import CounterAnimation from "@/components/fx/CounterAnimation";
import MagneticButtons from "@/components/fx/MagneticButtons";
import ServiceCardBackgrounds from "@/components/fx/ServiceCardBackgrounds";
import GsapEffects from "@/components/fx/GsapEffects";
import HashScroller from "@/components/fx/HashScroller";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

// Oswald has no 900 on Google Fonts; the stylesheet still requests 900 and the
// browser synthesises the weight, exactly as the static site did.
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inkandneedle.com"),
  title: {
    default: "Inkspiration | Premium Tattoo Studio",
    template: "%s | Inkspiration",
  },
  description:
    "Inkspiration — Premium Tattoo Studio. Award-winning artists specializing in custom tattoos, realism, blackwork, and fine line. Book your consultation today.",
  keywords:
    "tattoo studio, custom tattoos, realism tattoos, blackwork, fine line, tattoo artist, premium tattoo",
  authors: [{ name: "Inkspiration" }],
  openGraph: {
    title: "Inkspiration | Premium Tattoo Studio",
    description:
      "Your Skin. Our Canvas. Award-winning tattoo artistry in a luxury studio environment.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <div className="noise-overlay" />

        <Loader />

        <div className="page-transition" />

        <CustomCursor />

        <SiteHeader />

        <LightboxProvider>
          <main>{children}</main>
          <SiteFooter />
        </LightboxProvider>

        <WhatsAppFloat />

        <SmoothScroll />
        <ScrollReveal />
        <CounterAnimation />
        <MagneticButtons />
        <ServiceCardBackgrounds />
        <GsapEffects />
        <HashScroller />
      </body>
    </html>
  );
}
