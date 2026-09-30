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

**This goal is now partially superseded — see "Session log" below.** The user has
intentionally redesigned the service offering and several page sections away from the
static source. Where the two conflict, the session log wins. Fidelity still applies to
everything the log does not mention.

## Session log — 2026-09-30

The studio is now **Permanent Tattoo + Piercing only**. The old "custom tattoos" service
was reframed, a piercing service was added, and several page sections were redesigned.
All service pricing is **₹ INR**. Read this before touching services, the homepage,
About, Our Work, or the footer.

### Business content

- **Canonical route is `/services/permanent-tattoo`** (singular "tattoo"), chosen by me
  because the user wrote the route both ways. `/services/custom-tattoos` **and**
  `/services/permanent-tattoos` both 308-redirect to it (`next.config.ts`).
- `/services` lists exactly **two** top-level services: Permanent Tattoo, Piercing.
- Flat tattoo rate **₹800 per inch**. `TATTOO_PRICING.unit` is `/inch` — every tier
  must carry it or `PricingGrid` falls back to `/hr` (this shipped broken once).
- 17 piercings, prices as the user supplied: Standard Earlobe 350 · Tragus 1000 ·
  Conch 1000 · Daith 1000 · Flat 800 · Industrial 1800 · Dimple 1200 · Nose 600 ·
  Septum 1200 · Eyebrow 1000 · Labret 1000 · Smiley 1200 · Web 1500 · Belly 1400 ·
  Dermal 2500 · Tongue 1500 · Sternum 3500.
- Spelling corrections the user asked for: **"Lebrat" → "Labret"**, **"Standard Ear
  lobe" → "Standard Earlobe"**. The other 15 names were correct as given — do not
  "correct" them further.
- All service content is centralised in `src/lib/services.ts`. Change copy or prices
  there, not in the page files.

### Section redesigns

| Where | Change |
|---|---|
| Homepage "Premium Services" | 2 cards only, `services-grid--two`, square `aspect-ratio: 1/1`, premium redesign (index numeral, gold icon badge, gold rule under heading, outlined gold "Learn More" pill that fills on hover, gold hover glow replacing the red glow) |
| Homepage "Featured Work" | Tabs are now **All / Permanent Tattoos / Piercing**; 6 items recategorised 3+3 |
| Homepage "Our Artist" | 4-up grid → one `FeaturedArtist`, portrait left / profile right |
| Homepage Testimonials | Arrows removed (`Navigation` module, button divs, their CSS, and the 50px `padding-bottom` that reserved room) |
| About "Meet The Artists" | `ArtistsGrid` → 4 `FeaturedArtist` blocks, alternating `reverse`, `compact` for a 1/1 frame |
| Our Work "Selected Works" | Tabs now **All / Permanent Tattoos / Piercing**; gallery 9 → 17 items (8 piercings added) |
| Footer | Heading `Services` → **"Popular Services"**; 5 links, Permanent Tattoos first + 4 deep-linked piercings |

`FeaturedArtist` has **no CTA button** — the user removed it on both pages, so
`href`/`ctaLabel` are gone from `FeaturedArtistData`.

### Deep links

Footer and `/services` link to `/services/piercing#<slug>`. `PiercingDetailList`
renders `id={piercing.slug}` and `.piercing-detail` already carries
`scroll-margin-top: calc(var(--nav-height) + 30px)`. The App Router ignores the hash on
client navigation, so `HashScroller` (mounted in `layout.tsx`) scrolls by hand — it
jumps **instantly, not smoothly**, because Lenis owns scroll position.

### Bugs found and fixed this session

- **`.services-grid` at 1024px was `1fr`**, but `../css/responsive.css` says
  `repeat(2, 1fr)`. Port bug, now corrected. Re-check the merged CSS against the three
  source CSS files when touching breakpoints.
- **`ScrollTrigger` went stale after images loaded.** `.portfolio-page-grid` is
  `repeat(auto-fill, minmax(350px, 1fr))` with no `grid-auto-rows`, and
  `.portfolio-page-item img` is `height: 100%` against an auto-height parent, so row
  heights are decided by when each hot-linked image lands. `GsapEffects` now re-refreshes
  once the last pending `document.images` entry settles. This is what broke the
  `/our-work` horizontal-scroll pin.
- `TATTOO_STYLES` items used `name` but `TextCard` expects `title` (typecheck failure).

### Open issues — not yet fixed

1. `src/lib/services.ts:338` — the daith detail claims "we use a professional piercing
   gun", which contradicts the hollow-needle-only policy stated elsewhere on the same
   page (and the FAQ at `:549` asks the question for the wrong answer). Needs a rewrite.
2. `src/app/services/page.tsx:160` says "the five most requested" but line 168 does
   `.slice(0, 6)` — six render. Either the copy or the slice is wrong.
