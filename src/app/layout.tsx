import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Barlow_Condensed, IBM_Plex_Mono, Outfit } from 'next/font/google'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { RouteProgress } from '@/components/layout/route-progress'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { JsonLd } from '@/components/seo/json-ld'
import { siteConfig } from '@/data/site'
import { organizationJsonLd } from '@/lib/seo'

import './globals.css'

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    'media production',
    'commercial rights and sales',
    'sponsorship',
    'content creation',
    'event branding',
    'broadcast production',
    'OTT strategy',
    'live streaming',
    'Pakistan media agency',
  ],
  formatDetection: { telephone: true, address: false, email: true },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#08131D',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${outfit.variable} ${plexMono.variable}`}>
      <head>
        {/* Reveals start at opacity 0; keep them visible if JS never runs. */}
        <noscript>
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: '[data-reveal]{opacity:1!important;transform:none!important}' }}
          />
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:inline-flex focus:h-12 focus:items-center focus:bg-signal focus:px-6 focus:text-ink"
        >
          Skip to main content
        </a>

        <RouteProgress />
        <Navbar />

        <main id="main">{children}</main>

        <Footer />
        <WhatsAppButton />

        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  )
}
