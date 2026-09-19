import type { Metadata } from 'next';
import { Button } from '@/components/Button';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { GeometricPattern } from '@/components/Pattern';
import { Reveal } from '@/components/Reveal';
import { Scripture } from '@/components/Scripture';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Daily life with money',
  description:
    'How to earn, spend, record and give in everyday life according to Islamic principles: moderation over extravagance, avoiding riba, want versus need, debt taken seriously, and Zakat and Sadaqah in their place.',
};

/** The daily loop the whole page is organised around. */
const rhythm = [
  {
    n: '01',
    t: 'Begin with intention',
    d: 'Before the earning and the spending there is the niyyah. Money sought to provide for a family, to stay free of debt, or to be able to give, is money sought for a reason — and a reason makes the hard choices easier later in the day.',
  },
  {
    n: '02',
    t: 'Record what moves',
    d: 'Every amount in and out, on the day it happens. Not because bookkeeping is pious in itself, but because you cannot weigh what you cannot see, and memory quietly rewrites the month in your favour.',
  },
  {
    n: '03',
    t: 'Sort want from need',
    d: 'The same purchase can be either, depending on the week. Naming which one it was — at the moment of spending, not at the end of the month — is what turns a list of transactions into a habit you can actually change.',
  },
  {
    n: '04',
    t: 'Give something',
    d: 'Sadaqah does not have to be large or annual. A small amount given regularly and quietly keeps giving as part of the rhythm rather than an event you brace for once a year.',
  },
  {
    n: '05',
    t: 'Reckon before you are reckoned',
    d: 'A short review — weekly is plenty. What came in, where it went, what was doubtful, what to put right. It is a small accounting, taken willingly, against a larger one that is not optional.',
  },
];

/** Everyday moments, the principle that governs them, and the practical step. */
const situations = [
  {
    when: 'Your salary arrives',
    principle: 'Wealth is a trust you are answerable for, not simply yours to consume.',
    step: 'Record the income the day it lands, and decide the giving before the spending — not from what happens to be left.',
  },
  {
    when: 'The bank credits interest',
    principle: 'Riba is not a gain you may benefit from.',
    step: 'Keep it separate from your own wealth and dispose of it in charity without expecting reward for it. This is the position most scholars take; ask yours if your situation is unusual.',
  },
  {
    when: 'You are about to buy something',
    principle: 'Neither extravagant nor withholding — the middle way.',
    step: 'Name it as a want or a need before you pay, not afterwards. Extravagance is rarely one large purchase; it is many small ones nobody weighed.',
  },
  {
    when: 'You need to borrow',
    principle: 'Debt is a serious obligation, and interest-bearing debt compounds the problem.',
    step: 'Write down the amount and the term. Prefer an interest-free loan (qard hasan) or a fixed-price deferred sale over interest-bearing credit, and repay early where you can.',
  },
  {
    when: 'Someone owes you',
    principle: 'Record it, and be gentle with a debtor in difficulty.',
    step: 'Write it down at the time, with the term agreed. Granting more time to someone genuinely unable to pay is encouraged, not weakness.',
  },
  {
    when: 'You are trading or selling',
    principle: 'Honesty in dealing, and no concealment of defects.',
    step: 'Disclose what is wrong with the thing you are selling, keep the terms clear, and keep a record both sides could check.',
  },
  {
    when: 'The income is doubtful',
    principle: 'Income you cannot establish as lawful should not be mixed in with income you can.',
    step: 'Separate it rather than mixing it into your wealth, and seek a ruling from someone qualified before you rely on it.',
  },
  {
    when: 'A lunar year passes above Nisab',
    principle: 'Zakat is an obligation on wealth, not a donation from it.',
    step: 'Total your zakatable assets, subtract immediate liabilities, and pay 2.5% — checked against the working, not estimated.',
  },
];

/** Where interest turns up for people who are not looking for it. */
const ribaHides = [
  'Conventional savings and current accounts that credit interest',
  'Credit card balances carried past the interest-free period',
  'Conventional mortgages, car finance and personal loans',
  'Fixed deposits, bonds and interest-bearing certificates',
  'Late-payment penalties calculated as a percentage over time',
  'Buy-now-pay-later plans that add a financing charge',
];

