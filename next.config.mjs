/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // The site is a single page now; old page URLs land on their section.
  async redirects() {
    const redirect = (path, destination) => ({ source: `${path}/:slug*`, destination, permanent: true })
    return [
      redirect('/about', '/#about'),
      redirect('/contact', '/#contact'),
      redirect('/services', '/#services'),
      redirect('/capabilities', '/#services'),
      redirect('/work', '/#work'),
      redirect('/insights', '/'),
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
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}

export default nextConfig
