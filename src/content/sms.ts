import { SHOTS } from './shots';

/**
 * Auto-capture. The privacy framing is not decoration — "let an app read my
 * texts" is the biggest objection this product has to answer, and each step
 * below answers part of it. Do not compress these into a single "reads your
 * SMS" line.
 */
export const SMS = {
  eyebrow: 'Automatic capture',
  title: 'Your books fill themselves in',
  lede: 'Most banks offer no API to a finance app. They all send a confirmation text. That is the opening the app uses — and nothing else.',
  shot: SHOTS.inbox,
  steps: [
    {
      title: 'Your bank texts you, like always',
      body: 'Your bank or mobile wallet sends the confirmation SMS it already sends today. Nothing changes on their end.',
    },
    {
      title: 'The app reads just that message',
      body: 'Only texts from an allowlisted bank or wallet sender are ever looked at, and the first parse happens on your device.',
    },
    {
      title: "You confirm, and it's logged",
      body: 'It arrives as a draft in your inbox with the amount and category already filled in. Nothing is saved to your books until you say so.',
    },
  ],
  /** Shown as a footnote under the steps — the honest caveats, stated plainly. */
  note: 'Off until you switch it on. Turn it off and everything still works by manual entry. Android only — iOS gives no app access to SMS at all.',
} as const;
