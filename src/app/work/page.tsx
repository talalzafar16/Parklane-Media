import type { Metadata } from 'next'

import { CtaBand } from '@/components/shared/cta-band'
import { PageHero } from '@/components/shared/page-hero'
import { WorkFilterGrid } from '@/components/work/work-filter-grid'
import { Container, Section } from '@/components/ui/container'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Work',
  description:
    'Parklane Media turns ideas into impact across content, advertising, media, digital, sports, entertainment and events.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title="Ideas Into Impact"
        description="We are a new company, and building our first body of work. This is where it will live."
      />

      <Section tone="canvas">
        <Container>
          {/* Renders the designed empty state while `projects` is empty, and the
              filterable grid the moment a project is added. */}
          <WorkFilterGrid />
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
