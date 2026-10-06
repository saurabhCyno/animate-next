/**
 * Portfolio media, read off disk at build time.
 *
 * The folder layout under `public` is the source of truth:
 *
 *   public/images/permanent-tattoos/<name>.jpg   -> the "Permanent Tattoos" tab
 *   public/images/piercing/<type>/<name>.jpg     -> the "Piercing" tab, one folder per placement type
 *
 * and the same two shapes again for video, so a video lands in the tab its folder
 * says it belongs to:
 *
 *   public/videos/permanent-tattoos/<name>.mp4
 *   public/videos/piercing/<type>/<name>.mp4
 *
 * Drop a file in the right folder and it shows up — no code change, no data entry.
 * Titles and alt text are derived from the filename, the tab from the folder, and
 * the media is served straight off `/images/...` or `/videos/...` by the plain
 * `<img>` / `<video>` tags in `PortfolioExplorer` (the lightbox registers the same
 * paths and plays whichever kind it is handed).
 *
 * Media sitting directly in `public/images` or `public/videos` is ignored on
 * purpose: `videos/hero-bg.mp4` is a page asset, not portfolio work. Portfolio
 * media always belongs in one of the category folders.
 *
 * Server-only: this reads `node:fs`, so it must never be imported from a client
 * component. Every route that uses it is prerendered, so the scan runs once
 * during `next build` and the result is baked into the static HTML.
 *
 * The files live in `public/` rather than `src/assets/` because the rest of the
 * site deliberately uses plain `<img>` with real URLs rather than `next/image`.
 */

import { existsSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import type { MediaType, PortfolioItemData } from "@/components/sections/PortfolioExplorer";

const MEDIA_ROOT = join(process.cwd(), "public");

const TATTOO_DIR = "permanent-tattoos";
const PIERCING_DIR = "piercing";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];
const VIDEO_EXTENSIONS = [".mp4", ".mov", ".webm", ".m4v"];

/* ==========================================================================
   Filter tabs
   ========================================================================== */

export const TATTOO_CATEGORY = "permanent-tattoos";
export const PIERCING_CATEGORY = "piercing";

export const PORTFOLIO_FILTERS = ["all", TATTOO_CATEGORY, PIERCING_CATEGORY];

export const PORTFOLIO_FILTER_LABELS: Record<string, string> = {
  [TATTOO_CATEGORY]: "Permanent Tattoos",
  [PIERCING_CATEGORY]: "Piercing",
};

/* ==========================================================================
   Filesystem helpers
   ========================================================================== */

function byName(a: string, b: string): number {
  return a.localeCompare(b, "en", { numeric: true, sensitivity: "base" });
}

/** Files directly inside `dir` with a matching extension, in natural filename order. */
function listMedia(dir: string, extensions: string[]): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => extensions.includes(extname(file).toLowerCase()))
    .sort(byName);
}

/** Subfolder names inside `dir`, in natural order. */
function listFolders(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(byName);
}

function capitalize(words: string[]): string {
  return words
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** `shiv-krishna` -> `Shiv Krishna`, `ear-piercing.mp4` -> `Ear Piercing`. */
function titleFromFilename(file: string): string {
  return capitalize(basename(file, extname(file)).split(/[-_\s.]+/));
}

/**
 * Placement type folder -> label. `ear-piercing` -> `Ear Piercing`,
 * `industrial-bar` -> `Industrial Bar Piercing`. A trailing `piercing` (or the
 * `pericing` spelling) is dropped before the label is built, so folders may carry
 * the word or not.
 */
function placementLabel(folder: string): string {
  const words = folder.split(/[-_\s]+/).filter(Boolean);
  const last = words[words.length - 1]?.toLowerCase();
  if (last === "piercing" || last === "pericing") words.pop();
  const name = capitalize(words);
  return name ? `${name} Piercing` : "Piercing";
}

/* ==========================================================================
   Media
   ========================================================================== */

/** The portfolio items one media library contributes, split by category. */
type Library = {
  tattoos: PortfolioItemData[];
  piercings: PortfolioItemData[];
};

/**
 * Walks one media library (`public/images` or `public/videos`) and collects the
 * same two category shapes from it. Tattoos are flat files in one folder;
 * piercings are one folder per placement type, which becomes each item's meta.
 */
function scanLibrary(urlRoot: string, type: MediaType, extensions: string[]): Library {
  const diskRoot = join(MEDIA_ROOT, urlRoot.slice(1));

  const tattoos = listMedia(join(diskRoot, TATTOO_DIR), extensions).map((file) => {
    const title = titleFromFilename(file);
    return {
      image: `${urlRoot}/${TATTOO_DIR}/${file}`,
      type,
      alt: `Permanent tattoo — ${title}`,
      title,
      meta: "Permanent Tattoo",
      category: TATTOO_CATEGORY,
    };
  });

  const piercings = listFolders(join(diskRoot, PIERCING_DIR)).flatMap((folder) => {
    const label = placementLabel(folder);
    return listMedia(join(diskRoot, PIERCING_DIR, folder), extensions).map((file) => {
      const title = titleFromFilename(file);
      return {
        image: `${urlRoot}/${PIERCING_DIR}/${folder}/${file}`,
        type,
        alt: `${label} — ${title}`,
        title,
        meta: label,
        category: PIERCING_CATEGORY,
      };
    });
  });

  return { tattoos, piercings };
}

const images = scanLibrary("/images", "image", IMAGE_EXTENSIONS);
const videos = scanLibrary("/videos", "video", VIDEO_EXTENSIONS);

export const TATTOO_MEDIA: PortfolioItemData[] = [...images.tattoos, ...videos.tattoos];
export const PIERCING_MEDIA: PortfolioItemData[] = [...images.piercings, ...videos.piercings];

/** Tattoos first, then piercings — the order the "All" tab renders in. */
export const PORTFOLIO_MEDIA: PortfolioItemData[] = [...TATTOO_MEDIA, ...PIERCING_MEDIA];
