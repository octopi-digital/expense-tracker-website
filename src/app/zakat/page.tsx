import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CtaBand } from '@/components/CtaBand';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Ornament } from '@/components/Pattern';
import { PageHero } from '@/components/PageHero';
import { PhoneFrame, ZakatScreen } from '@/components/PhoneMockup';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { ZakatCalculator } from '@/components/ZakatCalculator';
import { faqs } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Zakat & Sadaqah',
  description:
    'Calculate your Zakat against the live Nisab threshold, track the Hawl automatically, and keep your Sadaqah in a PIN-locked vault. Free Zakat calculator plus the Deenomics Zakat engine.',
};

const included = [
  { label: 'Cash and bank balances', yes: true },
  { label: 'Gold and silver, at market value', yes: true },
  { label: 'Business stock held for sale', yes: true },
  { label: 'Shares, funds, and sukuk', yes: true },
  { label: 'Money lent out that you expect back', yes: true },
  { label: 'Your home you live in', yes: false },
  { label: 'The car you drive', yes: false },
  { label: 'Tools and machinery you work with', yes: false },
  { label: 'Personal clothing and furniture', yes: false },
];

const engineSteps = [
  {
    n: '01',
    title: 'It values what you hold',
    body: 'Cash, bank balances, gold and silver by weight, business stock, investments, and receivables — pulled from the assets you already log in the app, valued at today’s rates.',
  },
  {
    n: '02',
    title: 'It watches the Nisab',
    body: 'Your net zakatable wealth is compared against the lower of the gold (87.48g) and silver (612.36g) thresholds, using live metal prices, every day.',
  },
  {
    n: '03',
    title: 'It runs the Hawl for you',
    body: 'The lunar year starts the day you cross the Nisab. If your wealth dips below and comes back, Deenomics handles the reset — you never have to remember a date.',
  },
  {
    n: '04',
    title: 'It shows the 2.5%, with the working',
    body: 'When the Hawl completes you get the exact amount due and a line-by-line breakdown of how it was reached. Log payments against it as you give.',
  },
];

export default function ZakatPage() {
  return (
    <>
      <PageHero
        eyebrow="The third pillar"
        title={
          <>
            Your Zakat, calculated{' '}
            <span className="text-gradient-gold">correctly</span>
          </>
        }
        lede="Nisab against live gold and silver rates. A Hawl cycle that tracks itself. And every asset you own counted properly — so the figure you give is the figure you owe."
      >
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="#calculator" variant="gold" size="lg">
            Calculate my Zakat
          </Button>
          <Button href="/download" variant="outline" size="lg">
            Get the app
          </Button>
        </div>
      </PageHero>

      {/* ------------------------------------------------- Calculator */}
      <section id="calculator" className="scroll-mt-24 bg-[#FAFBFB] py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Free calculator"
            title="Work out this year's Zakat"
            lede="Fill in what you hold. Nothing is sent anywhere — the whole calculation runs in your browser."
          />
          <Reveal delay={100} className="mt-14">
            <ZakatCalculator />
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ How it works */}
      <section className="overflow-hidden bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Inside the engine"
              title="What the app does that a calculator cannot"
              lede="A calculator answers one question, once. Deenomics keeps answering it every day as your wealth moves."
            />
            <div className="mt-10 space-y-8">
              {engineSteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 90}>
                  <div className="flex gap-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-deep to-gold text-[0.85rem] font-extrabold text-white shadow-[0_10px_24px_-12px_rgba(215,162,37,0.9)]">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-[1.15rem] font-extrabold tracking-tight text-ink">{step.title}</h3>
                      <p className="mt-2 text-[0.98rem] leading-relaxed text-slate-body">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120} className="flex justify-center lg:sticky lg:top-28 lg:justify-end">
            <PhoneFrame glow={false}>
              <ZakatScreen />
            </PhoneFrame>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- What counts */}
      <section className="relative overflow-hidden bg-emerald-ink py-24 sm:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(215,162,37,0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Zakatable or not"
            title="What actually counts towards your Zakat"
            lede="Wealth that grows or sits idle is zakatable. Things you use in daily life are not."
          />

          <Reveal delay={100} className="mt-12">
            <ul className="grid gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li
                  key={item.label}
                  className={`flex items-start gap-3 rounded-2xl border p-4 ${
                    item.yes
                      ? 'border-green-bright/25 bg-green-bright/[0.06]'
                      : 'border-white/10 bg-white/[0.03]'
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                      item.yes ? 'bg-green-bright text-emerald-ink' : 'bg-white/15 text-white/60'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                      {item.yes ? <path d="M4 12.5 9.5 18 20 6.5" /> : <path d="M6 6l12 12M18 6L6 18" />}
                    </svg>
                  </span>
                  <span className={`text-[0.95rem] ${item.yes ? 'text-white' : 'text-white/50'}`}>{item.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <Ornament className="mt-16" />
            <figure className="mt-10 text-center">
              <blockquote className="font-arabic text-[1.5rem] leading-loose text-gold-light" dir="rtl" lang="ar">
                خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا
              </blockquote>
              <p className="mt-4 text-[1.02rem] italic text-white/65">
                “Take from their wealth a charity by which you purify them and cause them increase.”
              </p>
              <figcaption className="mt-3 text-[0.8rem] font-bold uppercase tracking-widest text-gold/70">
                Al-Qur’an, 9:103
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ Sadaqah + FAQ */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                t: 'Sadaqah, logged',
                d: 'Record every voluntary gift — masjid, orphan sponsorship, a neighbour in need — and see the year’s total in one place.',
              },
              {
                t: 'Income purification',
                d: 'Interest you could not avoid receiving, tracked separately so you can give it away without counting it as charity.',
              },
              {
                t: 'A private vault',
                d: 'Zakat and Sadaqah sit behind their own PIN, separate from your device unlock. Giving stays between you and Allah.',
              },
            ].map((card, i) => (
              <Reveal key={card.t} delay={i * 90}>
                <div className="h-full rounded-3xl border border-divider bg-[#FAFBFB] p-7">
                  <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <rect x="5" y="5" width="14" height="14" />
                    <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                  </svg>
                  <h3 className="mt-5 text-[1.15rem] font-extrabold tracking-tight text-ink">{card.t}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-slate-body">{card.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-24 max-w-3xl">
            <SectionHeading eyebrow="Zakat questions" title="Before you calculate" />
            <Reveal delay={100} className="mt-12">
              <FaqAccordion items={[faqs[1], faqs[0], faqs[2]]} />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Never miss a Hawl again"
        lede="Deenomics tracks the threshold, the year, and the amount — so the only thing left for you to do is give."
      />
    </>
  );
}
