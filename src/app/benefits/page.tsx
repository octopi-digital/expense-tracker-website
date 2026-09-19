import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { CtaBand } from '@/components/CtaBand';
import { PageHero } from '@/components/PageHero';
import { GeometricPattern } from '@/components/Pattern';
import { HomeScreen, PhoneFrame } from '@/components/PhoneMockup';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Benefits',
  description:
    'What actually changes once Deenomics is running: no manual entry, spending you can see the day it happens, Zakat ready when the Hawl completes, interest kept out of your wealth, and goals with a real monthly figure attached.',
};

/** The honest contrast: not against a competitor, against how it is now. */
const shifts = [
  {
    before: 'You find out what you spent when the money runs out.',
    after: 'You see it the day it happens, without typing anything in.',
  },
  {
    before: 'Zakat is an estimate made from memory once a year, usually in Ramadan.',
    after: 'A figure with the working shown, ready on the day the Hawl completes.',
  },
  {
    before: 'You know the bank pays you interest. You do not know how much, or where it went.',
    after: 'It is separated and flagged, so it never quietly becomes part of your wealth.',
  },
  {
    before: 'Every purchase feels the same size in hindsight.',
    after: 'Want and need are named at the moment you pay, and the pattern becomes visible.',
  },
  {
    before: 'Hajj, or a first home, is a hope with no number attached to it.',
    after: 'A monthly figure you can actually hold yourself to.',
  },
  {
    before: 'The ruling is in a browser tab and the number is in an app.',
    after: 'Both on the same screen, at the moment the decision is being made.',
  },
];

const areas = [
  {
    k: 'Your time',
    t: 'The admin mostly disappears',
    points: [
      'Bank alerts arrive as drafts — approve or discard in a second',
      'No month-end session assembling a picture from receipts',
      'Voice or a photo for the things no alert covers',
      'Nothing to reconcile, because nothing was missed',
    ],
    i: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v5.4l4.2 2.5-1 1.7L11 13V7h2Z',
  },
  {
    k: 'Your money',
    t: 'The leaks stop being invisible',
    points: [
      'Spending grouped so the pattern is obvious, not just the total',
      'Want versus need across a month, not a vague sense of it',
      'A health score that moves when your habits do',
      'Goals converted into the monthly amount they actually require',
    ],
    i: 'M4 20h16v2H4v-2ZM5 11h3v8H5v-8Zm5.5-5h3v13h-3V6ZM16 9h3v10h-3V9Z',
  },
  {
    k: 'Your obligations',
    t: 'Zakat stops being a yearly scramble',
    points: [
      'Nisab tracked against live gold and silver rates',
      'The Hawl started, paused and completed without you watching it',
      '2.5% across every asset, with each figure traceable',
      'Sadaqah logged separately, and interest kept out of the base',
    ],
    i: 'M12 2 3 6v6c0 5 3.8 8.9 9 10 5.2-1.1 9-5 9-10V6l-9-4Z',
  },
  {
    k: 'Your peace of mind',
    t: 'Nothing leaves your phone that did not need to',
    points: [
      'No bank credentials, because there is nothing to log into',
      'Messages parsed on the device rather than uploaded',
      'A PIN-locked vault for holdings you would rather not display',
      'Answers about your own numbers instead of generic advice',
    ],
    i: 'M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2Zm-8-2a3 3 0 0 1 6 0v2H9V7Z',
  },
];

/** What improves, and roughly when — no promises that depend on a stranger. */
const timeline = [
  {
    when: 'Day one',
    t: 'A baseline that took two minutes',
    d: 'A short survey captures your income, your accounts, and what you already own and owe. From that moment there is a number where there used to be a guess.',
  },
  {
    when: 'The first week',
    t: 'The ledger starts filling itself',
    d: 'Alerts begin arriving as drafts. You approve them as they come, and by the end of the week you are looking at a real week rather than a remembered one.',
  },
  {
    when: 'Weeks two and three',
    t: 'The pattern shows up',
    d: 'Enough transactions are tagged for want-versus-need to mean something, categories start telling a story, and the health score has something real to move against.',
  },
  {
    when: 'By the end of the month',
    t: 'A month you did not have to assemble',
    d: 'A complete picture built as it happened, your Zakat position visible against Nisab, and a monthly figure attached to whatever you are saving for.',
  },
];

/** Stated plainly, because a benefits page nobody believes is worth nothing. */
const limits = [
  {
    t: 'It will not give you a ruling',
    d: 'It explains widely held positions and cites sources. Where your situation turns on a real difference between schools, that is a question for a qualified scholar.',
  },
  {
    t: 'It will not log into your bank',
    d: 'That is deliberate, and it is the trade: no credentials to hand over, but anything that never reaches your phone as an alert has to be added by you.',
  },
  {
    t: 'It will not see cash you never mention',
    d: 'Notes handed over in person leave no trace to parse. Voice entry makes it quick, but it still needs you to say so.',
  },
  {
    t: 'It will not make the decision',
    d: 'It can show you that dining out doubled and that the Hawl completes in six weeks. Whether to act on either is still yours.',
  },
  {
    t: 'iOS is not out yet',
    d: 'Android today; iPhone is coming. If that is what you are on, the honest answer is to wait rather than to be sold to.',
  },
];

