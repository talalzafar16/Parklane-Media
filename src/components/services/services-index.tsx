import { SignalGauge } from '@/components/broadcast/signal-gauge'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Container, Section } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { servicesIntro } from '@/data/home'
import { getServiceHref, services } from '@/data/services'
import { cn } from '@/lib/utils'

import { ServiceBand } from './service-band'

type ServicesIndexProps = {
  // `chapter` links to the homepage chapter, `page` to /services/[slug].
  linkTo: 'chapter' | 'page'
  headingLevel?: 'h1' | 'h2'
  className?: string
}

export function ServicesIndex({ linkTo, headingLevel = 'h2', className }: ServicesIndexProps) {
  const Heading = headingLevel

  return (
    <Section id="services" aria-labelledby="services-heading" className={cn('overflow-hidden', className)}>
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-offset)+2.5rem)]">
            <Eyebrow marker={null}>{servicesIntro.eyebrow}</Eyebrow>
            <Heading
              id="services-heading"
              className="mt-6 font-sans text-[clamp(2.5rem,1.4rem+2.3vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              {servicesIntro.heading.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block text-signal-bright">{servicesIntro.emphasis}</span>
            </Heading>
            <p className="mt-8 max-w-[34ch] text-lead text-ink/85">{servicesIntro.body}</p>
            <span aria-hidden="true" className="mt-10 block h-px w-14 bg-signal-bright" />
            <SignalGauge className="-ml-[18%] mt-12 hidden max-w-[24rem] lg:block" />
          </div>
        </Reveal>

        <RevealGroup as="ol" className="space-y-3 lg:col-span-8" aria-label="Services">
          {services.map((service) => (
            <RevealItem as="li" key={service.slug}>
              <ServiceBand
                service={service}
                href={linkTo === 'chapter' ? `#${service.slug}` : getServiceHref(service)}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
