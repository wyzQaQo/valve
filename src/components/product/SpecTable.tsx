import { BaseType, ParsedAttribute } from '@/data/valves';

interface SpecRow {
  parameter: string;
  values: string[];
}

function generateSpecData(
  valve: BaseType,
  material?: ParsedAttribute,
  connection?: ParsedAttribute,
  pressure?: ParsedAttribute,
): SpecRow[] {
  const rows: SpecRow[] = [
    { parameter: 'Valve Type', values: [valve.name] },
    { parameter: 'Design Standard', values: ['API 6D', 'ASME B16.34', 'ISO 17292'] },
  ];

  if (material) {
    rows.push({ parameter: 'Body Material', values: [material.name] });
    rows.push({ parameter: 'Trim Material', values: ['316 Stainless Steel', 'Stellite 6 Seat'] });
  } else {
    rows.push({ parameter: 'Body Material', values: ['WCB Carbon Steel', '304 SS', '316L SS'] });
    rows.push({ parameter: 'Trim Material', values: ['316 SS / Stellite'] });
  }

  if (connection) {
    rows.push({ parameter: 'Connection Type', values: [connection.name] });
    if (connection.detail) {
      rows.push({ parameter: 'Connection Standard', values: [connection.detail] });
    }
  }

  rows.push({ parameter: 'Size Range', values: ['DN15 (1/2")', 'DN300 (12")'] });

  if (pressure) {
    rows.push({ parameter: 'Pressure Rating', values: [pressure.name] });
    rows.push({ parameter: 'Test Pressure (Shell)', values: [`${Math.round(parseInt(pressure.detail || '0') * 1.5)} bar`] });
  } else {
    rows.push({ parameter: 'Pressure Rating', values: ['PN16', 'PN40', 'Class 150', 'Class 300'] });
  }

  rows.push({ parameter: 'Temperature Range', values: ['-29°C to +200°C'] });
  rows.push({ parameter: 'Leakage Class', values: ['Class VI (Bubble-tight)'] });
  rows.push({ parameter: 'Operation', values: ['Quarter-turn 90°'] });
  rows.push({ parameter: 'Certification', values: ['API 6D', 'CE PED', 'ISO 9001'] });

  return rows;
}

interface SpecTableProps {
  valve: BaseType;
  material?: ParsedAttribute;
  connection?: ParsedAttribute;
  pressure?: ParsedAttribute;
}

export function SpecTable({ valve, material, connection, pressure }: SpecTableProps) {
  const specs = generateSpecData(valve, material, connection, pressure);

  return (
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
            {specs.map((row, i) => (
              <tr
                key={row.parameter}
                className={`border-b border-[var(--border)] last:border-b-0 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--bg-surface)]'
                }`}
              >
                <td className="px-5 py-3 text-[var(--text-secondary)] font-medium">
                  {row.parameter}
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    {row.values.map((v, j) => (
                      <span
                        key={j}
                        className={`inline-flex px-2.5 py-1 rounded-md text-xs font-mono ${
                          j === 0 && row.values.length === 1
                            ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                            : 'bg-white/5 text-[var(--text-secondary)]'
                        }`}
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-3">
        * Custom sizes, materials, and pressure ratings available upon request.
        Contact our engineering team for non-standard specifications.
      </p>
    </section>
  );
}
