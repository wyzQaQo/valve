'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { List, X, CaretDown, Factory, Wrench, Globe, FileText, Buildings } from '@phosphor-icons/react';
import { BASE_TYPES, INDUSTRIES } from '@/data/valves';

const NAV_ITEMS = [
  {
    label: 'Products',
    href: '/products',
    mega: true,
    items: BASE_TYPES.slice(0, 8).map(b => ({
      label: b.name,
      href: `/products/${b.slug}`,
      desc: b.desc.slice(0, 50) + '...',
    })),
  },
  {
    label: 'Industries',
    href: '/industries',
    mega: true,
    items: INDUSTRIES.map(i => ({
      label: i.name,
      href: `/industries/${i.slug}`,
      desc: i.tagline.slice(0, 48) + '...',
    })),
  },
  { label: 'Solutions', href: '/solutions', mega: false },
  { label: 'About', href: '/about', mega: false },
  { label: 'Resources', href: '/resources', mega: false },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${
          scrolled
            ? 'bg-[#040d1a]/95 backdrop-blur-xl border-b border-[rgba(14,165,233,0.12)]'
            : 'bg-transparent'
        }`}
        style={{ height: '72px' }}
      >
        <div className="container-grid h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex-shrink-0">
              <div className="absolute inset-0 rounded-lg bg-[var(--accent)] opacity-20 group-hover:opacity-40 transition-opacity" />
              <Factory
                size={20}
                weight="bold"
                className="absolute inset-0 m-auto text-[var(--accent)]"
              />
            </div>
            <span className="text-[var(--text-primary)] font-semibold text-lg tracking-tight">
              Valve<span className="text-[var(--accent)]">Master</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega ? handleMouseEnter(item.label) : undefined}
                onMouseLeave={() => item.mega ? handleMouseLeave() : undefined}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeMenu === item.label
                      ? 'text-[var(--accent)] bg-[rgba(14,165,233,0.08)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {item.mega && (
                    <CaretDown
                      size={14}
                      className={`transition-transform duration-200 ${activeMenu === item.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {item.mega && activeMenu === item.label && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[480px] bg-[#07142b]/98 backdrop-blur-xl border border-[rgba(14,165,233,0.15)] rounded-xl shadow-2xl p-4"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="grid grid-cols-2 gap-1.5">
                        {item.items?.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="group flex flex-col gap-0.5 p-3 rounded-lg hover:bg-[rgba(14,165,233,0.08)] transition-colors duration-150"
                          >
                            <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                              {sub.label}
                            </span>
                            <span className="text-xs text-[var(--text-muted)] line-clamp-1">{sub.desc}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-[rgba(14,165,233,0.1)] flex justify-end">
                        <Link
                          href={item.href}
                          className="text-xs text-[var(--accent)] hover:underline"
                        >
                          View all {item.label} →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/rfq"
              className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white text-sm font-semibold rounded-lg hover:bg-[#0284c7] active:scale-[0.98] transition-all duration-150"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[49] bg-[#040d1a]/98 backdrop-blur-xl pt-[72px] lg:hidden overflow-y-auto"
          >
            <div className="container-grid py-6 flex flex-col gap-2">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3.5 rounded-xl text-[var(--text-primary)] font-medium border border-[var(--border)] hover:border-[var(--border-strong)] hover:bg-white/5 transition-all"
                >
                  {item.label}
                  <CaretDown size={16} className="-rotate-90 text-[var(--text-muted)]" />
                </Link>
              ))}
              <Link
                href="/rfq"
                onClick={() => setMobileOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 px-4 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
