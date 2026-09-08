/**
 * Every piece of marketing copy that appears in more than one place, plus
 * the nav and legal metadata. Kept as data (not JSX) so it stays easy to
 * translate later and so pages can re-slice the same feature list.
 */

export const site = {
  name: 'Deenomics',
  tagline: 'Deen + Economics',
  /** Update once the domain is live — used for canonical URLs and the sitemap. */
  url: 'https://deenomics.com',
  description:
    'Deenomics is the Islamic wealth and expense tracker: automatic transaction capture, Zakat and Sadaqah on autopilot, an AI coach that answers in line with your deen, and goals from Hajj to your first home.',
  email: 'support@deenomics.com',
  /** Placeholders — swap for the real listings the day you publish. */
  playStoreUrl: '#',
  appStoreUrl: '#',
} as const;

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: '/features', label: 'Features' },
  { href: '/zakat', label: 'Zakat' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/support', label: 'Support' },
];

export type Feature = {
  slug: string;
  eyebrow: string;
  title: string;
  blurb: string;
  detail: string;
  points: string[];
  /** Short, concrete capabilities shown as chips on the overview card.
   * Three, kept short enough to sit on one line so every card's divider
   * lines up across a row. */
  tags: string[];
  accent: 'green' | 'gold' | 'blue' | 'lavender' | 'orange';
};

export const features: Feature[] = [
  {
    slug: 'capture',
    eyebrow: 'Zero data entry',
    title: 'Your transactions log themselves',
    blurb:
      'Deenomics reads your bank SMS and payment notifications, drafts the transaction, and waits for one tap of approval.',
    detail:
      'Every bank alert and wallet notification that lands on your phone is parsed into a draft transaction — amount, merchant, category, account. Nothing is saved until you approve it from the inbox, so your ledger stays accurate without you ever opening a spreadsheet.',
    points: [
      'Bank SMS and payment notifications parsed on device',
      'A review inbox — nothing is recorded without your approval',
      'Manual, voice, and photo entry whenever you prefer',
      'Works offline and syncs when you reconnect',
    ],
    tags: ['Bank SMS', 'Notifications', 'Voice entry'],
    accent: 'green',
  },
  {
    slug: 'zakat',
    eyebrow: 'Fard, handled',
    title: 'Zakat and Sadaqah, calculated correctly',
    blurb:
      'Live Nisab thresholds, a Hawl cycle that tracks itself, and the 2.5% worked out across every asset you own.',
    detail:
      'Deenomics watches your zakatable wealth against the current gold and silver Nisab, starts the Hawl the moment you cross it, and tells you the exact amount due and the day it falls. Sadaqah, purification of doubtful income, and your payment history live in the same PIN-locked vault.',
    points: [
      'Nisab tracked against live gold and silver rates',
      'Hawl cycle starts, pauses, and completes automatically',
      'Cash, bank, gold, business stock, investments, property',
      'Sadaqah log and income purification, kept private',
    ],
    tags: ['Nisab', 'Hawl cycle', 'Sadaqah log'],
    accent: 'gold',
  },
  {
    slug: 'ai-coach',
    eyebrow: 'Guidance you can ask',
    title: 'An AI coach that knows your deen',
    blurb:
      'Chat or speak. Ask why your spending drifted, what to do about a loan, or whether an earning is halal.',
    detail:
      'The coach sees your real numbers, so the answers are about your money, not generic advice. Ask it out loud on a call, type at midnight, or send a photo of a receipt. Answers come with Qur’an and Hadith citations where a ruling is involved.',
    points: [
      'Voice calls, chat, and photo questions',
      'Answers grounded in your actual income and spending',
      'Qur’an and Hadith citations on rulings',
      'Speaks English, বাংলা, العربية and اردو',
    ],
    tags: ['Voice calls', 'Chat', 'Qur\u2019an citations'],
    accent: 'lavender',
  },
  {
    slug: 'goals',
    eyebrow: 'Niyyah to numbers',
    title: 'Goals worth saving for',
    blurb:
      'Hajj, marriage, a home, your children’s education — each with a target, a date, and a monthly figure that is actually achievable.',
    detail:
      'Pick a goal type, set the amount and the deadline, and Deenomics works backwards to the monthly contribution. Progress updates as money moves, and the app tells you early when a target is slipping rather than at the end of the year.',
    points: [
      'Hajj fund, marriage, home, car, education, retirement',
      'Monthly contribution worked out from your target date',
      'Top up from any account in a couple of taps',
      'Early warning when a goal starts to slip',
    ],
    tags: ['Hajj fund', 'Marriage', 'Education'],
    accent: 'green',
  },
  {
    slug: 'wealth',
    eyebrow: 'The full picture',
    title: 'Assets, liabilities, and a health score',
    blurb:
      'One number for where you stand — built from what you own, what you owe, and how you have been spending.',
    detail:
      'Log property, vehicles, investments, gold, and business holdings on one side; loans, credit, and dues on the other. The financial health gauge turns the gap between them into a single reading, from Risk through to Growing, and explains what moved it.',
    points: [
      'Assets and liabilities in one net-worth view',
      'Financial health score with a plain-language reason',
      'Want vs need tagging on every expense',
      'Monthly reports exportable to PDF and CSV',
    ],
    tags: ['Net worth', 'Health score', 'Want vs need'],
    accent: 'blue',
  },
  {
    slug: 'guide',
    eyebrow: 'Knowledge, in context',
    title: 'The Islamic finance guide, built in',
    blurb:
      'Riba, halal earnings, the rules of wealth, business ethics — plus a verse and a hadith each day.',
    detail:
      'A reference library written for people managing real money: what makes an earning halal, how riba shows up in ordinary products, the rules that govern wealth in Islam, and how to plan without falling into them. A daily verse and hadith sit on your home screen.',
    points: [
      'Halal earnings, riba, and the rules of wealth',
      'Zakat and Sadaqah explained end to end',
      'Islamic business ethics and financial planning',
      'Daily verse and hadith wisdom',
    ],
    tags: ['Riba', 'Halal earnings', 'Daily verse'],
    accent: 'orange',
  },
];

