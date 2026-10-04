import { MetadataRoute } from 'next';
import { BASE_TYPES, INDUSTRIES, generateAllSeoCombos } from '@/data/valves';

const BASE_URL = 'https://valvemaster.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = [
    { url: BASE_URL, priority: 1, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/products`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/industries`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${BASE_URL}/contact`, priority: 0.6, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/rfq`, priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  for (const page of staticPages) {
    entries.push({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  // Product category pages (Head Keywords)
  for (const valve of BASE_TYPES) {
    entries.push({
      url: `${BASE_URL}/products/${valve.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  }

  // SEO Attribute Combo Pages (Long-tail Keywords)
  const combos = generateAllSeoCombos();
  for (const combo of combos) {
    entries.push({
      url: `${BASE_URL}/products/${combo.category}/${combo.attribute}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.55,
    });
  }

  // Industry pages
  for (const industry of INDUSTRIES) {
    entries.push({
      url: `${BASE_URL}/industries/${industry.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.65,
    });
  }

  return entries;
}
