export const dynamicParams = false;
export const dynamicParams = false;
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { IndustriesSection } from '@/components/home/IndustriesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { SEOParameterSection } from '@/components/home/SEOParameterSection';
import { RFQSection } from '@/components/home/RFQSection';

export const metadata: Metadata = {
  title: 'Industrial Flow Control Engineering Platform | ValveMaster',
  description:
    'World-class industrial valve manufacturer. 12,000+ SKU product range across ball valves, gate valves, butterfly valves, globe valves. API 6D, CE, ISO 9001 certified. Pneumatic, electric, manual actuation. Export to 47 countries.',
  openGraph: {
    title: 'ValveMaster - Industrial Flow Control Engineering',
    description:
      '12,000+ industrial valve SKUs. API 6D, ISO 9001 certified. Ball, gate, butterfly, globe valves. Pneumatic, electric, manual. Exported to 47 countries.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCategoriesSection />
      <IndustriesSection />
      <StatsSection />
      <SEOParameterSection />
      <RFQSection />
    </>
  );
}
