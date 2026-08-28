import type { Metadata } from 'next'

import { InsightsList } from '@/components/insights/insights-list'
import { CtaBand } from '@/components/shared/cta-band'
import { PageHero } from '@/components/shared/page-hero'
import { Container, Section } from '@/components/ui/container'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Insights',
  description:
    'Perspectives on media, content and advertising — platform shifts, audience behaviour, and what is working commercially.',
  path: '/insights',
})

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Parklane Insights"
        description="Perspectives on Media, Content & Advertising"
      />

      <Section tone="canvas">
        <Container>
          {/* Topic chips render as an inert preview of the taxonomy while
              `posts` is empty, then become live filters. */}
          <InsightsList />
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
