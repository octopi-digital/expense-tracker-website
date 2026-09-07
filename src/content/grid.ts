/**
 * "Everything else" — the features worth stating that do not need a section,
 * or a screenshot, of their own.
 *
 * None of these carry an image now. Two of them used to: Goals and the Secret
 * Vault each had a card with its own device. The screenshots proved nothing a
 * sentence did not already say, and every device on the page dilutes the ones
 * that are actually load-bearing — the net-worth screen, the score, the Zakat
 * breakdown and the SMS inbox.
 *
 * `icon` is a key into ICONS in the section component, not markup, so content
 * stays translatable without touching SVG.
 */
export type IconKey =
  | 'goal'
  | 'vault'
  | 'spending'
  | 'analysis'
  | 'currency'
  | 'balance'
  | 'lock'
  | 'bell'
  | 'chat'
  | 'globe'
  | 'shield';

export interface CompactFeature {
  title: string;
  body: string;
  icon: IconKey;
}

export const GRID = {
  title: 'Everything else it does',
  lede: 'The parts that would be missed if they were gone.',
} as const;

export const COMPACT_FEATURES: readonly CompactFeature[] = [
  {
    title: 'Goals that fill themselves',
    body: 'A wedding, a laptop, an emergency fund — every amount you set aside counts toward it automatically, progress and shortfall both in plain sight.',
    icon: 'goal',
  },
  {
    title: 'A PIN-locked Secret Vault',
    body: 'For the assets and liabilities you do not want visible at a glance — still counted in your net worth, never on display over your shoulder.',
    icon: 'vault',
  },
  {
    // Demoted from a full-width row with its own screenshot — the claim lands
    // in a sentence and did not need a device to prove it.
    title: 'Need or want, sorted for you',
    body: 'Log it once and it is categorised and tagged automatically, with a budget warning before a habit becomes a month.',
    icon: 'spending',
  },
  {
    title: 'Spending analysis',
    body: 'Where the money actually went, month over month — so a bad habit shows up before it becomes a bad year.',
    icon: 'analysis',
  },
  {
    title: 'Live currency rates',
    body: 'Holding money or assets abroad? Current rates feed straight into your net worth, with no separate lookup.',
    icon: 'currency',
  },
  {
    title: 'Assets & liabilities',
    body: 'Track what you own and what you owe — property, gold, loans, cards — and log payments against a debt as you clear it.',
    icon: 'balance',
  },
  {
    title: 'Biometric & PIN lock',
    body: 'Open the app with a fingerprint or a PIN, and keep Zakat and vault data behind a second one of their own.',
    icon: 'lock',
  },
  {
    title: 'Notifications that earn it',
    body: 'Budget warnings, goal milestones and Zakat reminders — each one switchable, so you decide what is worth a buzz.',
    icon: 'bell',
  },
  {
    title: 'Real people, when you need them',
    body: 'Live chat, support tickets and a searchable help centre, plus guides for each part of the app.',
    icon: 'chat',
  },
  {
    title: 'Four languages',
    body: 'English, Bangla, Arabic and Urdu across the whole app — not just the menus, the guidance too.',
    icon: 'globe',
  },
  {
    title: 'Your data stays yours',
    body: 'Export it whenever you like, reset it to zero, or delete the account outright — no email required to do any of it.',
    icon: 'shield',
  },
];
