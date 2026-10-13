import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { ArrowLine } from '@/components/ui/button'
import { Panel } from '@/components/ui/panel'
import type { Service } from '@/data/services'

export function ServiceBand({ service, href }: { service: Service; href: string }) {
  return (
    <Link
      href={href}
      className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-bright focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
    >
      <Panel
        as="article"
        tone="canvas"
        notch="1.25rem"
        className="grid min-h-[8.75rem] grid-cols-[4.5rem_1fr] overflow-hidden transition-colors duration-300 group-hover:border-signal-bright/50 sm:grid-cols-[7rem_1fr_38%]"
      >
        <div className="flex items-start gap-2 pl-5 pt-7 text-signal-bright sm:pl-7">
          <span className="font-sans text-title font-medium tabular-nums leading-none">{service.number}</span>
          <ArrowLine className="mt-3 hidden w-5 group-hover:w-7 sm:inline-block" />
        </div>

        <div className="relative z-10 py-7 pr-16 sm:pr-6">
          <h3 className="text-title font-medium">{service.title}</h3>
          <p className="mt-3 text-small text-muted">
            {service.tagline[0]}
            <br />
            {service.tagline[1]}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="relative hidden sm:block"
          style={{ clipPath: 'polygon(22% 0, 100% 0, 100% 100%, 0 100%)' }}
        >
          <Image
            src={service.image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 24vw, 38vw"
            className="object-cover opacity-75 transition-[transform,opacity] duration-700 ease-brand group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas/70 to-transparent" />
        </div>

        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 z-10 flex size-[4.5rem] items-end justify-end bg-signal p-3 text-ink transition-[width,height] duration-500 ease-brand [clip-path:polygon(100%_0,100%_100%,0_100%)] group-hover:size-[5.5rem]"
        >
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </Panel>
    </Link>
  )
}
