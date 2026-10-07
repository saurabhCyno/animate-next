/**
 * Central content data for the services side of the site.
 *
 * This is the single source of truth for every service, piercing and price shown
 * anywhere in the app. Pages and components import from here rather than
 * re-declaring copy, so a price change only ever needs editing in this file.
 *
 * Companion to `site.ts`, which holds global site config (links, contact, fonts).
 *
 * Pricing model: the studio quotes in Indian Rupees (INR). Permanent tattoos are
 * priced per inch of design; piercings are priced per placement.
 */

import { pexels } from "./site";

/** Formats a number as an INR amount, e.g. `1200` -> `₹1,200`. */
export function inr(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;
}

/* ==========================================================================
   Shared content shapes
   ========================================================================== */

/** `icon` / `title` / `text` — matches `MissionGrid`'s `MissionItem`. */
export type TextCard = {
  icon: string;
  title: string;
  text: string;
};

export type Faq = {
  question: string;
  answer: string;
};

/** A priced bracket, e.g. the per-inch size tiers. */
export type SizeTier = {
  name: string;
  size: string;
  amount: string;
  unit?: string;
  features: string[];
  featured?: boolean;
};

/* ==========================================================================
   Permanent tattoo
   ========================================================================== */

/** Flat rate for all permanent tattoo work. */
export const TATTOO_RATE_PER_INCH = 800;

export const TATTOO_PRICING = {
  rate: TATTOO_RATE_PER_INCH,
  rateLabel: inr(TATTOO_RATE_PER_INCH),
  /** Appended after the amount in `.pricing-amount`, e.g. `₹800/inch`. */
  unit: "/inch",
  /** Standalone wording for the rate panel. */
  unitLabel: "per inch",
  blurb:
    "Every permanent tattoo is quoted at a flat rate per inch of the final design. The measurement is taken on your skin at the stencil stage, so the number you are quoted is the number you pay.",
};

/**
 * Size brackets derived from the per-inch rate. `amount` is a starting figure —
 * the final quote is confirmed once the design is sized on the body.
 */
export const TATTOO_SIZE_TIERS: SizeTier[] = [
  {
    name: "Small",
    size: "Up to 3 inches",
    amount: inr(3 * TATTOO_RATE_PER_INCH),
    unit: TATTOO_PRICING.unit,
    features: [
      "Icons, fine line and small scripts",
      "1-2 hour session",
      "Single placement",
      "Aftercare kit included",
      "One free touch-up",
    ],
  },
  {
    name: "Medium",
    size: "3 to 6 inches",
    amount: inr(6 * TATTOO_RATE_PER_INCH),
    unit: TATTOO_PRICING.unit,
    features: [
      "Half sleeves and detailed pieces",
      "2-4 hour session",
      "Custom design consultation",
      "Premium aftercare kit",
      "Two free touch-ups",
    ],
    featured: true,
  },
  {
    name: "Large",
    size: "6 to 12 inches",
    amount: inr(12 * TATTOO_RATE_PER_INCH),
    unit: TATTOO_PRICING.unit,
    features: [
      "Full sleeves and large compositions",
      "4-8 hour session",
      "Priority scheduling",
      "VIP aftercare package",
      "Unlimited touch-ups",
    ],
  },
  {
    name: "Statement",
    size: "12 inches and above",
    amount: `From ${inr(12 * TATTOO_RATE_PER_INCH)}`,
    unit: TATTOO_PRICING.unit,
    features: [
      "Back pieces, full body suits and multi-session work",
      "Booked across multiple sessions",
      "Dedicated artist for the full project",
      "Bespoke aftercare programme",
      "Unlimited touch-ups and revisions",
    ],
  },
];

export const TATTOO_OVERVIEW: string[] = [
  "Every permanent tattoo begins with a conversation. Our artists take the time to understand your vision, style and story before putting pencil to paper. From the first sketch to the final needle, you are part of every step.",
  "Whether you arrive with a detailed reference or just a spark of an idea, we will guide you through design, placement, sizing and aftercare — so the result is one you are proud to wear for life.",
];

