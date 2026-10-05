export const dynamicParams = false;
export const dynamicParams = false;
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { BASE_TYPES, ACTUATIONS, MATERIALS, PRESSURES } from '@/data/valves';

export const metadata: Metadata = {
  title: 'Industrial Valve Products | Ball Valves, Gate Valves, Butterfly Valves',
  description:
    'Complete industrial valve catalog. Ball valves, gate valves, butterfly valves, globe valves. Pneumatic, electric, manual actuation. PN10-Class 2500. API, ISO, CE certified.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      {/* Header */}
      <div
        className="py-16 border-b border-[var(--border)]"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)',
        }}
      >
        <div className="container-grid">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Industrial Valve{' '}
            <span className="text-gradient-accent">Products</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-xl max-w-[600px]">
            12,000+ SKU catalog. Every valve type, material, actuation, and pressure class in one platform.
          </p>
        </div>
      </div>

      <div className="container-grid py-16">
        {/* Filter bar */}
        <div className="flex flex-wrap gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Actuation</span>
            <div className="flex flex-wrap gap-2">
              {ACTUATIONS.map(a => (
                <Link
                  key={a.slug}
                  href={`/products?actuation=${a.slug}`}
                  className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--border-strong)] transition-all"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">Material</span>
            <div className="flex flex-wrap gap-2">
              {MATERIALS.slice(0, 4).map(m => (
                <Link
                  key={m.slug}
                  href={`/products?material=${m.slug}`}
                  className="px-3 py-1.5 text-sm rounded-lg border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--border-strong)] transition-all"
                >
                  {m.short}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {BASE_TYPES.map((valve) => (
            <Link
              key={valve.slug}
              href={`/products/${valve.slug}`}
              className="group flex flex-col gap-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-raised)] transition-all"
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[var(--bg-raised)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${valve.slug}-valve/400/300`}
                  alt={valve.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                    {valve.name}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">{valve.desc}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--text-muted)] group-hover:text-[var(--accent)] flex-shrink-0 ml-2 mt-0.5 transition-colors"
                />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--accent)]">{valve.count}+ SKUs</span>
                <span className="text-xs text-[var(--text-muted)]">{valve.cn}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
