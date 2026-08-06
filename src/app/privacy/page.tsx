import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { app } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Privacy Policy — ${app.name}`,
  description: `How ${app.name} collects, uses, and protects your data.`,
};

const LAST_UPDATED = 'August 6, 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-[var(--text-secondary)]">{children}</div>
    </section>
  );
}

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--surface)] text-[var(--text-primary)]">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h1 className="mb-2 text-3xl font-bold text-[var(--text-primary)]">Privacy Policy</h1>
          <p className="mb-12 text-sm text-[var(--text-tertiary)]">Last updated: {LAST_UPDATED}</p>

          <Section title="1. Introduction">
            <p>
              This Privacy Policy explains how {app.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
              collects, uses, discloses, and protects information when you use our mobile application and related
              services (together, the &ldquo;Service&rdquo;). By using the Service, you agree to the collection and
              use of information as described in this policy.
            </p>
            <p>
              We are a personal finance and Zakat-planning app. Handling your financial information responsibly is
              core to what we do, and this policy is written to be specific about what we collect and why — not
              boilerplate.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p><strong>Account information:</strong> name, email address and/or phone number, password (stored as a salted hash, never in plain text), preferred language, and base currency.</p>
            <p><strong>Onboarding &amp; profile information:</strong> occupation, income range, financial goals, self-reported Islamic financial knowledge level, country, date of birth, and profile photo — all optional and provided by you.</p>
            <p><strong>Financial data you enter or import:</strong> income and expense transactions, categories, assets, liabilities, savings goals and contributions, net worth snapshots, and Zakat/Sadaqah payment records.</p>
            <p>
              <strong>Bank and mobile financial service (MFS) SMS data (Android only, opt-in):</strong> if you turn
              on SMS auto-capture, the app reads incoming SMS messages from recognized bank and MFS senders (e.g.
              bKash, Nagad, Rocket, and partner banks) to automatically detect transactions and account balances. We
              extract structured fields — amount, date, category, sender name, and a masked account reference (e.g.
              last 4 digits) — and discard the raw message content after processing. A one-way fingerprint of each
              message is kept only to prevent duplicate entries. This feature is Android-only (iOS does not permit
              apps to read SMS) and is off unless you explicitly enable it.
            </p>
            <p>
              <strong>Voice data:</strong> if you use the voice AI assistant, we process microphone audio to
              transcribe your speech and generate spoken responses.
            </p>
            <p>
              <strong>AI Coach conversation data:</strong> when you chat with the in-app AI Coach, your messages and
              relevant financial figures (such as spending by category, net worth, or pending transactions) are sent
              to our AI processing infrastructure to generate a response.
            </p>
            <p>
              <strong>Authentication data:</strong> if you sign in with Google or Apple, we receive your name, email,
              and a unique identifier from that provider. We use industry-standard secure device storage (iOS
              Keychain / Android Keystore) for biometric app-lock (Face ID / fingerprint / Touch ID) and PIN
              verification — your raw biometric data never leaves your device and is never sent to us.
            </p>
            <p>
              <strong>Payment and subscription data:</strong> if you subscribe to a paid plan, we and our payment
              gateway process your plan, billing cycle, payment method (card, PayPal, bKash, or Nagad), and
              transaction status. Full card numbers and MFS credentials are handled directly by our payment gateway
              and are never stored on our servers.
            </p>
            <p>
              <strong>Device and technical data:</strong> push-notification device token, app version, platform, and
              standard server request logs (such as IP address) generated when the app communicates with our servers.
            </p>
            <p><strong>Support data:</strong> information you provide when contacting support, including support tickets and messages.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <ul className="list-disc space-y-2 pl-5">
              <li>To provide core features: transaction tracking, budgeting, net worth, goals, and Zakat calculation.</li>
              <li>To automatically detect transactions from bank/MFS SMS when you opt in (Android).</li>
              <li>To power the AI Coach, voice assistant, and Islamic finance Q&amp;A features.</li>
              <li>To authenticate you and keep your account secure.</li>
              <li>To process subscription payments and manage your plan.</li>
              <li>To send push notifications you&rsquo;ve enabled (e.g. reminders, transaction confirmations).</li>
              <li>To respond to support requests.</li>
              <li>To maintain, secure, and improve the Service, including diagnosing technical issues.</li>
            </ul>
            <p>We do not sell your personal or financial information to third parties, and we do not use your financial data for advertising.</p>
          </Section>

          <Section title="4. AI Processing &amp; Third-Party Processors">
            <p>
              To power the AI Coach, entry extraction, voice transcription, text-to-speech, and live voice calls, we
              send relevant data — which may include your financial figures, chat messages, SMS text (only when
              on-device parsing cannot classify a message), and voice audio — to <strong>OpenAI</strong> for
              processing. Islamic knowledge Q&amp;A citations are handled by our own self-hosted service and do not
              involve your financial data.
            </p>
            <p>We also share limited information with the following service providers, solely to operate the Service:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>Firebase Cloud Messaging (Google)</strong> — delivering push notifications.</li>
              <li><strong>Google and Apple</strong> — verifying your identity if you use &ldquo;Sign in with Google/Apple&rdquo;.</li>
              <li><strong>SSLCommerz</strong> and associated payment/MFS rails (card, PayPal, bKash, Nagad) — processing subscription payments.</li>
              <li><strong>Our email provider</strong> — sending verification, password-reset, and transactional emails.</li>
              <li><strong>Our cloud database provider</strong> — securely hosting your account and financial data.</li>
              <li>Public exchange-rate and gold-price data providers — used only to fetch market rates, not to send us your personal data.</li>
            </ul>
            <p>These providers are contractually or technically restricted to using your data only to provide services to us, and not for their own independent purposes.</p>
          </Section>

          <Section title="5. Data Storage &amp; Security">
            <p>
              Your data is stored on secured cloud infrastructure. Passwords and app-lock PINs are stored only as
              salted hashes. Data in transit between the app and our servers is encrypted (HTTPS/TLS). We restrict
              internal access to personal data to what is necessary to operate the Service.
            </p>
            <p>No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.</p>
          </Section>

          <Section title="6. Your Rights &amp; Choices">
            <ul className="list-disc space-y-2 pl-5">
              <li><strong>Export your data:</strong> you can download a full copy of your account data (as JSON or PDF) at any time from within the app.</li>
              <li><strong>Reset your data:</strong> you can wipe your transactions, assets, liabilities, and goals from within the app. This keeps your account profile, support history, and billing records, which we retain as described below.</li>
              <li><strong>Delete your account:</strong> you may request full account deletion by contacting us at the email below. We will delete or anonymize your personal data except where we are required to retain records (e.g. payment records for accounting, tax, or legal compliance).</li>
              <li><strong>SMS auto-capture:</strong> you may disable this at any time in the app&rsquo;s settings and revoke the SMS permission at the OS level.</li>
              <li><strong>Notifications:</strong> you can disable push notifications in your device settings.</li>
              <li><strong>Correct your information:</strong> you can update your profile and account details in the app at any time.</li>
            </ul>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your account and financial data for as long as your account is active. If you delete your
              account, we delete or anonymize your personal data within a reasonable period, except for records we
              are legally required to retain (such as payment/billing records) or data necessary to resolve disputes
              or enforce our agreements.
            </p>
          </Section>

          <Section title="8. Children&rsquo;s Privacy">
            <p>
              The Service is not directed at children under 13. Users between 13 and 18 should use the Service only
              with the involvement and guidance of a parent or legal guardian, particularly given the financial
              nature of the app. We do not knowingly collect personal information from children under 13; if we
              become aware that we have, we will take steps to delete it.
            </p>
          </Section>

          <Section title="9. International Users">
            <p>
              {app.name} is available globally. Regardless of where you access the Service from, your information
              may be processed and stored on servers located in other countries, including by the third-party
              processors described above. By using the Service, you consent to this transfer and processing of your
              information.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you
              in-app or by email before the changes take effect. Continued use of the Service after changes take
              effect constitutes acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>
              If you have questions about this Privacy Policy, want to exercise your rights, or wish to delete your
              account, contact us at{' '}
              <span className="font-medium text-[var(--text-primary)]">[support@yourdomain.com]</span>.
            </p>
            <p className="text-[var(--text-tertiary)]">
              [Company/Developer legal name to be added here.]
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  );
}
