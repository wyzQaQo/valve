export const dynamicParams = false;
import type { Metadata } from 'next';
import Link from 'next/link';
import { INDUSTRIES, BASE_TYPES } from '@/data/valves';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import {
  Factory,
  Wrench,
  ShieldCheck,
  Globe,
  ArrowRight,
  CheckCircle,
  Gauge,
  ForkKnife,
  Waves,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Valve Solutions by Industry | ValveMaster',
  description:
    'Tailored industrial valve solutions for Oil & Gas, Chemical, Water Treatment, Power Generation, Pharmaceutical, and Marine industries. API, ATEX, FDA certified.',
};

// Industry-specific valve recommendations
const INDUSTRY_VALVES: Record<
  string,
  { slugs: string[]; challenge: string; benefit: string }
> = {
  'oil-gas': {
    slugs: ['ball-valve', 'gate-valve', 'globe-valve', 'check-valve', 'control-valve'],
    challenge: 'Extreme pressures, corrosive media (H2S), and strict API compliance.',
    benefit: 'API 6D certified valves with NACE MR0175 compliance for sour service.',
  },
  chemical: {
    slugs: ['ball-valve', 'butterfly-valve', 'diaphragm-valve', 'plug-valve', 'safety-valve'],
    challenge: 'Aggressive chemicals, temperature cycling, and ATEX zone requirements.',
    benefit: 'PTFE/PFA lined valves with ATEX certification for hazardous environments.',
  },
  'water-treatment': {
    slugs: ['gate-valve', 'butterfly-valve', 'check-valve', 'knife-gate-valve', 'control-valve'],
    challenge: 'Large-diameter pipelines, low maintenance, and drinking water safety.',
    benefit: 'WRAS/NSF 61 approved valves with extended service life for municipal systems.',
  },
  'power-generation': {
    slugs: ['globe-valve', 'gate-valve', 'check-valve', 'control-valve', 'safety-valve'],
    challenge: 'Ultra-high temperatures, steam pressure cycling, and HRSG compatibility.',
    benefit: 'ASME Class 900-2500 HP/HT valves for supercritical and combined cycle plants.',
  },
  pharmaceutical: {
    slugs: ['diaphragm-valve', 'ball-valve', 'butterfly-valve', 'check-valve', 'sampling-valve'],
    challenge: 'Zero contamination, CIP/SIP compatibility, and strict FDA/GMP compliance.',
    benefit: '3-A sanitary & EHEDG certified hygienic valves with full traceability.',
  },
  marine: {
    slugs: ['butterfly-valve', 'ball-valve', 'gate-valve', 'check-valve', 'globe-valve'],
    challenge: 'Saltwater corrosion, vibration, and classification society certification.',
    benefit: 'DNV-GL & BV type-approved valves in duplex/super duplex for offshore service.',
  },
};

const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
  'oil-gas': <Factory size={28} />,
  chemical: <ForkKnife size={28} />,
  'water-treatment': <Waves size={28} />,
  'power-generation': <Gauge size={28} />,
  pharmaceutical: <ShieldCheck size={28} />,
  marine: <Globe size={28} />,
};

export default function SolutionsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 text-center bg-[var(--bg-deep)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="grid-lines" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-5 blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-6">
          <span className="badge-industrial mb-6">Industry Solutions</span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Engineered for
            <span className="text-[var(--accent)]"> Your Industry</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            From upstream oil platforms to pharmaceutical cleanrooms — we deliver
            certified valve solutions tailored to your operational environment.
          </p>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="relative py-20 px-6 bg-[var(--bg-dark)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES.map((industry, index) => {
              const data = INDUSTRY_VALVES[industry.slug];
              const valves = data.slugs
                .map((s) => BASE_TYPES.find((v) => v.slug === s))
                .filter(Boolean);

              return (
                <AnimatedContent
                  key={industry.slug}
                  delay={index * 0.08}
                >
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group block bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden hover:border-[var(--accent)]/40 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={industry.img}
                        alt={industry.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, var(--bg-card) 0%, transparent 60%)`,
                        }}
                      />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                          style={{ background: `${industry.color}33` }}
                        >
                          {INDUSTRY_ICONS[industry.slug]}
                        </div>
                        <span className="text-sm font-medium text-white/80">
                          {industry.specs.length} Standards
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {industry.name}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                        {industry.tagline}
                      </p>

                      {/* Challenge */}
                      <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                          Challenge
                        </span>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          {data.challenge}
                        </p>
                      </div>

                      {/* Benefit */}
                      <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                          Solution
                        </span>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          {data.benefit}
                        </p>
                      </div>

                      {/* Valve Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {valves.map((valve) =>
                          valve ? (
                            <span
                              key={valve.slug}
                              className="text-xs px-2.5 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                            >
                              {valve.cn}
                            </span>
                          ) : null,
                        )}
                      </div>

                      {/* Cert Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {industry.specs.slice(0, 3).map((spec) => (
                          <span
                            key={spec}
                            className="text-[10px] px-2 py-0.5 rounded bg-[var(--warning)]/10 text-[var(--warning)] font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent)] group-hover:gap-3 transition-all">
                        View Solution <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6 bg-[var(--bg-deep)] border-t border-[var(--border-color)]">
        <div className="grid-lines" />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See Your Industry?
          </h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
            We engineer custom valve solutions for niche industrial applications.
            Contact our engineering team with your specifications.
          </p>
          <Link
            href="/rfq"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/25"
          >
            <Wrench size={18} />
            Request Custom Solution
          </Link>
        </div>
      </section>
    </main>
  );
}
