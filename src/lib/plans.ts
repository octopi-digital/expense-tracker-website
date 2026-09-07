import { TIER_COPY, type Tier } from '@/content/pricing';

/**
 * Shape of `GET {NEXT_PUBLIC_API_URL}/plans`. Only the fields the site reads
 * are declared — the endpoint returns more.
 */
export interface PlanCatalogueEntry {
  id: string;
  name: string;
  features: {
    aiMessagesPerMonth: number | null;
    maxGoals: number | null;
    export: boolean;
    advancedAnalytics: boolean;
  };
  prices: {
    cycle: 'monthly' | 'yearly';
    price: { amount: string; currency: string };
    savingsPct?: number;
  }[];
}

/**
 * Rough BDT→USD display rate, hand-updated occasionally — not a live rate (no
 * public FX endpoint exists; `/currency/rates` requires auth).
 *
 * Display only, and *secondary* display at that. The actual charge is always
 * created and settled in BDT (see the server's `config/plans.ts` and
 * `sslcommerz.gateway.ts`), per IMPLEMENTATION-PLAN decision D6 — "catalogue
 * currency fixed to BDT in v1; display conversion is the client's job".
 *
 * The pricing card therefore leads with the BDT figure and shows this
 * conversion underneath, marked with a `≈`. It used to be the other way round,
 * which meant the headline number on the page was one no card statement would
 * ever match. Since the approximation is now visibly an approximation, a stale
 * rate here is a cosmetic drift rather than a wrong price — but keep it
 * reasonably current anyway.
 */
export const USD_DISPLAY_RATE = 1 / 122;

/**
 * Merges live catalogue numbers onto the marketing copy. Returns `null` if
 * the response is missing either tier or a usable premium price, so the
 * caller can keep showing the fallback rather than render a half-empty table.
 *
 * Same split the app's own `ComparePlansScreen` uses: the API owns the
 * numbers and the limits, the site owns the wording and the ordering.
 */
export function tiersFromCatalogue(catalogue: PlanCatalogueEntry[]): Tier[] | null {
  const free = catalogue.find((p) => p.id === 'free');
  const premium = catalogue.find((p) => p.id === 'premium');
  if (!free || !premium) return null;

  const monthly = Number(premium.prices.find((p) => p.cycle === 'monthly')?.price.amount ?? NaN);
  const yearlyEntry = premium.prices.find((p) => p.cycle === 'yearly');
  const yearly = Number(yearlyEntry?.price.amount ?? NaN);
  if (!Number.isFinite(monthly) || !Number.isFinite(yearly)) return null;

  const freeAiLimit = free.features.aiMessagesPerMonth ?? 5;
  const freeGoalsLimit = free.features.maxGoals ?? 3;

  return [
    {
      id: 'free',
      name: free.name,
      monthly: 0,
      yearly: 0,
      savingsPct: undefined,
      body: TIER_COPY.free,
      features: [
        'Net worth tracking',
        'Financial health score',
        'Zakat & Nisab tracking',
        `Up to ${freeGoalsLimit} goals`,
        `${freeAiLimit} AI messages / month`,
      ],
      highlighted: false,
    },
    {
      id: 'premium',
      name: premium.name,
      monthly,
      yearly,
      savingsPct: yearlyEntry?.savingsPct,
      body: TIER_COPY.premium,
      features: [
        'Everything in Free',
        'Unlimited AI messages',
        'Unlimited goals',
        ...(premium.features.advancedAnalytics ? ['Advanced analytics & reports'] : []),
        ...(premium.features.export ? ['Data export'] : []),
        'Priority support',
      ],
      highlighted: true,
    },
  ];
}
