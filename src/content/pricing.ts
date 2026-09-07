/**
 * Pricing copy and the offline floor.
 *
 * `FALLBACK_TIERS` is a floor, not a source of truth — the live catalogue at
 * `GET /plans` is, and `lib/plans.ts` merges the numbers it returns onto the
 * marketing copy here. These values are kept in sync by hand with
 * `expense-tracker-server/src/config/plans.ts` so the section still renders
 * something correct when the API is unreachable or `NEXT_PUBLIC_API_URL` is
 * unset. Two tiers, priced in BDT. There is no "Plus" or "Family" tier.
 */
export interface Tier {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  savingsPct: number | undefined;
  body: string;
  features: string[];
  highlighted: boolean;
}

export const PRICING = {
  eyebrow: 'Pricing',
  title: 'Simple plans, whatever stage you are at',
  lede: 'Start free and stay free for as long as you like. Premium lifts the caps when you outgrow them.',
} as const;

/** Marketing copy the API does not track, merged onto whatever `/plans` returns. */
export const TIER_COPY = {
  free: 'Everything you need to start tracking.',
  premium: 'For anyone serious about staying on top of it.',
} as const;

export const FALLBACK_TIERS: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    monthly: 0,
    yearly: 0,
    savingsPct: undefined,
    body: TIER_COPY.free,
    features: [
      'Net worth tracking',
      'Financial health score',
      'Zakat & Nisab tracking',
      'Up to 3 goals',
      '5 AI messages / month',
    ],
    highlighted: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    monthly: 299,
    yearly: 2999,
    savingsPct: 16,
    body: TIER_COPY.premium,
    features: [
      'Everything in Free',
      'Unlimited AI messages',
      'Unlimited goals',
      'Advanced analytics & reports',
      'Data export',
      'Priority support',
    ],
    highlighted: true,
  },
];
