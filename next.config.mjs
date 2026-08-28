/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // All artwork is local (/public). WebP + AVIF are served to browsers that accept them.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  /**
   * /services was renamed to /capabilities when the three-service structure
   * became six capabilities. These are permanent (308) so search engines
   * transfer ranking rather than treating the new URLs as duplicates.
   *
   * The two surviving slugs (content-production → content, advertising) are
   * mapped explicitly; everything else lands on the capabilities index.
   */
  async redirects() {
    return [
      { source: '/services', destination: '/capabilities', permanent: true },
      {
        source: '/services/content-production',
        destination: '/capabilities/content',
        permanent: true,
      },
      {
        source: '/services/video-production',
        destination: '/capabilities/content',
        permanent: true,
      },
      {
        source: '/services/advertising',
        destination: '/capabilities/advertising',
        permanent: true,
      },
      { source: '/services/:slug*', destination: '/capabilities', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