export const TATTOO_PROCESS: TextCard[] = [
  {
    icon: "fa-comments",
    title: "1. Consultation",
    text: "We sit down together to discuss your ideas, references, placement, size and budget. This is where your vision starts taking shape.",
  },
  {
    icon: "fa-pencil-alt",
    title: "2. Design",
    text: "Your artist draws a custom sketch tailored to your anatomy. We refine it with your feedback until it is exactly what you want.",
  },
  {
    icon: "fa-print",
    title: "3. Stencil",
    text: "A precise stencil is applied to your skin so you can see exactly how the design will sit. Size and placement are adjusted until they are right.",
  },
  {
    icon: "fa-tint",
    title: "4. Tattooing",
    text: "Using premium inks and single-use sterile equipment, your artist brings the design to life with precision, care and artistic control.",
  },
  {
    icon: "fa-heart",
    title: "5. Aftercare",
    text: "You leave with detailed aftercare instructions and a complimentary care kit. We stay available for questions throughout healing.",
  },
  {
    icon: "fa-check-circle",
    title: "6. Touch-Up",
    text: "Once fully healed, we offer a complimentary touch-up session so your tattoo stays as crisp as the day it was done.",
  },
];

export const TATTOO_STYLES: TextCard[] = [
  {
    title: "Realism",
    icon: "fa-camera",
    text: "Photographic portraits, animals and wildlife built with fine shading and true-to-life texture.",
  },
  {
    title: "Black & Grey",
    icon: "fa-droplet",
    text: "Monochromatic work using smooth gradients, stippling and strong contrast that ages beautifully.",
  },
  {
    title: "Colour",
    icon: "fa-palette",
    text: "Vibrant, deliberate colour work balanced for longevity rather than short-term punch.",
  },
  {
    title: "Traditional & Japanese",
    icon: "fa-feather",
    text: "Bold lines and time-honoured motifs, executed in American Traditional or Irezumi style.",
  },
  {
    title: "Fine Line",
    icon: "fa-feather",
    text: "Delicate single-needle linework and detailed scripts that reward a closer look.",
  },
  {
    title: "Cover-Ups",
    icon: "fa-undo-alt",
    text: "Redesigns that rework old ink into something entirely new, using colour and black coverage.",
  },
];

export const TATTOO_FAQS: Faq[] = [
  {
    question: "How is a permanent tattoo priced?",
    answer:
      "All permanent tattoo work is charged at a flat rate per inch of the final design. We measure the design on your skin at the stencil stage, then confirm the exact figure before any work begins. Large pieces are simply the same rate applied over a larger measurement.",
  },
  {
    question: "How long does the custom design process take?",
    answer:
      "Most custom designs are completed within one to two weeks of your consultation, depending on complexity. We share the artwork digitally for your review, and revise it before your appointment is booked.",
  },
  {
    question: "Can I bring my own reference images?",
    answer:
      "Absolutely. Reference photos, sketches, or even examples of other tattoos you admire are genuinely helpful — they give your artist a clear read on your style and expectations.",
  },
  {
    question: "What if I do not like the first design?",
    answer:
      "No problem at all. Revisions during the design phase are unlimited. We will not tattoo anything until you are completely happy with the artwork and its placement.",
  },
  {
    question: "How do I prepare for my tattoo session?",
    answer:
      "Stay hydrated, eat a proper meal beforehand, avoid alcohol for 24 hours and get a good night's sleep. Wear comfortable clothing that gives easy access to the area being tattooed.",
  },
];

/* ==========================================================================
   Piercing
   ========================================================================== */

export type PiercingCategoryId = "ear" | "face" | "body";

