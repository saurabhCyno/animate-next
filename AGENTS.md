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

> The gallery item counts in the "Section redesigns" table below were superseded on
> 2026-10-05 — the portfolio is now file-driven. See that log.

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
### Open issues — status after the 2026-10-05 session

Re-checked on 2026-10-05. Items 1–2 are **still open content bugs**; 3–4 are now dead
code rather than wrong copy; 5 is unchanged.

1. `src/lib/services.ts:329` — the daith detail still claims "we use a professional
   piercing gun", which contradicts the hollow-needle-only policy stated elsewhere on the
   same page (and the FAQ at `:540` asks the question for the wrong answer). Needs a
   rewrite. **Still open.**
2. `src/app/services/page.tsx:160` says "the five most requested" but line 168 does
   `.slice(0, 6)` — six render. Either the copy or the slice is wrong. **Still open.**
3. `src/components/sections/ArtistsGrid.tsx` — **dead code**, nothing imports it. Kept
   deliberately as a faithful port of the source `.artists-grid` markup.
4. ~~`HorizontalScroll` tattoo-only titles~~ — **resolved by removal.** The strip is
   disabled on `/our-work` and its `SCROLL_ITEMS` Pexels data was deleted. The component
   itself is now unused too.
5. **Nothing in the redesigned sections has been visually verified in a browser.** This
   is still the biggest gap, and it now includes the new media library and video tiles.
6. **New:** the testimonial avatar images are still hot-linked Pexels stock photos, so
   three Indian client names are attached to unrelated faces. There is no portrait media
   in `public/images` yet.
7. **New:** `public/images/piercing/ear-pericing/` is misspelled while
   `public/videos/piercing/ear-piercing/` is not. Both render as "Ear Piercing" (the
   label builder tolerates either), so it is cosmetic — but it will show up in URLs.

## Session log — 2026-10-05

Two threads: the portfolio galleries became **file-driven** instead of hardcoded Pexels
placeholders, and the site copy was rewritten to an **Indian, single-artist** studio.
The user made several of the content edits themselves — read the files before assuming
older values.

### What this session changed, in order

1. `src/assets/` (images the user dropped in) **moved to `public/images/`** — plain
   `<img>` cannot reference `src/assets`, and the lightbox needs a servable URL.
2. `src/lib/gallery.ts` created: scans both media libraries at build time.
3. Home, `/our-work` and `/services/permanent-tattoo` rewired to it; every hardcoded
   portfolio array deleted.
4. The three work clips moved into `public/videos/<category>/…` so they file under the
   same tabs the stills do. The user chose this layout over filename-based guessing.
5. `LightboxProvider` taught to play video; `PortfolioExplorer` renders `<video>` tiles.
6. Testimonials + About artist roster rewritten Indian, then the user cut the roster to
   one artist and added `/images/artist.jpg`.
7. The permanent-tattoo page's "Designed For You" section now plays a real clip.
8. Dead imports from the user's own edits cleaned up (lint back to zero warnings).
9. About's "Inkspiration Legacy" paragraph still named **Marcus Chen** as the founder
   after the artist was renamed — corrected to Karan Bakshi. `grep` confirms no old
   artist name survives anywhere in `src/`. **If the founder is ever renamed, it is a
   find-and-replace across `app/page.tsx` (the `FEATURED_ARTIST` block *and* the Rohan
   Mehta testimonial, which names him) plus `app/about/page.tsx` (`STORY` + `ARTISTS`).**

### Media library

`src/lib/gallery.ts` scans `public/images` and `public/videos` at build time and derives
the `PortfolioExplorer` items from them. **Adding media needs no code change** — drop the
file in the right folder and rebuild. Both libraries use the same two shapes:

```
public/images/
  permanent-tattoos/<name>.jpg    -> "Permanent Tattoos" tab
  piercing/<type>/<name>.jpg      -> "Piercing" tab, one folder per placement type

public/videos/
  permanent-tattoos/<name>.mp4    -> "Permanent Tattoos" tab
  piercing/<type>/<name>.mp4      -> "Piercing" tab, one folder per placement type
```

- Accepted extensions: images `.jpg .jpeg .png .webp .avif`; video `.mp4 .mov .webm .m4v`.
- Titles and alt text are derived from the filename: `shiv-krishna.jpeg` → "Shiv Krishna".
- The piercing tab's per-item meta is derived from its folder: `ear-piercing/` →
  "Ear Piercing" (a trailing `piercing`/`pericing` word is dropped).
