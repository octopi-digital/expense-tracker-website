import type { ReactNode } from 'react';
import { HealthGauge } from '@/components/HealthGauge';

/**
 * A device shell for the in-code app screens. The screens themselves are
 * plain HTML built from the product's own theme tokens, so they stay sharp at
 * any size and never go stale against a screenshot.
 */
export function PhoneFrame({
  children,
  className = '',
  glow = true,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`relative ${className}`}>
      {glow ? (
        <div
          className="pointer-events-none absolute -inset-10 -z-10 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(25,204,80,0.28), transparent 68%)' }}
        />
      ) : null}
      <div className="relative w-[286px] rounded-[2.7rem] border border-white/12 bg-[#0b0f14] p-2.5 shadow-phone">
        <div className="relative overflow-hidden rounded-[2.15rem] bg-white">
          {/* Dynamic-island style cutout. */}
          <div className="absolute left-1/2 top-2.5 z-20 h-5 w-[5.5rem] -translate-x-1/2 rounded-full bg-[#0b0f14]" />
          <div className="h-[620px] overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBar({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const color = tone === 'light' ? 'text-white' : 'text-ink-app';
  return (
    <div className={`flex items-center justify-between px-6 pb-1 pt-3.5 text-[0.66rem] font-semibold ${color}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1 opacity-90">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M2 20h4V10H2v10Zm7 0h4V4H9v16Zm7 0h4v-7h-4v7Z" /></svg>
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M12 18.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM3 9.5l1.8 1.8a10.2 10.2 0 0 1 14.4 0L21 9.5a12.7 12.7 0 0 0-18 0Zm3.6 3.6 1.8 1.8a5.1 5.1 0 0 1 7.2 0l1.8-1.8a7.6 7.6 0 0 0-10.8 0Z" /></svg>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor"><path d="M4 8h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Zm16 2.5h1v3h-1v-3ZM4.8 9.8v4.4h11.4V9.8H4.8Z" /></svg>
      </span>
    </div>
  );
}

function TabBar({ active = 'home' }: { active?: 'home' | 'analysis' | 'ai' | 'goals' | 'profile' }) {
  const items = [
    { key: 'home', label: 'Home', d: 'M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z' },
    { key: 'analysis', label: 'Analysis', d: 'M4 20h16M7 16V9m5 7V4m5 12v-5' },
    { key: 'ai', label: '', d: '' },
    { key: 'goals', label: 'Goals', d: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z' },
    { key: 'profile', label: 'Profile', d: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4 0-7.5 2.2-7.5 5v1h15v-1c0-2.8-3.5-5-7.5-5Z' },
  ] as const;

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-divider-app bg-white/95 px-3 pb-4 pt-2.5 backdrop-blur">
      <div className="flex items-end justify-between">
        {items.map((item) =>
          item.key === 'ai' ? (
            <div key="ai" className="-mt-8 flex flex-col items-center">
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-green-bright to-emerald-brand shadow-[0_10px_22px_-8px_rgba(16,108,49,0.9)]">
                <span className="absolute inset-0 rounded-full bg-green-bright/40 animate-pulse-ring" />
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                  <path d="M12 2.5 13.7 8 19 9.7 13.7 11.4 12 17l-1.7-5.6L5 9.7 10.3 8 12 2.5ZM18.5 15l.8 2.4 2.2.8-2.2.8-.8 2.5-.9-2.5-2.1-.8 2.1-.8.9-2.4Z" />
                </svg>
              </span>
              <span className="mt-1 text-[0.52rem] font-bold text-emerald-brand">AI</span>
            </div>
          ) : (
            <div key={item.key} className="flex w-12 flex-col items-center gap-1">
              <svg
                viewBox="0 0 24 24"
                className={`h-[1.15rem] w-[1.15rem] ${active === item.key ? 'text-emerald-brand' : 'text-[#A6B4C3]'}`}
                fill={item.key === 'analysis' ? 'none' : 'currentColor'}
                stroke={item.key === 'analysis' ? 'currentColor' : 'none'}
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d={item.d} />
              </svg>
              <span className={`text-[0.52rem] font-semibold ${active === item.key ? 'text-emerald-brand' : 'text-[#A6B4C3]'}`}>
                {item.label}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 1 — Home                                                     */
/* ------------------------------------------------------------------ */

export function HomeScreen() {
  const rows = [
    { icon: '🛒', name: 'Shwapno Grocery', meta: 'Groceries · Need', amount: '−৳2,450', tone: 'text-ink-app' },
    { icon: '💼', name: 'Salary — October', meta: 'Income · Verified', amount: '+৳85,000', tone: 'text-green-link' },
    { icon: '🕌', name: 'Sadaqah', meta: 'Masjid fund', amount: '−৳1,000', tone: 'text-ink-app' },
  ];

  return (
    <div className="relative h-full bg-[#F7F8F9]">
      <div className="relative bg-gradient-to-br from-emerald-brand via-emerald-deep to-emerald-ink pb-16">
        <StatusBar />
        <div className="flex items-center justify-between px-5 pt-3">
          <div>
            <p className="text-[0.62rem] font-medium text-white/60">Assalamu alaikum</p>
            <p className="text-[0.95rem] font-bold text-white">Jewel Rana</p>
          </div>
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-white/12">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
              <path d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Zm7-6.4V10a7 7 0 1 0-14 0v5.6L3.5 17.4v.9h17v-.9L19 15.6Z" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        </div>

        <div className="px-5 pt-5">
          <p className="text-[0.62rem] font-medium uppercase tracking-widest text-white/55">Total balance</p>
          <p className="mt-1 text-[1.9rem] font-extrabold leading-none text-white">৳ 4,82,650</p>
          <div className="mt-3 flex gap-2">
            {[
              { label: 'Income', value: '৳85,000', dot: 'bg-green-bright' },
              { label: 'Expense', value: '৳31,240', dot: 'bg-expense' },
              { label: 'Savings', value: '৳53,760', dot: 'bg-savings' },
            ].map((chip) => (
              <div key={chip.label} className="flex-1 rounded-xl border border-white/15 bg-white/10 px-2 py-2 backdrop-blur">
                <span className="flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} />
                  <span className="text-[0.52rem] font-semibold text-white/65">{chip.label}</span>
                </span>
                <p className="mt-0.5 text-[0.66rem] font-bold text-white">{chip.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-11 space-y-3 px-4 pb-24">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-card">
          <HealthGauge value={78} size={78} label="Growing" />
          <div className="min-w-0">
            <p className="text-[0.78rem] font-bold text-ink-app">Financial health</p>
            <p className="mt-1 text-[0.62rem] leading-snug text-body-app">
              Up 6 points. Your needs-to-wants ratio improved this month.
            </p>
            <span className="mt-2 inline-flex rounded-full bg-tint-app px-2 py-0.5 text-[0.55rem] font-bold text-emerald-brand">
              +6 vs September
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-[#FFFBF0] to-white p-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-[0.72rem] font-bold text-gold-deep">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5" y="5" width="14" height="14" />
                <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
              </svg>
              Zakat due
            </span>
            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.55rem] font-bold text-gold-deep">45 days</span>
          </div>
          <p className="mt-2 text-[1.15rem] font-extrabold text-ink-app">৳ 12,066</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gold/15">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold-light to-gold" />
          </div>
          <p className="mt-1.5 text-[0.55rem] text-body-app">Hawl 62% complete · Nisab ৳4,85,000</p>
        </div>

        <div className="rounded-2xl bg-white p-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-[0.72rem] font-bold text-ink-app">Recent activity</p>
            <span className="text-[0.58rem] font-semibold text-green-link">See all</span>
          </div>
          <div className="mt-2.5 space-y-2.5">
            {rows.map((row) => (
              <div key={row.name} className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-card-app text-[0.7rem]">{row.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.66rem] font-semibold text-ink-app">{row.name}</p>
                  <p className="text-[0.55rem] text-body-app">{row.meta}</p>
                </div>
                <p className={`text-[0.66rem] font-bold ${row.tone}`}>{row.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 2 — Zakat vault                                              */
/* ------------------------------------------------------------------ */

export function ZakatScreen() {
  const assets = [
    { label: 'Cash & bank', value: '৳ 3,12,400', pct: 65 },
    { label: 'Gold & silver', value: '৳ 1,08,000', pct: 22 },
    { label: 'Investments', value: '৳ 62,250', pct: 13 },
  ];

  return (
    <div className="relative h-full bg-[#F7F8F9]">
      <div className="bg-gradient-to-br from-[#6B4E12] via-emerald-deep to-emerald-ink pb-10">
        <StatusBar />
        <div className="flex items-center gap-3 px-5 pt-3">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/12">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M15 5l-7 7 7 7" /></svg>
          </span>
          <p className="text-[0.95rem] font-bold text-white">Zakat &amp; Sadaqah</p>
          <span className="ml-auto flex items-center gap-1 rounded-full bg-white/12 px-2 py-1 text-[0.52rem] font-bold text-gold-light">
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor"><path d="M17 9V7a5 5 0 0 0-10 0v2H5v13h14V9h-2Zm-8-2a3 3 0 0 1 6 0v2H9V7Z" /></svg>
            VAULT
          </span>
        </div>

        <div className="px-5 pt-5 text-center">
          <p className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-gold-light/70">Zakat payable</p>
          <p className="mt-1.5 text-[2rem] font-extrabold leading-none text-white">৳ 12,066</p>
          <p className="mt-2 text-[0.6rem] text-white/55">2.5% of ৳4,82,650 zakatable wealth</p>
        </div>
      </div>

      <div className="relative z-10 -mt-8 space-y-2.5 px-4 pb-24">
        <div className="rounded-2xl bg-white p-3.5 shadow-card">
          <div className="flex items-center justify-between text-[0.62rem] font-semibold">
            <span className="text-body-app">Hawl progress</span>
            <span className="text-gold-deep">45 days remaining</span>
          </div>
          <div className="relative mt-2.5 h-2 overflow-hidden rounded-full bg-card-app">
            <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold-light via-gold to-gold-deep" />
          </div>
          <div className="mt-2 flex justify-between text-[0.52rem] text-body-app">
            <span>Started 12 Muharram</span>
            <span>Due 12 Muharram 1448</span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-tint-app px-2.5 py-2">
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-brand text-[0.6rem] text-white">✓</span>
            <p className="text-[0.55rem] font-medium leading-snug text-emerald-brand">
              Above the ৳4,85,000 Nisab since 12 Muharram — Hawl is running.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3.5 shadow-card">
          <p className="text-[0.72rem] font-bold text-ink-app">Zakatable assets</p>
          <div className="mt-2.5 space-y-2.5">
            {assets.map((a) => (
              <div key={a.label}>
                <div className="flex items-center justify-between text-[0.62rem]">
                  <span className="font-semibold text-ink-app">{a.label}</span>
                  <span className="font-bold text-ink-app">{a.value}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-card-app">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-brand to-green-bright" style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5">
          <div className="flex-1 rounded-2xl bg-emerald-brand p-3 text-center shadow-card">
            <p className="text-[0.55rem] font-semibold text-white/70">Sadaqah this year</p>
            <p className="mt-1 text-[0.85rem] font-extrabold text-white">৳ 18,500</p>
          </div>
          <div className="flex-1 rounded-2xl bg-white p-3 text-center shadow-card">
            <p className="text-[0.55rem] font-semibold text-body-app">Zakat paid</p>
            <p className="mt-1 text-[0.85rem] font-extrabold text-ink-app">৳ 0 / 12,066</p>
          </div>
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 3 — AI coach                                                 */
/* ------------------------------------------------------------------ */

export function AiScreen() {
  return (
    <div className="relative flex h-full flex-col bg-[#F7F8F9]">
      <div className="bg-gradient-to-br from-lavender to-[#3C2FA8] pb-5">
        <StatusBar />
        <div className="flex items-center gap-2.5 px-5 pt-3">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor">
              <path d="M12 2.5 13.7 8 19 9.7 13.7 11.4 12 17l-1.7-5.6L5 9.7 10.3 8 12 2.5Z" />
            </svg>
          </span>
          <div>
            <p className="text-[0.88rem] font-bold text-white">AI Coach</p>
            <p className="flex items-center gap-1 text-[0.55rem] text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-green-bright" /> Online · knows your numbers
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden px-4 pt-4">
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-emerald-brand px-3.5 py-2.5">
          <p className="text-[0.68rem] leading-snug text-white">
            My expenses jumped this month. Where did it go?
          </p>
        </div>

        <div className="max-w-[86%] rounded-2xl rounded-tl-md bg-white px-3.5 py-3 shadow-card">
          <p className="text-[0.68rem] leading-relaxed text-ink-app">
            Your spending rose <span className="font-bold">৳7,800</span> vs September. Two things moved:
          </p>
          <div className="mt-2.5 space-y-1.5">
            {[
              { label: 'Dining out', value: '+৳4,900', tag: 'Want', tone: 'text-expense' },
              { label: 'Ride sharing', value: '+৳2,100', tag: 'Want', tone: 'text-expense' },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-lg bg-[#F7F8F9] px-2.5 py-1.5">
                <span className="text-[0.6rem] font-semibold text-ink-app">{r.label}</span>
                <span className="flex items-center gap-1.5">
                  <span className="rounded bg-[rgba(240,157,5,0.14)] px-1.5 py-0.5 text-[0.48rem] font-bold text-expense">{r.tag}</span>
                  <span className={`text-[0.6rem] font-bold ${r.tone}`}>{r.value}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2.5 text-[0.68rem] leading-relaxed text-ink-app">
            Both are wants. Capping dining at ৳6,000 would put you back on track for your Hajj fund.
          </p>
          <div className="mt-3 rounded-xl border-l-2 border-gold bg-[rgba(215,162,37,0.07)] px-2.5 py-2">
            <p className="text-[0.6rem] italic leading-snug text-gold-deep">
              “And do not be extravagant. Surely He does not like the extravagant.”
            </p>
            <p className="mt-1 text-[0.5rem] font-bold text-gold-deep/80">Al-Qur’an, 6:141</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="rounded-2xl rounded-tl-md bg-white px-3 py-2.5 shadow-card">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-lavender/60"
                  style={{ animationDelay: `${i * 140}ms` }}
                />
              ))}
            </span>
          </span>
        </div>
      </div>

      <div className="px-4 pb-24 pt-2">
        <div className="flex items-center gap-2 rounded-full border border-divider-app bg-white px-3.5 py-2.5 shadow-card">
          <span className="flex-1 text-[0.66rem] text-body-app">Ask anything…</span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-body-app" fill="currentColor"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V22h2v-3.1A7 7 0 0 0 19 12h-2Z" /></svg>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-lavender">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white" fill="currentColor"><path d="M3 20.5 21 12 3 3.5 3 10l12 2-12 2v6.5Z" /></svg>
          </span>
        </div>
      </div>

      <TabBar active="ai" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen 4 — Transaction inbox (auto-capture)                         */
/* ------------------------------------------------------------------ */

export function InboxScreen() {
  const drafts = [
    { bank: 'BRAC Bank', text: 'BDT 2,450.00 debited at SHWAPNO', amount: '৳2,450', cat: 'Groceries', time: '2m ago' },
    { bank: 'bKash', text: 'You have received Tk 85,000.00', amount: '৳85,000', cat: 'Salary', time: '1h ago' },
    { bank: 'City Bank', text: 'BDT 1,299.00 spent at FOODPANDA', amount: '৳1,299', cat: 'Dining', time: '3h ago' },
  ];

  return (
    <div className="relative h-full bg-[#F7F8F9]">
      <div className="bg-gradient-to-br from-emerald-brand to-emerald-ink pb-8">
        <StatusBar />
        <div className="px-5 pt-3">
          <p className="text-[0.95rem] font-bold text-white">Transaction inbox</p>
          <p className="mt-1 text-[0.6rem] text-white/60">3 drafts captured from your notifications</p>
        </div>
      </div>

      <div className="relative z-10 -mt-4 space-y-2.5 px-4 pb-24">
        {drafts.map((d) => (
          <div key={d.bank} className="rounded-2xl bg-white p-3.5 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-[0.62rem] font-bold text-ink-app">
                  <span className="grid h-4 w-4 place-items-center rounded bg-emerald-brand/10 text-[0.5rem] text-emerald-brand">✉</span>
                  {d.bank}
                </p>
                <p className="mt-1 truncate text-[0.55rem] text-body-app">{d.text}</p>
              </div>
              <span className="shrink-0 text-[0.5rem] text-body-app">{d.time}</span>
            </div>
            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-[#F7F8F9] px-2.5 py-2">
              <span className="flex items-center gap-1.5">
                <span className="rounded bg-tint-app px-1.5 py-0.5 text-[0.48rem] font-bold text-emerald-brand">{d.cat}</span>
                <span className="text-[0.62rem] font-extrabold text-ink-app">{d.amount}</span>
              </span>
              <span className="flex gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-card-app text-[0.55rem] text-body-app">✕</span>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-brand text-[0.55rem] text-white">✓</span>
              </span>
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-dashed border-emerald-brand/25 bg-tint-app/50 p-3 text-center">
          <p className="text-[0.58rem] font-semibold text-emerald-brand">
            Nothing is saved until you approve it.
          </p>
        </div>
      </div>

      <TabBar active="home" />
    </div>
  );
}
