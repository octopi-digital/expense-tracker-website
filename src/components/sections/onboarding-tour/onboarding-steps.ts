export interface OnboardingStep {
  title: string;
  body: string;
  src: string;
  aspect: number;
  side: 'left' | 'right';
}

/** All five captures share one native size — see the `sharp` probe this was built from. */
const CAPTURE_ASPECT = 390 / 844;

/**
 * The onboarding tour's five steps. Sides alternate left/right so each step's
 * text rises in from a different side than the one before it — see
 * `HowItWorks.tsx` for the scroll choreography that drives this.
 */
export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    title: 'Create your account',
    // No Apple sign-in: the app ships `@react-native-google-signin` only, and
    // is Android-only besides — an earlier version of this line offered both.
    body: 'Just a name, an email or phone number, and a password — or continue with Google.',
    src: '/screens/secondary/onboarding-signup.webp',
    aspect: CAPTURE_ASPECT,
    side: 'left',
  },
  {
    title: 'Tell it a bit about yourself',
    body: 'Student, employed, self-employed — a quick answer is enough for the app to start tailoring itself to you.',
    src: '/screens/secondary/onboarding-survey-1.webp',
    aspect: CAPTURE_ASPECT,
    side: 'right',
  },
  {
    title: 'Set your income range',
    body: 'Just a range, not an exact number — enough for Islamic Expense Tracker to suggest a budget that actually fits.',
    src: '/screens/secondary/onboarding-survey-2.webp',
    aspect: CAPTURE_ASPECT,
    side: 'left',
  },
  {
    title: 'How you manage your money today',
    body: 'Cash, bank, mobile banking, digital wallet — pick what applies, and your data stays private either way.',
    src: '/screens/secondary/onboarding-survey-3.webp',
    aspect: CAPTURE_ASPECT,
    side: 'right',
  },
  {
    title: 'Set your country and currency',
    body: 'One last step, and everything after this is tailored to how you actually earn and spend.',
    src: '/screens/secondary/onboarding-currency.webp',
    aspect: CAPTURE_ASPECT,
    side: 'left',
  },
];
