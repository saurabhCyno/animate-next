export const PHONE_HREF = "tel:9045538809";
export const CONTACT_PHONE_HREF = "tel:9045538809";
export const WHATSAPP_URL = "https://wa.me/919045538809";

export const STUDIO = {
  name: "Inkspiration",
  addressLines: ["Inkspiration Studio & KN Fitness, Opp. Mandir & Gurudwara Ground", "Premnagar, Dehradun"],
  phoneDisplay: "+91 90455 38809",
  email: "karanbakshi2208@gmail.com",
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

/** Footer "Popular Services" - the five best-known services, deepest-linked. */
export const SERVICE_LINKS = [
  { label: "Permanent Tattoos", href: "/services/permanent-tattoo" },
  { label: "Earlobe Piercing", href: "/services/piercing#standard-earlobe" },
  { label: "Nose Piercing", href: "/services/piercing#nose" },
  { label: "Belly Piercing", href: "/services/piercing#belly" },
  { label: "Septum Piercing", href: "/services/piercing#septum" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Instagram", icon: "fab fa-instagram", href: "https://www.instagram.com/inkspiration_by_bakshi" },
  { label: "Facebook", icon: "fab fa-facebook-f" },
  { label: "TikTok", icon: "fab fa-tiktok" },
  { label: "YouTube", icon: "fab fa-youtube" },
] as const;

const PEXELS = "https://images.pexels.com/photos";

/** Builds a hot-linked Pexels CDN url, exactly as the static site did. */
export function pexels(id: number, width: number): string {
  return `${PEXELS}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}
