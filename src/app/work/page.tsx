import type { Metadata } from 'next'
import Link from 'next/link'

import { RadarPulse } from '@/components/broadcast/radar-pulse'
import { ServiceBand } from '@/components/services/service-band'
import { PageHero } from '@/components/shared/page-hero'
import { ArrowLine, Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Panel } from '@/components/ui/panel'
import { WorkGrid } from '@/components/work/work-grid'
import { getServiceHref, services } from '@/data/services'
import { contactLink } from '@/data/site'
import { projects } from '@/data/work'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description: 'Case studies across media production, commercial rights, content creation, event branding and broadcast production.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Ideas into impact"
        description="Selected productions, partnerships and campaigns. Case studies are being prepared for release."
      />

      <Section>
        <Container>{projects.length > 0 ? <WorkGrid /> : <ComingSoon />}</Container>
      </Section>
    </>
  )
}

function ComingSoon() {
  return (
    <>
      <Panel notch="2rem" className="grid gap-10 overflow-hidden p-8 sm:p-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <Eyebrow>In the edit</Eyebrow>
          <h2 className="display mt-6 text-display-md">Case studies coming soon</h2>
          <p className="mt-6 max-w-[52ch] text-muted">
            We&apos;re preparing our first case studies for publication. In the meantime, explore what we deliver — or start a
            conversation about your next project.
          </p>
          <Button asChild className="mt-10">
            <Link href={contactLink.href}>
              Start a project
              <ArrowLine />
            </Link>
          </Button>
        </div>
        <div className="mx-auto w-full max-w-[16rem] lg:col-span-4 lg:col-start-9">
          <RadarPulse />
          <p className="label mt-6 text-center text-muted">Standing by</p>
        </div>
      </Panel>

      <div className="mt-20">
        <Eyebrow>Where the work will live</Eyebrow>
        <ol className="mt-8 space-y-3">
          {services.map((service) => (
            <li key={service.slug}>
              <ServiceBand service={service} href={getServiceHref(service)} />
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
