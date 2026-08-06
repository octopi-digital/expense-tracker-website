/**
 * Converts real device screenshots from `assets/screenshots/` (the user's raw
 * source folder, not shipped) into optimized WebP files under `public/screens/`
 * for use in `src/lib/screens.ts`.
 *
 * Replaces `derive-frames.mjs`, which sliced one placeholder capture into fake
 * beats before real per-feature screenshots existed.
 *
 * Run: node scripts/process-screenshots.mjs
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
  ['Home.png', 'derived/home-full.webp', 0],
  // Single-screen crop of the same source used for `derived/health-score-full`,
  // for a static (non-scrolling) spotlight display.
  ['Transactions-tab/Transaction financial Health Score.png', 'derived/health-score-frame.webp', 0, 844],
  ['Transactions-tab/Transaction financial Health Score.png', 'derived/health-score-full.webp', 0],
  ['Profile/Zakat & Donations.png', 'derived/zakat-full.webp', 0],
  ['Transactions-tab/Transaction Expense.png', 'derived/transaction-expense-full.webp', 0],
  ['Transactions-tab/Transaction Inbox.png', 'transaction-inbox.webp', 0],
  ['Transactions-tab/Transaction income.png', 'transaction-income.webp', 0],
  // Source has the phone's own status bar / a stray notification baked in
  // (WhatsApp banner, low battery, wrong clock, a demo email address) above
  // the app's actual "Gold Rate" sheet. Crop it off so only real app UI ships.
  ['goldRate.jpeg', 'gold-rate.webp', 185],

  // Secondary feature grid (below the 3D tour) and How It Works section.
  ['Goals/Goals Overview.png', 'secondary/goals-overview.webp', 0],
  ['Goals/Create New Goal.png', 'secondary/create-goal.webp', 0],
  ['Profile/Islamic Guides.png', 'secondary/islamic-guides.webp', 0],
  ['Profile/secret-vault/Secret Vault-home.png', 'secondary/secret-vault.webp', 0],
  ['Profile/Zakat Vault PIN Page.png', 'secondary/zakat-pin.webp', 0],
  ['currency.jpeg', 'secondary/currency.webp', 0],
  ['Analysis Report (Insight).png', 'secondary/analysis-report.webp', 0],
  ['Add Income (Manually).png', 'secondary/add-income.webp', 0],
  ['AI Chat.png', 'secondary/ai-chat.webp', 0],
  ['ai Voice Call.jpeg', 'secondary/ai-voice-call.webp', 0],

  // Real onboarding flow, for the How It Works pinned tour.
  ['new account/Sign Up.png', 'secondary/onboarding-signup.webp', 0],
  ['new account/Survey Page - 1.png', 'secondary/onboarding-survey-1.webp', 0],
  ['new account/Survey Page - 2.png', 'secondary/onboarding-survey-2.webp', 0],
  ['new account/Survey Page - 3.png', 'secondary/onboarding-survey-3.webp', 0],
  ['new account/Currency setting.png', 'secondary/onboarding-currency.webp', 0],
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