export type BillingCycle = 'monthly' | 'yearly';

export type PlanId = 'free' | 'basic' | 'premium' | 'family' | 'business' | 'lifetime';

/**
 * The plan catalogue.
 *
 * `free` and `premium` mirror the backend exactly
 * (expense-tracker-server/src/config/plans.ts) — that file is the source of
 * truth and enforces every limit in code. The other four tiers are **not in
 * the backend yet**: they have to be added to PLANS there, with a matching
 * store product, before anyone can actually buy one.
 */
export const billing = {
  currency: 'BDT',
  cycles: {
    monthly: { label: 'Monthly' },
    yearly: { label: 'Yearly' },
  },
} as const;

/** ৳ with thousands separators. */
export function taka(amount: number): string {
  return `\u09f3${amount.toLocaleString('en-US')}`;
}

/**
 * What a yearly plan saves against twelve monthly payments, as a rounded
 * percent — the same calculation the backend's `yearlySavingsPct()` does.
 * Returns null for free or one-time plans, where the idea does not apply.
 */
export function yearlySavingsPct(amounts: Record<BillingCycle, number>): number | null {
  const twelveMonths = amounts.monthly * 12;
  if (twelveMonths <= 0) return null;
  const pct = Math.round((1 - amounts.yearly / twelveMonths) * 100);
  return pct > 0 ? pct : null;
}

export type SubscriptionPlan = {
  id: PlanId;
  name: string;
  /** Amount charged per billing cycle, in BDT. 0 = free. */
  amounts: Record<BillingCycle, number>;
  summary: string;
  features: string[];
  cta: string;
  /** The one card given the dark, gold-ringed treatment. */
  featured: boolean;
  badge?: string;
};

/** The personal tiers, shown together under the monthly/yearly switch. */
export const plans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    amounts: { monthly: 0, yearly: 0 },
    summary: 'See where your money actually goes.',
    features: [
      'Income, expense, and savings tracking',
      'Automatic SMS and notification capture',
      'Zakat calculator and Sadaqah log',
      'Up to 3 financial goals',
      '5 AI conversations a month',
      'Basic reports',
    ],
    cta: 'Download free',
    featured: false,
  },
  {
    id: 'basic',
    name: 'Basic',
    amounts: { monthly: 149, yearly: 1499 },
    summary: 'More room to think, without the full price.',
    features: [
      'Everything in Free',
      '50 AI conversations a month',
      'Up to 10 financial goals',
      'Export your data as PDF and CSV',
      'Ad-free experience',
      'Standard support',
    ],
    cta: 'Choose Basic',
    featured: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    amounts: { monthly: 299, yearly: 2999 },
    summary: 'Unlimited AI and everything unlocked.',
    features: [
      'Everything in Basic',
      'Unlimited AI conversations and voice calls',
      'Unlimited financial goals',
      'Advanced analytics and enhanced insights',
      'Custom reports and multi-currency',
      'Priority support and early access',
    ],
    cta: 'Go Premium',
    featured: false,
  },
  {
    id: 'family',
    name: 'Family',
    amounts: { monthly: 599, yearly: 5999 },
    summary: 'Full Premium for the whole household, on one bill.',
    features: [
      'Premium for up to 5 family members',
      'A private Zakat vault for each person',
      'Shared household net-worth view',
      'Unlimited AI for everyone',
      'One bill, cancel any time',
      'Priority support',
    ],
    cta: 'Choose Family',
    featured: true,
    badge: 'Best value',
  },
];

export type ExtraPlan = {
  id: PlanId;
  name: string;
  kicker: string;
  price: string;
  cadence: string;
  footnote: string;
  summary: string;
  features: string[];
  cta: string;
  href: string;
};

/**
 * Plans that do not belong under the monthly/yearly switch — one is billed to
 * an organisation, the other is not a subscription at all.
 */
