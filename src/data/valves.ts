// ============================================================
// Valve Industrial SEO Data Engine
// "参数组合数据库网站" core data layer
// ============================================================

export const BASE_TYPES = [
  { slug: 'ball-valve', name: 'Ball Valve', cn: '球阀', icon: 'circle', desc: 'Quarter-turn rotary motion valve ideal for on/off control with low pressure drop.', count: 240 },
  { slug: 'gate-valve', name: 'Gate Valve', cn: '闸阀', icon: 'square', desc: 'Linear motion valve for full bore flow in open/close applications.', count: 180 },
  { slug: 'butterfly-valve', name: 'Butterfly Valve', cn: '蝶阀', icon: 'diamond', desc: 'Quarter-turn disc valve for large diameter throttling and isolation.', count: 160 },
  { slug: 'globe-valve', name: 'Globe Valve', cn: '截止阀', icon: 'hexagon', desc: 'Linear motion valve providing precise throttling and flow regulation.', count: 140 },
  { slug: 'check-valve', name: 'Check Valve', cn: '止回阀', icon: 'arrow', desc: 'Automatic valve preventing backflow in pipelines.', count: 120 },
  { slug: 'needle-valve', name: 'Needle Valve', cn: '针阀', icon: 'needle', desc: 'Fine-threaded stem for precise flow control in instrument lines.', count: 96 },
  { slug: 'plug-valve', name: 'Plug Valve', cn: '旋塞阀', icon: 'plug', desc: 'Quarter-turn cylindrical or tapered plug for on/off and diverting service.', count: 84 },
  { slug: 'diaphragm-valve', name: 'Diaphragm Valve', cn: '隔膜阀', icon: 'dome', desc: 'Flexible membrane valve for corrosive media and sanitary applications.', count: 72 },
  { slug: 'relief-valve', name: 'Safety Relief Valve', cn: '安全阀', icon: 'shield', desc: 'Pressure relief device protecting systems from overpressure.', count: 64 },
  { slug: 'control-valve', name: 'Control Valve', cn: '调节阀', icon: 'sliders', desc: 'Automated valve modulating flow in response to process control signals.', count: 110 },
  { slug: 'solenoid-valve', name: 'Solenoid Valve', cn: '电磁阀', icon: 'bolt', desc: 'Electromechanically operated valve for automation and remote control.', count: 88 },
] as const;

export const ACTUATIONS = [
  { slug: 'manual', name: 'Manual', label: 'Handwheel / Lever' },
  { slug: 'pneumatic', name: 'Pneumatic', label: 'Air Actuated' },
  { slug: 'electric', name: 'Electric', label: 'Motor Actuated' },
  { slug: 'hydraulic', name: 'Hydraulic', label: 'Fluid Actuated' },
] as const;

export const MATERIALS = [
  { slug: '304ss', name: '304 Stainless Steel', short: '304 SS' },
  { slug: '316l', name: '316L Stainless Steel', short: '316L' },
  { slug: 'wcb', name: 'Carbon Steel WCB', short: 'WCB' },
  { slug: 'cf8m', name: 'Cast Stainless CF8M', short: 'CF8M' },
  { slug: 'duplex', name: 'Duplex Stainless 2205', short: 'Duplex' },
  { slug: 'pvc', name: 'PVC / CPVC', short: 'PVC' },
] as const;

export const CONNECTIONS = [
  { slug: 'flanged', name: 'Flanged', standard: 'ASME B16.5 / EN1092' },
  { slug: 'threaded', name: 'Threaded', standard: 'NPT / BSP / BSPT' },
  { slug: 'socket-weld', name: 'Socket Weld', standard: 'ASME B16.11' },
  { slug: 'butt-weld', name: 'Butt Weld', standard: 'ASME B16.25' },
  { slug: 'wafer', name: 'Wafer / Lug', standard: 'API 609' },
] as const;

