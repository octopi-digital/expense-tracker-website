/**
 * Titles and bodies are lifted verbatim from the app's own strings, so a
 * reader who installs after reading this finds the same words inside. If a
 * topic is renamed in the app, rename it here too.
 */
export const GUIDANCE = {
  eyebrow: 'Islamic guidance',
  title: 'The part other finance apps leave out',
  lede: 'Most finance apps stop at the numbers. This one also answers the question underneath them — whether the way you are earning and spending is right.',
  topics: [
    { title: 'Halal Earnings', body: 'Earn in a lawful and blessed way' },
    { title: 'Riba (Interest)', body: 'Why Riba is forbidden in Islam' },
    { title: 'Zakat & Sadaqah', body: 'Purify your wealth, help others' },
    { title: 'Financial Planning', body: 'Plan your money the Islamic way' },
    { title: 'Islamic Ethics', body: 'Principles for ethical finance' },
    { title: 'Hadith Wisdom', body: 'Wisdom from the Prophet صلى الله عليه وسلم' },
    { title: 'Daily Verse', body: 'Quranic guidance for your day' },
    { title: 'Financial Rules', body: 'Simple rules for financial success' },
  ],
} as const;
