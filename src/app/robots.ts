import type { MetadataRoute } from 'next'

import { siteConfig } from '@/data/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing to hide on a marketing site — this just keeps Next's internal
      // build assets out of the index.
      disallow: ['/_next/'],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
