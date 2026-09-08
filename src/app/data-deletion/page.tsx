import type { Metadata } from 'next';
import Link from 'next/link';
import { LegalNote, Prose } from '@/components/Legal';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Delete your data',
  description:
    'How to delete your Deenomics account and everything in it — from inside the app in under a minute, or by email if you no longer have access.',
};

const UPDATED = '7 September 2026';

const inAppSteps = [
  { n: '1', t: 'Open Profile', d: 'Tap the Profile tab at the bottom right of the app.' },
  { n: '2', t: 'Go to Privacy & Security', d: 'Under your account settings.' },
  { n: '3', t: 'Choose Delete Account', d: 'Or Reset Account Data if you want to keep the account but clear everything in it.' },
  { n: '4', t: 'Confirm', d: 'Enter your password or PIN. The deletion begins immediately and cannot be undone.' },
];

export default function DataDeletionPage() {
  return (
    <>
      <PageHero
        eyebrow="Your data, your call"
        title={
          <>
            Delete your{' '}
            <span className="text-gradient-gold">account and data</span>
          </>
        }
        lede={`Two ways to do it, both permanent, neither of them buried. Last updated ${UPDATED}.`}
      />

      {/* --------------------------------------------------- In-app */}
      <section className="overflow-hidden pane py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-[1.8rem] font-extrabold tracking-tight text-ink">Option 1 — from inside the app</h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-slate-body">
              The fastest route. Takes under a minute and needs no reply from us.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {inAppSteps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="glass flex h-full gap-4 rounded-2xl p-6">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-brand text-[0.95rem] font-extrabold text-white">
                    {s.n}
                  </span>
                  <div>
                    <p className="text-[1.05rem] font-bold text-ink">{s.t}</p>
                    <p className="mt-1.5 text-[0.93rem] leading-relaxed text-slate-body">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="glass glass-strong mt-10 rounded-2xl p-7">
              <h3 className="text-[1.15rem] font-bold text-ink">Option 2 — by email</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-slate-body">
                If you have lost access to the app, email{' '}
                <a href={`mailto:${site.email}?subject=Account%20deletion%20request`} className="font-semibold text-green-bright underline decoration-green-bright/40 underline-offset-4 hover:decoration-green-bright">
                  {site.email}
                </a>{' '}
                from the address on your account with the subject{' '}
                <strong className="text-ink">“Account deletion request”</strong>. We verify ownership,
                delete the account, and confirm by reply — normally within 3 business days, and always
                within 30.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- What goes */}
      <section className="overflow-hidden pane-tint py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Prose>
            <h2 id="what-is-deleted">What gets deleted</h2>
            <p>Deleting your account permanently removes:</p>
            <ul>
              <li>Your profile — name, email, phone number, photo and preferences</li>
              <li>Every transaction, income record and category you created</li>
              <li>All assets, liabilities and net-worth history</li>
              <li>Goals and their contribution history</li>
              <li>Zakat calculations, Sadaqah records and vault contents</li>
              <li>AI conversations, voice call history and saved chats</li>
              <li>Uploaded receipts, documents and images</li>
              <li>Support tickets and their attachments</li>
              <li>Notification tokens and reminder settings</li>
            </ul>

            <h2 id="what-remains">What we keep, and for how long</h2>
            <table>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Retention</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Production records</td>
                  <td>Erased within 30 days</td>
                  <td>Deletion is queued and processed</td>
                </tr>
                <tr>
                  <td>Encrypted backups</td>
                  <td>Overwritten within 90 days</td>
                  <td>Backups roll on a fixed cycle</td>
                </tr>
                <tr>
                  <td>Payment and invoice records</td>
                  <td>As required by tax law</td>
                  <td>Legal and accounting obligation</td>
                </tr>
                <tr>
                  <td>Anonymous, aggregated usage counts</td>
                  <td>Indefinitely</td>
                  <td>Cannot be linked back to you</td>
                </tr>
              </tbody>
            </table>

            <h2 id="alternatives">If you do not want to delete everything</h2>
            <ul>
              <li>
                <strong>Reset Account Data</strong> — Profile → Privacy &amp; Security → Reset Account
                Data clears your records but keeps your account and login.
              </li>
              <li>
                <strong>Revoke a permission</strong> — turn off SMS or notification access in your
                device settings and automatic capture stops. Nothing you have already saved is lost.
              </li>
              <li>
                <strong>Export first</strong> — take a PDF or CSV copy of your records from the app
                before you delete. Once deletion runs, we cannot recover them.
              </li>
              <li>
                <strong>Cancel Premium only</strong> — Profile → Subscription. Your data and free-tier
                access stay exactly as they are.
              </li>
            </ul>

            <h2 id="subscription">Deleting while subscribed</h2>
            <p>
              Deleting your {site.name} account does <strong>not</strong> cancel a subscription billed
              by an app store. Cancel it in your Google Play or App Store account as well, or you may
              continue to be charged.
            </p>

            <h2 id="questions">Questions</h2>
            <p>
              Anything unclear, write to <a href={`mailto:${site.email}`}>{site.email}</a>. See also our{' '}
              <Link href="/privacy">Privacy Policy</Link> and{' '}
              <Link href="/terms">Terms of Service</Link>.
            </p>

            <LegalNote>
              Deletion is permanent and cannot be reversed. Export anything you want to keep before
              you start.
            </LegalNote>
          </Prose>
        </div>
      </section>
    </>
  );
}