3. `src/components/sections/ArtistsGrid.tsx` is now **dead code** — nothing imports it.
   Kept deliberately as a faithful port of the source `.artists-grid` markup. Safe to
   delete if the user wants.
4. `HorizontalScroll` on `/our-work` still carries tattoo-only titles ("Japanese Full
   Back", "Color Masterpiece") and now sits under a gallery that includes piercings.
5. **Nothing in the redesigned sections has been visually verified in a browser.**

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
| `../services/custom-tattoos.html` | `/services/permanent-tattoo` (renamed) |
| — new | `/services/piercing` |

`/services/custom-tattoos` and `/services/permanent-tattoos` both 308-redirect to
`/services/permanent-tattoo`. Seven routes prerender static.

## Source of truth for content

Before changing any copy, image ID, or class name, read the original HTML. The ports
are verbatim from:

- `../css/style.css` — layout, components, design tokens
- `../css/animations.css` — reveal effects, visual effects
- `../css/responsive.css` — breakpoints
- `../js/main.js` — vanilla behaviour classes (port these to React)
- `../js/animations.js` — GSAP/ScrollTrigger/Swiper setup

All three CSS files are merged into `src/app/globals.css` (2912 lines). Do not
"modernise" it — the fidelity requirement means the selectors stay as-is. New
components added in the 2026-09-30 session append their own blocks; prefer a scoped
modifier (`.services-grid--two`, `.artist-feature--reverse`) over editing a shared
source rule.

**When touching any breakpoint, diff against the source.** `../css/responsive.css` is
the authority and the merge has already drifted once (see session log).

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
| `src/lib/services.ts` | **all** service content: rates, 17 piercings, FAQs, galleries, home cards, `inr()` |
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
| `src/components/fx/HashScroller.tsx` | **new** — client-nav hash scrolling for `#slug` deep links |
| `src/components/fx/GsapEffects.tsx` | `initGSAPAnimations()` (js/animations.js) |
| `src/components/sections/PortfolioExplorer.tsx` | `PortfolioFilter` + `Lightbox`, `variant="home" \| "page"`, `filterLabels` |
| `src/components/sections/FeaturedArtist.tsx` | **new** — replaces `.artists-grid` on home + About; `reverse` / `compact` |
| `src/components/sections/PiercingGrid.tsx` | **new** — `.piercing-grid` cards |
| `src/components/sections/PiercingDetailList.tsx` | **new** — `.piercing-detail` rows, owns the `#slug` ids |
| `src/components/sections/RateCard.tsx` | **new** — `.rate-card`, the ₹800/inch panel |
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
- **The App Router ignores `location.hash` on client navigation.** It scrolls to top
  instead. Any `#anchor` link needs manual handling — see `HashScroller`.
- **`aspect-ratio` + grid item sizing.** `.portfolio-page-grid` has no `grid-auto-rows`,
  so rows size to their images and reflow late; the automatic minimum size is what stops
  `aspect-ratio` cards from clipping, not an explicit height.
- **Delete a route by removing the page *and* rebuilding.** `.next/types/validator.ts`
  and `.next/dev/types/validator.ts` keep stale route types; `rm -rf .next` before
  trusting a `tsc --noEmit` result.

## Verification status

Passing:

```
npx tsc --noEmit     # clean
npm run lint         # clean
npm run build        # 7 routes prerendered static
next start + fetch   # 200 on all 7 routes, both 308 redirects land
```

Prerendered HTML was diffed against the source markup for all six *original* routes —
class names, nesting, item counts (14 `.marquee-item`, 6 `.service-card`, 6
`.portfolio-item`, 4 `.artist-card`, 4 `.stat-item`, 3 `.swiper-slide`, one
`.swiper-wrapper`) all matched. The two new service routes were verified by grepping
the served HTML for all 17 names + prices and both 308 targets.

**Not yet verified: browser pixel parity.** No screenshot comparison against the
original has been run, and none of the 2026-09-30 redesigns have been looked at in a
browser. Font rendering, image loading, GSAP timing, and responsive breakpoints are
unconfirmed. This is the main outstanding item — see "Next steps".

## Next steps

1. **Visual check of the redesigned sections** (the gap). Serve the original
   (`npx serve ..`) and this app side by side, capture home / about / our-work /
   services at desktop and mobile widths, and diff.
2. Fix the four open issues in the session log — the daith "piercing gun" copy and the
   "five most requested" count are content bugs; `ArtistsGrid` and the
   `HorizontalScroll` titles are cleanup.
3. Confirm the loader, custom cursor, and scroll effects — these are client-only and
   cannot be checked in static HTML.
4. Check GSAP scroll-triggered animations actually fire at the right scroll positions,
   especially the `/our-work` pin after the image-load refresh.

## Known deliberate deviation

The loader replays on **every** client-side navigation (`<LoaderRun key={pathname} />`).
This matches the static site, where every nav was a full document load. If first-load-only
is preferred, drop the `key`.
