import Image from 'next/image'

import { CornerMarks } from '@/components/broadcast/corner-marks'
import { RecDot } from '@/components/broadcast/rec-dot'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Container, Section } from '@/components/ui/container'
import { IndexCard } from '@/components/ui/index-card'
import type { Service } from '@/data/services'
import { padIndex } from '@/lib/utils'

import { ExploreLink, ServiceEyebrow, ServiceTitle, serviceTitleId } from '../service-parts'

export function MediaChapter({ service }: { service: Service }) {
  return (
    <Section id={service.slug} aria-labelledby={serviceTitleId(service)} ruled className="overflow-hidden">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-5">
            <ServiceEyebrow service={service} />
            <ServiceTitle service={service} className="mt-6" />
            <p className="mt-8 text-title font-medium">{service.headline}</p>
            <p className="mt-4 max-w-[44ch] text-muted">{service.summary}</p>
            <ExploreLink service={service} className="mt-10" />
          </Reveal>

          {/* Offset on a wrapper — Reveal animates transform itself. */}
          <div className="lg:col-span-7 lg:translate-y-16">
            <Reveal delay={0.1}>
              <figure className="notch relative aspect-[16/10] overflow-hidden [--notch:2.5rem]">
                <Image src={service.image.src} alt={service.image.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-canvas/30" />
                <CornerMarks inset="inset-5" />
                <div aria-hidden="true" className="label absolute left-8 top-8 flex items-center gap-2 text-ink">
                  <RecDot />
                  Rec
                </div>
                <p aria-hidden="true" className="label absolute right-12 top-8 text-ink">
                  Cam {service.number}
                </p>
                <figcaption className="label absolute bottom-8 left-8 text-ink/80">{service.motto}</figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <RevealGroup as="ul" className="mt-20 grid gap-3 md:grid-cols-3 lg:mt-36" aria-label={`${service.title} capabilities`}>
          {service.capabilities.map((capability, index) => (
            <RevealItem as="li" key={capability.title}>
              <IndexCard index={padIndex(index + 1)} icon={capability.icon} title={capability.title} description={capability.description} tone="canvas" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  )
}
