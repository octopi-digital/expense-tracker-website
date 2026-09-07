/**
 * Converts real device screenshots from `assets/screenshots/` (the user's raw
 * source folder, not shipped) into optimized WebP files under `public/screens/`
 * for use in `src/lib/screens.ts`.
 *
 * Replaces `derive-frames.mjs`, which sliced one placeholder capture into fake
 * beats before real per-feature screenshots existed.
 *
 * Run: `npm run screens`. Also wired to `prebuild`, so `npm run build` always
 * regenerates first and a production bundle can't ship screens that are older
 * than their sources.
 *
 * That guard exists because the drift is silent and expensive: replacing a
 * file in `assets/screenshots/` changes nothing on the site until this runs,
 * with no error and no visual cue that the page is stale. Two outputs sat
 * behind their sources for days that way, and one of them was still showing
 * the assistant named "Jrfin" — the pre-rename brand — in a marketing
 * screenshot on the live AI Coach section.
 *
 * Safe to run on every build: WebP encoding here is deterministic, so
 * unchanged sources re-encode to byte-identical files and `public/screens/`
 * doesn't churn in git. `assets/screenshots/` is committed, so CI has the
 * sources it needs. A missing source throws and fails the build, which is
 * the intended behaviour — better than shipping a broken image.
 *
 * `sharp` is a declared devDependency rather than a transitive one. It was
 * previously resolved only via `next`'s own optional dependency, which a
 * Next upgrade could drop or move without warning — fine when this was a
 * script someone ran by hand, not fine now that `build` depends on it.
 */
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(root, 'assets/screenshots');
const OUT_DIR = path.join(root, 'public/screens');

// [source under assets/screenshots, output path under public/screens, optional top-crop px, optional max height (single-screen crop from the top)]
const FILES = [
  // Five screens, because the page renders five. Every one is cropped to a
  // single device viewport — the site lays screenshots out flat, so a tall
  // scroll-capture would either squash or need a scroll container of its own.
  // `maxHeight` is that crop.
  //
  // The Home capture is 585px wide (1.5x the others), so its single-viewport
  // height is 844 * 585/390 = 1266, not 844. Cropping it to 844 would keep the
  // top two-thirds of the screen, not the whole screen.
  //
  // Raw sources for every other screen are still committed under
  // assets/screenshots/. To bring one back, add its row here, run
  // `npm run screens`, and add an entry to src/content/shots.ts with the
  // dimensions this script prints.
  ['Home.png', 'derived/home-frame.webp', 0, 1266],
  ['Transactions-tab/Transaction financial Health Score.png', 'derived/health-score-frame.webp', 0, 844],
  ['Profile/Zakat & Donations.png', 'derived/zakat-frame.webp', 0, 844],
  ['Transactions-tab/Transaction Inbox.png', 'transaction-inbox.webp', 0, 844],
  // Poster frame for public/video/ai-voice-call.mp4 — the clip is 4 MB and
  // must not download until someone presses play. Native capture, not cropped.
  ['ai Voice Call.jpeg', 'secondary/ai-voice-call.webp', 0],
];

await mkdir(path.join(OUT_DIR, 'derived'), { recursive: true });
await mkdir(path.join(OUT_DIR, 'secondary'), { recursive: true });

for (const [src, out, cropTop, maxHeight] of FILES) {
  const inPath = path.join(SRC_DIR, src);
  const outPath = path.join(OUT_DIR, out);
  const { width, height } = await sharp(inPath).metadata();
  const pipeline = sharp(inPath);
  let outHeight = cropTop ? height - cropTop : height;
  if (maxHeight) outHeight = Math.min(outHeight, maxHeight);
  if (cropTop || outHeight !== height) {
    pipeline.extract({ left: 0, top: cropTop ?? 0, width, height: outHeight });
  }
  await pipeline.webp({ quality: 90 }).toFile(outPath);
  console.log(`${width}x${outHeight}  ${src}  ->  ${path.relative(root, outPath)}  (aspect ${(width / outHeight).toFixed(4)})`);
}