export type Piercing = {
  slug: string;
  /** Display name, spelling-corrected. */
  name: string;
  price: number;
  category: PiercingCategoryId;
  icon: string;
  image: string;
  imageAlt: string;
  /** One line, used on the card. */
  desc: string;
  /** Longer general copy, used in detail blocks. */
  detail: string;
  /** Typical healing window. */
  healing: string;
  /** Typical jewellery options offered. */
  jewelry: string;
  featured?: boolean;
};

export const PIERCING_CATEGORIES: {
  id: PiercingCategoryId;
  label: string;
  blurb: string;
}[] = [
  {
    id: "ear",
    label: "Ear",
    blurb:
      "From a simple lobe stud to an industrial bar, the ear offers more placement options than anywhere else on the body.",
  },
  {
    id: "face",
    label: "Face",
    blurb:
      "Precision placements across the nose, lip, brow and septum. We will always talk you through how each one ages and heals.",
  },
  {
    id: "body",
    label: "Body",
    blurb:
      "Navel, dermal anchors, tongue and sternum work — performed with strict aseptic technique and aftercare support.",
  },
];

export const PIERCINGS: Piercing[] = [
  /* ---------------- Ear ---------------- */
  {
    slug: "standard-earlobe",
    name: "Standard Earlobe Piercing",
    price: 350,
    category: "ear",
    icon: "fa-circle-dot",
    image: pexels(7479508, 800),
    imageAlt: "Standard Earlobe Piercing",
    desc: "The classic stud placement in the soft lobe — the easiest entry point to being pierced.",
    detail:
      "A straight-forward gauge piercing through the lower, soft part of the earlobe. It is the most requested placement we do and the quickest to heal, which makes it a comfortable first piercing. We will advise on gauge and placement so your lobes stay balanced.",
    healing: "2-3 months",
    jewelry: "Implant-grade titanium studs, 14k gold, or plain surgical steel",
  },
  {
    slug: "tragus",
    name: "Tragus Piercing",
    price: 1000,
    category: "ear",
    icon: "fa-bullseye",
    image: pexels(4857708, 800),
    imageAlt: "Tragus Piercing",
    desc: "A small, precise piercing in the cartilage flap just in front of the ear canal.",
    detail:
      "The tragus sits directly in front of the ear canal and takes a discreet stud beautifully. Because it is cartilage, it heals more slowly than a lobe piercing and is more prone to irritation, so we use a straight, single-piece needle and recommend leaving the initial jewellery in for the full healing period.",
    healing: "6-12 months",
    jewelry: "Small titanium or gold studs, ball ends and small hoops",
  },
  {
    slug: "conch",
    name: "Conch Piercing",
    price: 1000,
    category: "ear",
    icon: "fa-compass",
    image: pexels(15799256, 800),
    imageAlt: "Conch Piercing",
    desc: "Placed in the deep bowl of the inner ear, framed neatly by the helix.",
    detail:
      "The conch is the curved shell of the inner ear. It is one of the most visible inner-ear placements and suits everything from a minimal stud to a full hoop or tunnel. Because it is a pronounced curve, healing takes patience — swelling is normal for the first few weeks.",
    healing: "6-12 months",
    jewelry: "Titanium and gold studs, hoops and septum-style rings",
  },
  {
    slug: "daith",
    name: "Daith Piercing",
    price: 1000,
    category: "ear",
    icon: "fa-fire",
    image: pexels(15743948, 800),
    imageAlt: "Daith Piercing",
    desc: "A curved cartilage piercing at the innermost fold, ideal for a hoop.",
    detail:
      "The daith sits in the deep fold where the upper cartilage meets the ear, and is almost always worn with a circular hoop. It is a demanding placement because of the angle of the fold, so we mark it with you in a mirror first and pierce it with a sterile, single-use hollow needle. Expect a long, slow heal.",
    healing: "6-12 months",
    jewelry: "Capture or fixed hoops in titanium, niobium or gold",
  },
  {
    slug: "flat",
    name: "Flat Piercing",
    price: 800,
    category: "ear",
    icon: "fa-leaf",
    image: pexels(7400019, 800),
    imageAlt: "Flat Piercing",
    desc: "A surface piercing set flat against the upper cartilage ridge of the ear.",
    detail:
      "A flat piercing passes through the ridge of cartilage that runs across the upper ear, sitting flush against it rather than through the fold. It is a surface piercing, so it takes longer to settle and must be cleaned very gently during the early weeks.",
    healing: "6-12 months",
    jewelry: "Flat-backed studs and small labret studs with long posts",
  },
  {
    slug: "industrial",
    name: "Industrial Piercing",
    price: 1800,
    category: "ear",
    icon: "fa-hammer",
    image: pexels(28469072, 800),
    imageAlt: "Industrial Piercing",
    desc: "A straight bar through the upper cartilage, linking two piercing points.",
    detail:
      "An industrial bar runs straight through the upper cartilage, linking the helix to the antihelix. It needs two clean piercing points and a good length of jewellery to sit correctly. It is one of the more involved cartilage placements, and one of the most striking when it is done well.",
    healing: "9-12 months",
    jewelry: "Titanium or gold straight bars, 14g to 16g",
  },
  {
    slug: "dimple",
    name: "Dimple Piercing",
    price: 1200,
    category: "face",
    icon: "fa-dot-circle",
    image: pexels(14001863, 800),
    imageAlt: "Dimple Piercing",
    desc: "A stud set into the cheek so the jewellery sits right in the natural dimple.",
    detail:
      "A dimple piercing passes through the cheek so the jewellery sits exactly where a dimple forms when you smile. The cheek is soft, vascular tissue, so we mark the placement with you in a mirror before we start and keep the jewellery low-profile while it settles. Expect more swelling than a lobe and a slower settle than most facial work.",
    healing: "3-6 months",
    jewelry: "Small titanium or gold studs, 16g to 18g",
  },

  /* ---------------- Face ---------------- */
  {
    slug: "nose",
    name: "Nose Piercing",
    price: 600,
    category: "face",
    icon: "fa-location-dot",
    image: pexels(7230416, 800),
    imageAlt: "Nose Piercing",
    desc: "A single nostril hoop or stud — our most popular facial placement.",
    detail:
      "The single nostril piercing is the most requested facial piercing we do. It suits a small hoop, a horseshoe or a simple stud depending on your anatomy. We will map your nostril shape first, because a placement that is too high or too low is difficult to change later.",
    healing: "3-6 months",
    jewelry: "Titanium or gold hoops, studs and seamless rings",
  },
  {
    slug: "septum",
    name: "Septum Piercing",
    price: 1200,
    category: "face",
    icon: "fa-gem",
    image: pexels(13161481, 800),
    imageAlt: "Septum Piercing",
    desc: "A piercing through the nasal septum, worn with a ring, horseshoe or captive bead.",
    detail:
      "A septum piercing passes through the soft cartilage at the base of the nose. It can be worn as a ring, a horseshoe or a clicker with a captive bead. Placement is everything here — we mark the sweet spot between the nostrils so the jewellery sits level and symmetrical.",
    healing: "3-6 months",
    jewelry: "Seamless titanium rings, horseshoes and clickers",
  },
  {
    slug: "eyebrow",
    name: "Eyebrow Piercing",
    price: 1000,
    category: "face",
    icon: "fa-star",
    image: pexels(16744733, 800),
    imageAlt: "Eyebrow Piercing",
    desc: "A stud through the brow tail or arch, a subtle placement with real character.",
    detail:
      "An eyebrow piercing sits just under the brow line, usually toward the arch or tail. It reads as a small detail rather than a statement, which is exactly why it suits people who want something visible but quiet. The skin here is thin and moves a lot, so we mark the placement with you in a mirror before we start.",
    healing: "2-3 months",
    jewelry: "Small titanium or gold studs, 18g",
  },
  {
    slug: "labret",
    name: "Labret Piercing",
    price: 1000,
    category: "face",
    icon: "fa-comment",
    image: pexels(36269316, 800),
    imageAlt: "Labret Piercing",
    desc: "A stud or ring in the lower lip, below the centre line of the mouth.",
    detail:
      "A labret piercing sits in the lower lip, below the centre of the mouth, and is one of the quickest facial placements to heal. It works well as a simple stud or with a small ring. We always place it below the lip line so it does not sit in the way of everyday movement.",
    healing: "2-3 months",
    jewelry: "Titanium or gold studs and small hoops",
  },
  {
    slug: "smiley",
    name: "Smiley Piercing",
    price: 1200,
    category: "face",
    icon: "fa-smile",
    image: pexels(3762442, 800),
    imageAlt: "Smiley Piercing",
    desc: "A piercing in the upper lip that curls upward when you smile.",
    detail:
      "A smiley piercing sits in the upper lip groove just above the teeth. Its name is literal — the ridge rolls up visibly into a smile. It is a more demanding placement than a labret, and it is prone to bumping against teeth during eating, so we will talk through aftercare in detail.",
    healing: "3-6 months",
    jewelry: "Titanium or gold ball studs, 16g to 18g",
  },
  {
    slug: "web",
    name: "Web Piercing",
    price: 1500,
    category: "face",
    icon: "fa-link",
    image: pexels(5546472, 800),
    imageAlt: "Web Piercing",
    desc: "A small piercing in the web of skin under the tongue, hidden until you show it.",
    detail:
      "A web piercing passes through the frenulum, the thin band of skin that connects the underside of your tongue to the floor of the mouth. It is a quick placement through delicate tissue, and it sits completely hidden while it heals, visible only when you stick your tongue out. We use the smallest practical gauge and give you a clear aftercare routine to protect it.",
    healing: "3-6 months",
    jewelry: "Small titanium or gold balls, 16g to 20g",
  },

  /* ---------------- Body ---------------- */
  {
    slug: "belly",
    name: "Belly Piercing",
    price: 1400,
    category: "body",
    icon: "fa-circle",
    image: pexels(4224435, 800),
    imageAlt: "Belly Piercing",
    desc: "A navel piercing, worn as a ring, horseshoe or a stud above the belly button.",
    detail:
      "A navel piercing is a staple for good reason — it is a strong placement that heals reliably. It can be worn as a classic ring, a horseshoe, or positioned above the belly button. Skin stretch from pregnancy, weight change or muscle development can affect the fit, so we will always check that the placement is stable for the long term.",
    healing: "6-12 months",
    jewelry: "Titanium or gold rings, horseshoes, arcs and studs",
  },
  {
    slug: "dermal",
    name: "Dermal Piercing",
    price: 2500,
    category: "body",
    icon: "fa-syringe",
    image: pexels(11560614, 800),
    imageAlt: "Dermal Piercing",
    desc: "An anchor set flat against the skin, commonly on the upper arms or lower back.",
    detail:
      "A dermal piercing is a surface anchor that sits completely flat against the skin rather than through it, so it reads as a small piece of jewellery from the outside. It is a genuinely advanced technique and one of the more involved procedures we perform. We will place it where your skin is stable and free of tension, then guide you on keeping the anchor clean as it knits in.",
    healing: "3-6 months",
    jewelry: "Flat titanium or gold anchors with a screw-on or friction-fit top",
  },
  {
    slug: "tongue",
    name: "Tongue Piercing",
    price: 1500,
    category: "body",
    icon: "fa-heart",
    image: pexels(29400911, 800),
    imageAlt: "Tongue Piercing",
    desc: "A barbell or ring through the centre of the tongue.",
    detail:
      "A tongue piercing goes through the muscular centre of the tongue, usually as a barbell or a ring. It heals quickly but is more prone to swelling in the first couple of weeks, which affects what you can eat. We will place it clear of the gum line and talk you through a soft-diet recovery.",
    healing: "4-8 months",
    jewelry: "Titanium or gold barbells, rings and curved bars",
  },
  {
    slug: "sternum",
    name: "Sternum Piercing",
    price: 3500,
    category: "body",
    icon: "fa-crown",
    image: pexels(8669369, 800),
    imageAlt: "Sternum Piercing",
    desc: "A horizontal bar across the hollow of the throat, high on the sternum.",
    detail:
      "A sternum piercing runs horizontally across the hollow at the base of the throat. The bone here is dense and close to the surface, which makes this one of the most technically demanding placements we offer and one that hurts most during the pass. It is also one of the most striking. We assess bone depth carefully before committing to the placement.",
    healing: "6-12 months",
    jewelry: "Titanium or gold straight bars, 14g to 16g",
  },
];

