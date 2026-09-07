import { Reveal } from '@/components/Reveal';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { STORE } from '@/content/site';

/**
 * The page's actual destination, and deliberately quiet.
 *
 * Two designs ago every "Get the app" button pointed at `#download`, which was
 * the *footer* — so a reader following a call to action landed on the
 * copyright line. One design ago the fix was a full-bleed emerald band, which
 * worked but shouted: a saturated full-width block at the end of a restrained
 * page reads as a different site's footer stapled on. A line of type and a
 * single button on the same ground as everything else is stronger, and it
 * keeps the emerald button as the one saturated thing in view.
 *
 * Until the listing is live the button is a real element carrying the status
 * as its label, rather than a link that goes nowhere. Set `STORE.url` and it
 * becomes a link — no change here.
 */
export function DownloadCta() {
  const live = STORE.url !== null;

  return (
    <Section id="download" divider className="text-center">
      <Reveal>
        <h2 className="mx-auto max-w-xl text-balance">
          Start with what you already have in your pocket
        </h2>
      </Reveal>

      <Reveal delay={70}>
        <p className="mx-auto mt-5 max-w-md text-pretty text-[var(--ink-secondary)]">
          Free to use, with no trial clock and no card. Add the Zakat and AI limits later, or
          never.
        </p>
      </Reveal>

      <Reveal delay={130} className="mt-9 flex flex-col items-center gap-4">
        {live ? (
          <Button href={STORE.url!} size="lg">
            {STORE.label}
          </Button>
        ) : (
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] px-6 py-3 text-[15px] font-medium text-[var(--ink)]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {STORE.pendingLabel}
          </span>
        )}

        <p className="text-[13px] text-[var(--ink-tertiary)]">
          {STORE.platform} &middot; English, Bangla, Arabic and Urdu
        </p>
      </Reveal>
    </Section>
  );
}
