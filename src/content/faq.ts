/**
 * Nine questions, answered accurately. Several of these took real effort to
 * get right — the SMS-permission answer in particular is the response to this
 * product's single biggest objection, and it is precise about what is read,
 * when, and how to turn it off. Do not soften them for length.
 */
export const FAQ_CONTENT = {
  eyebrow: 'FAQ',
  title: 'Questions people actually ask',
  lede: 'Still stuck? The in-app help centre and live chat cover the rest.',
} as const;

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    q: 'Does it work offline?',
    a: "Core logging does. Adding a transaction, updating a goal, or recording a Zakat payment is queued on your device and syncs the moment you're back online, so a weak signal never blocks an entry. Things like the AI coach and live dashboards still need a connection.",
  },
  {
    q: 'How is the financial health score calculated?',
    a: 'From your actual income and spending history — savings rate, spending consistency, debt load and income stability — not a questionnaire. It updates as your real numbers change.',
  },
  {
    q: 'How does the Zakat calculation work?',
    a: 'The app tracks your gold, bank balances, investments and real estate against the Nisab threshold and Hawl period, so your obligation is calculated from what you actually own rather than a manual estimate.',
  },
  {
    q: 'Why does the app want to read my SMS?',
    a: 'Only to turn your bank and mobile-wallet alerts into transactions for you — most banks offer no open API to a finance app, but they all send a confirmation text. It is off until you switch it on, only messages from allowlisted bank and wallet senders are ever read, and nothing is written to your books until you confirm the draft. Turn it off and everything still works by manual entry. Android only; iOS gives no app access to SMS at all.',
  },
  {
    q: 'Is my financial data private?',
    a: 'Yes. Sensitive accounts can be moved into the PIN-locked Secret Vault, and Zakat data sits behind that same PIN — both kept separate from the rest of the app. You can also lock the whole app behind a fingerprint or PIN.',
  },
  {
    q: 'Can I get my data out, or delete it?',
    a: 'Both. Premium plans can export your data, and any account can be reset back to empty or deleted outright from inside the app — no email to support, no waiting period.',
  },
  {
    q: 'Do I have to pay to use it?',
    a: 'No. The free plan covers net worth tracking, the financial health score, Zakat, up to 3 goals and 5 AI messages a month, with no time limit. Premium lifts the AI and goal caps and adds advanced reports, export and priority support.',
  },
  {
    q: 'What languages are supported?',
    a: "English, Bangla, Arabic and Urdu throughout the app today, with the AI coach's voice features rolling out to the newer languages.",
  },
  {
    q: 'Is it available on iOS?',
    a: 'Not yet — the app is currently Android-only.',
  },
];
