'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { BASE_TYPES } from '@/data/valves';

const GRID_SPANS = [
  'md:col-span-2 md:row-span-2', // ball valve - large
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2', // butterfly - wide
  'md:col-span-1',
  'md:col-span-1',
];

const CARD_COLORS = [
  { bg: 'rgba(14,165,233,0.08)', border: 'rgba(14,165,233,0.3)', accent: '#0ea5e9' },
  { bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.3)', accent: '#818cf8' },
  { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.3)', accent: '#f59e0b' },
  { bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.3)', accent: '#22c55e' },
  { bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.3)', accent: '#ef4444' },
  { bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.3)', accent: '#a855f7' },
  { bg: 'rgba(14,165,233,0.05)', border: 'rgba(14,165,233,0.2)', accent: '#7dd3fc' },
  { bg: 'rgba(20,184,166,0.08)', border: 'rgba(20,184,166,0.3)', accent: '#2dd4bf' },
];

export function ProductCategoriesSection() {
  const reduce = useReducedMotion();
  const displayed = BASE_TYPES.slice(0, 8);

  return (
    <section className="py-24">
      <div className="container-grid">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            11 Valve Families.{' '}
            <span className="text-gradient-accent">12,000+ SKUs.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-[560px]">
            From precision instrument valves to heavy-duty pipeline isolation - every combination of actuation, material, connection, and pressure class.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {displayed.map((valve, i) => {
            const color = CARD_COLORS[i % CARD_COLORS.length];
            const span = GRID_SPANS[i] ?? '';
            const isLarge = i === 0;

            return (
              <motion.div
                key={valve.slug}
                className={`${span}`}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/products/${valve.slug}`}
                  className="group relative flex flex-col justify-between h-full min-h-[180px] p-5 rounded-xl border overflow-hidden transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    background: color.bg,
                    borderColor: color.border,
                  }}
                >
                  {/* Background image */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(https://picsum.photos/seed/${valve.slug}/600/400)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />

                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${color.accent}15 0%, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10">
                    {/* Count chip */}
                    <div className="flex items-start justify-between mb-3">
                      <span
                        className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md"
                        style={{ color: color.accent, background: `${color.accent}20` }}
                      >
                        {valve.count}+ SKUs
                      </span>
                      <ArrowUpRight
                        size={18}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: color.accent }}
                      />
                    </div>

                    <h3
                      className={`font-bold text-[var(--text-primary)] mb-1.5 ${isLarge ? 'text-2xl' : 'text-base'}`}
                    >
                      {valve.name}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                      {valve.desc}
                    </p>
                  </div>

                  {/* Chinese name - decorative */}
                  {isLarge && (
                    <div className="relative z-10 mt-4">
                      <span
                        className="text-5xl font-bold opacity-10"
                        style={{ color: color.accent }}
                      >
                        {valve.cn}
                      </span>
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA row */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/products"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 text-[var(--text-primary)] font-medium rounded-xl border border-[var(--border-strong)] hover:bg-white/10 transition-all"
          >
            View All 11 Valve Families <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
