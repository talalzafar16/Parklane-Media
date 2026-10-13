import Image from 'next/image'
import { Heart, MessageCircle, Play, Send } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { RecDot } from '@/components/broadcast/rec-dot'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Container, Section } from '@/components/ui/container'
import type { Service } from '@/data/services'
import { siteConfig } from '@/data/site'

import { ExploreLink, ServiceEyebrow, ServiceTitle, serviceTitleId } from '../service-parts'

export function ContentChapter({ service }: { service: Service }) {
  return (
    <Section id={service.slug} aria-labelledby={serviceTitleId(service)} ruled className="overflow-hidden">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col lg:col-span-4">
          <Reveal>
            <ServiceEyebrow service={service} />
            <ServiceTitle service={service} className="mt-6" />
            <span aria-hidden="true" className="mt-8 block h-px w-12 bg-signal-bright" />
            <p className="mt-6 text-title font-medium">{service.headline}</p>
          </Reveal>

          <RevealGroup as="ul" className="mt-10 space-y-6" aria-label={`${service.title} capabilities`}>
            {service.capabilities.map((capability) => (
              <RevealItem as="li" key={capability.title} className="group border-l border-line pl-5 transition-colors hover:border-signal-bright">
                <h3 className="label text-[0.8125rem] text-ink">{capability.title}</h3>
                <p className="mt-2 text-small text-muted">{capability.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <ExploreLink service={service} className="mt-10 self-start" />

          <div className="mt-auto flex items-end gap-5 pt-16">
            <span aria-hidden="true" className="display text-[clamp(7rem,4rem+10vw,13rem)] leading-[0.74] text-signal">
              {service.number}
            </span>
            <p className="label max-w-[11ch] pb-1 text-signal-bright">{service.motto}</p>
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-8">
          <ContentMosaic service={service} />
        </Reveal>
      </Container>
    </Section>
  )
}

function ContentMosaic({ service }: { service: Service }) {
  const plate = service.image.src

  return (
    <div aria-hidden="true" className="grid h-full min-h-[34rem] grid-cols-6 grid-rows-6 gap-3 lg:min-h-[44rem]">
      {/* Social post */}
      <div className="col-span-6 row-span-4 flex flex-col border border-line-strong bg-surface sm:col-span-3">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <span className="text-[0.7rem]">
            <Logo variant="mark" />
          </span>
          <span className="label flex-1 pl-3 text-ink">{siteConfig.name}</span>
          <span className="label text-muted">•••</span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <Image src={plate} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="scale-150 object-cover object-[30%_40%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/10 to-transparent" />
          <p className="display absolute bottom-5 left-5 text-[clamp(2.5rem,1.5rem+3vw,4rem)] leading-[0.85]">
            Built
            <br />
            to move
          </p>
        </div>
        <div className="flex items-center gap-5 px-4 py-3 text-muted">
          <Heart className="size-4" />
          <MessageCircle className="size-4" />
          <Send className="size-4" />
          <span className="label ml-auto">Social · Reel</span>
        </div>
      </div>

      {/* Live edit */}
      <div className="notch relative col-span-3 row-span-2 hidden overflow-hidden border border-line-strong [--notch:2rem] sm:col-span-3 sm:row-span-6 sm:block">
        <Image src={plate} alt="" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover object-[78%_50%]" />
        <div className="absolute inset-0 bg-signal/25 mix-blend-color" />
        <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-signal-bright/15 to-transparent" />
        <div className="label absolute left-5 top-5 flex items-center gap-2 text-ink">
          <RecDot />
          Live edit
        </div>
        <div className="absolute inset-x-5 bottom-5 grid grid-cols-6 gap-1">
          {Array.from({ length: 6 }, (_, index) => (
            <span key={index} className="h-8 border border-ink/30 bg-canvas/40" />
          ))}
        </div>
      </div>

      {/* Video player */}
      <div className="col-span-6 row-span-2 flex flex-col border border-line-strong bg-canvas sm:col-span-3">
        <div className="relative flex-1 overflow-hidden">
          <Image src={plate} alt="" fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover object-[45%_75%] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas/90 to-transparent" />
          <p className="display absolute left-5 top-1/2 -translate-y-1/2 text-[clamp(1.75rem,1rem+2vw,2.75rem)] leading-[0.85]">
            Precision
            <br />
            in motion
          </p>
        </div>
        <div className="flex items-center gap-4 border-t border-line px-4 py-3">
          <Play className="size-4 fill-ink text-ink" />
          <span className="label tabular-nums text-muted">00:18</span>
          <span className="relative h-px flex-1 bg-line-strong">
            <span className="absolute inset-y-0 left-0 w-2/5 bg-signal-bright" />
          </span>
        </div>
      </div>
    </div>
  )
}