- Files sitting directly in `public/images` or `public/videos` are ignored on purpose —
  `videos/hero-bg.mp4` is a page asset, not portfolio work. Portfolio media always belongs
  in one of the category folders.
- Tattoos sort first, so the "All" tab leads with permanent work. Within a category, stills
  come before clips.
- The tab list and labels are exported as `PORTFOLIO_FILTERS` / `PORTFOLIO_FILTER_LABELS`;
  don't re-declare them per page.
- **The files live in `public/`, not `src/assets/`** — plain `<img>` / `<video>` need a
  servable URL, and the lightbox registers the same string as the `src`.
- **`gallery.ts` reads `node:fs`, so it is server-only.** Importing it from a client
  component breaks the build. All consuming routes are prerendered, so the scan happens
  once per build.
- `PortfolioExplorer` now keys items by `image` (paths are unique; titles may not be).

### Video playback

`PortfolioItemData.type` (`"image" | "video"`) decides which tag `PortfolioExplorer`
renders; video tiles get a `.portfolio-play` badge. `LightboxProvider` still registers bare
paths, so it sniffs the extension (`VIDEO_PATTERN`) to decide between `<img>` and a
`<video controls autoPlay playsInline>`. The slide is rendered **only while the lightbox is
open** — the container is always mounted (`opacity: 0`), so rendering the clip
unconditionally would leave it playing behind a closed lightbox.

Autoplay is not muted, so a browser that blocks sound-on-autoplay shows the controls
instead of playing silently. That is deliberate.

### Removed

All Pexels placeholder data behind the galleries is gone: `HOME_WORK` (home), `WORK`
(`/our-work`), and `TATTOO_GALLERY` + the `GalleryImage` type (`services.ts`). The two
`PortfolioExplorer` call sites and the permanent-tattoo page now read `gallery.ts`.

Dead code, deliberately **kept** (delete if the user wants): `src/components/sections/`
`ArtistsGrid.tsx` and `HorizontalScroll.tsx` — nothing imports either any more. Both are
faithful ports of source markup, so they are cheap to restore.

### Content the user rewrote themselves

The user edited these directly — read the files before assuming the old values:

- **The studio has one artist: Karan Bakshi** (founder & master artist), portrait
  `/images/artist.jpg`. Both the homepage "Our Artist" block and About's "Meet The
  Artist" section use it; the roster on About was cut from four `FeaturedArtist`
  blocks down to one, and the subtitle is now "One artist, one standard."
- **Testimonials** on the homepage are Indian clients (Rohan Mehta, Ananya Iyer,
  Arjun Nair) covering realism, fine line and a piercing, priced from the real
  `PIERCINGS` / `TATTOO_PRICING` figures. The avatar images are still Pexels.
- `HorizontalScroll` is **disabled** on `/our-work` (the `SCROLL_ITEMS` Pexels block
  was deleted). `src/components/sections/HorizontalScroll.tsx` is now unused but kept.
- The "Designed For You" section on `/services/permanent-tattoo` renders the first
  tattoo clip in the media library as an autoplaying muted loop
  (`TATTOO_MEDIA.find(m => m.type === "video")`), with a tattoo still as its poster.
  `.about-image-wrapper img, video` share one rule so the clip keeps the original
  600px / 400px cover treatment.

## Session log - 2026-10-06

> **Superseded same day** — the `PIERCING_CARD_IMAGES` override described here was
> removed later on 2026-10-06; all imagery now lives in `PIERCINGS[].image`. See
> "Later on 2026-10-06" below.

The six piercing cards on `/services` now use **area-specific close-ups** instead of
shared `PIERCINGS[].image` values. The override is local to
`src/app/services/page.tsx`: `PIERCING_CARD_IMAGES` (slug-keyed) is applied as
`data-bg={PIERCING_CARD_IMAGES[piercing.slug] ?? piercing.image}`.

Why: four of the six shared images were **face portraits**, not shots of the
placement — verified against Pexels' own alt text, not by eye:

| card | was | now |
|---|---|---|
| Standard Earlobe | 7400018 ear, multiple piercings, low light | 7479508 ear + diamond stud |
| Nose | 9164794 side profile with nose piercing (already right) | 9164794, unchanged |
| Flat | 30579113 face portrait, red hair | 7400019 ear + emerald stud |
| Tragus | 20858257 face portrait, bold makeup | 4857708 ear piercings, light backdrop |
| Conch | 3396041 face portrait, blue hair | 15799256 ear + multiple piercings |
| Daith | 31939281 face portrait, tattooed | 7667083 ear + silver hoop |

