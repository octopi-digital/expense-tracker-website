import { app } from '@/lib/brand';
import { SHOTS } from './shots';

/**
 * The headline is `app.tagline`, read rather than restated — the two drifting
 * apart is exactly how a site ends up making a different promise than the
 * brand does.
 *
 * The tagline names no currency on purpose. The app is multi-currency and the
 * audience is international, so any currency word reads as "not for me" to
 * most of it; earlier drafts used "penny" and then "taka" and were wrong for
 * the same reason in opposite directions.
 */
export const HERO = {
  title: app.tagline,
  body: 'Income, expenses, assets and Zakat in one place — captured automatically from your bank SMS, explained by an AI coach that speaks your language.',
  primaryCta: 'Get the app',
  secondaryCta: 'See how it works',
  /**
   * One screen, and the only `priority` image on the page. It was a fanned
   * triptych of three overlapping devices; three screens shown at once is
   * three things to read, and a reader takes in none of them.
   */
  shot: SHOTS.home,
} as const;

/**
 * The strip under the hero. Every line is a checkable product fact — there
 * are no download counts, star ratings or testimonials anywhere on this site,
 * because none of them would be true yet.
 */
export const PROOF_POINTS = [
  { label: 'Android', detail: 'Built for the phone you already carry' },
  { label: '4 languages', detail: 'English, Bangla, Arabic, Urdu' },
  { label: 'Works offline', detail: 'Entries sync when you reconnect' },
  { label: 'Free plan', detail: 'No trial clock, no card' },
] as const;