/** Cheapest piercing on the menu, used for "from ₹X" copy. */
export const PIERCING_ENTRY_PRICE = Math.min(...PIERCINGS.map((p) => p.price));

export function piercingsByCategory(id: PiercingCategoryId): Piercing[] {
  return PIERCINGS.filter((p) => p.category === id);
}

export const PIERCING_INTRO: string[] = [
  "Every piercing is carried out with a sterile, single-use hollow needle — never a gun — by a piercer who works exclusively in body piercing. We use implant-grade titanium and 14k gold jewellery, and we will not rush a placement to suit a faster appointment slot.",
  "Your price includes the piercing, a pair of jewellery of your choice, a printed aftercare guide and a complimentary check-up during healing. If anything feels wrong in the weeks that follow, come back to us — aftercare advice is always free.",
];

export const PIERCING_FAQS: Faq[] = [
  {
    question: "Do the prices include jewellery?",
    answer:
      "Yes. Every listed price covers the piercing procedure plus a pair of jewellery of your choice in implant-grade titanium or 14k gold. If you would like to upgrade to a different piece or a precious metal, we will quote the difference before your appointment.",
  },
  {
    question: "Do you use a piercing gun?",
    answer:
      "No. We use a sterile, single-use hollow needle for every piercing. Needles are cleaner and more precise than guns, which cannot be autoclaved properly and force the tissue rather than displacing it. A needle also means less trauma and a much better result.",
  },
  {
    question: "How long does a piercing take to heal?",
    answer:
      "It depends entirely on the placement. Soft tissue such as the lobe and lower lip typically settles in two to three months, while cartilage placements like the conch, daith and industrial can take six to twelve. Every card on this page lists the typical healing window for that specific placement.",
  },
  {
    question: "What should I avoid after getting pierced?",
    answer:
      "For the first few weeks: no swimming, baths, saunas or swimming pools; keep the area clean with sterile saline and do not touch it with unwashed hands; avoid sleeping on that side; and do not remove or change the jewellery until the piercing is fully healed. We give you a printed guide at your appointment.",
  },
  {
    question: "What if my piercing feels irritated?",
    answer:
      "Mild swelling, tenderness and a small amount of clear or milky discharge are completely normal in the early weeks and are not signs of infection. Come and see us if you develop spreading redness, increasing pain, warmth or yellow-green discharge. Aftercare checks are always free of charge.",
  },
  {
    question: "Can I get multiple piercings in one appointment?",
    answer:
      "Yes, and it is often more comfortable than coming back repeatedly. Your piercer will confirm at the consultation which combination can be done safely in a single sitting, and will be clear about anything that is better spaced out.",
  },
];