- **Scoped to `/services` only.** `PIERCINGS[].image` is untouched, so the piercing
  page's grid and detail rows still serve the originals — confirmed by grepping the
  prerendered HTML of both routes.
- Images were **never eyeballed** (this model cannot view images). Candidates were
  chosen from Pexels alt text scraped through `r.jina.ai` on the search pages for
  "nose/earlobe/tragus/daith/flat/helix/inner ear/cartilage piercing"; all six CDN
  urls returned `200`. Treat placement-level accuracy for tragus/conch/daith as
  approximate — Pexels has no photos specific to those three placements.
- **`npm run lint` now has 1 warning**: `CompareSection` unused in
  `src/app/our-work/page.tsx`, caused by an uncommitted edit commenting out
  `<CompareSection />`. Not introduced by this session; `npx tsc --noEmit` and
  `npm run build` are clean (7 routes prerendered).
- **New rule, appended to the end of `globals.css`** (not in the source CSS — a
  deliberate deviation): `@media (hover: none), (max-width: 768px)` sets
  `.service-card[data-bg]::before/::after` to `opacity: 1` and drops `::after`
  back to `scale(1)`. Touch can't hover, so the card's hover art (photo + 0.7 black
  wash) rests visible on mobile. The lift/shadow/border of `:hover` are deliberately
  not rest-applied. Keep this when diffing breakpoints against `../css/responsive.css`
  — it is intentional drift, not merge error.

### Later on 2026-10-06 — shared data, hero videos, intro video

**`PIERCING_CARD_IMAGES` removed.** All piercing imagery is now single-sourced from
`PIERCINGS[].image` in `src/lib/services.ts`; `/services` cards render
`data-bg={piercing.image}` again. Changing an image once fixes both routes.

**All 17 piercing images replaced** (candidates chosen from Pexels alt text only —
this model cannot view images; the user reviews by eye and rejects):

| placement | was → now |
|---|---|
| Standard Earlobe | 7400018 → 7479508 (ear + diamond stud) |
| Tragus | 20858257 → 4857708 (ear piercings) |
| Conch | 3396041 → 15799256 (ear + multiple piercings) |
| Daith | 31939281 → 7667083 → **15743948** (golden hoop close-up; 7667083 rejected by user) |
| Flat | 30579113 → 7400019 (ear + emerald stud) |
| Industrial | 36587163 → 28469072 (B&W ear, multiple piercings) |
| Dimple | 3309590 → 14001863 (smiling woman with dimples) |
| Nose | 9164794 → 7230416 (close-up "showcasing her nose piercing"; old one was a septum shot) |
| Septum | 39842853 → 13161481 (close-up showcasing septum) |
| Eyebrow | 2474502 → 16744733 (B&W close-up featuring eyebrow piercing) |
| Labret | 37722196 → 36269316 (lips close-up with piercing) |
| Smiley | 31603891 → 39842791 → **3762442** (smiling lips close-up; 39842791 rejected, 16212691 was a dead 404 id) |
| Web | 5871299 → 8058729 → **5546472** (tongue-out close-up; 8058729 rejected) |
| Belly | 18491011 → 4224435 (pierced belly button) |
| Dermal | 34041395 → 11560614 (collarbone + flat jewels) |
| Tongue | 36587165 → 29400911 (pierced tongue out) |
| Sternum | 35391766 → 8669369 (chest close-up) |

**Content corrections, confirmed with the user via the question tool:**

- **Dimple = cheek**, not inner ear. `category` changed `ear` → `face`, desc/detail
  rewritten to cheek wording; it now groups under Face on the piercing page.
- **Web = tongue web** (the frenulum under the tongue), not the hand web between
  thumb and index finger. desc/detail rewritten; `category: "face"` was already right.

**Hero videos:**

- The tattoo hero "not rendering" bug was a 404: `videoSrc` pointed at
  `/videos/The Real Gangsta Tattoo.mp4`, but the file lives in
  `public/videos/permanent-tattoos/`. Path corrected; verified in prerendered HTML.
- Piercing hero: `image={pexels(4121065, 1920)}` →
  `videoSrc="/videos/piercing/ear-piercing/Ear Piercing.mp4"` + `poster={pexels(4121065, 1920)}`.

