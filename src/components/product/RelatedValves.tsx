import Link from 'next/link';
import { BaseType, SeoComboEntry, parseAttributeSlug, buildComboTitle } from '@/data/valves';
import { ArrowRight } from '@phosphor-icons/react';

interface RelatedValvesProps {
  combos: SeoComboEntry[];
  currentValve: BaseType;
}

export function RelatedValves({ combos, currentValve }: RelatedValvesProps) {
  if (combos.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
        Explore {currentValve.name} Variations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {combos.map(combo => {
          const attrs = parseAttributeSlug(combo.attribute);
          const title = buildComboTitle(currentValve.name, attrs);
          return (
            <Link
              key={combo.attribute}
              href={`/products/${combo.category}/${combo.attribute}`}
              className="group flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-raised)] transition-all"
            >
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {title}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {attrs.slice(0, 3).map(a => (
                    <span
                      key={a.slug}
                      className="inline-flex px-1.5 py-0.5 text-[10px] rounded-md bg-white/5 text-[var(--text-muted)] font-mono"
                    >
                      {a.name.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
              <ArrowRight
                size={16}
                className="flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all ml-3"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
