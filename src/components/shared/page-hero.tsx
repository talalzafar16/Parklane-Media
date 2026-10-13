import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Crosshair } from '@/components/broadcast/crosshair'
import { TickRuler } from '@/components/broadcast/tick-ruler'
import { Reveal } from '@/components/motion/reveal'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow: string
  marker?: string
  title: ReactNode
  description?: string
  image?: { src: string; alt: string }
  breadcrumbs?: Crumb[]
  children?: ReactNode
}

export function PageHero({ eyebrow, marker = '//', title, description, image, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line pb-16 pt-[calc(var(--nav-offset)+3.5rem)] lg:pb-24 lg:pt-[calc(var(--nav-offset)+6rem)]">
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover object-right opacity-90" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/60 to-transparent" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/60" />
        </div>
      ) : null}
      <div aria-hidden="true" className="rhythm-lines absolute inset-0 -z-10" />

      <Container>
        {breadcrumbs ? (
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="label flex flex-wrap items-center gap-2 text-muted">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-ink">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          <div className="flex items-center justify-between gap-6">
            <Eyebrow marker={marker}>{eyebrow}</Eyebrow>
            <div aria-hidden="true" className="hidden w-[min(26rem,35vw)] items-center gap-4 md:flex">
              <Crosshair />
              <TickRuler className="flex-1" />
            </div>
          </div>

          <h1 className="display mt-6 max-w-[16ch] text-display-xl text-balance">{title}</h1>

          {description ? <p className="mt-8 max-w-[52ch] text-lead text-ink/85">{description}</p> : null}
          {children ? <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  )
}
