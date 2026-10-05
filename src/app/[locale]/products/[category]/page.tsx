export const dynamicParams = false;
export const dynamicParams = false;
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, DownloadSimple, ChatTeardropText } from '@phosphor-icons/react/dist/ssr';
import { BASE_TYPES, ACTUATIONS, MATERIALS, CONNECTIONS, PRESSURES, INDUSTRIES } from '@/data/valves';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return BASE_TYPES.map(v => ({ category: v.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const valve = BASE_TYPES.find(v => v.slug === category);
  if (!valve) return {};

  return {
    title: `${valve.name} | Industrial ${valve.name} Manufacturer - ValveMaster`,
    description: `Industrial ${valve.name} manufacturer. Pneumatic, electric, manual actuation. 304SS, 316L, WCB, CF8M. Flanged, threaded, weld. PN10-Class 2500. API, CE, ISO 9001 certified. ${valve.count}+ SKUs.`,
    openGraph: {
      title: `${valve.name} | ValveMaster Industrial Valves`,
      description: valve.desc,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const valve = BASE_TYPES.find(v => v.slug === category);
  if (!valve) notFound();

  const relatedValves = BASE_TYPES.filter(v => v.slug !== category).slice(0, 4);

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: valve.name,
            description: valve.desc,
            brand: { '@type': 'Brand', name: 'ValveMaster' },
            manufacturer: {
              '@type': 'Organization',
              name: 'ValveMaster Industrial Co., Ltd.',
              url: 'https://valvemaster.com',
            },
            category: 'Industrial Valves',
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="border-b border-[var(--border)] py-3">
        <div className="container-grid">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[var(--text-primary)] transition-colors">Products</Link>
            <span>/</span>
            <span className="text-[var(--text-primary)]">{valve.name}</span>
          </div>
        </div>
      </div>

      <div className="container-grid py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Hero */}
            <div className="relative w-full aspect-[16/7] rounded-2xl overflow-hidden mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${valve.slug}-hero/1200/500`}
                alt={`${valve.name} industrial valve`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)]/80 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="badge-industrial">{valve.cn}</span>
                <h1 className="text-4xl font-bold text-white mt-2">{valve.name}</h1>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Overview</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                {valve.desc}
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                ValveMaster manufactures industrial {valve.name.toLowerCase()}s with {valve.count}+ standard SKU configurations, covering all major actuation methods, body materials, end connections, and pressure ratings per international standards including ASME, API, EN, ISO, and JIS.
              </p>
            </div>

            {/* Actuation variants */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Available Configurations</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ACTUATIONS.map(act => (
                  <Link
                    key={act.slug}
                    href={`/products/${valve.slug}/${act.slug}`}
                    className="group flex flex-col gap-1.5 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-raised)] transition-all"
                  >
                    <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                      {act.name}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{act.label}</span>
                    <ArrowUpRight size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] mt-auto transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Materials table */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Body Material Options</h2>
              <div className="rounded-xl border border-[var(--border)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--bg-raised)]">
                      <th className="text-left px-4 py-3 text-[var(--text-secondary)] font-medium">Material</th>
                      <th className="text-left px-4 py-3 text-[var(--text-secondary)] font-medium">Grade</th>
                      <th className="text-left px-4 py-3 text-[var(--text-secondary)] font-medium">Typical Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATERIALS.map((mat, i) => (
                      <tr
                        key={mat.slug}
                        className={`border-b border-[var(--border)] last:border-0 ${i % 2 === 0 ? '' : 'bg-[var(--bg-surface)]/50'}`}
                      >
                        <td className="px-4 py-3 text-[var(--text-primary)] font-medium">{mat.short}</td>
                        <td className="px-4 py-3 text-[var(--text-secondary)]">{mat.name}</td>
                        <td className="px-4 py-3 text-[var(--text-muted)] text-xs">
                          {mat.slug === '316l' ? 'Chemical, Pharmaceutical, Marine' :
                           mat.slug === 'wcb' ? 'General Purpose, Oil & Gas, Steam' :
                           mat.slug === 'duplex' ? 'Offshore, Seawater, High Corrosion' :
                           mat.slug === 'pvc' ? 'Water Treatment, Chemical Handling' :
                           'Food Grade, Hygienic, High-Temp'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pressure ratings */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Pressure Ratings</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                {PRESSURES.map(p => (
                  <Link
                    key={p.slug}
                    href={`/products/${valve.slug}/flanged-${p.slug}`}
                    className="group flex flex-col items-center gap-1 p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] text-center transition-all"
                  >
                    <span className="text-sm font-bold text-[var(--accent)] font-mono">{p.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{p.bar} bar</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Applications */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5">Industry Applications</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INDUSTRIES.slice(0, 6).map(ind => (
                  <Link
                    key={ind.slug}
                    href={`/industries/${ind.slug}`}
                    className="group flex items-center gap-2.5 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all"
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: ind.color }}
                    />
                    <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                      {ind.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Quick RFQ */}
            <div className="sticky top-[88px] flex flex-col gap-5">
              <div className="p-5 rounded-2xl border border-[var(--accent)] bg-[rgba(14,165,233,0.05)]">
                <h3 className="font-bold text-[var(--text-primary)] mb-2">Get a Quote</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Specify your exact requirements and receive a technical proposal within 4 hours.
                </p>
                <Link
                  href={`/rfq?product=${valve.slug}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[#0284c7] transition-colors"
                >
                  <ChatTeardropText size={18} weight="bold" />
                  Request Quote
                </Link>
              </div>

              {/* Downloads */}
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">Downloads</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: `${valve.name} Datasheet`, type: 'PDF' },
                    { label: 'Product Catalog', type: 'PDF' },
                    { label: '2D CAD Drawing', type: 'DWG' },
                    { label: '3D Model', type: 'STEP' },
                  ].map(dl => (
                    <button
                      key={dl.label}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] hover:border-[var(--border-strong)] transition-all group text-left"
                    >
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        {dl.label}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-[var(--accent)]">{dl.type}</span>
                        <DownloadSimple size={14} className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Related */}
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)]">
                <h3 className="font-bold text-[var(--text-primary)] mb-4">Related Products</h3>
                <div className="flex flex-col gap-2">
                  {relatedValves.map(rv => (
                    <Link
                      key={rv.slug}
                      href={`/products/${rv.slug}`}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-raised)] transition-colors group"
                    >
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                        {rv.name}
                      </span>
                      <ArrowUpRight size={14} className="text-[var(--text-muted)]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
