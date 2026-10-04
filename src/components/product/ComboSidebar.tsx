'use client';

import { useState, FormEvent } from 'react';
import { BaseType, ParsedAttribute } from '@/data/valves';
import {
  Envelope,
  Phone,
  DownloadSimple,
  FilePdf,
  WhatsappLogo,
} from '@phosphor-icons/react';

interface ComboSidebarProps {
  valve: BaseType;
  attrs: ParsedAttribute[];
  actuation?: ParsedAttribute;
  material?: ParsedAttribute;
  connection?: ParsedAttribute;
  pressure?: ParsedAttribute;
}

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

export function ComboSidebar({
  valve,
  attrs,
  actuation,
  material,
  connection,
  pressure,
}: ComboSidebarProps) {
  const [state, setState] = useState<SubmitState>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '' });

  const productTitle = `${attrs.map(a => a.name).join(' ')} ${valve.name}`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState('sending');
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setState('success');
    setTimeout(() => setState('idle'), 4000);
  };

  return (
    <aside className="space-y-6">
      {/* Quick RFQ Form */}
      <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] sticky top-[88px]">
        <h3 className="font-semibold text-[var(--text-primary)] mb-1">Quick RFQ</h3>
        <p className="text-xs text-[var(--text-muted)] mb-5">
          Get a quote for {productTitle}
        </p>

        {state === 'success' ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
              <span className="text-[var(--accent)] text-xl">✓</span>
            </div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              Inquiry Submitted
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              We&apos;ll respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <input
              type="text"
              placeholder="Full Name *"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address *"
              required
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <input
              type="text"
              placeholder="Country"
              value={form.country}
              onChange={e => setForm(p => ({ ...p, country: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg-base)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-lg hover:bg-[#0284c7] disabled:opacity-60 transition-colors"
            >
              {state === 'sending' ? 'Sending...' : 'Request Quote'}
            </button>
          </form>
        )}

        {/* Contact info */}
        <div className="mt-5 pt-5 border-t border-[var(--border)] space-y-3">
          <a
            href="mailto:sales@valvemaster.com"
            className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <Envelope size={14} />
            sales@valvemaster.com
          </a>
          <a
            href="tel:+8613800000000"
            className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <Phone size={14} />
            +86 138 0000 0000
          </a>
          <a
            href="https://wa.me/8613800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <WhatsappLogo size={14} />
            WhatsApp Chat
          </a>
        </div>
      </div>

      {/* Download section */}
      <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]">
        <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-4">Technical Downloads</h3>
        <div className="space-y-2">
          {[
            { label: `${valve.name} Catalog`, type: 'PDF Catalog' },
            { label: 'Dimensional Drawing', type: 'CAD/PDF' },
            { label: 'Material Certificate (MTC)', type: 'Sample' },
            { label: 'Inspection Report Sample', type: 'ITP' },
          ].map(doc => (
            <a
              key={doc.label}
              href="#"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <FilePdf size={14} className="text-[var(--accent)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors truncate">
                  {doc.label}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">{doc.type}</p>
              </div>
              <DownloadSimple size={14} className="flex-shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
