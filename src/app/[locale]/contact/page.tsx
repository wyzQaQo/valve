export const dynamicParams = false;
import type { Metadata } from 'next';
import { Envelope, Phone, MapPin, Clock } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Contact ValveMaster | Industrial Valve Sales & Technical Support',
  description: 'Contact ValveMaster for industrial valve sales, technical support, and custom engineering. Email, phone, WhatsApp. Based in Wenzhou, China. Export worldwide.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      <div
        className="py-16 border-b border-[var(--border)]"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)' }}
      >
        <div className="container-grid">
          <h1 className="text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Contact Our Engineering Team
          </h1>
          <p className="text-[var(--text-secondary)] text-xl max-w-[560px]">
            Sales, technical support, and custom specifications. We respond within 4 business hours.
          </p>
        </div>
      </div>

      <div className="container-grid py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            {[
              { icon: Envelope, label: 'Email Sales', value: 'sales@valvemaster.com', href: 'mailto:sales@valvemaster.com' },
              { icon: Phone, label: 'Phone / WhatsApp', value: '+86 138 0000 0000', href: 'tel:+8613800000000' },
              { icon: MapPin, label: 'Factory Address', value: 'Industrial Zone, Wenzhou, Zhejiang 325000, China', href: '#' },
              { icon: Clock, label: 'Business Hours', value: 'Mon - Fri, 8:00am - 6:00pm (GMT+8)', href: '#' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-surface)] hover:border-[var(--border-strong)] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(14,165,233,0.1)] flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-[var(--text-primary)] font-medium group-hover:text-[var(--accent)] transition-colors">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-2xl border border-[var(--border)] overflow-hidden h-[400px] bg-[var(--bg-surface)] flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-[var(--accent)] mx-auto mb-3 opacity-50" />
              <p className="text-[var(--text-muted)] text-sm">Interactive map</p>
              <p className="text-[var(--text-muted)] text-xs">Wenzhou, Zhejiang, China</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
