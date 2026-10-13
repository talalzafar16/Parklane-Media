import type { Metadata } from 'next'

import { LiveTicker } from '@/components/broadcast/live-ticker'
import { ContactFinale } from '@/components/home/contact-finale'
import { HomeFilm } from '@/components/home/home-film'
import { ServiceChapter } from '@/components/services/service-chapter'
import { ServicesIndex } from '@/components/services/services-index'
import { services } from '@/data/services'
import { siteConfig } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HomeFilm />
      <LiveTicker items={services.map((service) => service.title)} />
      <ServicesIndex linkTo="chapter" />
      {services.map((service) => (
        <ServiceChapter key={service.slug} service={service} />
      ))}
      <ContactFinale />
    </>
  )
}
