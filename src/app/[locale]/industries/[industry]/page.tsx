export const dynamicParams = false;
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INDUSTRIES, BASE_TYPES, CERTIFICATIONS } from '@/data/valves';
import AnimatedContent from '@/components/react-bits/AnimatedContent';
import {
  Factory,
  Wrench,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Phone,
  Envelope,
  Download,
  Globe,
} from '@phosphor-icons/react/dist/ssr';

// Industry detail data
interface IndustryDetail {
  challenge: string;
  painPoints: { title: string; desc: string }[];
  valves: { slug: string; reason: string }[];
  certifications: string[];
  specs: string[];
}

const INDUSTRY_DETAILS: Record<string, IndustryDetail> = {
  'oil-gas': {
    challenge:
      'Operating in extreme pressure, temperature, and corrosive environments requires valves that meet the highest industry standards.',
    painPoints: [
      { title: 'Sour Service (H2S)', desc: 'NACE MR0175 compliance for hydrogen sulfide-rich environments in upstream production.' },
      { title: 'High Pressure Cycling', desc: 'API 6D rated valves handling pressure surges in pipeline transmission.' },
      { title: 'Remote Operation', desc: 'Pneumatic and electric actuated valves for unmanned offshore platforms.' },
    ],
    valves: [
      { slug: 'ball-valve', reason: 'Trunnion-mounted design for pipeline isolation up to Class 2500' },
      { slug: 'gate-valve', reason: 'Full-bore conduit gate valves for pigging operations' },
      { slug: 'check-valve', reason: 'API 594 dual-plate check valves for flow reversal prevention' },
      { slug: 'globe-valve', reason: 'Y-pattern globe valves for severe service throttling' },
      { slug: 'control-valve', reason: 'Cage-guided control valves for precise flow regulation' },
    ],
    certifications: ['API 6D', 'API 600', 'API 623', 'NACE MR0175'],
    specs: ['Class 150-2500', '-46°C to 425°C', 'DN15-DN1200'],
  },
  chemical: {
    challenge:
      'Aggressive chemical media, extreme temperature ranges, and explosion-proof requirements demand specialized valve solutions.',
    painPoints: [
      { title: 'Corrosion Attack', desc: 'PTFE/PFA lined valves preventing chemical attack on valve body and trim.' },
      { title: 'ATEX Compliance', desc: 'Electro-pneumatic actuators certified for Zone 1 & 2 hazardous areas.' },
      { title: 'Thermal Cycling', desc: 'Fire-safe design maintaining seal integrity during emergency shutdown.' },
    ],
    valves: [
      { slug: 'ball-valve', reason: 'Fully lined ball valves with anti-static device for flammable media' },
      { slug: 'butterfly-valve', reason: 'PTFE lined butterfly valves for large-diameter corrosive service' },
      { slug: 'diaphragm-valve', reason: 'Weir-type diaphragm valves for clean chemical dosing' },
      { slug: 'plug-valve', reason: 'PTFE sleeved plug valves for zero-leakage isolation' },
      { slug: 'safety-valve', reason: 'Spring-loaded safety relief valves for overpressure protection' },
    ],
    certifications: ['ATEX II 2GD', 'PED 2014/68/EU', 'ISO 15848'],
    specs: ['PN10-PN40', '-29°C to 200°C', 'DN15-DN600'],
  },
  'water-treatment': {
    challenge:
      'Municipal and industrial water systems need reliable, long-service-life valves with drinking water safety certification.',
    painPoints: [
      { title: 'Drinking Water Safety', desc: 'WRAS/NSF 61 approved materials preventing contamination of potable water.' },
      { title: 'Low Headloss', desc: 'Eccentric butterfly valves with optimized disc profile for minimal pressure drop.' },
      { title: 'Buried Service', desc: 'Extended stem and gearbox options for valves installed below ground.' },
    ],
    valves: [
      { slug: 'gate-valve', reason: 'Resilient seated gate valves for main water distribution lines' },
      { slug: 'butterfly-valve', reason: 'Double-eccentric butterfly valves for treatment plant isolation' },
      { slug: 'check-valve', reason: 'Swing check valves with lever & weight for pump discharge' },
      { slug: 'knife-gate-valve', reason: 'Slurry knife gate valves for sludge and wastewater handling' },
      { slug: 'control-valve', reason: 'Globe-type control valves for flow and pressure regulation' },
    ],
    certifications: ['WRAS', 'NSF 61', 'ISO 9906'],
    specs: ['PN10-PN25', '-10°C to 80°C', 'DN50-DN2000'],
  },
  'power-generation': {
    challenge:
      'Supercritical steam conditions, high-pressure feedwater, and HRSG compatibility require ASME-certified HP/HT valves.',
    painPoints: [
      { title: 'Supercritical Steam', desc: 'ASME Class 900-2500 valves for main steam isolation at 600°C+.' },
      { title: 'HRSG Integration', desc: 'High-cycle valves designed for combined cycle plant heat recovery systems.' },
      { title: 'Feedwater Control', desc: 'Multi-stage pressure reducing valves for boiler feed pump recirculation.' },
    ],
    valves: [
      { slug: 'globe-valve', reason: 'Pressure-seal bonnet globe valves for high-pressure steam service' },
      { slug: 'gate-valve', reason: 'Flex-wedge gate valves for main steam isolation' },
      { slug: 'check-valve', reason: 'Tilting disc check valves for turbine extraction lines' },
      { slug: 'control-valve', reason: 'Cage-guided control valves with noise attenuation trim' },
      { slug: 'safety-valve', reason: 'ASME Section I safety valves for boiler drum protection' },
    ],
    certifications: ['ASME B16.34', 'ASME Section I', 'PED Module H'],
    specs: ['Class 150-2500', '-29°C to 620°C', 'DN15-DN600'],
  },
  pharmaceutical: {
    challenge:
      'Sterile processing environments demand zero dead-leg valves with CIP/SIP compatibility and full material traceability.',
    painPoints: [
      { title: 'Sterility Assurance', desc: 'Zero dead-leg diaphragm valves preventing microbial growth in process lines.' },
      { title: 'CIP/SIP Compatibility', desc: 'Fully drainable valve bodies designed for clean-in-place and steam-in-place cycles.' },
      { title: 'Material Traceability', desc: 'EN 10204 3.1 certified materials with full heat number traceability.' },
    ],
    valves: [
      { slug: 'diaphragm-valve', reason: 'Weir-type diaphragm valves for sterile media transfer' },
      { slug: 'ball-valve', reason: 'Full-bore 3-A sanitary ball valves for WFI and pure steam' },
      { slug: 'butterfly-valve', reason: 'Sanitary butterfly valves for large-diameter tank outlets' },
      { slug: 'check-valve', reason: 'Spring-loaded sanitary check valves for WFI distribution' },
      { slug: 'sampling-valve', reason: 'Aseptic sampling valves for QA/QC process validation' },
    ],
    certifications: ['3-A Sanitary', 'EHEDG', 'FDA 21 CFR'],
    specs: ['Tri-Clamp / DIN 11864', '-10°C to 150°C', 'DN10-DN200'],
  },
  marine: {
    challenge:
      'Offshore and marine environments subject valves to salt spray, vibration, and classification society requirements.',
    painPoints: [
      { title: 'Saltwater Corrosion', desc: 'Duplex and super duplex stainless steel resisting pitting in marine atmospheres.' },
      { title: 'Class Approval', desc: 'DNV-GL, BV, and Lloyd\'s Register type-approved valves for vessel installation.' },
      { title: 'Compact Design', desc: 'Wafer and lug body designs saving weight and space in pipe galleries.' },
    ],
    valves: [
      { slug: 'butterfly-valve', reason: 'DNV type-approved wafer butterfly valves for ballast & bilge systems' },
      { slug: 'ball-valve', reason: 'Fire-safe ball valves for fuel oil and lube oil service' },
      { slug: 'gate-valve', reason: 'Bronze gate valves for seawater cooling systems' },
      { slug: 'check-valve', reason: 'Swing check valves for pump discharge on FPSO topsides' },
      { slug: 'globe-valve', reason: 'Angle pattern globe valves for high-pressure steam on LNG carriers' },
    ],
    certifications: ['DNV-GL', 'Bureau Veritas', 'LR'],
    specs: ['PN16-PN40', '-29°C to 200°C', 'DN15-DN600'],
  },
};

