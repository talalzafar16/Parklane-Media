import Image from 'next/image'

import { Crosshair } from '@/components/broadcast/crosshair'
import { SignalStop } from '@/components/broadcast/signal-stop'
import { TickRuler } from '@/components/broadcast/tick-ruler'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Container } from '@/components/ui/container'
import type { Service } from '@/data/services'
import { siteConfig } from '@/data/site'
import { padIndex } from '@/lib/utils'

import { ExploreLink, ServiceEyebrow, ServiceTitle, serviceTitleId } from '../service-parts'

export function RightsChapter({ service }: { service: Service }) {
  return (
    <section
      id={service.slug}
      aria-labelledby={serviceTitleId(service)}
      className="relative isolate overflow-hidden border-t border-line"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 lg:left-[32%]">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 68vw, 100vw"
          className="object-cover object-left opacity-60 lg:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/60" />
      </div>

      <Container className="section-y flex min-h-[100svh] flex-col">
        <div className="flex items-center justify-between gap-6">
          <ServiceEyebrow service={service} />
          <div aria-hidden="true" className="hidden w-[min(30rem,40vw)] items-center gap-4 md:flex">
            <Crosshair />
            <TickRuler className="flex-1" />
            <span className="label text-signal-bright">{service.number}</span>
          </div>
        </div>

        <div className="mt-10 max-w-2xl">
          <Reveal>
            <ServiceTitle service={service} className="text-display-md" />
            <p className="mt-6 max-w-[44ch] text-muted">{service.summary}</p>
          </Reveal>

          <RevealGroup as="ol" className="mt-12" aria-label={`${service.title} capabilities`}>
            {service.capabilities.map((capability, index) => (
              <RevealItem
                as="li"
                key={capability.title}
                className="grid grid-cols-[3.5rem_1fr] items-center gap-5 border-b border-line py-5 first:pt-0 sm:grid-cols-[6.5rem_1fr]"
              >
                <span className="flex items-center text-signal-bright">
                  <svg viewBox="0 0 48 48" aria-hidden="true" className="hidden size-12 sm:block">
                    <line x1="4" y1="44" x2="44" y2="4" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                  <span className="font-sans text-title tabular-nums sm:-ml-3">{padIndex(index + 1)}</span>
                </span>
                <div>
                  <h3 className="font-mono text-[0.95rem] uppercase tracking-[0.2em] text-ink">{capability.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-small text-muted">{capability.description}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <Reveal className="mt-auto pt-20">
          <p className="max-w-[12ch] font-sans text-[clamp(3rem,1.5rem+6vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.04em]">
            {service.headline.replace(/\.$/, '')}
            <SignalStop />
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="label flex flex-wrap items-center gap-x-8 gap-y-3 text-muted">
            {service.motto ? <span className="text-ink">{service.motto}</span> : null}
            <span className="flex items-center gap-3 tabular-nums text-signal-bright">
              <Crosshair className="size-4 text-signal-bright" />
              {siteConfig.coordinates}
            </span>
          </div>
          <ExploreLink service={service} />
        </div>
      </Container>
    </section>
  )
}
