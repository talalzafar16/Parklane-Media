import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'

import { CapabilityIcon } from '@/components/brand/capability-icon'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { CtaBand } from '@/components/shared/cta-band'
import { Block } from '@/components/system/block'
import { Container, Section } from '@/components/ui/container'
import { capabilities, getCapability } from '@/data/capabilities'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/utils'

type PageProps = { params: { slug: string } }

/** Every capability page is generated at build time — no runtime data fetching. */
export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const capability = getCapability(params.slug)
  if (!capability) {
    return buildMetadata({ title: 'Capability not found', description: '', noIndex: true })
  }

  return buildMetadata({
    title: capability.title,
    description: capability.description,
    path: `/capabilities/${capability.slug}`,
  })
}

export default function CapabilityDetailPage({ params }: PageProps) {
  const capability = getCapability(params.slug)
  if (!capability) notFound()

  return (
    <>
      {/* Header */}
      <section className="border-b border-border bg-brand-tint pb-18 pt-[calc(var(--nav-height)+2.5rem)] lg:pb-24 lg:pt-[calc(var(--nav-height)+5rem)]">
        <Container>
          <Reveal className="max-w-4xl">
            <nav aria-label="Breadcrumb">
              <ol className="micro flex items-center gap-2 text-muted">
                <li>
                  <Link href="/capabilities" className="transition-colors hover:text-brand">
                    Capabilities
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-brand-dark">{capability.title}</li>
              </ol>
            </nav>

            <div className="mt-8 flex items-center gap-4">
              <span
                className="font-display text-h2 font-bold text-brand/25 tabular-nums"
                aria-hidden="true"
              >
                {capability.number}
              </span>
              <span className="inline-flex size-12 items-center justify-center bg-brand text-white">
                <CapabilityIcon name={capability.icon} />
              </span>
            </div>

            <h1 className="mt-8 text-h2">{capability.title}</h1>
            <p className="mt-6 max-w-copy text-lead text-muted">{capability.description}</p>
          </Reveal>
        </Container>
      </section>

      {/*
        Sticky sidebar + scrolling content.
        `items-start` is what actually lets `position: sticky` work inside a
        grid — without it the column stretches to full height and never sticks.
      */}
      <Section tone="canvas">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:col-span-4">
              <nav
                aria-label="All capabilities"
                className="border border-border bg-white p-6"
              >
                <h2 className="px-3 micro text-muted">
                  All capabilities
                </h2>
                <ul className="mt-4 space-y-1">
                  {capabilities.map((item) => {
                    const isCurrent = item.slug === capability.slug
                    return (
                      <li key={item.slug}>
                        <Link
                          href={`/capabilities/${item.slug}`}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={cn(
                            'group flex min-h-[44px] items-center gap-3 px-3 text-body',
                            'transition-colors duration-200 ease-brand',
                            isCurrent
                              ? 'bg-brand-tint font-medium text-brand'
                              : 'text-fg hover:bg-brand-tint hover:text-brand',
                          )}
                        >
                          <span
                            className="font-display text-small font-bold tabular-nums text-brand/40"
                            aria-hidden="true"
                          >
                            {item.number}
                          </span>
                          {item.title}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="mt-6 border border-border bg-white p-8">
                <h2 className="text-h4">Have something in mind?</h2>
                <p className="mt-3 text-body text-muted">
                  Tell us what you are trying to achieve and we will tell you how we would approach
                  it.
                </p>
                <Block asChild className="mt-6 w-full">
                  <Link href="/contact">
                    Start a conversation
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Block>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <h2 className="text-h2">What this covers</h2>
              <p className="mt-6 max-w-copy text-lead text-fg">{capability.description}</p>

              {/*
                A readable grouped list rather than chips: on the detail page
                these are the deliverables someone is scanning for, so they get
                a checked list with hairline separators instead of pills.
              */}
              <RevealGroup
                as="ul"
                className="mt-10 grid gap-x-10 border-t border-border sm:grid-cols-2"
              >
                {capability.tags.map((tag) => (
                  <RevealItem
                    as="li"
                    key={tag}
                    className="flex items-start gap-3 border-b border-border py-4"
                  >
                    <Check className="mt-1 size-[18px] shrink-0 text-brand" aria-hidden="true" />
                    <span className="text-body text-fg">{tag}</span>
                  </RevealItem>
                ))}
              </RevealGroup>

              <div className="mt-16 border border-border bg-brand-tint p-8 lg:p-10">
                <h2 className="text-h3">Work with us on {capability.title.toLowerCase()}</h2>
                <p className="mt-4 max-w-copy text-body text-muted">
                  Every engagement starts the same way — a conversation about what you are trying to
                  move, and an honest view on whether we are the right team for it.
                </p>
                <Block asChild size="lg" className="mt-8">
                  <Link href="/contact">
                    Let&rsquo;s Talk
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Block>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
