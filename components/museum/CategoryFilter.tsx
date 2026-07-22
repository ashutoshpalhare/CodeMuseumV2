'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type FilterCategory = 'All Exhibits' | string;

type CategoryFilterProps = {
  categories: string[];
  active: string;
  counts: Record<string, number>;
  onSelect: (category: string) => void;
};

/**
 * Museum-style category filter.
 * - Desktop: centered wrap of pill tabs.
 * - Mobile: horizontally scrollable with hidden scrollbar + large touch targets.
 */
export default function CategoryFilter({
  categories,
  active,
  counts,
  onSelect,
}: CategoryFilterProps) {
  return (
    <nav
      aria-label="Exhibit categories"
      className="scrollbar-hidden -mx-6 mb-10 overflow-x-auto px-6 sm:mx-0 sm:overflow-visible sm:px-0"
    >
      <div className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center">
        {categories.map((category) => {
          const isActive = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelect(category)}
              aria-pressed={isActive}
              className={cn(
                'relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-museum-gold focus-visible:ring-offset-2 focus-visible:ring-offset-museum-bg',
                isActive
                  ? 'border-museum-gold/60 text-museum-gold-soft'
                  : 'border-border text-muted-foreground hover:border-museum-gold/40 hover:text-museum-ivory',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="category-pill"
                  className="absolute inset-0 rounded-full border border-museum-gold/40 bg-museum-gold/10"
                  style={{
                    boxShadow:
                      '0 0 20px -6px rgba(201,162,39,0.5), inset 0 0 12px -4px rgba(201,162,39,0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {category}
                <span
                  className={cn(
                    'font-museum-mono text-[10px] tabular-nums',
                    isActive ? 'text-museum-gold/70' : 'text-muted-foreground/50',
                  )}
                >
                  {counts[category] ?? 0}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
