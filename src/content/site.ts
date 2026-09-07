import { app } from '@/lib/brand';

/**
 * Site-wide chrome: what the header links to, and what the download buttons
 * say. Everything user-visible on this page lives in `src/content/` rather
 * than inline in JSX — the app ships in four languages, and when a Bangla
 * site follows, that should be a matter of adding content files, not
 * reopening every component.
 */
export const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#zakat', label: 'Zakat' },
  { href: '#coach', label: 'AI coach' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
] as const;

/**
 * The store listing is not live yet. Set `url` to the Play Store link when it
 * exists and every CTA on the page becomes a real link — the buttons already
 * read `store.url ?? '#download'`, so nothing else has to change.
 *
 * Android only: the app has no iOS build, and its SMS auto-capture could not
 * work on one (iOS gives no app access to SMS at all).
 */
export const STORE = {
  url: null as string | null,
  label: 'Get it on Google Play',
  pendingLabel: 'Coming soon on Google Play',
  platform: 'Android',
} as const;

export const SITE = {
  name: app.name,
  tagline: app.tagline,
} as const;
