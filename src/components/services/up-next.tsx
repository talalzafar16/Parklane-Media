import Image from 'next/image'
import Link from 'next/link'

import { RecDot } from '@/components/broadcast/rec-dot'
import { ArrowLine } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getServiceHref, type Service } from '@/data/services'

export function UpNext({ service }: { service: Service }) {
  return (
    <Link
      href={getServiceHref(service)}
      className="group relative isolate block overflow-hidden border-t border-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal-bright"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src={service.image.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30 transition-[opacity,transform] duration-700 ease-brand group-hover:scale-105 group-hover:opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/80 to-canvas/30" />
      </div>

      <Container className="flex flex-col gap-6 py-16 sm:flex-row sm:items-end sm:justify-between lg:py-24">
        <div>
          <p className="label flex items-center gap-3 text-signal-bright">
            <RecDot />
            Up next · {service.number}
          </p>
          <p className="display mt-5 text-display-lg">{service.title}</p>
        </div>
        <span className="flex items-center gap-4 text-signal-bright">
          <span className="label">View service</span>
          <ArrowLine />
        </span>
      </Container>
    </Link>
  )
}
