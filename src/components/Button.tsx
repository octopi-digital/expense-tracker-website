import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'gold' | 'ghost' | 'outline';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-bright';

const variants: Record<Variant, string> = {
  primary:
    'bg-emerald-brand text-white shadow-[0_10px_30px_-10px_rgba(16,108,49,0.7)] hover:bg-green-link hover:shadow-[0_16px_40px_-12px_rgba(25,204,80,0.65)] hover:-translate-y-0.5',
  gold:
    'bg-gradient-to-r from-gold-light to-gold text-emerald-ink shadow-[0_10px_30px_-10px_rgba(215,162,37,0.8)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(215,162,37,0.7)]',
  ghost: 'text-white/85 hover:text-white hover:bg-white/10',
  outline:
    'border border-white/25 text-white backdrop-blur hover:border-gold/60 hover:bg-white/5 hover:-translate-y-0.5',
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
