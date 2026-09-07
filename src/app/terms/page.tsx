import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalNote, Prose } from '@/components/Legal';
import { PageHero } from '@/components/PageHero';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of the Deenomics app and website — accounts, subscriptions, acceptable use, and the limits of the guidance we provide.',
};

const UPDATED = '7 September 2026';

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        lede={`The agreement between you and ${site.name}. Last updated ${UPDATED}.`}
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Prose>
            <p>
              These terms govern your use of the {site.name} mobile application and this website
              (together, the “Service”). By creating an account or using the Service you agree to
              them. If you do not agree, please do not use the Service.
            </p>

            <h2 id="eligibility">1. Who may use the Service</h2>
            <p>
              You must be at least 13 years old, and old enough to form a binding contract where you
              live. If you use the Service on behalf of an organisation, you confirm you are
              authorised to accept these terms for it.
            </p>

            <h2 id="account">2. Your account</h2>
            <ul>
              <li>Give accurate information when you register and keep it current.</li>
              <li>You are responsible for keeping your password and vault PIN confidential.</li>
              <li>Tell us promptly at <a href={`mailto:${site.email}`}>{site.email}</a> if you believe your account has been accessed without your permission.</li>
              <li>One person, one account. Do not share your login.</li>
            </ul>

            <h2 id="not-advice">3. Guidance, not advice</h2>
            <p>
              This is the most important clause in these terms, so please read it carefully.
            </p>
            <ul>
              <li>
                <strong>{site.name} is not a financial adviser.</strong> Analytics, health scores,
                projections and AI coaching are informational. They are not investment, tax, legal
                or accounting advice, and they do not take account of your full circumstances.
              </li>
              <li>
                <strong>{site.name} does not issue religious rulings.</strong> The Zakat
                calculations, the Islamic finance guide, and any Qur’an or Hadith references in the
                app are provided for general education. Schools of jurisprudence differ. For a
                ruling on your own situation, consult a qualified scholar.
              </li>
              <li>
                <strong>Figures depend on your inputs.</strong> Zakat and net-worth results are only
                as accurate as the assets, liabilities and metal rates recorded. You are responsible
                for verifying them before you act.
              </li>
              <li>
                <strong>AI output can be wrong.</strong> The AI coach may produce incorrect or
                incomplete answers. Check anything important before relying on it.
              </li>
            </ul>

            <h2 id="capture">4. Automatic transaction capture</h2>
            <p>
              Where you enable it, the Service reads SMS messages and notifications on your device to
              draft transactions. {site.name} never connects to your bank, never asks for banking
              credentials, and never initiates payments. Drafts are suggestions: you are responsible
              for reviewing each one before approving it, and for correcting anything the parser
              gets wrong.
            </p>

            <h2 id="subscriptions">5. Subscriptions and payment</h2>
            <ul>
              <li>The Service has a free tier and a paid Premium tier. Current features and prices are on the <Link href="/pricing">pricing page</Link>.</li>
              <li>Premium is billed through the app store you subscribed with, and renews automatically until cancelled.</li>
              <li>Cancel any time from Profile → Subscription, or in your app store account. Premium features remain available until the end of the period you have already paid for.</li>
              <li>Refunds are handled under the policy of the app store that processed the payment.</li>
              <li>We may change prices with at least 30 days’ notice. Changes never apply to a period you have already paid for.</li>
            </ul>

            <h2 id="your-content">6. Your content</h2>
            <p>
              Everything you enter — transactions, assets, goals, notes, receipts — remains yours. You
              grant us only the licence needed to store, process and display it back to you as part
              of running the Service. We do not sell it and we do not use it for advertising.
            </p>

            <h2 id="acceptable">7. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for anything unlawful, including money laundering or fraud.</li>
              <li>Reverse engineer, decompile or attempt to extract the source code of the app.</li>
              <li>Probe, scan or interfere with the security of the Service or its infrastructure.</li>
              <li>Use automated means to scrape or overload the Service.</li>
              <li>Upload malware, or content that infringes someone else’s rights.</li>
              <li>Resell or redistribute access to the Service.</li>
            </ul>

            <h2 id="ip">8. Our intellectual property</h2>
            <p>
              The {site.name} name, logo, app, website, design and content are ours or our
              licensors’. These terms grant you a personal, non-exclusive, non-transferable,
              revocable licence to use the Service — nothing more.
            </p>

            <h2 id="availability">9. Availability</h2>
            <p>
              We work to keep the Service running but do not guarantee uninterrupted access. Features
              may be added, changed or withdrawn. We will give reasonable notice before removing
              something you rely on.
            </p>

            <h2 id="termination">10. Suspension and termination</h2>
            <p>
              You may stop using the Service and delete your account at any time — see{' '}
              <Link href="/data-deletion">Data Deletion</Link>. We may suspend or terminate an
              account that breaches these terms, or where required by law, and will tell you why
              unless we are prohibited from doing so.
            </p>

            <h2 id="liability">11. Disclaimers and liability</h2>
            <p>
              The Service is provided “as is”, without warranties of any kind to the fullest extent
              the law allows. We are not liable for any financial loss, missed obligation, tax
              consequence or other indirect or consequential damage arising from your use of the
              Service. Where liability cannot be excluded, it is limited to the amount you paid us in
              the twelve months before the claim. Nothing here limits liability for fraud, death or
              personal injury caused by negligence, or anything else that cannot lawfully be limited.
            </p>

            <h2 id="changes">12. Changes to these terms</h2>
            <p>
              We may update these terms. Material changes will be announced in the app at least 30
              days before they take effect. Continuing to use the Service after that means you accept
              the updated terms.
            </p>

            <h2 id="law">13. Governing law</h2>
            <p>
              These terms are governed by the laws of the jurisdiction in which {site.name} is
              established, and disputes will be resolved in its courts, without prejudice to any
              mandatory consumer rights you have where you live.
            </p>

            <h2 id="contact">14. Contact</h2>
            <p>
              Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <LegalNote>
              These terms are drafted around how the product actually works, but they are not a
              substitute for legal advice. Before publishing, insert your registered company name and
              jurisdiction in sections 8 and 13, and have a lawyer review the liability clauses for
              the markets you operate in.
            </LegalNote>
          </Prose>
        </div>
      </section>
    </>
  );
}
