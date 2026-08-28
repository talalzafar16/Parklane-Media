import type { Metadata } from 'next'

import { AboutStrip } from '@/components/home/about-strip'
import { CapabilityMap } from '@/components/CapabilityMap'
import { Hero } from '@/components/home/hero'
import { PartnersBand } from '@/components/home/partners-band'
import { WhyParklane } from '@/components/home/why-parklane'
import { CtaBand } from '@/components/shared/cta-band'
import { MarkDivider } from '@/components/system/mark-divider'
import { Ticker } from '@/components/system/ticker'
import { Container } from '@/components/ui/container'
import { siteConfig } from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: '/',
})

/**
 * The ticker runs twice on this page: once directly beneath the hero, and once
 * at the top of the footer. With no client logos to borrow credibility from,
 * the client's own capability surface is what fills that role.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <AboutStrip />

      <Container>
        <MarkDivider />
      </Container>

      <CapabilityMap />
      <PartnersBand />
      <WhyParklane />
      <CtaBand />
    </>
  )
}
