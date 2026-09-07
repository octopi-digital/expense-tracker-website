import type { ComponentProps, ReactNode } from 'react';

/**
 * Anchor-only by design — every call to action on this page navigates. Nothing
 * here submits.
 *
 * Colours come entirely from the tokens the enclosing `Section` sets, so the
 * same `variant="primary"` is emerald on the light ground and bright green on
 * the dark band, each with a readable label.
 *
 * No `display` utility in the base classes on purpose. Baking `inline-flex` in
 * makes the button impossible to hide from outside: a caller passing `hidden`
 * is writing a competing `display` rule, and which one wins depends on their
 * order in the generated stylesheet, not on the class attribute. `hidden
 * sm:inline-flex` on the header CTA silently lost that race and left a
 * full-size button overflowing the bar at 390px.
 */
type Variant = 'primary' | 'secondary' | 'ghost';

const BASE = 'lift items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-[var(--accent)] text-[var(--accent-on)] hover:bg-[var(--accent-hover)]',
  secondary:
    'border border-[var(--border-strong)] text-[var(--ink)] ' +
    // color-mix against the live --ink means the hover wash is dark on light
    // bands and light on dark ones without a second rule.
    'hover:bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]',
  ghost: 'text-[var(--ink)] underline decoration-[var(--border-strong)] underline-offset-4 hover:decoration-[var(--ink)]',
};

const SIZES = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-[15px]',
} as const;

interface ButtonProps extends ComponentProps<'a'> {
  variant?: Variant;
  size?: keyof typeof SIZES;
  /** Set to `false` when the caller owns the display utility (e.g. `hidden sm:inline-flex`). */
  display?: 'inline-flex' | false;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  display = 'inline-flex',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      className={`${display ? 'inline-flex' : ''} ${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
