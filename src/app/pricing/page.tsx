import type { Metadata } from 'next';
import { CtaBand } from '@/components/CtaBand';
import { FaqAccordion } from '@/components/FaqAccordion';
import { PageHero } from '@/components/PageHero';
import { PricingCards } from '@/components/PricingCards';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import {
  faqs,
  planComparison,
  plans,
  yearlySavingsPct,
  type ComparisonRow,
} from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Deenomics is free forever for tracking, Zakat, and the Islamic finance guide. Premium unlocks unlimited AI coaching, advanced analytics, unlimited goals, and data export.',
};

/** The billing-relevant subset, picked by question so reordering `faqs` is safe. */
const billingFaqs = faqs.filter((f) =>
  [
    'Should I pay monthly or yearly?',
    'How do I cancel Premium?',
    'Is my financial data private?',
  ].includes(f.q),
);

/** The 'not included' marker used throughout `planComparison`. */
const EM_DASH = '\u2014';

const bestYearlySaving = Math.max(
  0,
  ...plans.map((p) => yearlySavingsPct(p.amounts) ?? 0),
);

const planColumns: { key: keyof Omit<ComparisonRow, 'label'>; label: string; accent: string }[] = [
  { key: 'free', label: 'Free', accent: 'text-green-bright' },
  { key: 'basic', label: 'Basic', accent: 'text-green-bright' },
  { key: 'premium', label: 'Premium', accent: 'text-green-bright' },
  { key: 'family', label: 'Family', accent: 'text-gold-light' },
  { key: 'business', label: 'Business', accent: 'text-slate-body' },
];

function Cell({ value, highlight }: { value: string; highlight?: boolean }) {
  if (value === EM_DASH) {
    return <span className="text-slate-body/40">{EM_DASH}</span>;
  }
  if (value === 'Included') {
    return (
      <span
        className={`mx-auto grid h-6 w-6 place-items-center rounded-full ${
          highlight ? 'bg-gold/20 text-gold-light' : 'bg-green-tint text-green-bright'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12.5 9.5 18 20 6.5" />
        </svg>
      </span>
    );
  }
  return (
    <span className={`text-[0.85rem] font-semibold ${highlight ? 'text-gold-light' : 'text-ink'}`}>
      {value}
    </span>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Free where it matters.{' '}
            <span className="text-gradient-gold">Premium</span> where it helps.
          </>
        }
        lede={`Tracking your money and calculating your Zakat should not be behind a paywall. They never will be. Everything above Free is optional \u2014 from \u09f3149 a month, with up to ${bestYearlySaving}% off when you pay yearly.`}
      />

      <section className="overflow-hidden pane-tint py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <PricingCards />
        </div>
      </section>

      {/* -------------------------------------------- Comparison table */}
      <section className="overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading eyebrow="Side by side" title="Compare every feature" />

          <Reveal delay={100} className="mt-12">
            <div className="glass overflow-x-auto rounded-3xl">
              <table className="w-full min-w-[54rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.06]">
                    <th scope="col" className="px-5 py-5 text-[0.78rem] font-bold uppercase tracking-widest text-slate-body">
                      Feature
                    </th>
                    {planColumns.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className={`px-4 py-5 text-center text-[0.78rem] font-bold uppercase tracking-widest ${col.accent} ${
                          col.key === 'family' ? 'bg-[rgba(215,162,37,0.06)]' : ''
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {planComparison.map((row) => (
                    <tr key={row.label} className="border-b border-white/10 transition-colors last:border-0 hover:bg-white/[0.05]">
                      <th scope="row" className="px-5 py-4 text-[0.9rem] font-semibold text-ink">
                        {row.label}
                      </th>
                      {planColumns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-4 py-4 text-center ${col.key === 'family' ? 'bg-[rgba(215,162,37,0.06)]' : ''}`}
                        >
                          <Cell value={row[col.key]} highlight={col.key === 'family'} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 text-center text-[0.9rem] leading-relaxed text-slate-body">
              Paid plans are billed through Google Play in your local currency. Lifetime is a
              single payment; every other plan renews until you cancel it, which you can do at
              any time from Profile → Subscription. Your features stay active until the end of
              the period you have already paid for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ FAQ */}
      <section className="overflow-hidden pane-tint py-24 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="Billing" title="Questions about paying" />
          <Reveal delay={100} className="mt-12">
            <FaqAccordion items={billingFaqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Start free. Upgrade only if you need to."
        lede="Every Deenomics account begins on the free plan, with no card and no trial countdown."
      />
    </>
  );
}
