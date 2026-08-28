import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { CapabilityIcon } from '@/components/brand/capability-icon'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { CtaBand } from '@/components/shared/cta-band'
import { PageHero } from '@/components/shared/page-hero'
import { Block } from '@/components/system/block'
import { Container, Section } from '@/components/ui/container'
import { capabilities } from '@/data/capabilities'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Capabilities',
  description:
    'Content, advertising, media and marketing, digital and social, sports and entertainment, events and activations — six capabilities from one team.',
  path: '/capabilities',
})

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Six capabilities, built to work together"
        description="You can engage us for one. Most work draws on several, because the handoffs between them are where campaigns usually lose their shape."
      />

      {/*
        Unlike the homepage accordion, every tag list here is open by default —
        this is the reference page, so nothing is hidden behind an interaction.
      */}
      <Section tone="canvas">
        <Container>
          <RevealGroup as="ul" className="grid gap-6">
            {capabilities.map((capability) => (
              <RevealItem
                as="li"
                key={capability.slug}
                className="border border-border bg-white p-6 sm:p-8 lg:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <span
                        className="font-display text-h3 font-bold text-brand/25 tabular-nums"
                        aria-hidden="true"
                      >
                        {capability.number}
                      </span>
                      <span className="inline-flex size-12 items-center justify-center bg-brand-tint text-brand">
                        <CapabilityIcon name={capability.icon} />
                      </span>
                    </div>

                    <h2 className="mt-6 text-h2">
                      <Link
                        href={`/capabilities/${capability.slug}`}
                        className="transition-colors duration-200 ease-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
                      >
                        {capability.title}
                      </Link>
                    </h2>

                    <p className="mt-4 max-w-copy text-body text-muted">{capability.description}</p>

                    {/* Label is just "Explore": Block is `whitespace-nowrap`, so
                        "Explore Sports & Entertainment" set a 354px min-content
                        and forced the whole page to scroll at 360px. The heading
                        directly above already names the capability — the full
                        name is kept for screen readers. */}
                    <Block asChild variant="outline" className="mt-8">
                      <Link href={`/capabilities/${capability.slug}`}>
                        Explore
                        <span className="sr-only">{` ${capability.title}`}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </Block>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7">
                    <h3 className="micro text-muted">
                      What this covers
                    </h3>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {capability.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-flex items-center border border-brand/15 bg-brand/[0.06] px-3 py-1.5 text-small font-medium text-brand-dark">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
