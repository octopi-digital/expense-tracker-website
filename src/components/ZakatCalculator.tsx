'use client';

import { useMemo, useState } from 'react';

/**
 * A working Nisab + Zakat calculator, matching the method the app uses:
 * zakatable assets minus immediate liabilities, measured against the lower
 * of the gold (87.48g) and silver (612.36g) Nisab, then 2.5% if it qualifies.
 *
 * Metal rates are visitor-editable because they move daily and this page is
 * static — the app itself pulls live rates.
 */
const NISAB_GOLD_G = 87.48;
const NISAB_SILVER_G = 612.36;

const currencies = [
  { code: 'BDT', symbol: '৳', gold: 14500, silver: 175 },
  { code: 'USD', symbol: '$', gold: 118, silver: 1.4 },
  { code: 'GBP', symbol: '£', gold: 92, silver: 1.1 },
  { code: 'INR', symbol: '₹', gold: 9800, silver: 118 },
  { code: 'MYR', symbol: 'RM', gold: 520, silver: 6.2 },
  { code: 'AED', symbol: 'AED', gold: 432, silver: 5.2 },
] as const;

type AssetKey = 'cash' | 'bank' | 'goldG' | 'silverG' | 'investments' | 'business' | 'receivables';

const assetFields: { key: AssetKey; label: string; hint: string; unit: 'money' | 'grams' }[] = [
  { key: 'cash', label: 'Cash in hand', hint: 'Notes, coins, wallet balances', unit: 'money' },
  { key: 'bank', label: 'Bank balances', hint: 'Current, savings, mobile money', unit: 'money' },
  { key: 'goldG', label: 'Gold', hint: 'Total weight in grams', unit: 'grams' },
  { key: 'silverG', label: 'Silver', hint: 'Total weight in grams', unit: 'grams' },
  { key: 'investments', label: 'Investments', hint: 'Shares, funds, sukuk at market value', unit: 'money' },
  { key: 'business', label: 'Business stock', hint: 'Goods held for sale, at cost', unit: 'money' },
  { key: 'receivables', label: 'Money owed to you', hint: 'Loans you expect to be repaid', unit: 'money' },
];

