'use client';

import { motion, useReducedMotion } from 'motion/react';
import dynamic from 'next/dynamic';
import { STATS, CERTIFICATIONS } from '@/data/valves';
import { CheckCircle } from '@phosphor-icons/react';

const CountUp = dynamic(() => import('@/components/react-bits/CountUp'), { ssr: false });

export function StatsSection() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(14,165,233,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-grid relative z-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative flex flex-col p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

              <div className="text-4xl lg:text-5xl font-bold text-gradient-accent font-mono mb-2 tabular-nums">
                {reduce ? (
                  <span>{stat.value}{stat.suffix}</span>
                ) : (
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    separator={stat.separator}
                    duration={2}
                    delay={0.3 + i * 0.1}
                  />
                )}
              </div>
              <p className="text-[var(--text-secondary)] text-sm font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us - split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-6 leading-[1.1]">
              Engineering Trust,{' '}
              <span className="text-gradient-accent">Delivered Globally</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
              From a single precision needle valve to a complete pipeline isolation package - every product ships with full documentation, material certification, and third-party inspection reports.
            </p>
            <div className="flex flex-col gap-3">
              {[
                'Full material traceability certificates (MTC/Mill certs)',
                'Third-party inspection available: SGS, Bureau Veritas, TUV',
                'Hydrostatic shell & seat test per API/ASME standards',
                'Custom engineering for non-standard specifications',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle size={18} weight="fill" className="text-[var(--accent)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications grid */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={reduce ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                className="flex flex-col p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-raised)] hover:border-[var(--border-strong)] transition-colors"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <span className="text-[var(--accent)] font-bold font-mono text-sm mb-1">{cert.name}</span>
                <span className="text-[var(--text-secondary)] text-xs leading-relaxed">{cert.desc}</span>
                <span className="text-[var(--text-muted)] text-xs mt-2 font-mono">Since {cert.year}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
