'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import ProjectExhibitCard from './ProjectExhibitCard';
import type { ProjectExhibitCardProps } from './types';

const ALL = 'All Exhibits';

type ExhibitGalleryProps = {
  exhibits: ProjectExhibitCardProps[];
};

export default function ExhibitGallery({ exhibits }: ExhibitGalleryProps) {
  const [active, setActive] = useState(ALL);

  // Build the unique category list from the exhibit data, always
  // leading with "All Exhibits".
  const { categories, counts } = useMemo(() => {
    const set = new Set<string>();
    for (const ex of exhibits) {
      for (const c of ex.categories) set.add(c);
    }
    const ordered = [ALL, ...Array.from(set).sort()];
    const c: Record<string, number> = {};
    c[ALL] = exhibits.length;
    Array.from(set).forEach((cat) => {
      c[cat] = exhibits.filter((ex) => ex.categories.includes(cat as never)).length;
    });
    return { categories: ordered, counts: c };
  }, [exhibits]);

  const filtered = useMemo(() => {
    if (active === ALL) return exhibits;
    return exhibits.filter((ex) => ex.categories.includes(active as never));
  }, [active, exhibits]);

  return (
    <div>
      <CategoryFilter
        categories={categories}
        active={active}
        counts={counts}
        onSelect={setActive}
      />

      <motion.div
        layout
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((exhibit) => (
            <motion.div
              key={exhibit.artifactId}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <ProjectExhibitCard {...exhibit} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-museum-mono text-sm uppercase tracking-[0.2em] text-muted-foreground/60">
          No artifacts in this wing
        </p>
      )}
    </div>
  );
}
