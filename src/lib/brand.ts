/**
 * Brand tokens, mirrored from the app's own single source of truth at
 * `expense-tracker-app/src/constants/theme.js`. Kept as a small hand-picked
 * subset — the site only needs the palette the marketing surface uses, not the
 * app's full token set. If the app's greens change, change them here too.
 */
export const brand = {
  emerald: '#106C31',
  primaryGreen: '#19CC50',
  linkGreen: '#129244',
  forestGreen: '#0A4A20',
  goldIcon: '#D7A225',
  lightGold: '#FADB8A',
  textPrimary: '#0F172A',
  textSecondary: '#647488',
  expenseOrange: '#F09D05',
  savingsBlue: '#2E7DF7',
  lavender: '#655FEE',
} as const;

export const app = {
  name: 'Islamic Expense Tracker',
  tagline: 'Every penny, accounted for.',
  androidPackage: 'com.islamicexpensetracker',
  iosBundleId: 'com.islamicexpensetracker',
} as const;

/**
 * Canonical origin, used for `metadataBase`, the sitemap and robots.txt.
 *
 * Absolute URLs are unavoidable in all three — Open Graph tags, `<link
 * rel="canonical">` and sitemap `<loc>` entries are invalid as relative
 * paths — so the real domain has to be configured somewhere. Set
 * `NEXT_PUBLIC_SITE_URL` in the deploy environment; the fallback below is a
 * guess at the production domain and only exists so local builds don't
 * crash. Trailing slashes are stripped so callers can always concatenate.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://islamicexpensetracker.com'
).replace(/\/+$/, '');
