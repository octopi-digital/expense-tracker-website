import type { ReactNode } from 'react';

/**
 * Shared typography for the legal documents. Written as arbitrary-variant
 * selectors rather than a plugin so the three pages can stay plain JSX.
 */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        text-[1.02rem] leading-relaxed text-slate-body
        [&_a]:font-semibold [&_a]:text-green-bright [&_a]:underline [&_a]:decoration-green-bright/40 [&_a]:underline-offset-4 hover:[&_a]:decoration-green-bright
        [&_h2]:mt-14 [&_h2]:scroll-mt-24 [&_h2]:text-[1.6rem] [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-ink
        [&_h3]:mt-9 [&_h3]:text-[1.15rem] [&_h3]:font-bold [&_h3]:text-ink
        [&_li]:mt-2.5 [&_li]:pl-1.5
        [&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:pl-6
        [&_p]:mt-5
        [&_strong]:font-bold [&_strong]:text-ink
        [&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.95rem]
        [&_td]:border-b [&_td]:border-white/10 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top
        [&_th]:border-b [&_th]:border-white/10 [&_th]:py-3 [&_th]:pr-4 [&_th]:text-left [&_th]:font-bold [&_th]:text-ink
        [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-6
      "
    >
      {children}
    </div>
  );
}

export function LegalNote({ children }: { children: ReactNode }) {
  return (
    <div className="glass mt-8 rounded-2xl border-l-4 border-l-gold bg-[rgba(215,162,37,0.14)] px-6 py-5">
      <p className="text-[0.95rem] leading-relaxed text-ink/80">{children}</p>
    </div>
  );
}
