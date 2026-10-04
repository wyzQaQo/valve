'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from '@phosphor-icons/react';
import { INDUSTRIES } from '@/data/valves';

export function IndustriesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 bg-[var(--bg-surface)]">
      <div className="container-grid">
        {/* Header - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.1]">
              Built for the World&apos;s{' '}
              <span className="text-gradient-accent">Toughest Industries</span>
            </h2>
          </motion.div>
          <motion.p
            className="text-[var(--text-secondary)] text-lg leading-relaxed"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Each industry demands specific standards, pressure ratings, and materials. We speak the language of your engineering specification.
          </motion.p>
        </div>

        {/* Industry cards - 2+2+2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INDUSTRIES.map((industry, i) => (
            <motion.div
              key={industry.slug}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative flex flex-col h-[280px] rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-300"
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={industry.img}
                    alt={industry.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${industry.color}ee 0%, ${industry.color}88 40%, transparent 100%)`,
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-end h-full p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white leading-tight">{industry.name}</h3>
                    <ArrowUpRight
                      size={20}
                      className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0 mt-0.5"
                    />
                  </div>
                  <p className="text-white/70 text-sm leading-snug mb-3 line-clamp-2">{industry.tagline}</p>
                  {/* Spec tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {industry.specs.slice(0, 2).map(spec => (
                      <span
                        key={spec}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white/20 text-white backdrop-blur-sm"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
