import type { MetadataRoute } from 'next';

const siteUrl = 'https://chandu-challa-portofilo.netlify.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
