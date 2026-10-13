import type { Metadata } from 'next'

import type { Service } from '@/data/services'
import { siteConfig } from '@/data/site'

type BuildMetadataOptions = {
  title: string
  description: string
  path?: string
  image?: string
  imageAlt?: string
  type?: 'website' | 'article'
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path = '/',
  image = '/og.jpg',
  imageAlt = siteConfig.name,
  type = 'website',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  // The root layout's title template adds the brand to <title>; social cards need it added here.
  const socialTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url: path,
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

const absoluteUrl = (path: string) => (path === '/' ? siteConfig.url : `${siteConfig.url}${path}`)

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl('/icon-512.png'),
    description: siteConfig.description,
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function serviceJsonLd(service: Service, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    url: absoluteUrl(path),
    provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} capabilities`,
      itemListElement: service.capabilities.map((capability) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: capability.title, description: capability.description },
      })),
    },
  }
}
