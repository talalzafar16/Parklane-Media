import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { CapabilityIcon } from '@/components/brand/capability-icon'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { CtaBand } from '@/components/shared/cta-band'
import { PageHero } from '@/components/shared/page-hero'
import { WhyParklane } from '@/components/home/why-parklane'
import { Block } from '@/components/system/block'
import { Container, Section } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { aboutIntro } from '@/data/about'
import { capabilities } from '@/data/capabilities'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'Parklane Media is a media, content, marketing and advertising company focused on creating meaningful connections between businesses, audiences and content.',
  path: '/about',
})

/**
 * About.
 *
 * The previous version carried an invented founding story, four fictional team
 * members, a "values" list and a set of unverifiable statistics. All of it has
 * been removed — this page now says only what the client has actually told us.
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutIntro.eyebrow}
        title={aboutIntro.heading}
        description={aboutIntro.paragraphs[0]}
      />

      <Section tone="canvas" aria-labelledby="about-body-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                id="about-body-heading"
                eyebrow="Who we are"
                title="One team across media, content and marketing"
              />
            </div>

            <div className="space-y-6 lg:col-span-7 lg:col-start-6">
              {aboutIntro.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-copy text-lead text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <WhyParklane />

      {/* Capability summary, so /about closes with something actionable. */}
      <Section tone="canvas" aria-labelledby="about-capabilities-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              id="about-capabilities-heading"
              eyebrow="What we do"
              title="Six capabilities, one team"
              className="sm:max-w-2xl"
            />
            <Block asChild variant="outline" className="shrink-0">
              <Link href="/capabilities">
                All capabilities
                <ArrowRight aria-hidden="true" />
              </Link>
            </Block>
          </div>

          <RevealGroup as="ul" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <RevealItem as="li" key={capability.slug} className="h-full">
                <Link
                  href={`/capabilities/${capability.slug}`}
                  className="group flex h-full flex-col border border-border bg-white p-8 transition-[transform,border-color] duration-300 ease-brand hover:-translate-y-1.5 hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 motion-reduce:hover:translate-y-0"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="font-display text-h3 font-bold tabular-nums text-brand/25"
                      aria-hidden="true"
                    >
                      {capability.number}
                    </span>
                    <span className="inline-flex size-12 items-center justify-center bg-brand-tint text-brand transition-colors duration-300 ease-brand group-hover:bg-brand group-hover:text-white">
                      <CapabilityIcon name={capability.icon} />
                    </span>
                  </div>
                  <h3 className="mt-8 text-h3">{capability.title}</h3>
                  <p className="mt-4 flex-1 text-body text-muted">{capability.description}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
