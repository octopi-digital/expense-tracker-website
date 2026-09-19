import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { GeometricPattern } from '@/components/Pattern';
import { PhoneFrame, ZakatScreen } from '@/components/PhoneMockup';
import { Reveal } from '@/components/Reveal';
import { Scripture } from '@/components/Scripture';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Why Deenomics',
  description:
    'Why use Deenomics instead of a generic budgeting app or a spreadsheet: Zakat worked out to the taka, transactions that log themselves, Islamic finance guidance in context, and no bank login required.',
};

/** The gap the product exists to close, stated plainly. */
const gaps = [
  {
    n: '01',
    t: 'Your Zakat is not an afterthought',
    d: 'Most finance apps cannot tell you what you owe. Deenomics tracks your Nisab against live gold and silver rates, runs the Hawl on its own, and shows the 2.5% worked out line by line — so you can check it rather than trust it.',
    tags: ['Live Nisab', 'Hawl tracking', 'Working shown'],
  },
  {
    n: '02',
    t: 'You will not type transactions',
    d: 'Every bank SMS and payment alert that reaches your phone is parsed into a draft: amount, merchant, category, account. Nothing enters your ledger until you approve it, and nothing needs your bank login.',
    tags: ['SMS capture', 'Approve or discard', 'No bank login'],
  },
  {
    n: '03',
    t: 'Guidance where the decision is made',
    d: 'Riba, halal earnings, the rules of wealth, business ethics. The reference sits inside the app, next to the number you are actually looking at — not in a browser tab you will open later.',
    tags: ['Riba', 'Halal earnings', 'Daily verse'],
  },
  {
    n: '04',
    t: 'A coach that has seen your numbers',
    d: 'Ask why spending rose, whether a loan is permissible, or how much to save monthly for Hajj. Because it can see your real income and spending the answers are about your money, and where a ruling is involved it cites the source.',
    tags: ['Your figures', 'Cited rulings', '4 languages'],
  },
  {
    n: '05',
    t: 'Private by construction, not by promise',
    d: 'Messages are parsed on your device and never uploaded. There is no bank credential to hand over, and a PIN-locked vault for the holdings you would rather not have on screen.',
    tags: ['On-device', 'No credentials', 'PIN vault'],
  },
  {
    n: '06',
    t: 'Free where it matters',
    d: 'Tracking, the Zakat engine and the guide are free forever — the parts you need to meet an obligation should not sit behind a paywall. Premium buys unlimited AI and deeper analytics, nothing else.',
    tags: ['Free core', 'No ads in the way', 'Optional Premium'],
  },
];

/** Rows are the jobs a Muslim actually needs doing; columns are the options. */
const comparison = {
  columns: ['Deenomics', 'A generic tracker', 'A spreadsheet'],
  rows: [
    { label: 'Transactions captured automatically', v: [true, 'Bank login required', false] },
    { label: 'Zakat calculated on your real assets', v: [true, false, 'By hand, every year'] },
    { label: 'Nisab tracked against live metal rates', v: [true, false, false] },
    { label: 'Hawl started, paused and completed for you', v: [true, false, false] },
    { label: 'Islamic finance guidance in context', v: [true, false, false] },
    { label: 'Works without handing over bank credentials', v: [true, false, true] },
    { label: 'Answers questions about your own numbers', v: [true, 'Generic tips', false] },
    { label: 'Cost to do the essentials', v: ['Free', 'Usually paid', 'Free'] },
  ],
};

const audience = [
  {
    t: 'You already track, badly',
    d: 'A notes app, a spreadsheet you update in bursts, and a rough guess at Zakat every Ramadan. This replaces all three and keeps itself current.',
  },
  {
    t: 'You have never tracked at all',
    d: 'Setup is a two-minute survey, then your alerts do the work. You get a picture of your money without building one.',
  },
  {
    t: 'You want the ruling, not just the number',
    d: 'You care whether the income is permissible and whether the Zakat is right, and you want the reasoning shown rather than asserted.',
  },
];

function Tick() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-green-bright/20 text-green-bright ring-1 ring-inset ring-green-bright/35">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12.5 9.5 18 20 6.5" />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="grid h-6 w-6 place-items-center rounded-full bg-white/[0.06] text-white/35 ring-1 ring-inset ring-white/12">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </span>
  );
}

