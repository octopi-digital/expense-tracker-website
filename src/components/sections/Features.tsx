import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PhoneShot } from '@/components/ui/PhoneShot';
import { Plinth } from '@/components/ui/Plinth';
import { FEATURES, FEATURE_BLOCKS } from '@/content/features';

/**
 * The two core screens, side by side, separated by a hairline rather than by
 * a colour change or a card.
 *
 * This replaced three full-width alternating rows. Those cost about a
 * viewport of scroll each, and an alternating layout only pays for itself
 * when there are enough rows for the rhythm to register — at three it just
 * reads as the page being unable to decide which side things go on.
 */
export function Features() {
  return (
    <Section id="features" divider>
      <SectionHeading title={FEATURES.title} lede={FEATURES.lede} />

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-0">
        {FEATURE_BLOCKS.map((block, index) => (
          <Reveal
            key={block.id}
            delay={index * 90}
            // `flex-col` + `mt-auto` on the plinth, so the two devices share a
            // top edge no matter how many lines of copy sit above them. Without
            // it the blocks are offset by whatever the difference in body
            // length happens to be, which reads as a misalignment rather than
            // as a deliberate stagger.
            className={`flex h-full flex-col ${
              index === 1 ? 'md:border-l md:border-[var(--border)] md:pl-12' : 'md:pr-12'
            }`}
          >
            <h3 className="text-[var(--ink)]">{block.title}</h3>
            <p className="mt-2.5 max-w-sm text-[15px] text-[var(--ink-secondary)]">{block.body}</p>

            {/* A spacer wrapper rather than `mt-auto` on the plinth itself:
                the plinth owns its own padding, and adding a margin utility to
                it from out here would collide with those. `flex-1` eats the
                leftover height in the shorter column, `justify-end` puts the
                plinth at the bottom of it. */}
            <div className="mt-8 flex flex-1 flex-col justify-end">
              {/* A big device cropped to its top half, not a small whole one
                  centred in a large slab. At 240px in a ~500px plinth the
                  screen was half dead grey and the UI inside it was too small
                  to read — which is the worst of both, since the only reason
                  to show a screenshot at all is that someone can read it.

                  400 = 48px of top padding + 352px of device, and 352 is
                  measured, not judged by eye. Both screens here are 9:19.5, so
                  at a shared render width they crop at the same rendered y.
                  Scanning each image row by row for where the mean colour
                  returns to page background gives one usable overlap: the
                  score screen's Spending Alert card ends at ~347 and the home
                  screen's Income card does not begin until ~366, so 352 clears
                  both. 344 looked right and was four pixels inside the alert
                  card — uniform pale yellow reads as "quiet" but is still the
                  middle of a card. Re-measure before moving this. */}
              <Plinth bleed className="max-h-[400px]">
                <PhoneShot
                  shot={block.shot}
                  sizes="(max-width: 768px) 62vw, 300px"
                  className="mx-auto max-w-[300px] rounded-b-none"
                />
              </Plinth>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
