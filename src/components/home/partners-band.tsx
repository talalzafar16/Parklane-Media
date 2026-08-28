import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Magnetic } from '@/components/motion/magnetic'
import { Reveal } from '@/components/motion/reveal'
import { PartnerMarquee } from '@/components/shared/partner-marquee'
import { Block } from '@/components/system/block'
import { KnockoutHeading } from '@/components/system/knockout-heading'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { Container, Section } from '@/components/ui/container'

/**
 * Partners — text-led while there are no partner logos to show. The marquee
 * underneath mounts itself once data/partners.ts has entries, so this works in
 * both states without a code change.
 */
export function PartnersBand() {
  return (
    <Section tone="tint" aria-labelledby="partners-heading">
      <Container>
        <TimecodeLabel index="Sec. 04" label="Partners" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <KnockoutHeading
              id="partners-heading"
              lead="Built on"
              knockout="Partnerships"
              size="h2"
            />
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-copy text-lead text-muted">
              We work with businesses, brands, content owners and organisations to create meaningful
              media and commercial opportunities.
            </p>

            <Reveal delay={0.08} className="mt-10">
              <Magnetic>
                <Block asChild size="lg">
                  <Link href="/contact">
                    Partner With Us
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Block>
              </Magnetic>
            </Reveal>
          </div>
        </div>

        <PartnerMarquee />
      </Container>
    </Section>
  )
}
