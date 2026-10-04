import { ParsedAttribute, BaseType } from '@/data/valves';

const TYPE_COLORS: Record<string, string> = {
  actuation: 'border-blue-400/30 bg-blue-400/8 text-blue-400',
  material: 'border-amber-400/30 bg-amber-400/8 text-amber-400',
  connection: 'border-emerald-400/30 bg-emerald-400/8 text-emerald-400',
  pressure: 'border-purple-400/30 bg-purple-400/8 text-purple-400',
};

const TYPE_ICONS: Record<string, string> = {
  actuation: '⚙',
  material: '🧪',
  connection: '🔗',
  pressure: '📊',
};

interface ComboHeroProps {
  title: string;
  valve: BaseType;
  attrs: ParsedAttribute[];
  actuation?: ParsedAttribute;
  material?: ParsedAttribute;
  connection?: ParsedAttribute;
  pressure?: ParsedAttribute;
}

export function ComboHero({
  title,
  valve,
  attrs,
  actuation,
  material,
  connection,
  pressure,
}: ComboHeroProps) {
  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-[var(--bg-surface)] border-b border-[var(--border)]">
      {/* Grid lines background */}
      <div className="absolute inset-0 grid-lines opacity-40" aria-hidden="true" />

      {/* Accent glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(14,165,233,0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="container-grid relative z-10">
        <div className="max-w-3xl">
          {/* Attribute badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {attrs.map(attr => (
              <span
                key={`${attr.type}-${attr.slug}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[attr.type] || 'border-[var(--border)] bg-white/5 text-[var(--text-secondary)]'}`}
              >
                <span>{TYPE_ICONS[attr.type] || '•'}</span>
                {attr.name}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5 leading-[1.15]">
            {title}
          </h1>

          {/* Description */}
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8 max-w-2xl">
            {actuation && `${actuation.name} actuation with ${actuation.detail || 'standard operation'}. `}
            {connection && `${connection.name} connection per ${connection.detail || 'industry standard'}. `}
            {material && `Constructed from ${material.name} for superior durability. `}
            {pressure && `Pressure rated at ${pressure.name} (${pressure.detail || ''}). `}
            {valve.desc}
          </p>

          {/* Spec highlight strip */}
          <div className="flex flex-wrap gap-4 mb-8">
            {pressure && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--bg-raised)] border border-[var(--border)]">
                <span className="text-[var(--accent)] font-bold font-mono text-lg">{pressure.name}</span>
                <span className="text-[var(--text-muted)] text-xs">Pressure Rating</span>
              </div>
            )}
            {connection && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--bg-raised)] border border-[var(--border)]">
                <span className="text-[var(--accent)] font-bold font-mono text-lg">{connection.name}</span>
                <span className="text-[var(--text-muted)] text-xs">Connection</span>
              </div>
            )}
            {material && (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--bg-raised)] border border-[var(--border)]">
                <span className="text-[var(--accent)] font-bold font-mono text-lg">{material.name.split(' ')[0]}</span>
                <span className="text-[var(--text-muted)] text-xs">Material</span>
              </div>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={`/rfq?product=${encodeURIComponent(title)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[#0284c7] transition-colors"
            >
              Request a Quote
              <span className="text-white/60">→</span>
            </a>
            <a
              href={`/products/${valve.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-strong)] text-[var(--text-secondary)] font-medium rounded-xl hover:bg-white/5 transition-colors"
            >
              View {valve.name} Range
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