export function ZakatCalculator() {
  const [currencyCode, setCurrencyCode] = useState<string>('BDT');
  const [values, setValues] = useState<Record<AssetKey, string>>({
    cash: '',
    bank: '',
    goldG: '',
    silverG: '',
    investments: '',
    business: '',
    receivables: '',
  });
  const [liabilities, setLiabilities] = useState('');

  const currency = currencies.find((c) => c.code === currencyCode) ?? currencies[0];
  const [goldRate, setGoldRate] = useState(String(currency.gold));
  const [silverRate, setSilverRate] = useState(String(currency.silver));

  const num = (v: string) => {
    const n = Number.parseFloat(v.replace(/,/g, ''));
    return Number.isFinite(n) && n > 0 ? n : 0;
  };

  const onCurrencyChange = (code: string) => {
    const next = currencies.find((c) => c.code === code) ?? currencies[0];
    setCurrencyCode(code);
    setGoldRate(String(next.gold));
    setSilverRate(String(next.silver));
  };

  const result = useMemo(() => {
    const gold = num(goldRate);
    const silver = num(silverRate);

    const metalValue = num(values.goldG) * gold + num(values.silverG) * silver;
    const monetary =
      num(values.cash) + num(values.bank) + num(values.investments) + num(values.business) + num(values.receivables);

    const assets = metalValue + monetary;
    const net = Math.max(0, assets - num(liabilities));

    const goldNisab = NISAB_GOLD_G * gold;
    const silverNisab = NISAB_SILVER_G * silver;
    // The lower threshold is used, so that more people qualify to give.
    const nisab = Math.min(goldNisab || Infinity, silverNisab || Infinity);
    const nisabKnown = Number.isFinite(nisab);

    const due = nisabKnown && net >= nisab;
    return {
      assets,
      net,
      nisab: nisabKnown ? nisab : 0,
      nisabKnown,
      due,
      zakat: due ? net * 0.025 : 0,
      progress: nisabKnown && nisab > 0 ? Math.min(100, (net / nisab) * 100) : 0,
    };
  }, [values, liabilities, goldRate, silverRate]);

  const fmt = (n: number) =>
    `${currency.symbol} ${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

  const field =
    'glass-field w-full rounded-xl px-4 py-3 text-[0.98rem] font-semibold text-ink outline-none placeholder:font-normal placeholder:text-slate-body/50';

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
      {/* Inputs */}
      <div className="glass glass-strong rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-[1.2rem] font-extrabold tracking-tight text-ink">What you own</h3>
          <label className="flex items-center gap-2 text-[0.85rem] font-semibold text-slate-body">
            Currency
            <select
              value={currencyCode}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="glass-field rounded-lg px-3 py-1.5 font-bold text-ink outline-none"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {assetFields.map((f) => (
            <label key={f.key} className="block">
              <span className="flex items-baseline justify-between">
                <span className="text-[0.9rem] font-bold text-ink">{f.label}</span>
                <span className="text-[0.72rem] text-slate-body">{f.unit === 'grams' ? 'grams' : currency.symbol}</span>
              </span>
              <input
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                className={`mt-2 ${field}`}
              />
              <span className="mt-1.5 block text-[0.75rem] text-slate-body">{f.hint}</span>
            </label>
          ))}
        </div>

        <div className="mt-8 border-t border-divider pt-6">
          <h3 className="text-[1.2rem] font-extrabold tracking-tight text-ink">What you owe</h3>
          <label className="mt-4 block">
            <span className="text-[0.9rem] font-bold text-ink">Immediate liabilities</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={liabilities}
              onChange={(e) => setLiabilities(e.target.value)}
              className={`mt-2 ${field}`}
            />
            <span className="mt-1.5 block text-[0.75rem] text-slate-body">
              Debts and bills due now — not the full balance of a long-term loan.
            </span>
          </label>
        </div>

        <div className="mt-8 rounded-2xl bg-[#FAFBFB] p-5">
          <p className="text-[0.85rem] font-bold text-ink">Metal rates, per gram</p>
          <p className="mt-1 text-[0.78rem] text-slate-body">
            Prices move daily — adjust these to today&apos;s rate for an accurate Nisab. The app uses live rates.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-[0.8rem] font-semibold text-slate-body">Gold ({currency.symbol}/g)</span>
              <input
                type="text"
                inputMode="decimal"
                value={goldRate}
                onChange={(e) => setGoldRate(e.target.value)}
                className={`mt-1.5 ${field}`}
              />
            </label>
            <label className="block">
              <span className="text-[0.8rem] font-semibold text-slate-body">Silver ({currency.symbol}/g)</span>
              <input
                type="text"
                inputMode="decimal"
                value={silverRate}
                onChange={(e) => setSilverRate(e.target.value)}
                className={`mt-1.5 ${field}`}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="lg:sticky lg:top-28">
        <div className="glass-emerald overflow-hidden rounded-3xl p-7 text-white sm:p-8">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold-light/70">
            {result.due ? 'Zakat payable' : 'Zakat not yet due'}
          </p>
          <p className="mt-3 text-[2.6rem] font-extrabold leading-none tracking-tight">
            {fmt(result.zakat)}
          </p>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-white/60">
            {result.due
              ? `2.5% of your ${fmt(result.net)} in net zakatable wealth.`
              : result.net > 0
                ? `Your ${fmt(result.net)} is below the ${fmt(result.nisab)} Nisab threshold.`
                : 'Enter what you own to see where you stand against the Nisab.'}
          </p>

          <div className="mt-7">
            <div className="flex items-center justify-between text-[0.78rem] font-semibold">
              <span className="text-white/55">Against Nisab</span>
              <span className="text-gold-light">{Math.round(result.progress)}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-light via-gold to-green-bright transition-[width] duration-500"
                style={{ width: `${result.progress}%` }}
              />
            </div>
          </div>

          <dl className="mt-7 space-y-3 border-t border-white/10 pt-6 text-[0.9rem]">
            {[
              ['Total assets', fmt(result.assets)],
              ['Less liabilities', `− ${fmt(Math.max(0, result.assets - result.net))}`],
              ['Net zakatable wealth', fmt(result.net)],
              ['Nisab threshold', result.nisabKnown ? fmt(result.nisab) : '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <dt className="text-white/55">{k}</dt>
                <dd className="font-bold text-white">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="glass-dark mt-6 rounded-xl px-4 py-3 text-[0.78rem] leading-relaxed text-white/50">
            Nisab is taken as the lower of {NISAB_GOLD_G}g of gold and {NISAB_SILVER_G}g of silver.
            This is an estimate for guidance — for a ruling on your specific situation, consult a
            qualified scholar.
          </p>
        </div>
      </div>
    </div>
  );
}
