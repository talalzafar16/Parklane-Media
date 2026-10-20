import { Camera, Flag, Handshake, PenTool, Radio, type LucideIcon } from 'lucide-react'

import { Eyebrow } from '@/components/ui/eyebrow'
import { services, type Service } from '@/data/services'

const icons: Record<Service['icon'], LucideIcon> = {
  camera: Camera,
  handshake: Handshake,
  'pen-tool': PenTool,
  flag: Flag,
  radio: Radio,
}

export function ServicesIndex() {
  return (
    <section className="px-gutter pb-24 pt-20 mobile:py-14" id="work">
      <header className="mb-8 flex items-end justify-between mobile:flex-col mobile:items-start mobile:gap-4" id="services">
        <Eyebrow className="m-0">What we offer</Eyebrow>
        <h2 className="font-display text-[clamp(3rem,7vw,7rem)] font-medium uppercase leading-[.9]">What we do.</h2>
      </header>

      <ul className="border-b border-line">
        {services.map((service) => {
          const Icon = icons[service.icon]
          return (
            <li key={service.id}>
              <a
                className="group grid min-h-[6.6rem] grid-cols-[4rem_3.5rem_1fr_auto] items-center border-t border-line py-[.7rem] transition-[padding,background] duration-[250ms] hover:bg-surface hover:px-[1.2rem] mobile:min-h-[5.8rem] mobile:grid-cols-[1.6rem_2.1rem_1fr_2.25rem] mobile:gap-1 mobile:hover:px-0"
                href={`#${service.id}`}
              >
                <span className="font-mono text-[.65rem] leading-[normal] text-muted">{service.number}</span>
                <Icon className="size-[1.7rem] text-muted mobile:size-[1.35rem]" strokeWidth={1.4} aria-hidden="true" />
                <strong className="font-display text-[clamp(1.8rem,3.3vw,3.4rem)] font-medium uppercase leading-none mobile:text-[1.8rem]">
                  {service.title}
                </strong>
                <span
                  className="grid size-[2.8rem] place-items-center rounded-full border border-line text-[1.6rem] transition-transform duration-[250ms] group-hover:rotate-45 mobile:size-[2.25rem]"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
