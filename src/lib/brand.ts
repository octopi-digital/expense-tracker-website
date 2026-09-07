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
  name: 'Deenomics',
  /**
   * Deen + Economics. Worth stating on the page once — a coined name earns
   * its keep only if the reader can decode it, and a portmanteau nobody
   * unpacks is just an unfamiliar word above the fold.
   */
  meaning: 'Deen + Economics',
  /*
   * Two halves on purpose: the everyday money app on the left, the thing no
   * other expense tracker does on the right. Leading on Zakat alone reads as
   * a single-purpose religious utility, and leading on tracking alone is
   * indistinguishable from every other budgeting app — the pairing is the
   * positioning.
   *
   * Deliberately names no currency. The app is multi-currency (BDT, USD,
   * GBP, AED, EUR, SAR — see the app's constants/currencies.ts, where the
   * default base currency is USD) and the audience is international, so any
   * currency word here would read as "not for me" to most of it. Earlier
   * drafts used "penny" and then "taka"; both were wrong for the same
   * reason, in opposite directions.
   *
   * Also the hero <h1> — see HERO in content/hero.ts, which reads this
   * rather than restating it, since the two drifting apart is exactly how
   * the page ends up making two different promises.
   */
  tagline: 'Every expense tracked. Every obligation met.',
  /**
   * Store identifiers, deliberately NOT renamed with the brand. An Android
   * applicationId is the app's permanent identity on Play — changing it does
   * not rename the listing, it publishes a different app, and existing
   * installs never see an update. If these should change it has to happen in
   * the app project first, and before its first release; the site only
   * mirrors whatever the app actually ships.
   */
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
 * crash — it has never been confirmed, and now tracks the Deenomics name
 * rather than the old one. Trailing slashes are stripped so callers can
 * always concatenate.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deenomics.com'
).replace(/\/+$/, '');
