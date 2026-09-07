import { SHOTS } from './shots';

/**
 * The AI coach section, and the page's one dark band — placed after the
 * plain-white feature run so it lands as a change of register rather than
 * decoration.
 *
 * The sample questions are the product here. An earlier version showed only
 * a screenshot of the chat screen, which proved a chat screen exists but
 * never showed what you would actually *say* to it.
 */
export const COACH = {
  eyebrow: 'AI coach',
  title: 'Your money, coached — not just tracked',
  lede: 'It already knows your numbers, so you can skip the setup and just ask. No menus, no reports to build, no spreadsheet.',
  /** Phrased the way someone would actually type them. */
  asks: [
    'How much did I spend on food this month?',
    'Can I afford a $1,200 laptop right now?',
    'Why did my health score drop?',
  ],
  answer:
    "You're at $312 on food — about 18% above your usual. Most of it is delivery on weekdays.",
  points: [
    {
      title: 'Answers from your books',
      body: 'Not general advice — it reads your own income, spending and goals before it replies.',
    },
    {
      title: 'It speaks up first',
      body: 'When a category starts creeping up or a goal falls behind, you hear about it before month end.',
    },
  ],
  voice: {
    eyebrow: 'Voice call',
    title: "Or don't type at all — just call it",
    body: 'Ring the coach like you would a person and talk it through out loud. It listens, answers back, and can log the expense for you while you are still on the call — useful when your hands are full and a receipt is about to be forgotten.',
    /**
     * 4 MB. `preload="none"` plus a poster is not an optimisation here, it is
     * the difference between a 400 KB page and a 4.4 MB one — see VideoPlayer.
     */
    video: '/video/ai-voice-call.mp4',
    poster: SHOTS.aiVoiceCall,
  },
} as const;