export default function BenefitsPage() {
  return (
    <>
      <PageHero
        eyebrow="Benefits"
        title={
          <>
            What actually <span className="text-gradient-gold">changes</span> once it is running
          </>
        }
        lede="Not a list of features — a list of differences. Everything below is something you should be able to notice within a month, or it has not earned its place on your phone."
      >
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/download" variant="gold" size="lg">
            Download free
          </Button>
          <Button href="/why" variant="outline" size="lg">
            Why this and not something else
          </Button>
        </div>
      </PageHero>

      {/* ------------------------------------------------- Before / after */}
      <section className="overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="The difference"
            title="Six things that stop being true"
            lede="Measured against how most people manage money today — not against another app."
          />

          <div className="mt-14 space-y-4">
            {shifts.map((s, i) => (
              <Reveal key={s.before} delay={i * 55}>
                <div className="glass rounded-2xl p-6 sm:p-7">
                  <div className="grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
                    <div>
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/40">
                        Now
                      </p>
                      <p className="mt-2 text-[0.98rem] leading-relaxed text-white/55">{s.before}</p>
                    </div>

                    <span
                      aria-hidden="true"
                      className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-green-bright/15 text-green-bright ring-1 ring-inset ring-green-bright/30 lg:grid"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h13m-5-6 6 6-6 6" />
                      </svg>
                    </span>

                    <div className="lg:border-l lg:border-white/10 lg:pl-8">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-green-bright/80">
                        After
                      </p>
                      <p className="mt-2 text-[1rem] font-semibold leading-relaxed text-ink">
                        {s.after}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Four areas */}
      <section className="relative overflow-hidden pane-ink py-24 sm:py-28">
        <GeometricPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.07} stroke="#FADB8A" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="Where you feel it"
            title="Four things it gives you back"
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {areas.map((a, i) => (
              <Reveal key={a.k} delay={i * 90} className="h-full">
                <div className="glass glass-hover h-full rounded-3xl p-7 sm:p-8">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/20 text-gold-light ring-1 ring-inset ring-gold/35">
                      <svg viewBox="0 0 24 24" className="h-[1.3rem] w-[1.3rem]" fill="currentColor">
                        <path d={a.i} />
                      </svg>
                    </span>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold-light/80">
                      {a.k}
                    </p>
                  </div>
                  <h3 className="mt-5 text-[1.3rem] font-extrabold leading-tight tracking-tight text-ink">
                    {a.t}
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {a.points.map((pt) => (
                      <li key={pt} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-bright/70" />
                        <span className="text-[0.95rem] leading-relaxed text-slate-body">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- The first month */}
      <section className="overflow-hidden pane py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              tone="light"
              eyebrow="The first month"
              title={
                <>
                  It gets useful{' '}
                  <span className="text-gradient-gold">before</span> it gets complete
                </>
              }
              lede="You do not have to log a year of history first. The picture builds as your money moves, and it is worth looking at from the first week."
            />

            <ol className="mt-10 space-y-7">
              {timeline.map((t, i) => (
                <Reveal key={t.when} as="li" delay={i * 90} className="list-none">
                  <div className="border-l-2 border-white/12 pl-6">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-green-bright/80">
                      {t.when}
                    </p>
                    <h3 className="mt-2 text-[1.08rem] font-extrabold tracking-tight text-ink">
                      {t.t}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-body">{t.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal delay={140} className="flex justify-center lg:justify-end">
            <PhoneFrame>
              <HomeScreen />
            </PhoneFrame>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- The limits */}
      <section className="overflow-hidden pane-tint py-24 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            tone="light"
            eyebrow="The other side"
            title="Five things it will not do for you"
            lede="A page of benefits that nobody believes is worth nothing. These are the real limits, so you can decide with them in view."
          />

          <div className="mt-14 space-y-4">
            {limits.map((l, i) => (
              <Reveal key={l.t} delay={i * 60}>
                <div className="glass rounded-2xl p-6 sm:p-7">
                  <h3 className="text-[1.05rem] font-extrabold tracking-tight text-ink">{l.t}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-slate-body">{l.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <p className="mt-10 text-center text-[0.95rem] text-slate-body">
              If you want the case against the alternatives rather than the list of gains,{' '}
              <Link
                href="/why"
                className="font-bold text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright"
              >
                read why Deenomics exists
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Judge it on your own month"
        lede="Free to download and free to keep using. Set the baseline, let a week run, and see whether the picture it gives you is one you did not have before."
      />
    </>
  );
}
