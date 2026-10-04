import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  BASE_TYPES,
  MATERIALS,
  INDUSTRIES,
  generateAllSeoCombos,
  parseAttributeSlug,
  findActuation,
  findMaterial,
  findConnection,
  findPressure,
  buildComboTitle,
} from '@/data/valves';
import { ComboHero } from '@/components/product/ComboHero';
import { ComboSchema } from '@/components/product/ComboSchema';

export function generateStaticParams() {
  return generateAllSeoCombos().map(({ category, attribute }) => ({ category, attribute }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; attribute: string }>;
}): Promise<Metadata> {
  const { category, attribute } = await params;
  const valve = BASE_TYPES.find(b => b.slug === category);
  if (!valve) return {};

  const attrs = parseAttributeSlug(attribute);
  const title = buildComboTitle(valve.name, attrs);
  const attrNames = attrs.map(a => a.name).join(', ');
  const desc = `High-quality ${title} manufacturer. ${attrNames} configuration for industrial applications. API, CE, ISO 9001 certified.`;

  return {
    title: `${title} | ValveMaster`,
    description: desc,
    openGraph: {
      title: `${title} - Industrial Flow Control`,
      description: desc,
    },
  };
}

export default async function AttributeProductPage({
  params,
}: {
  params: Promise<{ category: string; attribute: string }>;
}) {
  const { category, attribute } = await params;

  const valve = BASE_TYPES.find(b => b.slug === category);
  if (!valve) notFound();

  const attrs = parseAttributeSlug(attribute);
  if (attrs.length === 0) notFound();

  const actuation = findActuation(attrs);
  const material = findMaterial(attrs);
  const connection = findConnection(attrs);
  const pressure = findPressure(attrs);

  const title = buildComboTitle(valve.name, attrs);
  const breadcrumbs: { label: string; href?: string }[] = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: valve.name, href: `/products/${valve.slug}` },
    { label: attrs.map(a => a.name).join(' + ') },
  ];

  // Related combos
  const relatedCombos = generateAllSeoCombos()
    .filter(c => c.category === category && c.attribute !== attribute)
    .slice(0, 6);

  // Applicable industries
  const applicableIndustries = INDUSTRIES.slice(0, 4);

  // Schema data
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: `${valve.desc} ${attrs.map(a => a.name).join(', ')} configuration.`,
    category: `Industrial Valves > ${valve.name}`,
    manufacturer: { '@type': 'Organization', name: 'ValveMaster' },
    offers: { '@type': 'AggregateOffer', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    additionalProperty: attrs.map(a => ({
      '@type': 'PropertyValue',
      name: a.type.charAt(0).toUpperCase() + a.type.slice(1),
      value: a.name,
    })),
  };

  return (
    <>
      <ComboSchema data={schema} />

      {/* Breadcrumb */}
      <div className="bg-[var(--bg-surface)] border-b border-[var(--border)]">
        <div className="container-grid py-3">
          <nav className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-[var(--accent)] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--text-secondary)]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero */}
      <ComboHero
        title={title}
        valve={valve}
        attrs={attrs}
        actuation={actuation}
        material={material}
        connection={connection}
        pressure={pressure}
      />

      {/* Main content */}
      <section className="py-16">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">
            {/* Main column */}
            <div className="space-y-16">
              {/* Technical Specs — inline table */}
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                  Technical Specifications
                </h2>
                <div className="overflow-hidden rounded-xl border border-[var(--border)]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[var(--bg-raised)] border-b border-[var(--border)]">
                        <th className="text-left px-5 py-3 font-semibold text-[var(--text-primary)] w-[220px]">
                          Parameter
                        </th>
                        <th className="text-left px-5 py-3 font-semibold text-[var(--text-primary)]">
                          Value / Standard
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { k: 'Valve Type', v: valve.name },
                        { k: 'Design Standard', v: 'API 6D, ASME B16.34, ISO 17292' },
                        { k: 'Body Material', v: material?.name ?? 'WCB / 304 SS / 316L SS' },
                        { k: 'Trim Material', v: '316 SS, Stellite 6 Seat' },
                        { k: 'Connection Type', v: connection?.name ?? 'Flanged / Threaded / Welded' },
                        { k: 'Connection Standard', v: connection?.detail ?? 'ASME B16.5 / B16.11 / B16.25' },
                        { k: 'Size Range', v: 'DN15 (1/2″) — DN300 (12″)' },
                        { k: 'Pressure Rating', v: pressure?.name ?? 'PN16 / PN40 / Class 150 / Class 300' },
                        { k: 'Test Pressure (Shell)', v: pressure ? `${Math.round(parseInt(pressure.detail || '0') * 1.5)} bar` : '1.5× Rated' },
                        { k: 'Temperature Range', v: '-29°C to +200°C (standard)' },
                        { k: 'Leakage Class', v: 'Class VI (Bubble-tight)' },
                        { k: 'Operation', v: actuation?.detail ?? 'Manual / Pneumatic / Electric' },
                        { k: 'Certification', v: 'API 6D, CE PED 2014/68/EU, ISO 9001' },
                      ].map((row, i) => (
                        <tr
                          key={row.k}
                          className={`border-b border-[var(--border)] last:border-b-0 ${
                            i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--bg-surface)]'
                          }`}
                        >
                          <td className="px-5 py-3 text-[var(--text-secondary)] font-medium">{row.k}</td>
                          <td className="px-5 py-3 text-[var(--text-primary)] font-mono text-xs">{row.v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Material Comparison — inline table */}
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                  Available Material Options
                </h2>
                <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
                  <table className="w-full text-sm min-w-[650px]">
                    <thead>
                      <tr className="bg-[var(--bg-raised)] border-b border-[var(--border)]">
                        <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Material</th>
                        <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Corrosion Resistance</th>
                        <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Temperature</th>
                        <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Best For</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MATERIALS.map((m, i) => {
                        const isSel = m.slug === material?.slug;
                        return (
                          <tr
                            key={m.slug}
                            className={`border-b border-[var(--border)] last:border-b-0 ${
                              isSel ? 'bg-[rgba(14,165,233,0.06)]' : i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--bg-surface)]'
                            }`}
                          >
                            <td className={`px-4 py-3 font-semibold ${isSel ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                              {m.short} {isSel && '✓'}
                            </td>
                            <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">{m.short === 'Duplex' ? 'Superior' : m.short === 'PVC' ? 'Excellent' : 'Good'}</td>
                            <td className="px-4 py-3 text-[var(--text-secondary)] text-xs font-mono">-29°C to +425°C</td>
                            <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">{m.name}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Industry Applications */}
              <section>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                  Industry Applications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {applicableIndustries.map(ind => (
                    <Link
                      key={ind.slug}
                      href={`/industries/${ind.slug}`}
                      className="group flex items-start gap-4 p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-raised)] transition-all"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-lg font-bold"
                        style={{ backgroundColor: ind.color }}
                      >
                        {ind.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1">
                          {ind.name}
                        </h3>
                        <p className="text-sm text-[var(--text-secondary)]">{ind.tagline}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Related combos */}
              {relatedCombos.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
                    Explore {valve.name} Variations
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedCombos.map(combo => {
                      const cAttrs = parseAttributeSlug(combo.attribute);
                      const cTitle = buildComboTitle(valve.name, cAttrs);
                      return (
                        <Link
                          key={combo.attribute}
                          href={`/products/${combo.category}/${combo.attribute}`}
                          className="group flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-raised)] transition-all"
                        >
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                              {cTitle}
                            </h3>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {cAttrs.slice(0, 3).map(a => (
                                <span key={a.slug} className="inline-flex px-1.5 py-0.5 text-[10px] rounded-md bg-white/5 text-[var(--text-muted)] font-mono">
                                  {a.name.split(' ')[0]}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span className="flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors ml-3">→</span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar — RFQ + Downloads + Contact */}
            <aside className="space-y-6">
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] sticky top-[88px]">
                <h3 className="font-semibold text-[var(--text-primary)] mb-1">Request a Quote</h3>
                <p className="text-xs text-[var(--text-muted)] mb-5">
                  Get pricing for {title}
                </p>
                <a
                  href={`/rfq?product=${encodeURIComponent(title)}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent)] text-white text-sm font-semibold rounded-lg hover:bg-[#0284c7] transition-colors"
                >
                  Request Quote →
                </a>
                <div className="mt-5 pt-5 border-t border-[var(--border)] space-y-3">
                  <a href="mailto:sales@valvemaster.com" className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    ✉ sales@valvemaster.com
                  </a>
                  <a href="tel:+8613800000000" className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    📞 +86 138 0000 0000
                  </a>
                </div>
              </div>

              {/* Downloads */}
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-4">Technical Downloads</h3>
                <div className="space-y-2">
                  {['Product Catalog (PDF)', 'Dimensional Drawing (CAD)', 'Material Certificate Sample', 'Inspection Report Sample'].map(doc => (
                    <a
                      key={doc}
                      href="#"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{doc}</span>
                      <span className="ml-auto text-[10px] text-[var(--text-muted)]">↓ Download</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
