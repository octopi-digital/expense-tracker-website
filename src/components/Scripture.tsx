import { Ornament } from '@/components/Pattern';
import { Reveal } from '@/components/Reveal';

/**
 * A cited passage from the Qur'an or the Sunnah.
 *
 * Arabic is optional: for Qur'anic verses a short fragment is set in Amiri and
 * marked `lang="ar" dir="rtl"` so screen readers switch language and the text
 * runs the right way. Hadith are given in translation with the collection and
 * number, which is how they are normally referenced in English.
 *
 * `bangla` carries the Bengali rendering — the app's largest audience reads
 * Bangla, and a meaning they have to translate back out of English is not
 * really a meaning. It is tagged `lang="bn"` and set in Noto Serif Bengali.
 *
 * The `reference` is always shown. A passage without its source is not worth
 * putting on the page.
 */
export function Scripture({
  arabic,
  translation,
  bangla,
  reference,
  note,
  delay = 0,
  className = '',
}: {
  arabic?: string;
  translation: string;
  /** Bengali rendering of the same passage. */
  bangla?: string;
  reference: string;
  /** Optional line tying the passage to the argument around it. */
  note?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <figure className="mx-auto max-w-2xl text-center">
        <Ornament />
        {arabic ? (
          <p
            className="font-arabic mt-8 text-[1.65rem] leading-loose text-gold-light"
            dir="rtl"
            lang="ar"
          >
            {arabic}
          </p>
        ) : null}
        <blockquote className={`${arabic ? 'mt-4' : 'mt-8'} text-[1.08rem] italic leading-relaxed text-white/75`}>
          “{translation}”
        </blockquote>
        {bangla ? (
          <p
            className="font-bangla mx-auto mt-5 max-w-xl text-[1rem] leading-[2] text-white/60"
            lang="bn"
          >
            “{bangla}”
          </p>
        ) : null}
        <figcaption className={`${bangla ? 'mt-6' : 'mt-4'} text-[0.8rem] font-bold uppercase tracking-widest text-gold-light/80`}>
          {reference}
        </figcaption>
        {note ? (
          <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-relaxed text-slate-body">
            {note}
          </p>
        ) : null}
      </figure>
    </Reveal>
  );
}