export const extraPlans: ExtraPlan[] = [
  {
    id: 'business',
    name: 'Business',
    kicker: 'For shops and small firms',
    price: taka(1999),
    cadence: 'per month',
    footnote: `or ${taka(19999)} a year, saving 17%`,
    summary: 'Everything in Premium, plus the parts of Zakat that only apply to a business.',
    features: [
      'Multi-user team access',
      'Zakat on business stock and receivables',
      'Accountant-ready exports',
      'Multi-currency and custom reports',
      'Dedicated account support',
    ],
    cta: 'Talk to us',
    href: '/support#contact',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    kicker: 'Pay once, keep it',
    price: taka(14999),
    cadence: 'one-time',
    footnote: 'About five years of yearly Premium',
    summary: 'Premium forever, with no renewal to remember and no price rise to worry about.',
    features: [
      'Premium, for life',
      'One payment, never renewed',
      'Unlimited AI conversations and voice calls',
      'Every future Premium feature included',
      'Priority support',
    ],
    cta: 'Buy Lifetime',
    href: '/download',
  },
];

export type ComparisonRow = {
  label: string;
  free: string;
  basic: string;
  premium: string;
  family: string;
  business: string;
};

/** Side-by-side feature matrix. Lifetime is Premium forever, so it has no column. */
export const planComparison: ComparisonRow[] = [
  { label: 'Expense & income tracking', free: 'Included', basic: 'Included', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'Automatic transaction capture', free: 'Included', basic: 'Included', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'Zakat & Sadaqah vault', free: 'Included', basic: 'Included', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'AI conversations & voice calls', free: '5 a month', basic: '50 a month', premium: 'Unlimited', family: 'Unlimited', business: 'Unlimited' },
  { label: 'Financial goals', free: 'Up to 3', basic: 'Up to 10', premium: 'Unlimited', family: 'Unlimited', business: 'Unlimited' },
  { label: 'Export data (PDF / CSV)', free: '\u2014', basic: 'Included', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'Ad-free experience', free: '\u2014', basic: 'Included', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'Advanced analytics', free: '\u2014', basic: '\u2014', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'Enhanced insights', free: '\u2014', basic: '\u2014', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'Custom reports', free: '\u2014', basic: '\u2014', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'Multi-currency support', free: '\u2014', basic: '\u2014', premium: 'Included', family: 'Included', business: 'Included' },
  { label: 'People included', free: '1', basic: '1', premium: '1', family: 'Up to 5', business: 'Your team' },
  { label: 'Business stock & receivables Zakat', free: '\u2014', basic: '\u2014', premium: '\u2014', family: '\u2014', business: 'Included' },
  { label: 'Accountant-ready export', free: '\u2014', basic: '\u2014', premium: '\u2014', family: '\u2014', business: 'Included' },
  { label: 'Support', free: 'Standard', basic: 'Standard', premium: 'Priority', family: 'Priority', business: 'Dedicated' },
  { label: 'Early access to new features', free: '\u2014', basic: '\u2014', premium: 'Included', family: 'Included', business: 'Included' },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'Does Deenomics connect to my bank account?',
    a: 'No. Deenomics never asks for your banking credentials and never links to your account. It reads the SMS and push notifications your bank already sends to your phone, turns them into draft transactions, and waits for you to approve each one.',
  },
  {
    q: 'How is the Zakat calculated?',
    a: 'Your zakatable wealth — cash, bank balances, gold and silver, business stock, investments, and receivables — is measured against the current Nisab threshold. Once you cross it, the Hawl (lunar year) begins. When it completes, Deenomics shows 2.5% of the qualifying wealth as the amount due, with the working shown line by line.',
  },
  {
    q: 'Is my financial data private?',
    a: 'Your data is encrypted in transit and at rest, and the Zakat Vault and Secret Vault sit behind a PIN separate from your device unlock. We do not sell data and we do not share it with advertisers.',
  },
  {
    q: 'Which languages does the app support?',
    a: 'English, বাংলা, العربية and اردو, with right-to-left layout for Arabic and Urdu. The AI coach responds in whichever language you write or speak in.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. Transactions, goals, and vault entries are stored on your device and sync the next time you are online. The AI coach is the one feature that needs a connection.',
  },
  {
    q: 'Can I use it if I am not Muslim?',
    a: 'Absolutely. The tracking, goals, analytics, and AI coaching work for anyone. The Zakat and Islamic guidance features are simply there when you want them.',
  },
  {
    q: 'Should I pay monthly or yearly?',
    a: 'Monthly is \u09f3299 and yearly is \u09f32,999, which works out at about \u09f3250 a month \u2014 a saving of 16% over paying monthly. Both unlock exactly the same features, and you can switch between them whenever you like.',
  },
  {
    q: 'How do I cancel Premium?',
    a: 'From Profile → Subscription, at any time. Your Premium features stay active until the end of the period you have already paid for, and nothing is deleted when it ends.',
  },
];

export const stats: { value: string; label: string }[] = [
  { value: '4', label: 'Languages, with full RTL' },
  { value: '2.5%', label: 'Zakat, worked out for you' },
  { value: '0', label: 'Bank credentials ever asked for' },
  { value: '24/7', label: 'AI coach, voice or chat' },
];