/* ==========================================================================
   Top-level service entries
   ========================================================================== */

export type ServiceEntry = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  desc: string;
  priceLabel: string;
  href: string;
  image: string;
  imageAlt: string;
  benefits: string[];
};

export const SERVICES: ServiceEntry[] = [
  {
    slug: "permanent-tattoo",
    title: "Permanent Tattoo",
    shortTitle: "Permanent Tattoo",
    icon: "fa-pen-nib",
    desc: "Custom artwork in every style, from fine line to full-colour realism, designed and tattooed by award-winning artists.",
    priceLabel: `${inr(TATTOO_RATE_PER_INCH)} / inch`,
    href: "/services/permanent-tattoo",
    image: pexels(37023014, 800),
    imageAlt: "Permanent Tattoo",
    benefits: [
      "Flat rate pricing per inch of design",
      "Unlimited revisions before we tattoo",
      "Single-use sterile equipment",
      "Free aftercare kit and touch-up",
    ],
  },
  {
    slug: "piercing",
    title: "Piercing",
    shortTitle: "Piercing",
    icon: "fa-circle-notch",
    desc: "Seventeen ear, face and body placements performed with a sterile hollow needle and implant-grade jewellery.",
    priceLabel: `From ${inr(PIERCING_ENTRY_PRICE)}`,
    href: "/services/piercing",
    image: pexels(5386358, 800),
    imageAlt: "Professional Piercing",
    benefits: [
      "Seventeen placements, every price listed",
      "Jewellery included in the price",
      "Titanium and 14k gold as standard",
      "Free aftercare checks while healing",
    ],
  },
];

