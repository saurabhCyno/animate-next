export const PHONE_HREF = "tel:9876543210";
export const CONTACT_PHONE_HREF = "tel:+12135550189";
export const WHATSAPP_URL = "https://wa.me/9876543210";

export const STUDIO = {
  name: "Inkspiration",
  addressLines: ["47 Artisan Lane, Suite 200", "Los Angeles, CA 90012"],
  phoneDisplay: "(213) 555-0189",
  email: "hello@inkandneedle.com",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
] as const;

export const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
] as const;

export const SERVICE_LINKS = [
  { label: "Custom Tattoos", href: "/services/custom-tattoos" },
  { label: "Realism", href: "/services" },
  { label: "Black & Grey", href: "/services" },
  { label: "Cover-Ups", href: "/services" },
  { label: "Piercings", href: "/services" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", icon: "fab fa-instagram" },
  { label: "Facebook", icon: "fab fa-facebook-f" },
  { label: "TikTok", icon: "fab fa-tiktok" },
  { label: "YouTube", icon: "fab fa-youtube" },
] as const;

const PEXELS = "https://images.pexels.com/photos";

/** Builds a hot-linked Pexels CDN url, exactly as the static site did. */
export function pexels(id: number, width: number): string {
  return `${PEXELS}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}
