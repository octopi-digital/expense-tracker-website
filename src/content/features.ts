import { SHOTS, type Shot } from './shots';

/**
 * The two core screens worth showing, and the section that frames them.
 *
 * This was three full-width alternating rows, each with its own device. Three
 * screenshots to say "it tracks money" is two more than the claim needs, and
 * the alternating layout cost roughly a viewport of scroll per row. The third
 * row's subject — spending breakdowns — reads perfectly well as a line of
 * text, and now sits in the compact list in `grid.ts`.
 */
export interface FeatureBlock {
  id: string;
  title: string;
  body: string;
  shot: Shot;
}

export const FEATURES = {
  title: 'Two questions, answered without opening a spreadsheet',
  lede: 'Where you stand, and how you are doing — each one a screen, not a report you have to build.',
} as const;

export const FEATURE_BLOCKS: readonly FeatureBlock[] = [
  {
    id: 'net-worth',
    title: 'Know where you stand',
    body: 'Assets minus liabilities, recalculated the moment anything moves — property, gold, loans and cards all counted, with live exchange rates folded in for anything held abroad.',
    shot: SHOTS.home,
  },
  {
    id: 'health',
    title: 'One number for how you are really doing',
    body: 'Built from your real income and spending, not a survey — savings rate, spending consistency, debt load and income stability, each shown separately so you can see what is holding it back.',
    shot: SHOTS.healthScore,
  },
];
