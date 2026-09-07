import { SHOTS } from './shots';

/**
 * Zakat gets a section of its own. This is the one thing on the page no
 * competing expense tracker does; on the site before last it was a single
 * tile in a grid of ten.
 *
 * The gold rate used to be a card down here with a device of its own. It is a
 * fourth bullet now — it only matters because it is the number Nisab runs on,
 * and a whole screenshot to say "you can set a rate" was the clearest case on
 * the page of an image doing no work.
 */
export const ZAKAT = {
  eyebrow: 'Zakat & Nisab',
  title: 'Never guess your Zakat again',
  body: 'Gold, bank balances, investments, real estate — tracked against the Nisab threshold and the Hawl period automatically, so obligation season is not a scramble and your sadaqah is logged right alongside it.',
  shot: SHOTS.zakat,
  points: [
    {
      title: 'Calculated from what you own',
      body: 'Not a manual estimate typed in once a year — your actual zakatable assets, measured against Nisab as they change.',
    },
    {
      title: 'Hawl tracked for you',
      body: 'The lunar year is counted from when your wealth first crossed the threshold, so the date arrives with the number already worked out.',
    },
    {
      title: 'On the rate you choose',
      body: "Set your jeweller's own gold rate or pull a live spot price — either way it is the same number quietly powering your Nisab calculation, always current.",
    },
    {
      title: 'Behind its own PIN',
      body: 'Zakat data sits behind a separate PIN from the rest of the app, kept apart from everyday tracking.',
    },
  ],
} as const;
