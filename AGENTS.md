<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Inkspiration — static site → Next.js 16 migration

## Goal

Clone the static site at `../` into this Next.js app (`animate-next/`) as an **exact
replica**: same routes, markup, class names, copy, images, fonts, animations, and
interactions. The original static site is the source of truth and is **intentionally
unmodified** — do not edit `../*.html`, `../css/`, or `../js/`.

## Stack

Next.js `16.3.7` (Turbopack default) · React `19.2.8` · TypeScript · App Router with
`src/` · Tailwind CSS v4.

Pinned deps (exact, no carets): `gsap@3.12.5`, `lenis@1.1.20`, `swiper@11.2.10`,
`@fortawesome/fontawesome-free@6.5.1`.

## Routes

| Source file | Route |
|---|---|
| `../index.html` | `/` |
| `../about.html` | `/about` |
| `../services.html` | `/services` |
| `../our-work.html` | `/our-work` |
| `../contact.html` | `/contact` |
| `../services/custom-tattoos.html` | `/services/custom-tattoos` |

## Source of truth for content

Before changing any copy, image ID, or class name, read the original HTML. The ports
are verbatim from:

- `../css/style.css` — layout, components, design tokens
- `../css/animations.css` — reveal effects, visual effects
- `../css/responsive.css` — breakpoints
- `../js/main.js` — vanilla behaviour classes (port these to React)
- `../js/animations.js` — GSAP/ScrollTrigger/Swiper setup

All three CSS files are merged into `src/app/globals.css` (2912 lines). Do not
"modernise" it — the fidelity requirement means the selectors stay as-is.

## Hard constraints for this project

- **Plain `<img>`, never `next/image`.** The original hot-links Pexels by ID at fixed
  widths. `src/lib/site.ts` has a `pexels(id, width)` helper. Changing to `next/image`
  would alter the request URLs and break parity.
- **The hero video is local.** Source is `../assets/videos/hero-bg.mp4`, copied to
  `public/videos/hero-bg.mp4`, referenced as `/videos/hero-bg.mp4`.
- **`gsap.context()` + `ctx.revert()` in `GsapEffects`.** The App Router keeps client
  components mounted across navigations; without revert, ScrollTriggers accumulate.
  Also re-run on `usePathname()` change and call `ScrollTrigger.refresh()`.
- **`LightboxProvider` must wrap page content** in `layout.tsx` so route components can
  call `useLightbox()` to register gallery sources.
- **Keep the index-only footer tagline.** `index.html` has "Premium tattoo studio
  crafting timeless art since 2014. **Where vision meets skin.**"; no other page has the
  second sentence. `FooterTagline.tsx` is route-aware via `usePathname()`.
- **Do not use Tailwind utilities for source styling.** Tailwind is a bridge for
  convenience only; the source CSS owns the appearance. Inline `style={{ marginTop: 32 }}`
  matching the original is preferred over `!mt-8`. Earlier `!mt-8` / `!mt-[60px]` usages
  were replaced for exactly this reason.

## Component map

| Path | Ports from |
|---|---|
| `src/lib/site.ts` | links, phone, studio info, `pexels()` |
| `src/components/chrome/SiteHeader.tsx` | `Navigation` + `ActiveNav` (js/main.js) |
| `src/components/chrome/SiteFooter.tsx` | `.footer` markup |
| `src/components/chrome/Loader.tsx` | `Loader` class |
| `src/components/chrome/CustomCursor.tsx` | `CustomCursor` class |
| `src/components/chrome/LightboxProvider.tsx` | `Lightbox` class |
| `src/components/chrome/WhatsAppFloat.tsx` | `.whatsapp-float` |
| `src/components/fx/SmoothScroll.tsx` | `SmoothScroll` class (Lenis) |
| `src/components/fx/ScrollReveal.tsx` | `ScrollReveal` class (IntersectionObserver) |
| `src/components/fx/CounterAnimation.tsx` | `CounterAnimation` class |
| `src/components/fx/MagneticButtons.tsx` | `MagneticButtons` class |
| `src/components/fx/ServiceCardBackgrounds.tsx` | `initServiceCardImages()` |
| `src/components/fx/GsapEffects.tsx` | `initGSAPAnimations()` (js/animations.js) |
| `src/components/sections/PortfolioExplorer.tsx` | `PortfolioFilter` + `Lightbox`, `variant="home" \| "page"` |
| `src/components/sections/TestimonialsSwiper.tsx` | `.testimonials` swiper |
| `src/components/sections/CompareSection.tsx` | `CompareSlider` class |
| `src/components/sections/FaqList.tsx` | `FAQ` class |
| `src/components/sections/ContactSection.tsx` | contact form + `ContactForm` class |

## Next 16 gotchas already hit

- **`next lint` is removed** in 16 — the `lint` script calls `eslint` directly.
- **`middleware` → `proxy`** rename; `edge` runtime unsupported in `proxy`. Not used here.
- **Async request APIs** (`params`, `searchParams`, `cookies`, `headers`) are strictly
  async — sync access is gone. Not needed here (all pages are static).
- **Oswald has no 900 weight** on Google Fonts. `layout.tsx` loads 200–700 and the CSS
  still requests 900, so the browser synthesises the weight — same as the original.
- **Lenis 1.1.20** has no `smoothTouch` option; remove it if reintroduced.
- **Swiper React** requires `SwiperSlide` children. Hand-written `.swiper-wrapper` /
  `.swiper-slide` divs produce a *duplicate* empty wrapper as a sibling. Import
  `{ Swiper, SwiperSlide }` from `swiper/react` (no default export).
- **Swiper navigation** uses selector strings (`".swiper-button-next"`), not refs —
  `react-hooks/refs` errors on ref access during render.

## Verification status

Passing:

```
npx tsc --noEmit     # clean
npm run lint         # clean
npm run build        # 6 routes prerendered static
next start + fetch   # 200 on all 6 routes
```

Prerendered HTML was diffed against the source markup for all six routes — class
names, nesting, item counts (14 `.marquee-item`, 6 `.service-card`, 6 `.portfolio-item`,
4 `.artist-card`, 4 `.stat-item`, 3 `.swiper-slide`, one `.swiper-wrapper`) all match.

**Not yet verified: browser pixel parity.** No screenshot comparison against the
original has been run. Font rendering, image loading, GSAP timing, and responsive
breakpoints are unconfirmed. This is the main outstanding item — see "Next steps".

## Next steps

1. **Visual regression check** (the gap). Serve the original (`npx serve ..`) and this
   app side by side, capture all 6 routes at desktop and mobile widths, and diff.
2. Confirm the loader, custom cursor, and scroll effects — these are client-only and
   cannot be checked in static HTML.
3. Check GSAP scroll-triggered animations actually fire at the right scroll positions.

## Known deliberate deviation

The loader replays on **every** client-side navigation (`<LoaderRun key={pathname} />`).
This matches the static site, where every nav was a full document load. If first-load-only
is preferred, drop the `key`.