**Intro section video:** the `<img>` in the `/services/piercing` intro
(`.about-image-wrapper reveal-right`) is now `<video src="/videos/piercing/lip-piercing/lip-piercing.mp4"
autoPlay muted loop playsInline>`, mirroring the tattoo page's intro; the old still
(32187703) became the `poster`. The existing `.about-image-wrapper img, video` rule
already gives videos the 600/400 cover treatment — no CSS was added.

**Open loose ends from this session:**

- Every image pick is an **alt-text guess**; the user validates by eye and rejects
  ones that look wrong (daith/nose/smiley/web each went through 1–2 swaps). Daith's
  current pick (15743948) may still be rejected — alternates offered: 11390512,
  13574852, 7400018. Keep this workflow: search via `r.jina.ai`, verify CDN url
  returns `200`, let the user look at it.
- **Stale `next start` servers on ports 3111/3112** serve an old build (their HTML
  references a deleted CSS hash → 404); a `next dev` runs on 3000. If the user says
  "images not updating", kill the stale servers first — the build itself was verified
  current by grepping `.next/server/app/*.html`.
- Dead Pexels ids found along the way (404 on CDN): 16212691, 69833.

## Session log - 2026-10-06 (later): About studio gallery

The "Our Studio" section on `/about` now uses the user's own photos and opens in
the lightbox.

- **Images**: the six hot-linked Pexels placeholders in `STUDIO`
  (`src/app/about/page.tsx`) were replaced with the four local files the user
  dropped in `public/images/studio/` — `studio-1.jpeg` … `studio-4.jpeg`, alt
  text "Inkspiration Studio Interior / Tattoo Studio Workspace / Studio Detail".
  `STUDIO` is the only gallery data on that page; no other file hardcodes studio
  images.
- **`StudioGallery.tsx` is now a client component.** It calls
  `useLightbox().register()` on mount and `open(index)` per image, the same
  pattern as `PortfolioExplorer`. The source `Lightbox` class (js/main.js) only
  ever bound `.portfolio-item` / `.portfolio-page-item`, so this is a deliberate
  deviation — the user asked for it. The existing `.lightbox img` rule already
  uses `object-fit: contain` at 90% viewport, so the click shows the **full,
  uncropped image**; no lightbox CSS was touched.
- **Layout deviation, appended to the end of `globals.css`** (after the service
  card touch block): `.studio-gallery` is forced to `repeat(2, 1fr)` at every
  breakpoint with square tiles (`aspect-ratio: 1/1`, `object-fit: cover`,
  `cursor: pointer`), and `.studio-gallery img:nth-child(1)` is neutralised back
  to `span 1` / `height: auto`. This overrides the source's featured-first-image
  `span 2` rows, its 300px row height, the 768px 1-col rule and the 480px 1-col
  rule — a flat 2×2 grid everywhere. Keep this block when diffing against
  `../css/style.css`; it is intentional drift, not merge error.
- Verified: `npx tsc --noEmit` and `npm run lint` clean (only the pre-existing
  `CompareSection` warning in `our-work/page.tsx`). A full `npm run build` was
  started but aborted by the user — re-run it before trusting prerender.

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
  would alter the request URLs and break parity. Portfolio media is local and lives under
  `public/images` for the same reason — see the 2026-10-05 session log.
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
| `src/lib/services.ts` | **all** service content: rates, 17 piercings, FAQs, home cards, `inr()` |
| `src/lib/gallery.ts` | **new** — server-only; scans `public/images` for the portfolio media |
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
| `src/components/sections/PortfolioExplorer.tsx` | `PortfolioFilter` + `Lightbox`, `variant="home" \| "page"`, `filterLabels`; renders `<video>` tiles when `item.type === "video"` |
| `src/components/chrome/LightboxProvider.tsx` | `Lightbox` class — **extended 2026-10-05** to play clips; sniffs the extension, renders only while open |
| `src/components/sections/FeaturedArtist.tsx` | **new** — replaces `.artists-grid` on home + About; `reverse` / `compact`; **one block per page since 2026-10-05** |
| `src/components/sections/PiercingGrid.tsx` | **new** — `.piercing-grid` cards |
| `src/components/sections/PiercingDetailList.tsx` | **new** — `.piercing-detail` rows, owns the `#slug` ids |
| `src/components/sections/RateCard.tsx` | **new** — `.rate-card`, the ₹800/inch panel |
| `src/components/sections/TestimonialsSwiper.tsx` | `.testimonials` swiper |
| `src/components/sections/CompareSection.tsx` | `CompareSlider` class |
| `src/components/sections/FaqList.tsx` | `FAQ` class |
| `src/components/sections/ContactSection.tsx` | contact form + `ContactForm` class |
| `src/components/sections/StudioGallery.tsx` | `.studio-gallery` markup — **client since 2026-10-06**, registers with the lightbox and opens on click |
| `src/components/sections/ArtistsGrid.tsx` | **dead** — superseded by `FeaturedArtist`, kept as a faithful port |
| `src/components/sections/HorizontalScroll.tsx` | **dead** — the `/our-work` call site was removed on 2026-10-05 |

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
- **Verify the built HTML with `[System.IO.File]::ReadAllText`, not `Get-Content -Raw`
  or `Select-String`.** PowerShell 5.1 defaults to ANSI, so the UTF-8 prerendered HTML
  comes back mojibake and greps return **false negatives** — a string that is really in
  the page reports `False`. This made a verification pass look like a failure. Use:
  `$h = [System.IO.File]::ReadAllText("$PWD\.next\server\app\index.html"); $h.Contains("Rohan Mehta")`.

