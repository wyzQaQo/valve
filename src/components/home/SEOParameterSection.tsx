'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Gear, Wrench, Cube } from '@phosphor-icons/react';
import { ACTUATIONS, MATERIALS, CONNECTIONS, PRESSURES, BASE_TYPES } from '@/data/valves';

const EXAMPLE_SKUS = [
  'Pneumatic Flanged 316L Ball Valve PN16',
  'Electric WCB Gate Valve Class 150 Flanged',
  'Manual PTFE Butterfly Valve PN10 Wafer',
  'Pneumatic 304SS Globe Valve PN25 Flanged',
  'Electric CF8M Ball Valve Class 300 Flanged',
  'Manual Duplex Check Valve Class 600 Socket Weld',
];

export function SEOParameterSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24">
      <div className="container-grid">
        {/* Header */}
        <motion.div
          className="max-w-[680px] mb-14"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4 leading-[1.1]">
            Find Your Valve by{' '}
            <span className="text-gradient-accent">Exact Specification</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
            Our parametric catalog generates precise product pages for every combination of actuation, material, connection, and pressure class. Search the way engineers search.
          </p>
        </motion.div>

        {/* Parameter Filter UI - visual demo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Gear,
              label: 'Actuation Type',
              color: '#0ea5e9',
              items: ACTUATIONS.map(a => ({ label: a.name, sub: a.label, href: `/products/ball-valve/${a.slug}` })),
            },
            {
              icon: Cube,
              label: 'Body Material',
              color: '#a855f7',
              items: MATERIALS.map(m => ({ label: m.short, sub: m.name, href: `/products/ball-valve/${m.slug}` })),
            },
            {
              icon: Wrench,
              label: 'Pressure Rating',
              color: '#f59e0b',
              items: PRESSURES.slice(0, 4).map(p => ({ label: p.name, sub: `${p.bar} bar`, href: `/products/ball-valve/${p.slug}` })),
            },
          ].map((group, gi) => (
            <motion.div
              key={group.label}
              className="flex flex-col gap-3 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
            >
              <div className="flex items-center gap-2.5 mb-1">
                <group.icon size={18} style={{ color: group.color }} />
                <span className="text-sm font-semibold text-[var(--text-primary)]">{group.label}</span>
              </div>
              {group.items.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-overlay)] transition-all group"
                >
                  <div>
                    <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {item.label}
                    </span>
                    <span className="block text-xs text-[var(--text-muted)]">{item.sub}</span>
                  </div>
                  <ArrowRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </motion.div>
          ))}
        </div>

        {/* SKU example carousel */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-4 font-medium">
            Popular Search Combinations
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_SKUS.map((sku) => (
              <Link
                key={sku}
                href={`/products?q=${encodeURIComponent(sku)}`}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--border-strong)] hover:bg-[rgba(14,165,233,0.06)] transition-all"
              >
                {sku}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
