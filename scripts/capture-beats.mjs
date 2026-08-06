/**
 * Renders the showcase at each scroll beat and writes a PNG per beat, so the
 * 3D framing can be checked without a human scrolling the page.
 *
 * The phone eases toward its pose over several frames, so after each scroll we
 * wait for motion to settle rather than screenshotting immediately.
 *
 * Run (dev server must be up): node scripts/capture-beats.mjs [outDir]
 */
import { chromium } from 'playwright';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';

const URL = process.env.SITE_URL ?? 'http://localhost:3000';
const OUT = process.argv[2] ?? path.join(process.cwd(), '.captures');
// Stops = the hero plus one per beat. Override to sample more finely when
// checking the motion *between* stops rather than the poses themselves.
const BEATS = Number(process.argv[3] ?? 6);

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  // The default headless Chromium has no GPU; SwiftShader gives us a real
  // WebGL2 context so the captures show what a user would actually see.
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const problems = [];
page.on('console', (m) => {
  if (m.type() === 'error') problems.push(`console: ${m.text()}`);
});
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));

await page.goto(URL, { waitUntil: 'networkidle' });

// The showcase is the second full-height block; scroll past the hero first.
const geometry = await page.evaluate(() => {
  const section = document.querySelector('section[aria-label="Product tour"]');
  if (!section) return null;
  const top = window.scrollY + section.getBoundingClientRect().top;
  return { top, distance: section.offsetHeight - window.innerHeight };
});

if (!geometry) {
  console.error('Could not find the showcase section — is the page rendering?');
  await browser.close();
  process.exit(1);
}

for (let i = 0; i < BEATS; i++) {
  const progress = BEATS === 1 ? 0 : i / (BEATS - 1);
  await page.evaluate(
    ({ top, distance, progress }) => window.scrollTo({ top: top + distance * progress, behavior: 'instant' }),
    { ...geometry, progress }
  );

  const file = path.join(OUT, `beat-${i}.png`);
  const frames = await settle(page, file);
  console.log(`beat ${i}  progress=${progress.toFixed(2)}  settled after ${frames} polls  -> ${file}`);
}

await browser.close();

/**
 * Screenshots the page only once the phone has stopped moving.
 *
 * A fixed delay is not good enough here. The phone eases toward its pose at a
 * fixed fraction per *frame*, and headless Chromium renders WebGL through
 * SwiftShader on the CPU — a handful of frames per second, not 60. A wait that
 * looks generous on a real GPU can catch the phone still most of the way back
 * at its previous pose, which silently turns every capture into a lie about
 * what the page actually looks like.
 *
 * So: poll until two consecutive frames are byte-identical, and keep the last
 * one. Comparing rendered bytes needs no hook into the app and covers the
 * screen scroll and lighting as well as the pose.
 */
async function settle(page, file, { maxPolls = 60, interval = 250 } = {}) {
  let previous = null;
  for (let poll = 1; poll <= maxPolls; poll++) {
    await page.waitForTimeout(interval);
    const shot = await page.screenshot();
    if (previous && shot.equals(previous)) {
      await writeFile(file, shot);
      return poll;
    }
    previous = shot;
  }
  // Still drifting: keep the last frame so there is something to look at, but
  // say so rather than passing it off as settled.
  await writeFile(file, previous);
  console.warn(`  warning: never settled after ${maxPolls} polls — capture may be mid-transition`);
  return maxPolls;
}

if (problems.length) {
  console.log('\nPage errors:');
  for (const p of [...new Set(problems)]) console.log(`  ${p}`);
  process.exit(1);
}
console.log('\nNo page errors.');
