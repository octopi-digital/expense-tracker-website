import { PhoneFrame } from '@/components/PhoneFrame';

const FEATURES = [
  {
    eyebrow: 'Goals',
    title: 'Save toward what actually matters',
    body: 'Set a goal — a wedding, a laptop, an emergency fund — and watch what you put aside count toward it automatically.',
    src: '/screens/secondary/goals-overview.webp',
  },
  {
    eyebrow: 'Islamic guides',
    title: 'Halal guidance, built in',
    body: 'Clear answers on what counts as halal income and spending, right next to the numbers they apply to.',
    src: '/screens/secondary/islamic-guides.webp',
  },
  {
    eyebrow: 'Secret Vault',
    title: 'Keep sensitive accounts private',
    body: 'A PIN-locked space for the assets and liabilities you don’t want visible at a glance — still counted in your net worth, never on display.',
    src: '/screens/secondary/secret-vault.webp',
  },
  {
    eyebrow: 'Currency rate',
    title: 'Live rates, right when you need them',
    body: 'Holding money or assets abroad? Current exchange rates feed straight into your net worth, no separate lookup.',
    src: '/screens/secondary/currency.webp',
  },
  {
    eyebrow: 'Analysis',
    title: 'See the pattern, not just the numbers',
    body: 'A breakdown of where your money actually goes month to month, so a bad habit shows up before it becomes a bad year.',
    src: '/screens/secondary/analysis-report.webp',
  },
  {
    eyebrow: 'Security',
    title: 'Lock what matters with a PIN',
    body: 'Zakat and vault data sit behind their own PIN, separate from the rest of the app.',
    src: '/screens/secondary/zakat-pin.webp',
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            Features
          </p>
          <h2 className="max-w-lg text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Everything else it does for you, day to day
          </h2>
        </div>
        <p className="max-w-sm text-[var(--text-secondary)]">
          Beyond net worth and spending, Islamic Expense Tracker covers the details of everyday
          financial life that most apps leave out.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.eyebrow}
            className="flex flex-col gap-5 rounded-3xl border border-[var(--border)] bg-[var(--surface-card)] p-6"
          >
            <PhoneFrame src={feature.src} alt={feature.title} className="mx-auto max-w-[200px]" />
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                {feature.eyebrow}
              </p>
              <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
