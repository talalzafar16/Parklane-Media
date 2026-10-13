import Image from 'next/image'

import { CornerMarks } from '@/components/broadcast/corner-marks'
import { RecDot } from '@/components/broadcast/rec-dot'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Container, Section } from '@/components/ui/container'
import { Icon } from '@/components/ui/icon'
import type { Service } from '@/data/services'
import { padIndex } from '@/lib/utils'

import { ExploreLink, ServiceEyebrow, ServiceTitle, serviceTitleId } from '../service-parts'

export function EventsChapter({ service }: { service: Service }) {
  return (
    <Section id={service.slug} aria-labelledby={serviceTitleId(service)} ruled className="overflow-hidden">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative min-h-[24rem] lg:col-span-7">
          <figure className="notch absolute inset-0 overflow-hidden [--notch:3rem]">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />
            <CornerMarks inset="inset-6" />
            <figcaption className="label absolute inset-x-8 bottom-8 flex items-center justify-between text-ink">
              <span className="flex items-center gap-2">
                <RecDot />
                Stage feed
              </span>
              <span className="hidden text-signal-bright sm:inline">{service.motto}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="flex flex-col lg:col-span-5 lg:pl-4">
          <Reveal>
            <ServiceEyebrow service={service} />
            <ServiceTitle service={service} className="mt-6 text-display-md" />
            <p className="mt-6 text-title font-medium">{service.headline}</p>
          </Reveal>

          <RevealGroup
            as="ol"
            aria-label={`${service.title} capabilities`}
            className="relative mt-10 space-y-8 before:absolute before:bottom-3 before:left-[1.125rem] before:top-3 before:w-px before:bg-gradient-to-b before:from-signal-bright before:to-line"
          >
            {service.capabilities.map((capability, index) => (
              <RevealItem as="li" key={capability.title} className="relative grid grid-cols-[2.25rem_1fr] gap-5">
                <span className="relative flex size-9 items-center justify-center border border-signal-bright/40 bg-canvas text-signal-bright">
                  <Icon name={capability.icon} className="size-4" />
                </span>
                <div>
                  <p className="label text-signal-bright">{padIndex(index + 1)}</p>
                  <h3 className="mt-1 font-medium uppercase tracking-[0.04em]">{capability.title}</h3>
                  <p className="mt-2 text-small text-muted">{capability.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <ExploreLink service={service} className="mt-12 self-start" />
        </div>
      </Container>
    </Section>
  )
}