/**
 * The home page service grid. The two bookable services lead, followed by the
 * permanent-tattoo styles we most commonly get asked for — every card routes
 * somewhere real.
 */
export const HOME_SERVICE_CARDS = [
  {
    icon: "fa-pen-nib",
    title: "Permanent Tattoo",
    desc: `Bespoke artwork at a flat ${inr(TATTOO_RATE_PER_INCH)} per inch. Every line tells a story.`,
    href: "/services/permanent-tattoo",
    image: pexels(37023014, 800),
  },
  {
    icon: "fa-camera",
    title: "Realism",
    desc: "Photographic precision that captures every detail and emotion.",
    href: "/services/permanent-tattoo",
    image: pexels(1304469, 800),
  },
  {
    icon: "fa-droplet",
    title: "Black & Grey",
    desc: "Timeless monochromatic art with stunning depth and contrast.",
    href: "/services/permanent-tattoo",
    image: pexels(6593483, 800),
  },
  {
    icon: "fa-palette",
    title: "Colour Tattoos",
    desc: "Vibrant, deliberate colour that stands the test of time.",
    href: "/services/permanent-tattoo",
    image: pexels(10552040, 800),
  },
  {
    icon: "fa-circle-notch",
    title: "Piercing",
    desc: `Seventeen placements, jewellery included. From ${inr(PIERCING_ENTRY_PRICE)}.`,
    href: "/services/piercing",
    image: pexels(4121065, 800),
  },
  {
    icon: "fa-undo-alt",
    title: "Cover-Ups",
    desc: "Transform old ink into something you will love again.",
    href: "/services/permanent-tattoo",
    image: pexels(18078748, 800),
  },
];

/**
 * The two card-level services shown on the homepage "Premium Services" grid.
 * Only the top-level services - the style cards above are used for galleries.
 */
export const HOME_PRIMARY_SERVICES = [
  {
    icon: "fa-pen-nib",
    title: "Permanent Tattoo",
    desc: `Bespoke artwork at a flat ${inr(TATTOO_RATE_PER_INCH)} per inch. Every line tells a story.`,
    href: "/services/permanent-tattoo",
    image: 'https://img.magnific.com/free-photo/master-making-tattoo-with-iron_23-2147834107.jpg?t=st=1791197349~exp=1791200949~hmac=33c22370c49d4a0a106f4226d1b57d042b3300eef0752995464aa3f816af5dfb&w=1060',
  },
  {
    icon: "fa-circle-notch",
    title: "Piercing",
    desc: `Seventeen placements, jewellery included. From ${inr(PIERCING_ENTRY_PRICE)}.`,
    href: "/services/piercing",
    image: pexels(3214241, 800),
  },
];
