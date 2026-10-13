import type { Metadata } from 'next'

import { RadarPulse } from '@/components/broadcast/radar-pulse'
import { ContactDetails } from '@/components/contact/contact-details'
import { EnquiryForm } from '@/components/contact/enquiry-form'
import { Reveal } from '@/components/motion/reveal'
import { PageHero } from '@/components/shared/page-hero'
import { Container, Section } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Panel } from '@/components/ui/panel'
import { contactIntro } from '@/data/home'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Have a campaign, production, rights or broadcast project in mind? Tell us where you want to go — we will shape the strategy, content and execution.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow={contactIntro.eyebrow} title={contactIntro.heading} description={contactIntro.body} />

      <Section aria-label="Contact details and enquiry form">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <Eyebrow marker="/">Direct lines</Eyebrow>
            <ContactDetails layout="stack" showWhatsApp className="mt-8" />
            <div className="mt-14 hidden max-w-[14rem] lg:block">
              <RadarPulse />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <Panel id="enquiry" as="section" tone="surface" notch="2rem" className="scroll-mt-[calc(var(--nav-offset)+1rem)] p-7 sm:p-10 lg:p-12">
              <Eyebrow>{contactIntro.formEyebrow}</Eyebrow>
              <h2 className="mt-5 text-statement font-medium">{contactIntro.formHeading}</h2>
              <p className="mt-4 max-w-[48ch] text-muted">{contactIntro.formBody}</p>
              <EnquiryForm className="mt-10" />
            </Panel>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