export const PRESSURES = [
  { slug: 'pn10', name: 'PN10', bar: 10 },
  { slug: 'pn16', name: 'PN16', bar: 16 },
  { slug: 'pn25', name: 'PN25', bar: 25 },
  { slug: 'pn40', name: 'PN40', bar: 40 },
  { slug: 'class150', name: 'Class 150', bar: 20 },
  { slug: 'class300', name: 'Class 300', bar: 51 },
  { slug: 'class600', name: 'Class 600', bar: 103 },
] as const;

export const INDUSTRIES = [
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    tagline: 'API-Rated Valves for Upstream, Midstream & Downstream',
    img: 'https://picsum.photos/seed/oil-refinery-pipeline/800/600',
    color: '#b45309',
    specs: ['API 6D', 'API 600', 'API 623', 'NACE MR0175'],
  },
  {
    slug: 'chemical',
    name: 'Chemical & Petrochemical',
    tagline: 'Corrosion-Resistant Valves for Aggressive Media',
    img: 'https://picsum.photos/seed/chemical-plant-reactor/800/600',
    color: '#0e7490',
    specs: ['ATEX Zone 1 & 2', 'PTFE/PFA Lined', 'FDA Compliant'],
  },
  {
    slug: 'water-treatment',
    name: 'Water & Wastewater',
    tagline: 'Reliable Flow Control for Municipal & Industrial Water Systems',
    img: 'https://picsum.photos/seed/water-treatment-plant/800/600',
    color: '#1d4ed8',
    specs: ['WRAS Approved', 'NSF 61', 'ISO 9906'],
  },
  {
    slug: 'power-generation',
    name: 'Power Generation',
    tagline: 'High-Pressure High-Temperature Valves for Power Plants',
    img: 'https://picsum.photos/seed/power-plant-turbine/800/600',
    color: '#7c3aed',
    specs: ['ASME Class 900-2500', 'HP/HT Certified', 'HRSG Compatible'],
  },
  {
    slug: 'pharmaceutical',
    name: 'Pharmaceutical & Food',
    tagline: 'Hygienic Valves Meeting GMP & FDA Standards',
    img: 'https://picsum.photos/seed/pharma-cleanroom-pipe/800/600',
    color: '#059669',
    specs: ['3-A Sanitary', 'EHEDG', 'FDA 21 CFR'],
  },
  {
    slug: 'marine',
    name: 'Marine & Offshore',
    tagline: 'DNV/BV-Certified Valves for Harsh Marine Environments',
    img: 'https://picsum.photos/seed/offshore-platform-pipes/800/600',
    color: '#0f766e',
    specs: ['DNV-GL', 'Bureau Veritas', 'LR Certified'],
  },
] as const;

export const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System', year: '2019' },
  { name: 'API 6D', desc: 'Pipeline Valves Standard', year: '2021' },
  { name: 'CE Marking', desc: 'European Conformity PED 2014/68/EU', year: '2020' },
  { name: 'ATEX II 2GD', desc: 'Explosive Atmosphere Safety', year: '2022' },
  { name: 'Bureau Veritas', desc: 'Marine Type Approval', year: '2021' },
  { name: 'NACE MR0175', desc: 'H2S Sour Service Compliance', year: '2023' },
] as const;

export const STATS = [
  { value: 18, suffix: '+', label: 'Years Manufacturing', separator: '' },
  { value: 47, suffix: '', label: 'Countries Exported', separator: '' },
  { value: 12000, suffix: '+', label: 'SKU Product Range', separator: ',' },
  { value: 99.3, suffix: '%', label: 'On-Time Delivery Rate', separator: '' },
] as const;

export type BaseType = typeof BASE_TYPES[number];
export type Industry = typeof INDUSTRIES[number];

// ============================================================
// SEO Attribute Combo Engine
// Parses slugs like "pneumatic-flanged-316l-pn16" into typed attributes
// ============================================================

