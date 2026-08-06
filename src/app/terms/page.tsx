import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { app } from '@/lib/brand';

export const metadata: Metadata = {
  title: `Terms & Conditions — ${app.name}`,
  description: `The terms that govern your use of ${app.name}.`,
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

export default function TermsAndConditions() {
  return (
    <>
      <Nav />
      <main className="bg-[var(--surface)] text-[var(--text-primary)]">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <h1 className="mb-2 text-3xl font-bold text-[var(--text-primary)]">Terms &amp; Conditions</h1>
          <p className="mb-12 text-sm text-[var(--text-tertiary)]">Last updated: {LAST_UPDATED}</p>

          <Section title="1. Agreement to Terms">
            <p>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) govern your access to and use of {app.name} (the
              &ldquo;Service&rdquo;), a personal finance, budgeting, and Zakat-planning application available
              globally. By creating an account or using the Service, you agree to be bound by these Terms and our{' '}
              <a href="/privacy" className="text-[var(--accent)] underline">Privacy Policy</a>. If you do not agree, do not use the Service.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 13 years old to use the Service. If you are between 13 and 18 (or the age of
              majority in your jurisdiction), you may only use the Service under the supervision and with the
              consent of a parent or legal guardian, who agrees to these Terms on your behalf and takes
              responsibility for your use of the Service, including any subscription purchases.
            </p>
          </Section>

          <Section title="3. Your Account">
            <ul className="list-disc space-y-2 pl-5">
              <li>You are responsible for maintaining the confidentiality of your login credentials, PIN, and any device used to access your account.</li>
              <li>You are responsible for all activity that occurs under your account.</li>
              <li>You must provide accurate information when creating your account and keep it up to date.</li>
              <li>Notify us immediately if you suspect unauthorized access to your account.</li>
            </ul>
          </Section>

          <Section title="4. The Service">
            <p>
              {app.name} lets you track income and expenses, manage assets and liabilities, set savings goals,
              calculate and track Zakat, view your net worth and financial health, and — where you choose to enable
              it — automatically detect transactions from bank/mobile-financial-service SMS messages (Android only)
              or manually via voice and an AI-powered coach.
            </p>
            <p>
              <strong>Not financial or religious advice.</strong> The AI Coach, insights, financial health scoring,
              and Islamic finance guidance (including Zakat calculations) provided in the Service are for
              informational and educational purposes only. They do not constitute professional financial, tax,
              legal, or religious (fatwa) advice, and should not be relied upon as a substitute for consulting a
              qualified financial advisor or a qualified Islamic scholar for matters specific to your situation. You
              are responsible for verifying calculations, particularly Zakat obligations, before acting on them.
            </p>
            <p>
              <strong>SMS auto-capture accuracy.</strong> Automatic transaction detection from SMS is provided for
              convenience and may occasionally misread, miss, or duplicate a transaction. You are responsible for
              reviewing and correcting entries in the app.
            </p>
          </Section>

          <Section title="5. Subscriptions &amp; Payments">
            <ul className="list-disc space-y-2 pl-5">
              <li>The Service offers a free plan and one or more paid subscription plans (billed monthly or yearly) with additional features.</li>
              <li>Paid plans are processed through our third-party payment gateway and may be paid via card, PayPal, bKash, or Nagad, depending on availability in your region.</li>
              <li>Subscriptions renew automatically at the end of each billing cycle unless cancelled before the renewal date.</li>
              <li>You can cancel your subscription at any time from within the app; cancellation takes effect at the end of the current billing period, and you retain access to paid features until then.</li>
              <li>Fees are shown in-app before purchase. Except where required by law or explicitly stated otherwise, payments are non-refundable.</li>
              <li>We may change subscription pricing or features with reasonable advance notice; changes will not apply retroactively to a period you have already paid for.</li>
            </ul>
          </Section>

          <Section title="6. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Use the Service for any unlawful purpose, or in violation of any applicable law or regulation.</li>
              <li>Attempt to gain unauthorized access to the Service, other users&rsquo; accounts, or our systems.</li>
              <li>Reverse-engineer, decompile, or attempt to extract the source code of the app, except as permitted by law.</li>
              <li>Interfere with or disrupt the integrity or performance of the Service.</li>
              <li>Use automated means (bots, scrapers) to access the Service without our written permission.</li>
              <li>Upload or transmit malicious code.</li>
              <li>Misrepresent your identity or provide false information when creating an account.</li>
            </ul>
          </Section>

          <Section title="7. Your Content &amp; Data">
            <p>
              You retain ownership of the financial data and content you enter into the Service. You grant us a
              limited license to store, process, and use that data solely to operate, maintain, and improve the
              Service, as described in our Privacy Policy — including sending relevant data to AI processors to
              power the AI Coach, voice assistant, and automatic entry features. You can export your data or reset
              it at any time from within the app.
            </p>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              The Service, including its design, branding, software, and content (excluding your own data), is owned
              by us or our licensors and is protected by intellectual property laws. We grant you a limited,
              non-exclusive, non-transferable, revocable license to use the app for your personal, non-commercial
              use, subject to these Terms.
            </p>
          </Section>

          <Section title="9. Suspension &amp; Termination">
            <p>
              We may suspend or terminate your account if you violate these Terms, engage in fraudulent or abusive
              behavior, or if required by law. You may stop using the Service and request account deletion at any
              time by contacting us. Sections of these Terms that by their nature should survive termination
              (including intellectual property, disclaimers, and limitation of liability) will survive.
            </p>
          </Section>

          <Section title="10. Disclaimers">
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any
              kind, whether express or implied, including warranties of merchantability, fitness for a particular
              purpose, accuracy, or non-infringement. We do not warrant that the Service will be uninterrupted,
              error-free, or that automatic SMS detection, AI-generated insights, or Zakat calculations will be
              perfectly accurate.
            </p>
          </Section>

          <Section title="11. Limitation of Liability">
            <p>
              To the maximum extent permitted by law, we will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits, data, or financial loss, arising from your
              use of or inability to use the Service, including reliance on AI-generated insights, financial health
              scores, or Zakat calculations. Our total liability for any claim arising from the Service will not
              exceed the amount you paid us, if any, in the 12 months preceding the claim.
            </p>
          </Section>

          <Section title="12. Changes to the Service or Terms">
            <p>
              We may modify or discontinue features of the Service at any time. We may update these Terms from time
              to time; if we make material changes, we will notify you in-app or by email before they take effect.
              Continued use of the Service after changes take effect constitutes acceptance of the updated Terms.
            </p>
          </Section>

          <Section title="13. Governing Law &amp; Dispute Resolution">
            <p>
              While {app.name} is available to users globally, these Terms are governed by the laws of Bangladesh,
              without regard to conflict-of-law principles. Any dispute arising from these Terms or the Service will
              be subject to the exclusive jurisdiction of the courts of Bangladesh, unless otherwise required by
              mandatory local consumer-protection law in your country of residence.
            </p>
          </Section>

          <Section title="14. Contact Us">
            <p>
              If you have questions about these Terms, contact us at{' '}
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
