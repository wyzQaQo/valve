export const dynamicParams = false;
export const dynamicParams = false;
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { INDUSTRIES } from '@/data/valves';

export const metadata: Metadata = {
  title: 'Industrial Valve Applications by Industry | Oil Gas Chemical Water Power',
  description:
    'Industrial valve solutions for oil & gas, chemical, water treatment, power generation, pharmaceutical, and marine industries. API, ATEX, DNV, FDA certified valves.',
};

export default function IndustriesPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      <div
        className="py-16 border-b border-[var(--border)]"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)' }}
      >
        <div className="container-grid">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Valves for Every{' '}
            <span className="text-gradient-accent">Critical Industry</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-xl max-w-[600px]">
            Each industry has its own language. We speak it fluently - from API 6D pipeline specifications to FDA sanitary standards.
          </p>
        </div>
      </div>

      <div className="container-grid py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] hover:border-[var(--border-strong)] transition-all"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden">
                <Image
                  src={industry.img}
                  alt={industry.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${industry.color}cc 0%, transparent 60%)` }}
                />
              </div>
              {/* Content */}
              <div className="flex flex-col gap-3 p-5 bg-[var(--bg-surface)] flex-1">
                <div className="flex items-start justify-between">
                  <h2 className="font-bold text-[var(--text-primary)] text-lg group-hover:text-[var(--accent)] transition-colors">
                    {industry.name}
                  </h2>
                  <ArrowUpRight size={18} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{industry.tagline}</p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border)]">
                  {industry.specs.map(spec => (
                    <span key={spec} className="badge-industrial text-[10px] px-1.5 py-0.5">{spec}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
