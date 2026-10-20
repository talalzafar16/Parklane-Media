import type { MetadataRoute } from 'next'

import { siteConfig } from '@/data/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: 'Parklane',
    description: siteConfig.tagline,
    start_url: '/',
    display: 'standalone',
    background_color: '#08131D',
    theme_color: '#08131D',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
