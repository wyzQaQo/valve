import { BASE_TYPES } from '@/data/valves';

interface ComboSchemaProps {
  data: Record<string, unknown>;
}

export function ComboSchema({ data }: ComboSchemaProps) {
  // Inject base product URL for the current valve type
  const baseUrl = `https://valvemaster.com/products/${(data.name as string).split(' ').pop()?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          ...data,
          url: baseUrl,
          image: `https://picsum.photos/seed/valve-${Date.now() % 1000}/800/600`,
        }),
      }}
    />
  );
}
