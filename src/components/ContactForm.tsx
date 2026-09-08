'use client';

import { useState } from 'react';
import { site } from '@/lib/site';

const topics = ['General question', 'Billing or Premium', 'Zakat calculation', 'Bug report', 'Account deletion', 'Partnership'];

/**
 * There is no backend behind this site, so rather than a form that silently
 * drops messages, this composes the email and hands it to the visitor's own
 * mail client. Swap the submit handler for a POST the day an API exists.
 */
export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[${topic}] ${name || 'Deenomics enquiry'}`;
    const body = `${message}\n\n—\n${name}\n${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const field =
    'glass-field mt-2 w-full rounded-xl px-4 py-3 text-[0.98rem] text-ink outline-none placeholder:text-slate-body/50';
  const label = 'block text-[0.88rem] font-bold text-ink';

  return (
    <form onSubmit={onSubmit} className="glass glass-strong rounded-3xl p-7 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={label}>
          Your name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jewel Rana"
            className={field}
          />
        </label>
        <label className={label}>
          Email address
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={field}
          />
        </label>
      </div>

      <label className={`${label} mt-5`}>
        What is it about?
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={field}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>

      <label className={`${label} mt-5`}>
        Message
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us what you need help with…"
          className={`${field} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="btn-gloss mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-brand px-8 py-4 text-base font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-2px_0_rgba(0,0,0,0.12),0_10px_30px_-10px_rgba(16,108,49,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-link sm:w-auto"
      >
        Send message
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M3 20.5 21 12 3 3.5 3 10l12 2-12 2v6.5Z" />
        </svg>
      </button>

      <p className="mt-4 text-[0.82rem] text-slate-body">
        This opens your email app with the message ready to send to {site.email}.
      </p>
    </form>
  );
}
