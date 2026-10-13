import Image from 'next/image'
import { Plus } from 'lucide-react'

import { Crosshair } from '@/components/broadcast/crosshair'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Container } from '@/components/ui/container'
import type { Service } from '@/data/services'
import { padIndex } from '@/lib/utils'

import { ExploreLink, ServiceEyebrow, ServiceTitle, serviceTitleId } from '../service-parts'

export function BroadcastChapter({ service }: { service: Service }) {
  return (
    <section
      id={service.slug}
      aria-labelledby={serviceTitleId(service)}
      className="relative isolate overflow-hidden border-t border-line"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image src={service.image.src} alt="" fill sizes="100vw" className="object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-canvas via-canvas/30 to-canvas" />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas/90 via-canvas/20 to-canvas/70" />
      </div>

      <Container className="section-y">
        <Reveal className="max-w-2xl">
          <ServiceEyebrow service={service} />
          <ServiceTitle service={service} className="mt-6" />
          <p className="mt-6 max-w-[38ch] text-lead text-ink/85">{service.headline}</p>
          <div aria-hidden="true" className="mt-10 flex items-center gap-4 text-signal-bright">
            <span className="label">[ Our approach ]</span>
            <span className="h-px w-32 bg-signal-bright/50 sm:w-48" />
            <Plus className="size-4" />
          </div>
        </Reveal>

        <div className="relative mt-20 lg:mt-28">
          <div aria-hidden="true" className="absolute inset-x-0 top-5 hidden h-px overflow-hidden bg-line-strong lg:block">
            <span className="absolute inset-y-0 left-0 w-1/4 animate-signal-travel bg-gradient-to-r from-transparent via-signal-bright to-transparent" />
          </div>

          <RevealGroup as="ol" className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8" aria-label={`${service.title} capabilities`}>
            {service.capabilities.map((capability, index) => (
              <RevealItem as="li" key={capability.title} className="relative">
                <div className="flex items-center gap-3">
                  <Crosshair variant="node" />
                  <span className="label text-signal-bright">{padIndex(index + 1)}</span>
                </div>
                <div className="ml-5 mt-6 border-l border-line-strong pl-6">
                  <h3 className="display text-[1.875rem] leading-[0.95]">{capability.title}</h3>
                  <p className="mt-4 text-small text-muted">{capability.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <ExploreLink service={service} className="mt-16" />
      </Container>
    </section>
  )
}
