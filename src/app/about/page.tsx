import type { Metadata } from 'next'
import Image from 'next/image'

import { SignalStop } from '@/components/broadcast/signal-stop'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PartnerStrip } from '@/components/proof/partner-strip'
import { ProofGrid } from '@/components/proof/proof-grid'
import { Container, Section } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Icon } from '@/components/ui/icon'
import { IndexCard } from '@/components/ui/index-card'
import { companyStory, connect, manifesto, principles } from '@/data/about'
import { whyParklane } from '@/data/why-parklane'
import { buildMetadata } from '@/lib/seo'
import { padIndex } from '@/lib/utils'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: companyStory.paragraphs[0],
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <Manifesto />

      <Section ruled aria-labelledby="story-heading">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <Eyebrow>{companyStory.eyebrow}</Eyebrow>
            <h2 id="story-heading" className="display mt-6 text-display-md">
              {companyStory.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 lg:col-span-7 lg:col-start-6">
            {companyStory.paragraphs.map((paragraph, index) => (
              <p key={paragraph.slice(0, 24)} className={index === 0 ? 'text-title' : 'text-lead text-muted'}>
                {paragraph}
              </p>
            ))}
            <dl className="!mt-12">
              {connect.facts.map((fact) => (
                <div key={fact.label} className="grid gap-2 border-t border-line py-5 sm:grid-cols-[9rem_1fr]">
                  <dt className="label pt-0.5 text-signal-bright">{fact.label}</dt>
                  <dd className="text-ink">{fact.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" aria-labelledby="why-heading">
        <Container>
          <Reveal>
            <Eyebrow>Why Parklane</Eyebrow>
            <h2 id="why-heading" className="display mt-6 text-display-md">
              Six reasons, one team
            </h2>
          </Reveal>
          <RevealGroup as="ul" className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {whyParklane.map((reason, index) => (
              <RevealItem as="li" key={reason.title}>
                <IndexCard index={padIndex(index + 1)} icon={reason.icon} title={reason.title} description={reason.description} tone="canvas" />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <Section aria-labelledby="proof-heading-about">
        <Container>
          <h2 id="proof-heading-about" className="sr-only">
            Partners and proof of impact
          </h2>
          <Reveal>
            <PartnerStrip />
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <ProofGrid />
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

function Manifesto() {
  return (
    <section aria-labelledby="manifesto-heading" className="relative isolate overflow-hidden pb-20 pt-[calc(var(--nav-offset)+3.5rem)] lg:pb-28 lg:pt-[calc(var(--nav-offset)+6rem)]">
      <div aria-hidden="true" className="rhythm-lines absolute inset-0 -z-20" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[42%] lg:block"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
      >
        <Image
          src="/images/services/media-production.webp"
          alt=""
          fill
          priority
          sizes="42vw"
          className="scale-[1.6] object-cover object-[70%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/60 to-transparent" />
      </div>

      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <Eyebrow marker="/">{manifesto.eyebrow}</Eyebrow>
            <h1
              id="manifesto-heading"
              className="mt-8 max-w-[12ch] font-sans text-[clamp(3.25rem,1.5rem+6.5vw,8.5rem)] font-bold leading-[0.92] tracking-[-0.045em]"
            >
              {manifesto.heading}
              <SignalStop />
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-12 md:grid-cols-2">
            <Reveal className="space-y-5">
              <span aria-hidden="true" className="block h-6 w-px origin-bottom-left rotate-[30deg] bg-signal-bright" />
              {manifesto.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-[46ch] font-mono text-small text-ink/85">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <RevealGroup as="ul" className="border-t border-line">
              {principles.map((principle, index) => (
                <RevealItem as="li" key={principle.key} className="flex items-center gap-5 border-b border-line py-5">
                  <Icon name={principle.icon} className="size-6 shrink-0 text-signal-bright" />
                  <div>
                    <p className="label text-muted">
                      {padIndex(index + 1)} / <span className="text-signal-bright">{principle.key}</span>
                    </p>
                    <p className="mt-1 text-lead text-ink">{principle.title}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <Reveal delay={0.2} className="self-end lg:col-span-3 lg:col-start-10">
          <p className="label text-signal-bright">{manifesto.principle.label}</p>
          <span aria-hidden="true" className="mt-3 block h-px w-4 bg-signal-bright" />
          <p className="mt-3 font-mono text-small text-ink">
            {manifesto.principle.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
