import Image from 'next/image'

import { Eyebrow } from '@/components/ui/eyebrow'
import { partners } from '@/data/proof'
import { cn } from '@/lib/utils'

export function PartnerStrip() {
  return (
    <div>
      <div className="flex items-center gap-5">
        <Eyebrow>Partners &amp; platforms</Eyebrow>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <ul className="mt-6 grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-7">
        {partners.map((partner) => (
          <li key={partner.id} className="flex flex-col gap-2">
            <div
              className={cn(
                'notch relative aspect-[3/2] [--notch:0.6rem]',
                partner.tone === 'light' ? 'bg-silver' : 'border border-line-strong bg-canvas',
              )}
            >
              <div className="absolute inset-3 sm:inset-4">
                <Image src={partner.logo} alt={partner.name} fill sizes="(min-width: 1024px) 160px, 22vw" className="object-contain" />
              </div>
            </div>
            <span aria-hidden="true" className="label truncate text-muted">
              {partner.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
