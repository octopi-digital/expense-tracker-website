import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { PhoneShot } from '@/components/ui/PhoneShot';
import { Plinth } from '@/components/ui/Plinth';
import { ZAKAT } from '@/content/zakat';

/**
 * The differentiator, given a section of its own — and the page's only use of
 * gold, which is what makes it mean anything. The band reassigns `--accent`
 * locally so the eyebrow and the markers pick it up without being told about
 * it individually.
 */
export function Zakat() {
  return (
    <Section id="zakat" tone="white" divider className="[--accent:var(--accent-gold)]">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.1em] text-[var(--accent)]">
              {ZAKAT.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-balance">{ZAKAT.title}</h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-5 max-w-lg text-pretty text-[var(--ink-secondary)]">{ZAKAT.body}</p>
          </Reveal>

          <dl className="mt-10">
            {ZAKAT.points.map((point, index) => (
              <Reveal
                key={point.title}
                delay={150 + index * 60}
                className="border-t border-[var(--border)] py-5"
              >
                <dt className="text-[15px] text-[var(--ink)]">{point.title}</dt>
                <dd className="mt-1.5 text-[14px] leading-relaxed text-[var(--ink-secondary)]">
                  {point.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={100} className="lg:sticky lg:top-28">
          <Plinth bleed className="max-h-[460px] bg-[var(--surface)]">
            <PhoneShot
              shot={ZAKAT.shot}
              sizes="(max-width: 1024px) 65vw, 260px"
              className="mx-auto max-w-[250px] rounded-b-none"
            />
          </Plinth>
        </Reveal>
      </div>
    </Section>
  );
}
