import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/brand';

/**
 * Three routes is the whole site — the marketing page is a single scroll,
 * and privacy/terms are the only other documents. Listed by hand rather than
 * crawled: at this size a generated list would only add a way to be wrong.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
