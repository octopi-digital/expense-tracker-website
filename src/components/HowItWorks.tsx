import { HealthGauge } from '@/components/HealthGauge';
import { Reveal } from '@/components/Reveal';

/**
 * The three setup steps. Each one carries a small working fragment of the
 * product rather than a bare number, so the section shows what happens instead
 * of only describing it.
 */

function StageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-[196px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#F4F7F5] to-[#FAFBFB] px-4 ring-1 ring-inset ring-divider/70">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl"
        style={{ background: 'radial-gradient(circle, rgba(25,204,80,0.16), transparent 70%)' }}
      />
      {children}
    </div>
  );
}

/** Step 1 — the onboarding survey filling itself in. */
function BaselineStage() {
  const rows = [
    { label: 'Monthly income', value: '৳85,000' },
    { label: 'Accounts', value: '3' },
    { label: 'Assets & liabilities', value: '5 logged' },
  ];
  return (
    <StageFrame>
      <div className="w-full max-w-[212px] rounded-xl bg-white p-3.5 shadow-card">
        <p className="text-[0.55rem] font-bold uppercase tracking-[0.16em] text-slate-body">
          Your baseline
        </p>
        <div className="mt-2.5 space-y-2">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-2">
              <span className="text-[0.62rem] text-slate-body">{r.label}</span>
              <span className="text-[0.66rem] font-bold text-ink">{r.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-card">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-brand to-green-bright" />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[0.58rem] font-bold text-emerald-brand">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-emerald-brand text-[0.5rem] text-white">
            ✓
          </span>
          Done in under 2 minutes
        </p>
      </div>
    </StageFrame>
  );
}

/** Step 2 — a bank SMS becoming a draft transaction. */
function CaptureStage() {
  return (
    <StageFrame>
      <div className="w-full max-w-[214px]">
        <div className="rounded-xl bg-emerald-ink px-3 py-2.5 shadow-card">
          <p className="flex items-center gap-1.5 text-[0.55rem] font-bold text-white/60">
            <span className="grid h-3 w-3 place-items-center rounded bg-white/15 text-[0.42rem] text-white">
              ✉
            </span>
            BRAC BANK · NOW
          </p>
          <p className="mt-1 text-[0.6rem] leading-snug text-white">
            BDT 2,450.00 debited at SHWAPNO
          </p>
        </div>

        <div className="my-1.5 flex justify-center">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-emerald-brand" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14m-6-6 6 6 6-6" />
          </svg>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5 shadow-card">
          <span className="flex items-center gap-1.5">
            <span className="rounded bg-green-tint px-1.5 py-0.5 text-[0.48rem] font-bold text-emerald-brand">
              Groceries
            </span>
            <span className="text-[0.68rem] font-extrabold text-ink">৳2,450</span>
          </span>
          <span className="flex gap-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-card text-[0.55rem] text-slate-body">✕</span>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-brand text-[0.55rem] text-white">✓</span>
          </span>
        </div>
      </div>
    </StageFrame>
  );
}

/** Step 3 — the numbers that come back out. */
function ResultStage() {
  return (
    <StageFrame>
      <div className="w-full max-w-[214px] space-y-2">
        <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 shadow-card">
          <HealthGauge value={78} size={52} label="Growing" showLabel={false} />
          <div>
            <p className="text-[0.62rem] font-bold text-ink">Financial health</p>
            <p className="mt-1 flex items-center gap-1.5">
              <span className="rounded-full bg-green-tint px-1.5 py-0.5 text-[0.48rem] font-bold text-emerald-brand">
                Growing
              </span>
              <span className="text-[0.55rem] text-slate-body">up 6 this month</span>
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-gold/25 bg-[#FFFBF0] p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[0.58rem] font-bold text-gold-deep">Zakat due</span>
            <span className="rounded-full bg-gold/15 px-1.5 py-0.5 text-[0.48rem] font-bold text-gold-deep">
              45 days
            </span>
          </div>
          <p className="mt-1 text-[0.78rem] font-extrabold text-ink">৳ 12,066</p>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-gold/15">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold-light to-gold" />
          </div>
        </div>
      </div>
    </StageFrame>
  );
}

const steps = [
  {
    n: '01',
    title: 'Set your baseline',
    body: 'A short survey captures your income, your accounts, and what you already own and owe. Two minutes, once.',
    stage: <BaselineStage />,
  },
  {
    n: '02',
    title: 'Let it read your alerts',
    body: 'Every bank SMS becomes a draft transaction, waiting in your inbox. Approve or discard with one tap.',
    stage: <CaptureStage />,
  },
  {
    n: '03',
    title: 'Act on what it tells you',
    body: 'Your health score, your goals, and your Zakat figure the day the Hawl completes — with the working shown.',
    stage: <ResultStage />,
  },
];

/** The chevron sitting in the gap between two cards. */
function StepArrow() {
  return (
    <span
      aria-hidden="true"
      className="absolute -right-[1.35rem] top-[7.2rem] z-10 hidden h-9 w-9 place-items-center rounded-full border border-divider bg-white text-emerald-brand shadow-card lg:grid"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h13m-5-6 6 6-6 6" />
      </svg>
    </span>
  );
}

export function HowItWorks() {
  return (
    <ol className="grid gap-6 lg:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal key={step.n} delay={i * 110} as="li" className="relative h-full list-none">
          <div className="group flex h-full flex-col rounded-3xl border border-divider bg-white p-5 shadow-card transition-all duration-400 hover:-translate-y-1.5 hover:border-emerald-brand/20 hover:shadow-lift">
            {step.stage}

            <div className="flex flex-1 flex-col p-2 pt-5">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-emerald-brand text-[0.78rem] font-extrabold text-white">
                  {step.n}
                </span>
                <h3 className="text-[1.2rem] font-extrabold tracking-tight text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-slate-body">{step.body}</p>
            </div>
          </div>

          {i < steps.length - 1 ? <StepArrow /> : null}
        </Reveal>
      ))}
    </ol>
  );
}
