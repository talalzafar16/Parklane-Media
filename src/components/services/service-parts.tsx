import Link from 'next/link'

import { ArrowLine, Button } from '@/components/ui/button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { getServiceHref, type Service } from '@/data/services'
import { cn } from '@/lib/utils'

export const serviceTitleId = (service: Service) => `${service.slug}-title`

export function ServiceEyebrow({ service }: { service: Service }) {
  return (
    <Eyebrow marker={service.number} tone="split">
      Service
    </Eyebrow>
  )
}

export function ServiceTitle({ service, className }: { service: Service; className?: string }) {
  return (
    <h2 id={serviceTitleId(service)} className={cn('display text-display-lg text-balance', className)}>
      {service.title}
    </h2>
  )
}

export function ExploreLink({ service, className }: { service: Service; className?: string }) {
  return (
    <Button asChild variant="link" className={className}>
      <Link href={getServiceHref(service)}>
        Explore {service.title}
        <ArrowLine />
      </Link>
    </Button>
  )
}
