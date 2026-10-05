export const dynamicParams = false;
export const dynamicParams = false;
import type { Metadata } from 'next';
import { RFQSection } from '@/components/home/RFQSection';

export const metadata: Metadata = {
  title: 'Request a Valve Quote | Technical RFQ - ValveMaster',
  description:
    'Request a technical quote for industrial valves. Specify actuation, material, connection, pressure rating. 4-hour response time. Full documentation included.',
};

export default function RFQPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      <div
        className="py-16 border-b border-[var(--border)]"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(14,165,233,0.1) 0%, transparent 70%)' }}
      >
        <div className="container-grid">
          <h1 className="text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
            Request a Technical Quote
          </h1>
          <p className="text-[var(--text-secondary)] text-xl max-w-[560px]">
            Share your valve specification and our engineers will respond within 4 business hours with pricing and documentation.
          </p>
        </div>
      </div>
      <RFQSection />
    </div>
  );
}
