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

### Open issues — status after the 2026-10-05 session

Re-checked on 2026-10-05. Items 1–2 were open content bugs, **fixed on 2026-10-07**;
3–4 are dead code rather than wrong copy; 5–7 are unchanged.

1. ~~`src/lib/services.ts` daith "piercing gun" detail~~ — **resolved 2026-10-07.** The
   detail now says the fold is marked in a mirror and pierced with a sterile,
   single-use hollow needle. The FAQ at `:540` was already correct ("No. We use a
   sterile, single-use hollow needle…") — only the detail contradicted policy.
2. ~~`src/app/services/page.tsx` "five most requested" vs `.slice(0, 6)`~~ — **resolved
   2026-10-07.** Copy now says "six" (six cards is the intended layout; the sort by
   price is deliberate).
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
7. ~~`public/images/piercing/ear-pericing/` misspelled~~ — **resolved 2026-10-07.**
   Folder renamed to `ear-piercing/` (nothing hardcoded it; the label builder
   tolerates either spelling). Verified no `ear-pericing` string in any built HTML.

## Session log - 2026-10-07

Closed every open issue that can be closed without a browser or the user's eyes:

- **Daith detail** (`src/lib/services.ts`) rewritten: the fold is marked in a mirror
  and pierced with a sterile, single-use hollow needle. The FAQs were already correct
  — only this one detail contradicted the needle-only policy.
- **"five most requested" → "six"** in `src/app/services/page.tsx` (six cards render,
  sorted by price ascending — the count copy was wrong, not the slice).
- **Stale `next start` servers on 3111/3112 killed** (old build, dead CSS hash).
- **`public/images/piercing/ear-pericing/` renamed to `ear-piercing/`** (issue 7).
- **New media picked up by the scan, no code change**: 4 tattoo stills
  (`angel-with-time`, `modern-lion-art`, `samay-tattoo`, `trishul-tattoo`),
  `videos/permanent-tattoos/shiv-shakti-tattoo.mp4`, and
  `videos/piercing/septum-piercing/` (2 clips). A new `public/images/artist/` folder
  (8 files incl. a stray `.mp4`) exists but is **not scanned** — it is neither
  `permanent-tattoos/` nor `piercing/`, so it stays out of the portfolio;
  `/images/artist.jpg` (the referenced portrait) still exists alongside it.
- Verified: `npx tsc --noEmit` clean, `npm run lint` 0 errors (only the pre-existing
  `CompareSection` warning), `npm run build` 7 routes + `_not-found` prerendered, and
  all copy/media changes grepped into `.next/server/app/*.html` with the UTF-8-safe
  `[System.IO.File]::ReadAllText` method.
- **Later:** user added `videos/piercing/conch-piercing/conch-piercing.mp4` — scanned
  automatically as "Conch Piercing" on `/` and `/our-work` (portfolio only; confirmed
  with the user that it does **not** go in any `/services/piercing` section). Serves
  `200 video/mp4` off the dev server.
- **Later: portfolio pagination added.** `PortfolioExplorer` takes an optional
  `perPage` prop; home passes `6` (3-col grid → 2 rows), `/our-work` passes `9`.
  The permanent-tattoo page omits it and renders full. Controls render only when a
  filter holds >1 page (so the Piercing filter's 6 items show no pager), filter
  changes reset to page 1, and the lightbox still registers/opens against the
  **full** item list (`items.indexOf` works across slices). After a page/filter
  change a `ScrollTrigger.refresh()` re-measures pins below the grid, and the
  section is scrolled back into view only if its top left the viewport (instant
  jump — Lenis owns scroll). Page-2+ items mount without the GSAP stagger
  (GsapEffects runs once per route), so they appear static — intentional.
  New CSS appended at the end of `globals.css` (`.portfolio-pagination` /
  `.page-btn`, styled to match `.filter-btn`) — keep it when diffing against the
  source; the source has no pagination. Verified in prerendered HTML: home 6
  items + 5 buttons, /our-work 9 items + 4 buttons, tattoo page no pager.

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
| — new | `/home-new` (redesigned home — **video hero only**, 2026-10-07) |

`/services/custom-tattoos` and `/services/permanent-tattoos` both 308-redirect to
`/services/permanent-tattoo`. Eight routes prerender static.

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
| `src/components/sections/PortfolioExplorer.tsx` | `PortfolioFilter` + `Lightbox`, `variant="home" \| "page"`, `filterLabels`; renders `<video>` tiles when `item.type === "video"`; optional `perPage` paginates the grid (home 6, /our-work 9) |
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
| `src/app/home-new/VideoHero.tsx` | **new (2026-10-07)** — scroll-scrubbed hero video for `/home-new`; all other `/home-new` code lives in `page.tsx` + scoped `home-new.css` |

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
- **`body { overflow-x: hidden }` breaks `position: sticky`.** Only the root element's
  overflow propagates to the viewport; body's own hidden `overflow-x` forces
  `overflow-y` to `auto`, making body a scroll container that never scrolls, so sticky
  descendants never engage. `html { overflow-x: hidden }` is safe (it propagates).
  `body`'s rule was removed from `globals.css` on 2026-10-07 (see the `/home-new`
  session log) — do not re-add it from the source CSS. Headless-Chrome CDP probe
  (`sticky-probe.mjs`, temp dir) is the way to verify sticky/pin behaviour without a
  browser.

## Verification status

Passing:

```
npx tsc --noEmit     # clean
npm run lint         # 1 warning only: CompareSection unused in our-work/page.tsx (user's own edit)
npm run build        # 8 routes prerendered static (incl. /home-new)
next start + fetch   # 200 on all 8 routes, both 308 redirects land
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

The 2026-10-07 `/home-new` video hero was verified **headlessly, not visually**: two
temp-dir CDP probes (`sticky-probe.mjs`, `jerk-probe.mjs` — Node 24 WebSocket against
headless Chrome) confirmed at desktop (1440×900) and mobile (~757px) widths that the
stage pins for the whole scrub, `currentTime` tracks the scroll (0 → 4.98 → 9.98 of
10.0s) and finishes exactly when the sticky releases with the footer pushing in;
after the dense-GOP re-encode + seek guard, a simulated 4s scroll issued 100 seeks
and all 100 completed (median 31ms; before: 253 issued / 1 completed / 251ms freeze
then leap). `tsc`/lint/build green (8 routes), scrub mp4 serves `200 video/mp4`.
What these probes **cannot** vouch for: the subjective smoothness of the scrub and
the mobile layout on a real device — only the user's scroll can.

## Next steps

1. **Visual check of the redesigned sections** (the gap). Serve the original
   (`npx serve ..`) and this app side by side, capture home / about / our-work /
   services at desktop and mobile widths, and diff. This now includes the video tiles,
   the play badge and the lightbox clip.
2. ~~Fix the two remaining **content** bugs~~ — **done 2026-10-07** (daith copy + "six
   most requested"); verified in the prerendered HTML.
3. Confirm the loader, custom cursor, and scroll effects — these are client-only and
   cannot be checked in static HTML.
4. Check GSAP scroll-triggered animations actually fire at the right scroll positions,
   especially the `/our-work` pin after the image-load refresh.
5. **2026-10-06 follow-up**: swap daith (15743948) if the user's eye review rejects
   it — alternates 11390512 / 13574852 / 7400018, same workflow as the other 16.
   (The stale `next start` servers on 3111/3112 were killed on 2026-10-07.)
6. **`/home-new` open items** (2026-10-07): (a) the user must confirm the scrub feel
   in a real browser — desktop and an actual phone — after the jerk fix; the probes
   prove correctness, not smoothness; (b) the remaining home sections below the hero,
   when the user specifies them.

## Known deliberate deviation

The loader replays on **every** client-side navigation (`<LoaderRun key={pathname} />`).
This matches the static site, where every nav was a full document load. If first-load-only
is preferred, drop the `key`.

## Session log - 2026-10-07 (later): /home-new — video hero

An earlier full-page scrollytelling `/home-new` was built and then **deleted at the
user's request** (all `*-new` components, `src/app/home-new/`, and this file's entries
for it). Rebuilt from scratch as a single section, per the user's spec:

- **Files** (only these three): `src/app/home-new/page.tsx` (server — imports the
  scoped CSS, metadata `title: "Home New"`), `src/app/home-new/VideoHero.tsx`
  (client), `src/app/home-new/home-new.css` (every rule scoped `.video-hero`).
- **Video**: `public/videos/hero-banner/home-landing-first-scrub.mp4` (3.95 MB — a
  **dense-GOP re-encode** of the user's `home-landing-first.mp4`, which stays on disk
  untouched; see the jerk fix below), rendered 100% × 100% with `object-fit: cover`,
  faded in (1.2s) on `loadeddata`. The `hero-banner/` folder is **not** a portfolio
  category — `gallery.ts` reads only `permanent-tattoos/` and `piercing/`, so the scan
  ignores it entirely (verified in the source, same rule as files at the `videos/` root).
- **Scroll-scrub**: section is `400vh` (300vh of scrub range for the 10s clip —
  tuned from the original `300vh` when the user asked for slower pacing) with a
  `position: sticky` stage. Progress =
  `-section.getBoundingClientRect().top /
  (section.offsetHeight - stage.offsetHeight - parseFloat(getComputedStyle(stage).top))`
  — stage height and `top` inset included so the timeline finishes exactly when the
  sticky releases (the `top` term is nonzero on mobile, where the stage is centered).
  A rAF loop eases the playhead with **frame-rate-independent damping**
  (`time += (target - time) * (1 - Math.exp(-5 * dt))`, dt clamped to 100ms) and
  writes `currentTime` only when **`!video.seeking`** and the playhead moved ≥ **1/24 s**
  (one frame of the 24fps source). Smoothness chain:
  wheel → Lenis (global `SmoothScroll`) → scrollY → damped lerp → seek. The video
  is never `play()`ed — scrubbing only.
- **Header/footer**: come from `layout.tsx` unchanged. Class names avoid every
  global FX hook (`.hero*`, `.reveal`, `data-*`), so `GsapEffects`/`ScrollReveal`
  ignore this page. `html { overflow-x: hidden }` propagates to the viewport (root
  overflow does not break `position: sticky`).
- **Bug found by probe: `body { overflow-x: hidden }` broke the pin.** Only `html`'s
  overflow propagates to the viewport; `body`'s own `overflow-x: hidden` (both in the
  source CSS and in `globals.css`) computed to `overflow-y: auto`, making body a
  scroll container that never scrolls — so `.video-hero-sticky` scrolled straight off
  instead of pinning. **Fix: removed `overflow-x: hidden` from `body` in
  `globals.css`** (deliberate deviation from `../css/style.css`, commented in place;
  `html`'s rule still clips horizontal overflow at the viewport, so site-wide
  clipping is unchanged). Verified headless — see below.
- **Sticky verified with a headless-Chrome CDP probe** (Node 24 native WebSocket +
  `Runtime.evaluate`, script in the temp dir `sticky-probe.mjs`): before the fix the
  stage top tracked `-scrollY` (unpinned); after, `stageTop: 0` at scroll 0 / 50% /
  end-of-range with `currentTime` 0 → 4.99s → 9.99s of the 10.0s clip, then past the
  range `stageTop: -243` with the footer entering at `242` — pinned for the whole
  scrub, released exactly when the timeline finishes, next section pushes in.
  Reuse this probe for any future sticky/pin work; `npm run build` + `tsc` + lint
  all green after the CSS change (8 routes).
- Verified: `npx tsc --noEmit` clean · lint only pre-existing warning ·
  `npm run build` 8 routes · `next start` on :3110 → `200` on `/home-new`, prerendered
  HTML contains the video src + sticky markup, mp4 returns `200 video/mp4`.
  **Scrub feel not yet reviewed in a browser.**
- **Jerk fix (second round, same day).** User: video "jerks", "too fast going",
  can't see it play smoothly. A second probe (`jerk-probe.mjs`, temp dir) simulated a
  4s scroll: **253 `seeking` events fired but only 1 `seeked` completed** — every
  per-frame `currentTime` write cancelled the in-flight seek, so the frame on screen
  stayed frozen and then **leapt 0 → 8.49s** (one 251ms seek) when scrolling stopped.
  That frozen-then-leap *is* the jerk and the perceived "too fast". Root cause: the
  source encode has only **5 I-frames in 10s** (long GOP → seeks decode seconds of
  frames). Fixes:
  1. **Re-encode** to `home-landing-first-scrub.mp4` with `libx264 -g 6 -keyint_min 6
     -sc_threshold 0 -crf 21 -c:a copy` (40 I-frames now; same 3.95 MB). ffmpeg came
     from npm `@ffmpeg-installer/ffmpeg` installed **in the temp dir** (not the
     project — `ffmpeg-static`'s GitHub download got ECONNRESET, the npm-hosted
     binary worked; ffmpeg 4.1-era build).
  2. **`!video.seeking` guard** + threshold raised to 1/24 (one source frame) so a
     write never cancels a pending seek and no seek lands on a frame already shown.
  3. Range math now subtracts the stage's `top` inset (needed for the mobile layout).
  Post-fix probe: **100 seeking → 100 seeked**, median latency 31ms (was 251ms),
  ~25 seeks/s advancing ~1.7 video frames each — continuous stepping, no freeze.
- **Mobile (≤768px) layout** — user: "reduce the height so text should be visible
  completely". The stage becomes a **16:9 box** (`height: auto; aspect-ratio: 16/9`,
  exactly the source's 1280×720, so cover crops nothing and embedded text is fully
  visible), centered via `top: max(0px, calc((100svh - 56.25vw) / 2))` (svh clears
  the URL bar), and the section shrinks `400vh → 320vh` (less thumb-scrolling).
  Note: sticky `top` percentages resolve against the containing block, not the
  viewport — that's why the centering uses `vh`-based `calc()`, not `top: 50%`.
- Re-verified headless after round two: **desktop 1440×900** — pinned `stageTop: 0`
  at 0 / 1208 / 2414 of a 2415 range, `currentTime` 0 → 4.98 → 9.98, released at
  `stageTop: -403` with footer at `402` (stage bottom == footer top); **mobile
  ~757px** — pinned `stageTop: 28` (the centered inset), stage 426px tall (16:9),
  released with footer at `242`. `tsc`/lint/build green (8 routes), scrub mp4
  serves `200 video/mp4`.
- Next: the remaining home sections, when the user specifies them.


## Session log - 2026-10-08

- **Contact info updated**: phone 9045538809 (tel/WhatsApp +91), email karanbakshi2208@gmail.com, WhatsApp https://wa.me/919045538809, Instagram https://www.instagram.com/inkspiration_by_bakshi. Updated across site.ts, ContactSection, pages, footer, and static HTML files.
- **Address updated**: 'Inkspiration Studio & KN Fitness, Opp. Mandir & Gurudwara Ground, Premnagar, Dehradun' in site.ts and ContactSection and static HTML.
- **ContactSection form updates**: Styles list expanded to all 19 specific services (Permanent Tattoo, Cover-Ups + 17 piercings). Budget field changed from dropdown to number input (?).
- **Social links**: Footer and ContactSection now properly link Instagram with target=_blank. FeaturedArtist socials type updated to accept optional href.
- **Cleanup**: Reverted and removed /home-new files and video as requested. Cleared .next.
- **Verification**: 
px tsc --noEmit clean, 
pm run build 7 routes prerendered static.

