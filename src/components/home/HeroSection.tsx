'use client';

import { useReducedMotion } from 'motion/react';
import { motion } from 'motion/react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ChartBar, Certificate } from '@phosphor-icons/react';

const Particles = dynamic(() => import('@/components/react-bits/Particles'), { ssr: false });

export function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(14,165,233,0.12) 0%, transparent 60%)' }}
    >
      {/* Particle background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Particles
          particleCount={180}
          particleSpread={12}
          speed={0.06}
          particleColors={['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#f0f6ff']}
          alphaParticles
          particleBaseSize={70}
          sizeRandomness={1.2}
          disableRotation={false}
        />
      </div>

      {/* Grid lines bg */}
      <div className="absolute inset-0 grid-lines opacity-30" aria-hidden="true" />

      {/* Content */}
      <div className="container-grid relative z-10 pt-[72px]">
        <div className="max-w-[720px]">
          {/* Badge */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="badge-industrial mb-6 inline-flex">
              <Certificate size={13} weight="fill" />
              ISO 9001 - API 6D - CE Certified
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] mb-6 text-[var(--text-primary)]"
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Industrial{' '}
            <span className="text-gradient-accent">Flow Control</span>
            <br />
            Engineering Platform
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[540px]"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            12,000+ valve SKUs across 11 product families. Pneumatic, electric, manual actuation. PN10 to Class 2500. Flanged, threaded, weld-end.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/rfq"
              className="flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[#0284c7] active:scale-[0.98] transition-all duration-150 shadow-lg shadow-[var(--accent-glow)]"
            >
              Request Quote <ArrowRight size={18} weight="bold" />
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-3.5 bg-white/5 text-[var(--text-primary)] font-semibold rounded-xl border border-[var(--border-strong)] hover:bg-white/10 active:scale-[0.98] transition-all duration-150"
            >
              Browse Products
            </Link>
          </motion.div>

          {/* Trust row */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {[
              { icon: ChartBar, text: '47 Countries Exported' },
              { icon: Certificate, text: '18 Years Experience' },
              { icon: ChartBar, text: '99.3% On-Time Delivery' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Icon size={15} className="text-[var(--accent)]" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }}
        aria-hidden="true"
      />
    </section>
  );
}
