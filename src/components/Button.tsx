import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'gold' | 'ghost' | 'outline' | 'glass';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-bright';

const variants: Record<Variant, string> = {
  primary:
    'btn-gloss bg-emerald-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-2px_0_rgba(0,0,0,0.12),0_10px_30px_-10px_rgba(16,108,49,0.7)] hover:bg-green-link hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-2px_0_rgba(0,0,0,0.12),0_16px_40px_-12px_rgba(25,204,80,0.65)] hover:-translate-y-0.5',
  gold:
    'btn-gloss bg-gradient-to-r from-gold-light to-gold text-emerald-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-2px_0_rgba(120,84,10,0.18),0_10px_30px_-10px_rgba(215,162,37,0.8)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-2px_0_rgba(120,84,10,0.18),0_16px_40px_-12px_rgba(215,162,37,0.7)]',
  ghost: 'text-white/85 hover:text-white hover:bg-white/10',
  /* `outline` is the secondary action on dark sections — now a pill of
     glass rather than a hairline box, so it reads as the same material as
     the panes around it. */
  outline: 'glass-btn text-white hover:-translate-y-0.5',
  /* The same pill over light sections. */
  glass: 'glass-btn glass-btn-light text-ink hover:-translate-y-0.5 hover:text-green-bright',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-base',
} as const;

export function Button({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'href' | 'className'>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