/** `true` is a tick, `false` a cross, a string is a caveat worth spelling out. */
function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Tick />;
  if (value === false) return <Cross />;
  return <span className="text-[0.86rem] leading-snug text-white/55">{value}</span>;
}

export default function WhyPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Deenomics"
        title={
          <>
            Built for the money you have, and the{' '}
            <span className="text-gradient-gold">obligations</span> that come with it
          </>
        }
        lede="Plenty of apps will show you where your salary went. Almost none of them can tell you what you owe in Zakat, whether an income is permissible, or what to do about the interest you did not ask for. That gap is the whole reason this exists."
      >
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/download" variant="gold" size="lg">
            Download free
          </Button>
          <Button href="/features" variant="outline" size="lg">
            See every feature
          </Button>
        </div>
      </PageHero>

      {/* The thesis of the page: what you hold is not really yours to keep,
          and knowing where it went is the only way to account for it. */}
      <section className="relative overflow-hidden pane-ink py-20 sm:py-24">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Scripture
            arabic="يَقُولُ ٱبْنُ آدَمَ مَالِي مَالِي، وَهَلْ لَكَ مِنْ مَالِكَ إِلَّا مَا أَكَلْتَ فَأَفْنَيْتَ، أَوْ لَبِسْتَ فَأَبْلَيْتَ، أَوْ تَصَدَّقْتَ فَأَمْضَيْتَ"
            translation="The son of Adam says: ‘My wealth, my wealth.’ But do you own of your wealth anything except what you have eaten and finished, what you have worn and worn out, or what you have given in charity and sent ahead?"
            bangla="আদম সন্তান বলে: আমার সম্পদ, আমার সম্পদ। অথচ তোমার সম্পদ থেকে তোমার জন্য কী রয়েছে — তুমি যা খেয়ে নিঃশেষ করেছ, যা পরিধান করে পুরনো করেছ, অথবা যা সদকা করে আগে পাঠিয়েছ, তা ছাড়া?"
            reference="Ṣaḥīḥ Muslim 2958"
            note="Three destinations for everything you hold: consumed, worn out, or sent ahead. Almost nobody can say from memory which of the three a year of income actually went to. A ledger can."
          />
        </div>
      </section>

      {/* ------------------------------------------------ The six reasons */}
      <section className="overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="The short version"
            title="Six reasons people switch"
            lede="Not features for their own sake — each one closes a gap that a general-purpose money app leaves open."
          />

          <ol className="mt-14 space-y-4">
            {gaps.map((g, i) => (
              <Reveal key={g.n} as="li" delay={i * 60} className="list-none">
                <div className="glass glass-hover rounded-3xl p-6 sm:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[1.6rem] font-extrabold leading-none tracking-tight text-gold-light/70 tabular-nums">
                      {g.n}
                    </span>
                    <h3 className="text-pretty text-[1.25rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.4rem]">
                      {g.t}
                    </h3>
                  </div>
                  <p className="mt-4 text-[1rem] leading-relaxed text-slate-body sm:pl-12">{g.d}</p>
                  <ul className="mt-5 flex flex-wrap gap-2 sm:pl-12">
                    {g.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-white/[0.07] px-3 py-1 text-[0.75rem] font-semibold text-white/60 ring-1 ring-inset ring-white/10"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------- Comparison */}
      <section className="relative overflow-hidden pane-ink py-24 sm:py-28">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Side by side"
            title="What the alternatives leave you doing yourself"
            lede="The spreadsheet is honest work. The generic app is convenient. Neither finishes the job."
          />

          <Reveal delay={120} className="mt-14">
            <div className="glass overflow-x-auto rounded-3xl">
              <table className="w-full min-w-[46rem] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.06]">
                    <th scope="col" className="px-6 py-5 text-[0.78rem] font-bold uppercase tracking-widest text-white/50">
                      What you need doing
                    </th>
                    {comparison.columns.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={`px-6 py-5 text-center text-[0.9rem] font-extrabold ${
                          i === 0 ? 'text-gold-light' : 'text-white/60'
                        }`}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row) => (
                    <tr key={row.label} className="border-b border-white/10 last:border-0">
                      <th scope="row" className="px-6 py-4 text-[0.95rem] font-semibold text-ink">
                        {row.label}
                      </th>
                      {row.v.map((value, i) => (
                        <td key={i} className="px-6 py-4">
                          <div className="flex justify-center">
                            <Cell value={value} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 text-center text-[0.9rem] text-white/50">
              Comparison describes the general category, not any one product. Feature sets change —
              check before you switch.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-6 text-center text-[0.95rem] text-white/60">
              For what changes on your side rather than how it compares,{' '}
              <Link
                href="/benefits"
                className="font-bold text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright"
              >
                see the benefits in practice
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- The Zakat case */}
      <section className="overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="The part nobody else does"
              title={
                <>
                  If it only did the <span className="text-gradient-gold">Zakat</span>, it would
                  still be worth installing
                </>
              }
              lede="Zakat is arithmetic on top of a moving picture of everything you own. Doing it once a year from memory is how people underpay without meaning to."
            />
            <Reveal delay={120}>
              <ul className="mt-9 space-y-5">
                {[
                  { t: 'It knows what you hold', d: 'Cash, bank, gold, silver, stock, receivables and property, kept current as your transactions land.' },
                  { t: 'It knows the threshold', d: 'Nisab is the lower of 87.48g of gold and 612.36g of silver, priced at live rates rather than last year’s.' },
                  { t: 'It knows the date', d: 'The Hawl starts when you cross Nisab, pauses if you fall below, and completes on its own.' },
                  { t: 'It shows the working', d: 'Every figure is traceable to the assets behind it, so you can check it against your own reckoning.' },
                ].map((item) => (
                  <li key={item.t} className="flex gap-4">
                    <span className="mt-1 shrink-0">
                      <Tick />
                    </span>
                    <div>
                      <p className="text-[1.02rem] font-bold text-ink">{item.t}</p>
                      <p className="mt-1 text-[0.95rem] leading-relaxed text-slate-body">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
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

        <div className="mx-auto mt-24 max-w-4xl px-5 sm:px-8">
          <Scripture
            arabic="خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا"
            translation="Take from their wealth a charity by which you purify them and cause them increase."
            bangla="তাদের সম্পদ থেকে সদকা গ্রহণ করুন, যার মাধ্যমে আপনি তাদের পবিত্র ও পরিশুদ্ধ করবেন।"
            reference="Al-Qur’ān 9:103"
            note="Zakāh shares a root with ṭahārah — purification — and with growth. Getting the figure right is part of the act, which is why the engine shows its working instead of asking you to take a number on trust."
          />
        </div>
      </section>

      {/* ----------------------------------------------------- Who it fits */}
      <section className="overflow-hidden pane-tint py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Who it is for"
            title="Three people this was written for"
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {audience.map((a, i) => (
              <Reveal key={a.t} delay={i * 90} className="h-full">
                <div className="glass glass-hover h-full rounded-3xl p-7">
                  <h3 className="text-[1.12rem] font-extrabold leading-tight tracking-tight text-ink">
                    {a.t}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-body">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Record-keeping is not an accountant's habit borrowed for a finance
          app — it is instructed in the longest verse of the Qur'an. */}
      <section className="relative overflow-hidden pane-ink py-24 sm:py-28">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Scripture
            arabic="إِذَا تَدَايَنتُم بِدَيْنٍ إِلَىٰ أَجَلٍ مُّسَمًّى فَٱكْتُبُوهُ"
            translation="When you contract a debt for a specified term, write it down."
            bangla="যখন তোমরা নির্দিষ্ট সময়ের জন্য ঋণের লেনদেন করো, তখন তা লিখে রাখো।"
            reference="Al-Qur’ān 2:282"
            note="The longest verse in the Qur’ān is about keeping a clear record of what is owed. An app that logs your transactions is not a modern convenience bolted onto the deen — it is the oldest financial instruction in it, made easier."
          />
          <Reveal delay={140}>
            <p className="mx-auto mt-14 max-w-2xl text-center text-[0.88rem] leading-relaxed text-white/45">
              Passages are quoted for reflection, not as a ruling. Schools of jurisprudence differ
              on the details of Zakāh and of what counts as permissible income — for a ruling on
              your own situation, consult a qualified scholar.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="See whether it holds up against your own numbers"
        lede="Free to download, free to keep using. Set your baseline in two minutes and judge it on your own accounts rather than on a landing page."
      />
    </>
  );
}
