import type { ReactNode } from 'react';

/**
 * A white panel on the grey ground.
 *
 * It carries a hairline and essentially no shadow: the tonal step from the
 * #f3f3f3 ground to white already separates it, and stacking a drop shadow on
 * top of a tonal step is what makes a page look like a component gallery
 * rather than a document.
 */
interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className = '', children }: CardProps) {
  return (
    <div
      className={`rounded-[20px] border border-[var(--border)] bg-[var(--surface-card)] shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  );
}
