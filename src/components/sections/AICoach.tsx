import { PhoneWindow } from '@/components/PhoneWindow';
import { Reveal } from '@/components/Reveal';

const CARDS = [
  {
    eyebrow: '01 – Ask anything',
    src: '/screens/secondary/ai-chat.webp',
    alt: 'AI chat — ask about your finances',
    caption: 'Just type what’s on your mind',
    body: 'No menus to dig through — ask it directly and it answers from your real numbers.',
  },
  {
    eyebrow: 'Voice call – 02',
    src: '/screens/secondary/ai-voice-call.webp',
    alt: 'AI voice call about finances',
    caption: 'Or just say it out loud',
    body: 'Call it like you would a person, and it walks you through the answer.',
  },
];

export function AICoach() {
  return (
    <section id="ai-coach" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--accent)]">
            AI Coach
          </p>
          <h2 className="max-w-lg text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Your money, coached — not just tracked
          </h2>
        </div>
        <p className="max-w-sm text-[var(--text-secondary)]">
          Just tell it what's going on — the AI does the rest, from spotting a
          bad habit to answering a straight question about your money.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {CARDS.map((card, index) => (
          <Reveal
            key={card.eyebrow}
            delay={index * 110}
            className="surface-card overflow-hidden rounded-3xl pt-6"
          >
            <p className="mb-6 px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              {card.eyebrow}
            </p>
            <PhoneWindow src={card.src} alt={card.alt} className="mx-auto max-w-[240px]" />
            <div className="px-6 pb-8 pt-6">
              <p className="text-xl font-semibold text-[var(--text-primary)]">{card.caption}</p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{card.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