export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  const detail = INDUSTRY_DETAILS[slug];
  if (!industry) return { title: 'Not Found' };

  return {
    title: `${industry.name} Valve Solutions | ValveMaster`,
    description:
      detail?.challenge ??
      `Certified industrial valves for ${industry.name} applications. API, ATEX, DNV certified manufacturing.`,
    alternates: {
      canonical: `/industries/${slug}`,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry: slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  const detail = INDUSTRY_DETAILS[slug];
  if (!industry) notFound();

  const valves = detail.valves
    .map((v) => {
      const base = BASE_TYPES.find((b) => b.slug === v.slug);
      return base ? { ...base, reason: v.reason } : null;
    })
    .filter((v): v is NonNullable<typeof v> => v !== null);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 bg-[var(--bg-deep)] border-b border-[var(--border-color)] overflow-hidden">
        <div className="grid-lines" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[var(--accent)] opacity-5 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/industries" className="hover:text-[var(--accent)] transition-colors">
              Industries
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">{industry.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedContent direction="horizontal">
              <span className="badge-industrial mb-4">{industry.specs.length} Standards</span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {industry.name}
                <br />
                <span className="text-[var(--accent)]">Valve Solutions</span>
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">
                {detail.challenge}
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {detail.specs.map((spec) => (
                  <span
                    key={spec}
                    className="text-sm px-3 py-1.5 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  href="/rfq"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all"
                >
                  <Wrench size={18} />
                  Request Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold rounded-lg hover:border-[var(--accent)]/50 hover:text-white transition-all"
                >
                  <Phone size={18} />
                  Contact Engineer
                </Link>
              </div>
            </AnimatedContent>

            <AnimatedContent direction="horizontal" reverse>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] border border-[var(--border-color)]">
                <img
                  src={industry.img}
                  alt={industry.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {detail.certifications.slice(0, 3).map((cert) => (
                    <span
                      key={cert}
                      className="text-xs px-2.5 py-1 rounded-full bg-black/60 text-white font-medium backdrop-blur-sm"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="relative py-20 px-6 bg-[var(--bg-dark)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedContent>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Engineering <span className="text-[var(--accent)]">Challenges</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-center mb-12 max-w-xl mx-auto">
              Key operational challenges we address with certified valve engineering.
            </p>
          </AnimatedContent>

          <div className="grid md:grid-cols-3 gap-6">
            {detail.painPoints.map((point, i) => (
              <AnimatedContent
                key={point.title}
                               delay={i * 0.1}
              >
                <div className="p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] h-full">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                    <ShieldCheck size={20} className="text-red-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{point.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{point.desc}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Valves */}
      <section className="relative py-20 px-6 bg-[var(--bg-deep)] border-y border-[var(--border-color)]">
        <div className="grid-lines" />
        <div className="relative max-w-7xl mx-auto">
          <AnimatedContent>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Recommended <span className="text-[var(--accent)]">Valve Types</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-center mb-12 max-w-xl mx-auto">
              Engineered selections for {industry.name.toLowerCase()} applications.
            </p>
          </AnimatedContent>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valves.map((valve, i) => (
              <AnimatedContent
                key={valve.slug}
                               delay={i * 0.08}
              >
                <Link
                  href={`/products/${valve.slug}`}
                  className="group block p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--accent)]/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Factory size={22} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {valve.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-3">{valve.cn}</p>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {valve.reason}
                  </p>
                  <span className="text-sm font-semibold text-[var(--accent)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Product <ArrowRight size={14} />
                  </span>
                </Link>
              </AnimatedContent>
            ))}
          </div>

          <AnimatedContent delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:underline"
              >
                Browse All {industry.name} Valves <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-20 px-6 bg-[var(--bg-dark)]">
        <div className="max-w-7xl mx-auto">
          <AnimatedContent>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Industry <span className="text-[var(--accent)]">Certifications</span>
            </h2>
          </AnimatedContent>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {detail.certifications.map((cert, i) => {
              const full = CERTIFICATIONS.find((c) => c.name === cert);
              return (
                <AnimatedContent
                  key={cert}
                                   delay={i * 0.08}
                >
                  <div className="p-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-center">
                    <CheckCircle size={20} className="text-emerald-400 mx-auto mb-2" />
                    <div className="text-sm font-bold">{cert}</div>
                    {full && (
                      <div className="text-xs text-[var(--text-muted)] mt-1">{full.desc}</div>
                    )}
                  </div>
                </AnimatedContent>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-6 bg-[var(--bg-deep)] border-t border-[var(--border-color)]">
        <div className="grid-lines" />
        <div className="relative max-w-3xl mx-auto text-center">
          <AnimatedContent>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need a Custom Solution for {industry.name}?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Our engineering team designs valves to your exact specifications.
              Submit your requirements and get a response within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/rfq"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white font-semibold rounded-lg hover:bg-[var(--accent)]/90 transition-all hover:shadow-lg hover:shadow-[var(--accent)]/25"
              >
                <Wrench size={18} />
                Submit RFQ
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold rounded-lg hover:border-[var(--accent)]/50 hover:text-white transition-all"
              >
                <Envelope size={18} />
                Contact Sales
              </Link>
            </div>
          </AnimatedContent>
        </div>
      </section>
    </main>
  );
}
