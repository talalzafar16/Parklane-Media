import type { Metadata } from 'next'

import { siteConfig } from '@/data/site'

type BuildMetadataOptions = {
  title: string
  description: string
  /** Route path, e.g. "/work/vertex-motors-launch". Used for the canonical URL. */
  path?: string
  /** Path to an OG image under /public. Defaults to the site-wide card. */
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

/**
 * One metadata builder for every page, so titles, canonicals, Open Graph and
 * Twitter cards can never drift apart. `metadataBase` is set once in the root
 * layout, which is what lets the relative image paths below resolve.
 */
export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og.webp',
  imageAlt = `${siteConfig.name} — ${siteConfig.tagline}`,
  type = 'website',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = path === '/' ? siteConfig.url : `${siteConfig.url}${path}`

  // The page <title> gets "| Parklane Media" appended by the root template, but
  // the homepage title already carries the brand name — appending it to the
  // social card too would read "Parklane Media — … | Parklane Media".
  const socialTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [image],
    },
  }
}

/** Organization schema, injected once on the homepage. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.jpeg`,
    description: siteConfig.description,
  }
}