## Verification status

Passing:

```
npx tsc --noEmit     # clean
npm run lint         # 1 warning only: CompareSection unused in our-work/page.tsx (user's own edit)
npm run build        # 7 routes prerendered static
next start + fetch   # 200 on all 7 routes, both 308 redirects land
```

Prerendered HTML was diffed against the source markup for all six *original* routes —
class names, nesting, item counts (14 `.marquee-item`, 6 `.service-card`, 6
`.portfolio-item`, 4 `.artist-card`, 4 `.stat-item`, 3 `.swiper-slide`, one
`.swiper-wrapper`) all matched. The two new service routes were verified by grepping
the served HTML for all 17 names + prices and both 308 targets.

The 2026-10-05 media library was verified the same way: `next start` returned
`200 image/jpeg` for all five images, `200 video/mp4` for the three work clips and
`hero-bg.mp4`, and `/`, `/our-work` and `/services/permanent-tattoo` were grepped for
their `/images/...` + `/videos/...` paths, derived titles, derived meta, the three
`data-filter` values and one `.portfolio-play` badge per clip.

The 2026-10-06 image/video pass was verified by grepping the freshly built
`.next/server/app/services.html` + `services/piercing.html` with
`[System.IO.File]::ReadAllText`: all 17 final ids present on the piercing route, no
superseded ids anywhere, the 6 card ids + nose + daith correct on `/services`, both
hero `videoSrc` paths and the intro `lip-piercing.mp4` path embedded, and the dev
server returned `200 video/mp4` for that clip. What is **not** verified is whether
the photos actually depict the named placements — only the user's eyes can do that.

**Not yet verified: browser pixel parity.** No screenshot comparison against the
original has been run, and none of the 2026-09-30 redesigns have been looked at in a
browser. Font rendering, image loading, GSAP timing, and responsive breakpoints are
unconfirmed. This is the main outstanding item — see "Next steps".

## Next steps

1. **Visual check of the redesigned sections** (the gap). Serve the original
   (`npx serve ..`) and this app side by side, capture home / about / our-work /
   services at desktop and mobile widths, and diff. This now includes the video tiles,
   the play badge and the lightbox clip.
2. Fix the two remaining **content** bugs in the session log — the daith "piercing gun"
   copy and the "five most requested" count. Everything else there is dead-code cleanup.
3. Confirm the loader, custom cursor, and scroll effects — these are client-only and
   cannot be checked in static HTML.
4. Check GSAP scroll-triggered animations actually fire at the right scroll positions,
   especially the `/our-work` pin after the image-load refresh.
5. **2026-10-06 follow-ups**: swap daith (15743948) if the user's eye review rejects
   it — alternates 11390512 / 13574852 / 7400018, same workflow as the other 16;
   kill the stale `next start` servers on 3111/3112 (old build, dead CSS hash) so
   the user stops seeing outdated images.

## Known deliberate deviation

The loader replays on **every** client-side navigation (`<LoaderRun key={pathname} />`).
This matches the static site, where every nav was a full document load. If first-load-only
is preferred, drop the `key`.
