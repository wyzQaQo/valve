import { Check } from '@phosphor-icons/react';

interface Material {
  slug: string;
  name: string;
  short: string;
}

interface MaterialComparisonProps {
  selected?: string;
  materials: readonly Material[];
}

const MATERIAL_PROPERTIES: Record<string, { corrosion: string; temp: string; cost: string; apps: string }> = {
  '304ss': {
    corrosion: 'Good - general chemical resistance',
    temp: '-196°C to +800°C',
    cost: '$$ - Moderate',
    apps: 'Food processing, water, general industrial',
  },
  '316l': {
    corrosion: 'Excellent - chloride & acid resistant',
    temp: '-196°C to +800°C',
    cost: '$$$ - Higher',
    apps: 'Chemical, offshore, pharmaceutical',
  },
  wcb: {
    corrosion: 'Fair - requires coating for corrosive media',
    temp: '-29°C to +425°C',
    cost: '$ - Economical',
    apps: 'Oil & gas, steam, non-corrosive fluids',
  },
  cf8m: {
    corrosion: 'Excellent - equivalent to 316',
    temp: '-196°C to +800°C',
    cost: '$$$ - Higher',
    apps: 'Cryogenic, chemical, high purity',
  },
  duplex: {
    corrosion: 'Superior - stress corrosion cracking resistant',
    temp: '-50°C to +300°C',
    cost: '$$$$ - Premium',
    apps: 'Offshore, seawater, H2S service',
  },
  pvc: {
    corrosion: 'Excellent - acid & alkali resistant',
    temp: '0°C to +60°C',
    cost: '$ - Economical',
    apps: 'Water treatment, chemical transfer, irrigation',
  },
};

const THUMBS: Record<string, string> = {
  '304ss': '👍',
  '316l': '👍👍',
  wcb: '👍',
  cf8m: '👍👍',
  duplex: '👍👍👍',
  pvc: '👍',
};

export function MaterialComparison({ selected, materials }: MaterialComparisonProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
        Material Options Comparison
      </h2>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-[var(--bg-raised)] border-b border-[var(--border)]">
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Material</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Grade</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Corrosion Resistance</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Temp Range</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Relative Cost</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--text-primary)]">Typical Applications</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((m, i) => {
              const props = MATERIAL_PROPERTIES[m.slug];
              const isSelected = m.slug === selected;
              return (
                <tr
                  key={m.slug}
                  className={`border-b border-[var(--border)] last:border-b-0 transition-colors ${
                    isSelected
                      ? 'bg-[rgba(14,165,233,0.06)]'
                      : i % 2 === 0
                        ? 'bg-transparent'
                        : 'bg-[var(--bg-surface)]'
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                      {m.short}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">
                    {m.name.split(' ').pop()}
                    {isSelected && (
                      <Check size={14} weight="bold" className="inline ml-1.5 text-[var(--accent)]" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">
                    {props?.corrosion ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] font-mono text-xs">
                    {props?.temp ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">
                    {props?.cost ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">
                    {props?.apps ?? '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