export interface ParsedAttribute {
  type: 'actuation' | 'material' | 'connection' | 'pressure';
  slug: string;
  name: string;
  detail?: string;
}

const ALL_ATTRIBUTES: Record<string, ParsedAttribute> = {};

for (const a of ACTUATIONS) { ALL_ATTRIBUTES[a.slug] = { type: 'actuation', slug: a.slug, name: a.name, detail: a.label }; }
for (const m of MATERIALS) { ALL_ATTRIBUTES[m.slug] = { type: 'material', slug: m.slug, name: m.name, detail: m.short }; }
for (const c of CONNECTIONS) { ALL_ATTRIBUTES[c.slug] = { type: 'connection', slug: c.slug, name: c.name, detail: c.standard }; }
for (const p of PRESSURES) { ALL_ATTRIBUTES[p.slug] = { type: 'pressure', slug: p.slug, name: p.name, detail: `${p.bar} bar` }; }

/** Parse a composite attribute slug into typed attribute parts */
export function parseAttributeSlug(slug: string): ParsedAttribute[] {
  return slug.split('-').map(part => ALL_ATTRIBUTES[part]).filter(Boolean);
}

/** Find a typed attribute by slug */
export function getAttribute(slug: string): ParsedAttribute | undefined {
  return ALL_ATTRIBUTES[slug];
}

/** Find actuation from parsed attributes */
export function findActuation(attrs: ParsedAttribute[]): ParsedAttribute | undefined {
  return attrs.find(a => a.type === 'actuation');
}
/** Find material from parsed attributes */
export function findMaterial(attrs: ParsedAttribute[]): ParsedAttribute | undefined {
  return attrs.find(a => a.type === 'material');
}
/** Find connection from parsed attributes */
export function findConnection(attrs: ParsedAttribute[]): ParsedAttribute | undefined {
  return attrs.find(a => a.type === 'connection');
}
/** Find pressure from parsed attributes */
export function findPressure(attrs: ParsedAttribute[]): ParsedAttribute | undefined {
  return attrs.find(a => a.type === 'pressure');
}

/** Build a human-readable title from parsed attributes + valve name */
export function buildComboTitle(valveName: string, attrs: ParsedAttribute[]): string {
  const names = attrs.map(a => a.name);
  return `${names.join(' ')} ${valveName}`;
}

/** SEO combo entries for generateStaticParams */
export interface SeoComboEntry {
  category: string;
  attribute: string;
}

/** Generate all static SEO combo routes */
export function generateAllSeoCombos(): SeoComboEntry[] {
  const entries: SeoComboEntry[] = [];

  for (const valve of BASE_TYPES) {
    // Layer 1: Valve + single attribute
    for (const a of ACTUATIONS) entries.push({ category: valve.slug, attribute: a.slug });
    for (const m of MATERIALS) entries.push({ category: valve.slug, attribute: m.slug });
    for (const c of CONNECTIONS) entries.push({ category: valve.slug, attribute: c.slug });
    for (const p of PRESSURES) entries.push({ category: valve.slug, attribute: p.slug });
  }

  // Layer 2: High-value multi-attribute combos (top 5 valve types)
  const highValueCombos = [
    ['pneumatic', 'flanged', '316l'],
    ['electric', 'flanged', 'wcb'],
    ['pneumatic', 'threaded', '304ss'],
    ['manual', 'flanged', 'cf8m'],
    ['electric', 'wafer', '316l'],
    ['pneumatic', 'flanged', '316l', 'pn16'],
    ['electric', 'flanged', 'wcb', 'pn40'],
    ['pneumatic', 'butt-weld', '304ss', 'class150'],
    ['manual', 'flanged', 'duplex', 'pn25'],
    ['electric', 'flanged', 'cf8m', 'class300'],
  ];

  for (const valve of BASE_TYPES.slice(0, 5)) {
    for (const combo of highValueCombos) {
      entries.push({ category: valve.slug, attribute: combo.join('-') });
    }
  }

  return entries;
}
