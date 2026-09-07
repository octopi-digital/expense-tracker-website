/**
 * Every app screenshot the site ships, with its true pixel size and its alt
 * text, in one place.
 *
 * The dimensions are not decorative: `next/image` needs a real intrinsic
 * width and height to reserve space before the file loads, and getting them
 * wrong is how a page ends up shifting layout as images arrive. They are the
 * numbers `npm run screens` prints, not estimates — if a capture is replaced
 * and its size changes, re-run that script and update the entry here.
 *
 * Five entries, because the page shows five screens. It held sixteen while
 * the design put a device in every section; a registry is not an archive, and
 * an entry here that nothing renders is a `public/` file that ships for no
 * reason. Raw captures for everything else are still in `assets/screenshots/`
 * — add the pipeline row and an entry here to bring one back.
 *
 * Primary screens are cropped to one device viewport (390x844, or 585x1266
 * for the 1.5x Home capture) by scripts/process-screenshots.mjs. The
 * voice-call poster is a native capture at a different size.
 */
export interface Shot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const SHOTS = {
  home: {
    src: '/screens/derived/home-frame.webp',
    alt: 'The home screen showing net worth, income, expenses and savings at a glance',
    width: 585,
    height: 1266,
  },
  healthScore: {
    src: '/screens/derived/health-score-frame.webp',
    alt: 'The financial health score screen, showing an overall score and the habits behind it',
    width: 390,
    height: 844,
  },
  zakat: {
    src: '/screens/derived/zakat-frame.webp',
    alt: 'The Zakat screen, showing zakatable assets measured against the Nisab threshold',
    width: 390,
    height: 844,
  },
  inbox: {
    src: '/screens/transaction-inbox.webp',
    alt: 'The transaction inbox, showing drafts captured from bank SMS waiting to be confirmed',
    width: 390,
    height: 844,
  },
  /** Native capture at 717px wide. Also the poster for the voice-call clip. */
  aiVoiceCall: {
    src: '/screens/secondary/ai-voice-call.webp',
    alt: 'An AI voice call in progress, logging an expense while you talk',
    width: 717,
    height: 1600,
  },
} as const satisfies Record<string, Shot>;

export type ShotKey = keyof typeof SHOTS;
