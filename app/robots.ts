import type { MetadataRoute } from 'next';

const siteUrl = 'https://chandu-challa-portofilo.netlify.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
