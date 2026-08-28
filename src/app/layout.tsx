import type { Metadata, Viewport } from 'next'
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google'

import { BackgroundGrid } from '@/components/system/background-grid'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { RouteProgress } from '@/components/layout/route-progress'
import { WhatsAppButton } from '@/components/layout/whatsapp-button'
import { siteConfig } from '@/data/site'
import { organizationJsonLd } from '@/lib/seo'

import './globals.css'

/**
 * Three faces, self-hosted by next/font at build time — no render-blocking
 * request to Google, and no layout shift thanks to the size-adjusted fallback.
 *
 * Archivo carries the display type. It is loaded as a variable font including
 * the width axis, which is what lets the headings run expanded without a faux
 * stretch. JetBrains Mono is the micro layer — section numbers, counters,
 * eyebrows, captions and breadcrumbs.
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
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
    'media company',
    'content production',
    'advertising agency',
    'media planning and buying',
    'digital and social media',
    'sports and entertainment media',
    'events and brand activations',
  ],
  formatDetection: { telephone: true, address: false, email: true },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: '/og.webp',
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ['/og.webp'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#1B5A8C',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/*
          Scroll reveals render at opacity 0 and are brought in by Framer Motion.
          If JavaScript never runs, this makes every one of them visible rather
          than leaving the page blank.
        */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style
            dangerouslySetInnerHTML={{
              __html: '[data-reveal]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
      </head>
      <body className="min-h-screen bg-canvas font-sans text-body text-fg">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[70] focus:inline-flex focus:h-12 focus:items-center focus:bg-brand focus:px-6 focus:font-display focus:text-[0.9375rem] focus:font-bold focus:text-white"
        >
          Skip to main content
        </a>

        {/* Hairline column rules behind everything — the Swiss structure the
            rest of the page is set against. */}
        <BackgroundGrid />

        <RouteProgress />
        <Navbar />

        <main id="main" className="relative z-10">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </body>
    </html>
  )
}