export default function GuidePage() {
  return (
    <>
      <PageHero
        eyebrow="The guide"
        title={
          <>
            Living day to day with money you will be{' '}
            <span className="text-gradient-gold">asked about</span>
          </>
        }
        lede="Most guidance on Islamic finance is written for scholars or for bankers. This is written for someone deciding, on an ordinary Tuesday, whether to make a purchase, what to do with the interest their bank just paid them, and whether they are giving enough."
      >
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/download" variant="gold" size="lg">
            Get the app
          </Button>
          <Button href="/zakat" variant="outline" size="lg">
            The Zakat engine
          </Button>
        </div>
      </PageHero>

      {/* ------------------------------------------------- The foundation */}
      <section className="relative overflow-hidden pane-ink py-20 sm:py-24">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Scripture
            arabic="وَٱلَّذِينَ إِذَآ أَنفَقُوا۟ لَمْ يُسْرِفُوا۟ وَلَمْ يَقْتُرُوا۟ وَكَانَ بَيْنَ ذَٰلِكَ قَوَامًا"
            translation="And those who, when they spend, are neither extravagant nor niggardly, but hold a medium between those."
            bangla="আর তারা যখন ব্যয় করে, তখন অপব্যয় করে না এবং কৃপণতাও করে না; বরং তারা এ দুয়ের মাঝামাঝি মধ্যপন্থা অবলম্বন করে।"
            reference="Al-Qur’ān 25:67"
            note="The standard is not poverty and it is not abundance. It is a considered middle — which means someone has to be doing the considering, transaction by transaction."
          />
        </div>
      </section>

      {/* ---------------------------------------------------- Daily rhythm */}
      <section className="overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="A daily rhythm"
            title="Five habits, in the order they happen"
            lede="None of these are difficult. What makes them work is that they are daily, and that each one is small enough to survive a bad week."
          />

          <ol className="mt-14 space-y-4">
            {rhythm.map((r, i) => (
              <Reveal key={r.n} as="li" delay={i * 60} className="list-none">
                <div className="glass glass-hover rounded-3xl p-6 sm:p-8">
                  <div className="flex items-baseline gap-4">
                    <span className="text-[1.5rem] font-extrabold leading-none tracking-tight text-gold-light/70 tabular-nums">
                      {r.n}
                    </span>
                    <h3 className="text-pretty text-[1.2rem] font-extrabold leading-tight tracking-tight text-ink sm:text-[1.35rem]">
                      {r.t}
                    </h3>
                  </div>
                  <p className="mt-4 text-[1rem] leading-relaxed text-slate-body sm:pl-11">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <p className="mt-8 text-center text-[0.88rem] text-white/45">
              “Reckon before you are reckoned” is attributed to ʿUmar ibn al-Khaṭṭāb (may Allah be
              pleased with him), and is widely transmitted as a saying rather than a hadith of the
              Prophet ﷺ.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------- Everyday transactions */}
      <section className="relative overflow-hidden pane-ink py-24 sm:py-28">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="In practice"
            title="Eight moments that come up every month"
            lede="The principle on one side, what it actually asks of you on the other."
          />

          <div className="mt-14 space-y-4">
            {situations.map((s, i) => (
              <Reveal key={s.when} delay={i * 50}>
                <div className="glass rounded-2xl p-6 sm:p-7">
                  <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
                    <div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold-light/75">
                        When
                      </p>
                      <h3 className="mt-2 text-[1.08rem] font-extrabold leading-snug tracking-tight text-ink">
                        {s.when}
                      </h3>
                      <p className="mt-3 text-[0.92rem] italic leading-relaxed text-white/60">
                        {s.principle}
                      </p>
                    </div>
                    <div className="lg:border-l lg:border-white/10 lg:pl-10">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-green-bright/80">
                        What to do
                      </p>
                      <p className="mt-2 text-[0.98rem] leading-relaxed text-slate-body">{s.step}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Riba */}
      <section className="overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="The one to watch"
            title={
              <>
                Riba is rarely something you{' '}
                <span className="text-gradient-gold">sign up for</span>
              </>
            }
            lede="Very few people set out to deal in interest. It arrives attached to ordinary products, in amounts small enough to ignore, which is exactly why it needs looking for."
          />

          <Reveal delay={120} className="mt-12">
            <div className="glass rounded-3xl p-7 sm:p-9">
              <h3 className="text-[1.05rem] font-extrabold tracking-tight text-ink">
                Where it commonly turns up
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {ribaHides.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-light/70" />
                    <span className="text-[0.95rem] leading-relaxed text-slate-body">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-white/10 pt-6 text-[0.95rem] leading-relaxed text-slate-body">
                Interest already received is generally not treated as yours to enjoy: the common
                position is to give it away without seeking reward for the giving, keeping it out of
                your own wealth and out of your Zakat base. Where you stand on a specific product —
                a mortgage in a country with no Islamic alternative, say — is a question for a
                qualified scholar, not for an app.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------- Riba scripture */}
      <section className="relative overflow-hidden pane-ink py-20 sm:py-24">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Scripture
            arabic="وَأَحَلَّ ٱللَّهُ ٱلْبَيْعَ وَحَرَّمَ ٱلرِّبَوٰا۟"
            translation="Allah has permitted trade and has forbidden interest."
            bangla="আল্লাহ ব্যবসাকে হালাল করেছেন এবং সুদকে হারাম করেছেন।"
            reference="Al-Qur’ān 2:275"
          />
        </div>
      </section>

      {/* ------------------------------------------------- Zakat & Sadaqah */}
      <section className="overflow-hidden pane-tint py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Giving"
            title="One is owed, the other is offered"
            lede="They are often spoken of together and they are not the same thing. Confusing them is how people end up believing they have discharged an obligation with a donation."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="glass glass-hover h-full rounded-3xl p-7 sm:p-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-gold-light/80">
                  Obligatory
                </p>
                <h3 className="mt-3 text-[1.35rem] font-extrabold tracking-tight text-ink">Zakāh</h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-slate-body">
                  Due on qualifying wealth that has stayed above the Nisab threshold for a full
                  lunar year. The common rate on monetary wealth is 2.5%. It is calculated, not
                  estimated, and it is a right the recipients hold over your wealth rather than a
                  kindness from you.
                </p>
                <ul className="mt-5 space-y-2 text-[0.92rem] text-white/60">
                  <li>· Assessed on assets, less immediate liabilities</li>
                  <li>· Nisab is the lower of 87.48g gold or 612.36g silver</li>
                  <li>· The year (Hawl) restarts if you fall below Nisab</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={100} className="h-full">
              <div className="glass glass-hover h-full rounded-3xl p-7 sm:p-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-green-bright/80">
                  Voluntary
                </p>
                <h3 className="mt-3 text-[1.35rem] font-extrabold tracking-tight text-ink">
                  Ṣadaqah
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-slate-body">
                  Given freely, in any amount, at any time, and not restricted to money. It does not
                  reduce what you owe in Zakat, and it is at its most useful as a habit — small,
                  regular and unannounced — rather than as an annual gesture.
                </p>
                <ul className="mt-5 space-y-2 text-[0.92rem] text-white/60">
                  <li>· No threshold and no fixed rate</li>
                  <li>· Can be time, help or goods, not only cash</li>
                  <li>· Best kept quiet and consistent</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <p className="mt-10 text-center text-[0.95rem] text-slate-body">
              Deenomics tracks both separately —{' '}
              <a
                href="/zakat"
                className="font-bold text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright"
              >
                see how the Zakat engine works
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------ Disclaimer */}
      <section className="relative overflow-hidden pane-ink py-20 sm:py-24">
        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="glass rounded-3xl border-l-4 border-l-gold p-7 sm:p-8">
              <h2 className="text-[1.05rem] font-extrabold tracking-tight text-ink">
                This is general education, not a fatwa
              </h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-slate-body">
                Everything on this page describes mainstream, widely held positions in simple terms.
                Schools of jurisprudence differ on real details — what counts as zakatable, how
                certain contracts are treated, what to do where no Islamic alternative exists — and
                your circumstances may turn on exactly those details. Deenomics does not issue
                rulings. For a decision that binds you, ask a qualified scholar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="The guide travels with the numbers"
        lede="All of this sits inside the app, next to the transaction you are looking at — so the ruling and the figure are never in two different places."
      />
    </>
  );
}
