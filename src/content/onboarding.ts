/**
 * The real sign-up flow, five screens. On the old site this was a pinned,
 * scroll-driven tour that cost a full section of the page's momentum to say
 * "signing up is easy". It is a strip now, and it sits just before the
 * download CTA — after the reader is sold, where "this takes two minutes" is
 * the last objection left rather than the first thing they are told.
 */
export interface SetupStep {
  title: string;
  body: string;
}

export const SETUP = {
  eyebrow: 'Getting started',
  title: 'Set up in about two minutes',
  lede: 'Five screens, none of them asking for a card.',
} as const;

export const SETUP_STEPS: readonly SetupStep[] = [
  {
    title: 'Create your account',
    // No Apple sign-in: the app ships Google sign-in only, and is Android-only
    // besides — an earlier version of this line offered both.
    body: 'Just a name, an email or phone number, and a password — or continue with Google.',
  },
  {
    title: 'Tell it a bit about yourself',
    body: 'Student, employed, self-employed — a quick answer is enough for the app to start tailoring itself to you.',
  },
  {
    title: 'Set your income range',
    body: 'Just a range, not an exact number — enough to suggest a budget that actually fits.',
  },
  {
    title: 'How you manage money today',
    body: 'Cash, bank, mobile banking, digital wallet — pick what applies, and your data stays private either way.',
  },
  {
    title: 'Set country and currency',
    body: 'One last step, and everything after this is tailored to how you actually earn and spend.',
  },
];
