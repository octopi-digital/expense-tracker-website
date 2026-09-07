import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalNote, Prose } from '@/components/Legal';
import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Deenomics collects, uses, stores and protects your data — including SMS and notification access, AI conversations, and your rights over everything we hold.',
};

const UPDATED = '7 September 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede={`How we collect, use and protect your information. Last updated ${UPDATED}.`}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Prose>
            <p>
              This policy explains what {site.name} (“we”, “us”) collects when you use the {site.name}{' '}
              mobile application and this website, why we collect it, and what control you have over
              it. Using {site.name} means you accept the practices described here.
            </p>

            <h2 id="collect">1. What we collect</h2>

            <h3>Information you give us</h3>
            <ul>
              <li>
                <strong>Account details</strong> — your name, email address or phone number, and a
                password or Google sign-in identifier.
              </li>
              <li>
                <strong>Profile and preferences</strong> — language, currency, profile photo, and
                the answers you give in the onboarding survey.
              </li>
              <li>
                <strong>Financial records you create</strong> — transactions, income, assets,
                liabilities, goals, Zakat and Sadaqah entries, and any receipts or documents you
                attach.
              </li>
              <li>
                <strong>Support content</strong> — messages, tickets and attachments you send us.
              </li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li>
                <strong>Device and diagnostic data</strong> — device model, operating system
                version, app version, crash reports and basic usage events, used to keep the app
                working.
              </li>
              <li>
                <strong>Push token</strong> — an anonymous identifier from Firebase Cloud Messaging
                so we can deliver notifications you have asked for.
              </li>
            </ul>

            <h3>SMS and notification access</h3>
            <p>
              If you turn on automatic transaction capture, {site.name} reads incoming SMS messages
              and notifications in order to recognise bank and payment alerts.
            </p>
            <ul>
              <li>
                Messages are <strong>matched and parsed on your device</strong>. We do not upload,
                store or transmit the content of your SMS messages or notifications.
              </li>
              <li>
                Only the fields extracted from a message you approve — amount, date, merchant name,
                category and account label — become a transaction in your account.
              </li>
              <li>
                Messages that do not look like a financial alert are ignored and never leave the
                device.
              </li>
              <li>
                This permission is optional. The app works fully without it, and you can revoke it
                at any time in your device settings or in Profile → SMS Permissions.
              </li>
            </ul>

            <h3>Voice and photos</h3>
            <p>
              Microphone access is used only while you are actively speaking to the AI coach or
              dictating an entry. Audio is transmitted for the length of that request and is not
              retained afterwards. Camera and photo access is requested only at the moment you
              attach an image.
            </p>

            <h2 id="use">2. How we use your information</h2>
            <ul>
              <li>To provide the service: recording transactions, calculating Zakat, tracking goals and producing analytics.</li>
              <li>To generate AI coaching responses relevant to your actual finances.</li>
              <li>To send the notifications and reminders you have enabled.</li>
              <li>To operate subscriptions, process payments and prevent fraud.</li>
              <li>To respond to your support requests.</li>
              <li>To diagnose crashes and improve reliability.</li>
              <li>To meet legal and regulatory obligations.</li>
            </ul>
            <p>
              <strong>We do not sell your personal information, and we do not share it with
              advertisers.</strong>
            </p>

            <h2 id="ai">3. AI coaching</h2>
            <p>
              When you ask the AI coach a question, the question and a relevant summary of your
              financial data are sent to our AI processing provider to generate the answer. That
              provider processes the request on our behalf under contract, and is not permitted to
              use your data to train its models. Conversations are stored in your account so you can
              return to them, and you can delete any conversation at any time.
            </p>

            <h2 id="sharing">4. Who we share data with</h2>
            <p>We share information only with the service providers needed to run {site.name}:</p>
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Google Firebase</td><td>Push notifications and crash reporting</td></tr>
                <tr><td>Google Play Billing</td><td>Subscription payments</td></tr>
                <tr><td>Google Sign-In</td><td>Optional account authentication</td></tr>
                <tr><td>AI processing provider</td><td>Generating AI coach responses</td></tr>
                <tr><td>Cloud hosting provider</td><td>Storing your account and financial records</td></tr>
              </tbody>
            </table>
            <p>
              We may also disclose information where we are legally required to, or to protect the
              rights and safety of our users.
            </p>

            <h2 id="security">5. How we protect it</h2>
            <ul>
              <li>All traffic between the app and our servers is encrypted with TLS.</li>
              <li>Data at rest is encrypted, and passwords are stored only as salted hashes.</li>
              <li>Authentication tokens are held in the device keystore, not in plain storage.</li>
              <li>
                The Zakat Vault and Secret Vault are protected by a PIN you set, separate from your
                device unlock.
              </li>
              <li>Access to production data is restricted to the staff who need it, and is logged.</li>
            </ul>
            <p>
              No system is perfectly secure. If a breach affects your data, we will notify you and
              the relevant authority without undue delay.
            </p>

            <h2 id="retention">6. How long we keep it</h2>
            <p>
              We keep your account data for as long as your account is active. When you delete your
              account, your personal data and financial records are erased from our production
              systems within 30 days and from backups within 90 days, except where we are required
              to retain transaction records for tax or accounting purposes.
            </p>

            <h2 id="rights">7. Your rights</h2>
            <ul>
              <li><strong>Access and portability</strong> — export your data as PDF or CSV from within the app.</li>
              <li><strong>Correction</strong> — edit any record you have created, at any time.</li>
              <li><strong>Deletion</strong> — delete individual records, reset all your data, or delete your account entirely. See <Link href="/data-deletion">Data Deletion</Link>.</li>
              <li><strong>Withdraw consent</strong> — revoke SMS, notification, microphone or camera access at any time without losing your existing data.</li>
              <li><strong>Object or restrict</strong> — write to us and we will act on your request.</li>
            </ul>
            <p>
              To exercise any of these, email{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within 30 days.
            </p>

            <h2 id="children">8. Children</h2>
            <p>
              {site.name} is not directed at children under 13, and we do not knowingly collect data
              from them. If you believe a child has given us information, contact us and we will
              delete it.
            </p>

            <h2 id="transfers">9. International transfers</h2>
            <p>
              Your data may be processed in countries other than your own. Where it is, we rely on
              appropriate safeguards such as standard contractual clauses to protect it.
            </p>

            <h2 id="cookies">10. This website</h2>
            <p>
              This website does not use advertising or tracking cookies. The Zakat calculator on it
              runs entirely in your browser — the figures you enter are never sent to us.
            </p>

            <h2 id="changes">11. Changes to this policy</h2>
            <p>
              We will post any changes on this page and update the date above. Material changes will
              also be announced in the app before they take effect.
            </p>

            <h2 id="contact">12. Contact</h2>
            <p>
              Questions about this policy, or about your data, go to{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <LegalNote>
              This policy describes how the product is built to behave. Before publishing, have it
              reviewed against the laws that apply to your business and add your registered company
              name, address, and data-protection contact.
            </LegalNote>
          </Prose>
        </div>
      </section>
    </>
  );
}
