'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/Reveal';
import {
  billing,
  extraPlans,
  plans,
  taka,
  yearlySavingsPct,
  type BillingCycle,
} from '@/lib/site';

const cycles: BillingCycle[] = ['monthly', 'yearly'];

/** The best saving on offer, so the toggle badge can never overstate it. */
const bestSaving = Math.max(
  0,
  ...plans.map((p) => yearlySavingsPct(p.amounts) ?? 0),
);

function Check({ featured }: { featured: boolean }) {
  return (
    <span
      className={`mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full ${
        featured ? 'bg-gold/20 text-gold-light' : 'bg-green-tint text-emerald-brand'
      }`}
      style={{ height: '1.15rem', width: '1.15rem' }}
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12.5 9.5 18 20 6.5" />
      </svg>
    </span>
  );
}

function CycleToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="flex justify-center">
      <div
        role="radiogroup"
        aria-label="Billing period"
        className="inline-flex items-center gap-1 rounded-full border border-divider bg-white p-1.5 shadow-card"
      >
        {cycles.map((c) => {
          const active = c === cycle;
          return (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(c)}
              className={`relative rounded-full px-5 py-2.5 text-[0.95rem] font-bold transition-all duration-300 ${
                active
                  ? 'bg-emerald-brand text-white shadow-[0_8px_20px_-8px_rgba(16,108,49,0.8)]'
                  : 'text-slate-body hover:text-ink'
              }`}
            >
              {billing.cycles[c].label}
              {c === 'yearly' && bestSaving > 0 ? (
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-[0.68rem] font-extrabold ${
                    active ? 'bg-gold text-emerald-ink' : 'bg-[rgba(215,162,37,0.15)] text-gold-deep'
                  }`}
                >
                  save up to {bestSaving}%
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PricingCards({
  showToggle = true,
  showExtras = true,
}: {
  showToggle?: boolean;
  showExtras?: boolean;
}) {
  const [cycle, setCycle] = useState<BillingCycle>('yearly');

  return (
    <div>
      {showToggle ? <CycleToggle cycle={cycle} onChange={setCycle} /> : null}

      <div className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-4 ${showToggle ? 'mt-12' : ''}`}>
        {plans.map((plan, i) => {
          const amount = plan.amounts[cycle];
          const free = amount === 0;
          const saving = yearlySavingsPct(plan.amounts);

          // The line under the price: what a yearly plan works out at per
          // month, or what switching to yearly would save.
          const footnote = free
            ? null
            : cycle === 'yearly'
              ? `About ${taka(Math.round(amount / 12))} a month${saving ? `, saving ${saving}%` : ''}`
              : saving
                ? `Switch to yearly and save ${saving}%`
                : null;

          return (
            <Reveal key={plan.id} delay={i * 90} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl p-6 ${
                  plan.featured
                    ? 'bg-gradient-to-br from-emerald-deep via-emerald-ink to-emerald-night text-white shadow-lift ring-1 ring-gold/30'
                    : 'border border-divider bg-white shadow-card'
                }`}
              >
                {plan.badge ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-gold-light to-gold px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-widest text-emerald-ink">
                    {plan.badge}
                  </span>
                ) : null}

                <h3 className={`text-[1.02rem] font-bold ${plan.featured ? 'text-gold-light' : 'text-emerald-brand'}`}>
                  {plan.name}
                </h3>

                <p className={`mt-3 flex flex-wrap items-baseline gap-x-1.5 ${plan.featured ? 'text-white' : 'text-ink'}`}>
                  <span className="text-[2rem] font-extrabold leading-none tracking-tight">
                    {taka(amount)}
                  </span>
                  <span className={`text-[0.82rem] font-medium ${plan.featured ? 'text-white/50' : 'text-slate-body'}`}>
                    {free ? 'forever' : cycle === 'yearly' ? 'per year' : 'per month'}
                  </span>
                </p>

                {/* Height is reserved either way, so switching billing period
                    never knocks the four cards out of alignment. */}
                <p
                  className={`mt-2 min-h-[2.2rem] text-[0.78rem] font-semibold leading-snug ${
                    plan.featured ? 'text-gold-light/80' : 'text-slate-body'
                  }`}
                >
                  {footnote ?? ''}
                </p>

                <p className={`text-[0.86rem] leading-relaxed ${plan.featured ? 'text-white/60' : 'text-slate-body'}`}>
                  {plan.summary}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <Check featured={plan.featured} />
                      <span className={`text-[0.85rem] leading-snug ${plan.featured ? 'text-white/85' : 'text-ink/85'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/download"
                  variant={plan.featured ? 'gold' : 'primary'}
                  size="md"
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-8 text-center text-[0.85rem] text-slate-body">
        Prices shown in {billing.currency}. You are charged in your local currency at your app
        store&apos;s rate, and can move between plans at any time.
      </p>

      {showExtras ? (
        <div className="mt-14">
          <h3 className="text-center text-[0.72rem] font-bold uppercase tracking-[0.2em] text-slate-body">
            Also available
          </h3>
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            {extraPlans.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col gap-6 rounded-3xl border border-divider bg-white p-7 shadow-card sm:flex-row sm:items-start">
                  <div className="sm:w-[46%] sm:shrink-0">
                    <p className="text-[0.68rem] font-bold uppercase tracking-widest text-gold-deep">
                      {plan.kicker}
                    </p>
                    <h4 className="mt-2 text-[1.3rem] font-extrabold tracking-tight text-ink">{plan.name}</h4>
                    <p className="mt-3 flex items-baseline gap-1.5">
                      <span className="text-[1.85rem] font-extrabold leading-none tracking-tight text-ink">
                        {plan.price}
                      </span>
                      <span className="text-[0.82rem] font-medium text-slate-body">{plan.cadence}</span>
                    </p>
                    <p className="mt-1.5 text-[0.78rem] font-semibold text-slate-body">{plan.footnote}</p>
                    <p className="mt-3 text-[0.88rem] leading-relaxed text-slate-body">{plan.summary}</p>
                  </div>

                  <div className="flex flex-1 flex-col">
                    <ul className="flex-1 space-y-2.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <Check featured={false} />
                          <span className="text-[0.85rem] leading-snug text-ink/85">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button href={plan.href} variant="primary" size="sm" className="mt-5 w-full sm:w-auto sm:self-start">
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
