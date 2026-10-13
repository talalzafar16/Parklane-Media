import type { Metadata } from 'next'

import { LiveTicker } from '@/components/broadcast/live-ticker'
import { JsonLd } from '@/components/seo/json-ld'
import { ServicesIndex } from '@/components/services/services-index'
import { services } from '@/data/services'
import { breadcrumbJsonLd, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Media production, commercial rights and sales, content creation, event branding and sponsorship, and broadcast production — end-to-end media services engineered for impact.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <ServicesIndex
        linkTo="page"
        headingLevel="h1"
        className="pt-[calc(var(--nav-offset)+3.5rem)] lg:pt-[calc(var(--nav-offset)+6rem)]"
      />
      <LiveTicker items={services.flatMap((service) => service.capabilities.map((capability) => capability.title))} duration={90} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
    </>
  )
}
