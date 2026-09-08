import Link from 'next/link';
import { Button } from '@/components/Button';
import { CtaBand } from '@/components/CtaBand';
import { FaqAccordion } from '@/components/FaqAccordion';
import { FeatureIndex } from '@/components/FeatureIndex';
import { HowItWorks } from '@/components/HowItWorks';
import { GeometricPattern, Ornament } from '@/components/Pattern';
import { AiScreen, HomeScreen, InboxScreen, PhoneFrame, ZakatScreen } from '@/components/PhoneMockup';
import { PricingCards } from '@/components/PricingCards';
import { Reveal } from '@/components/Reveal';
import { Eyebrow, SectionHeading } from '@/components/SectionHeading';
import { StoreBadges } from '@/components/StoreBadges';
import { faqs, site, stats } from '@/lib/site';

const marqueeItems = [
  'Zakat calculator',
  'Nisab tracking',
  'Hawl cycle',
  'Sadaqah log',
  'AI voice coach',
  'SMS auto-capture',
  'Hajj fund',
  'Halal earnings guide',
  'Riba explained',
  'Financial health score',
  'Assets & liabilities',
  'Secret vault',
  'Daily verse',
  'Want vs need',
];

const guideTopics = [
  { title: 'Halal earnings', body: 'What makes an income permissible, and how to handle the parts that are not.' },
  { title: 'Riba', body: 'Where interest hides in everyday products, and the alternatives to reach for.' },
  { title: 'Rules of wealth', body: 'The principles that govern owning, growing, and spending money in Islam.' },
  { title: 'Zakat & Sadaqah', body: 'Who pays, on what, when — and the difference between the obligatory and the voluntary.' },
  { title: 'Business ethics', body: 'Contracts, partnerships, and trade conducted the way the Sunnah asks.' },
  { title: 'Daily verse & hadith', body: 'A short reminder on your home screen, every day.' },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden pane-deep pb-24 pt-32 sm:pb-32 sm:pt-40">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.09} stroke="#FADB8A" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
        <div
          className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(25,204,80,0.22), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -right-32 bottom-0 h-[28rem] w-[28rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(215,162,37,0.16), transparent 70%)' }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <Reveal>
              <Eyebrow tone="light">Deen + Economics</Eyebrow>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]">
                Track your wealth.
                <br />
                Fulfil your{' '}
                <span className="text-gradient-gold">obligations.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.1rem] leading-relaxed text-white/65 lg:mx-0">
                Deenomics is the expense tracker built around your deen. Your transactions log
                themselves, your Zakat is calculated to the taka, and an AI coach that knows your
                numbers is there whenever you need it.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row lg:justify-start sm:justify-center">
                <Button href="/download" variant="gold" size="lg">
                  Download free
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h13m-5-6 6 6-6 6" />
                  </svg>
                </Button>
                <Button href="/zakat" variant="outline" size="lg">
                  See the Zakat engine
                </Button>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <StoreBadges className="mt-10 justify-center lg:justify-start" />
            </Reveal>
          </div>

          {/* Phone cluster: a lead device with two peeking behind it. */}
          <Reveal delay={200} className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="pointer-events-none absolute -left-28 top-16 hidden scale-[0.82] opacity-45 blur-[1px] xl:block">
                <PhoneFrame glow={false}>
                  <InboxScreen />
                </PhoneFrame>
              </div>
              <div className="pointer-events-none absolute -right-24 top-28 hidden scale-[0.82] opacity-45 blur-[1px] xl:block">
                <PhoneFrame glow={false}>
                  <ZakatScreen />
                </PhoneFrame>
              </div>
              <div className="relative animate-float">
                <PhoneFrame>
                  <HomeScreen />
                </PhoneFrame>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stat strip */}
        <div className="relative mx-auto mt-20 max-w-7xl px-5 sm:px-8">
          <Reveal>
            {/* Hairlines are drawn per-cell rather than with a gap, so the four
                stats share one uninterrupted pane of glass: two columns on
                mobile, four from lg. */}
            <dl className="glass-dark grid grid-cols-2 overflow-hidden rounded-3xl lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-white/10 px-6 py-7 text-center [&:nth-child(even)]:border-l [&:nth-child(n+3)]:border-t lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(n+3)]:border-t-0"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-extrabold tracking-tight text-gold-light">{stat.value}</span>
                    <span className="mt-2 block text-[0.82rem] font-medium text-white/50">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Marquee */}
      <section className="border-y border-ink/[0.06] pane-tint py-5" aria-hidden="true">
        <div className="mask-fade-edges flex overflow-hidden">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={`${item}-${i}`} className="flex shrink-0 items-center gap-10">
                <span className="whitespace-nowrap text-[0.92rem] font-bold uppercase tracking-widest text-ink/35">
                  {item}
                </span>
                <svg viewBox="0 0 24 24" className="h-3 w-3 shrink-0 text-gold/60" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="5" y="5" width="14" height="14" />
                  <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Features */}
      <section className="relative overflow-hidden pane-tint py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FeatureIndex />
        </div>
      </section>

      {/* -------------------------------------------- Auto-capture split */}
      <section className="overflow-hidden pane py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal className="flex justify-center lg:justify-start">
            <PhoneFrame glow={false} className="lg:sticky lg:top-28">
              <InboxScreen />
            </PhoneFrame>
          </Reveal>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Zero data entry"
              title={
                <>
                  You will never type a transaction again — unless you want to
                </>
              }
              lede="Every bank SMS and payment notification that reaches your phone is parsed into a draft: amount, merchant, category, account. Nothing enters your ledger until you approve it."
            />
            <Reveal delay={120}>
              <ul className="mt-9 space-y-5">
                {[
                  { t: 'Parsed on your device', d: 'The message never leaves your phone to be read. No bank login, ever.' },
                  { t: 'An inbox, not an autopilot', d: 'Drafts wait for you. Approve, edit the category, or discard.' },
                  { t: 'Want or need, tagged', d: 'One tap sorts each expense, and the analytics do the rest.' },
                  { t: 'Voice and photo entry', d: 'Say it out loud or snap the receipt when there is no SMS to catch.' },
                ].map((item) => (
                  <li key={item.t} className="flex gap-4">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-brand text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12.5 9.5 18 20 6.5" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-[1.02rem] font-bold text-ink">{item.t}</p>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-body">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* --------------------------------------------- Zakat spotlight */}
      <section className="relative overflow-hidden pane-gold py-24 sm:py-32">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.1} stroke="#FADB8A" />
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(215,162,37,0.22), transparent 70%)' }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="The third pillar"
              title={
                <>
                  Your Zakat, worked out{' '}
                  <span className="text-gradient-gold">to the taka</span>
                </>
              }
              lede="Nisab tracked against live gold and silver rates. A Hawl that starts, pauses and completes on its own. And 2.5% calculated across every asset you hold — with the working shown line by line."
            />

            <Reveal delay={120}>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  { k: 'Nisab', v: 'Live gold & silver rates', i: 'M12 2 3 6v6c0 5 3.8 8.9 9 10 5.2-1.1 9-5 9-10V6l-9-4Z' },
                  { k: 'Hawl', v: 'Tracked automatically', i: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5.4l4.2 2.5-1 1.7L11 13V7h2Z' },
                  { k: 'Assets', v: 'Cash, gold, stock, property', i: 'M4 20h16v2H4v-2ZM5 11h3v8H5v-8Zm5.5-5h3v13h-3V6ZM16 9h3v10h-3V9Z' },
                  { k: 'Vault', v: 'PIN-locked and private', i: 'M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2Zm-8-2a3 3 0 0 1 6 0v2H9V7Z' },
                ].map((item) => (
                  /* Header row, rule, then the value — rather than a bare glyph
                     floating above two stacked lines with a hole between them. */
                  <div key={item.k} className="glass-dark glass-hover rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold/[0.20] text-gold-light ring-1 ring-inset ring-gold/35">
                        <svg viewBox="0 0 24 24" className="h-[1.15rem] w-[1.15rem]" fill="currentColor">
                          <path d={item.i} />
                        </svg>
                      </span>
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-light/80">
                        {item.k}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-4 block h-px w-full bg-gradient-to-r from-white/20 via-white/8 to-transparent"
                    />
                    <p className="mt-3.5 text-[1.02rem] font-semibold leading-snug text-white">{item.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <Button href="/zakat" variant="gold" size="lg" className="mt-10">
                How the Zakat engine works
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h13m-5-6 6 6-6 6" />
                </svg>
              </Button>
            </Reveal>
          </div>

          <Reveal delay={140} className="flex justify-center lg:justify-end">
            <PhoneFrame>
              <ZakatScreen />
            </PhoneFrame>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- AI spotlight */}
      <section className="overflow-hidden pane py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <SectionHeading
              align="left"
              eyebrow="Ask, don't guess"
              title={
                <>
                  An AI coach that has{' '}
                  <span className="text-gradient-green">seen your numbers</span>
                </>
              }
              lede="Call it, message it, or send it a photo. Because it can see your real income and spending, the answers are about your money — and where a ruling is involved, it cites the source."
            />

            <Reveal delay={120}>
              <div className="mt-9 space-y-3">
                {[
                  'Why did my expenses go up this month?',
                  'Is a car loan from this bank halal?',
                  'How much do I need to save monthly for Hajj in 2029?',
                  'Purify the interest I received last quarter.',
                ].map((q) => (
                  <div
                    key={q}
                    className="glass flex items-center gap-3.5 rounded-2xl px-5 py-4 transition-colors hover:border-lavender-bright/50"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lavender-bright/[0.18] ring-1 ring-inset ring-lavender-bright/35">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 text-lavender-bright" fill="currentColor">
                        <path d="M12 2.5 13.7 8 19 9.7 13.7 11.4 12 17l-1.7-5.6L5 9.7 10.3 8 12 2.5Z" />
                      </svg>
                    </span>
                    <p className="text-[0.98rem] font-medium text-ink">“{q}”</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 text-[0.92rem] text-slate-body">
                Available in English, বাংলা, العربية and اردو — it answers in whichever you use.
              </p>
            </Reveal>
          </div>

          <Reveal className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <PhoneFrame glow={false}>
              <AiScreen />
            </PhoneFrame>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- Islamic guide */}
      <section className="relative overflow-hidden pane-ink py-24 sm:py-32">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="The guide, built in"
            title={
              <>
                Knowledge, right where the{' '}
                <span className="text-gradient-gold">decision is made</span>
              </>
            }
            lede="A reference library written for people managing real money — not an academic text, and not a fatwa service."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guideTopics.map((topic, i) => (
              <Reveal key={topic.title} delay={i * 70}>
                <div className="glass-dark glass-hover group h-full rounded-2xl p-6">
                  <h3 className="flex items-center gap-2.5 text-[1.05rem] font-bold text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="5" y="5" width="14" height="14" />
                      <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
                    </svg>
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-white/55">{topic.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <Ornament className="mt-16" />
            <figure className="mx-auto mt-10 max-w-2xl text-center">
              <blockquote className="font-arabic text-[1.6rem] leading-loose text-gold-light" dir="rtl" lang="ar">
                وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ
              </blockquote>
              <p className="mt-4 text-[1.05rem] italic text-white/65">
                “And establish prayer and give Zakat.”
              </p>
              <figcaption className="mt-3 text-[0.82rem] font-bold uppercase tracking-widest text-gold/70">
                Al-Qur’an, 2:110
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- How it works */}
      <section className="overflow-hidden pane-tint py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Getting started"
            title="Set up once, then let it run"
            lede="Most people are finished in under five minutes and never open a spreadsheet again."
          />

          <div className="mt-16">
            <HowItWorks />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Pricing */}
      <section className="overflow-hidden pane py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Pricing"
            title="Free to use. Premium when you want more."
            lede="Tracking, Zakat, and the guide are free forever. Premium unlocks unlimited AI and the deeper analytics — ৳299 a month, or ৳2,999 a year."
          />
          <div className="mt-14">
            <PricingCards showExtras={false} />
          </div>
          <Reveal delay={140}>
            <p className="mt-10 text-center text-[0.95rem] text-slate-body">
              Want the full breakdown?{' '}
              <Link href="/pricing" className="font-bold text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright">
                Compare every feature
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- FAQ */}
      <section className="overflow-hidden pane-tint py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="Questions" title="Things people ask first" />
          <Reveal delay={100} className="mt-12">
            <FaqAccordion items={faqs.slice(0, 5)} />
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-8 text-center text-[0.95rem] text-slate-body">
              Still stuck?{' '}
              <Link href="/support" className="font-bold text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright">
                Talk to support
              </Link>{' '}
              or email{' '}
              <a href={`mailto:${site.email}`} className="font-bold text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright">
                {site.email}
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
