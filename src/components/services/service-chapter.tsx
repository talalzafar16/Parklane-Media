import Image from 'next/image'

import type { Service } from '@/data/services'
import { cn, padIndex } from '@/lib/utils'

// Content Creation sits on silver (its lead keeps light text over the plate);
// Event Branding sits on the navy surface. Each fades its plate into that colour.
const tones: Record<Service['tone'], { section: string; visual: string; lead: string }> = {
  default: {
    section: '',
    visual: 'after:bg-chapter-fade mobile:after:bg-chapter-fade-mobile',
    lead: '',
  },
  silver: {
    section: 'rounded-t-[2rem] bg-silver text-navy [--pm-line:rgb(8_19_29/.2)] [--pm-muted:#4b5e6a]',
    visual: 'after:bg-chapter-fade-silver mobile:bg-silver mobile:after:bg-chapter-fade-silver-mobile',
    lead: 'text-ink [--pm-line:rgb(242_246_248/.5)] [--pm-muted:#d0dce4]',
  },
  surface: {
    section: 'bg-surface',
    visual: 'after:bg-chapter-fade-surface mobile:after:bg-chapter-fade-mobile',
    lead: '',
  },
}

export function ServiceChapter({ service }: { service: Service }) {
  const tone = tones[service.tone]
  const detailsId = `${service.id}-details`

  return (
    <section
      className={cn(
        'group relative isolate grid grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)] items-start gap-[clamp(3rem,7vw,8rem)] overflow-clip border-t border-line px-gutter py-[clamp(4rem,6vw,7rem)] tablet:gap-12 mobile:grid-cols-1 mobile:gap-10',
        tone.section,
      )}
      id={service.id}
    >
      <div
        className={cn(
          'absolute inset-0 z-0 overflow-hidden rounded-[inherit] bg-navy after:pointer-events-none after:absolute after:inset-0',
          tone.visual,
        )}
      >
        <Image
          className="h-full w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.045] mobile:h-[28rem] mobile:object-top"
          src={service.image.src}
          alt={service.image.alt}
          sizes="100vw"
        />
      </div>

      <div
        className={cn(
          'relative z-[1] min-w-0 self-center pb-8 mobile:flex mobile:min-h-80 mobile:flex-col mobile:items-start mobile:justify-center',
          tone.lead,
        )}
      >
        <span className="mb-5 block font-mono text-[.7rem] leading-[normal] text-[#72bce7]">{service.number}</span>
        <h2 className="max-w-[15ch] font-display text-[clamp(3.2rem,5.7vw,6.5rem)] font-semibold uppercase leading-[.87] tracking-[-.015em] tablet:text-[clamp(3.1rem,6.5vw,5rem)] mobile:max-w-[16ch] mobile:text-[clamp(3.5rem,14vw,5rem)]">
          {service.title}
        </h2>
        <p className="mt-5 max-w-[43ch] text-[1rem] leading-[1.6] text-muted">{service.statement}</p>
        <a
          className="mt-8 inline-flex items-center gap-10 rounded-[3rem] border border-line bg-navy/[.35] px-[1.4rem] py-[.85rem] text-[.9rem] transition-[background,transform] duration-[180ms] hover:-translate-y-0.5 hover:bg-accent"
          href={`#${detailsId}`}
          aria-label={`Learn more about ${service.title}`}
        >
          Learn more <span className="text-[1.3rem]" aria-hidden="true">↗</span>
        </a>
      </div>

      <div
        className="relative z-[1] scroll-mt-32 rounded-[.3rem] pt-8 target:outline target:outline-1 target:outline-offset-[1rem] target:outline-accent mobile:pt-0"
        id={detailsId}
        tabIndex={-1}
      >
        <p className="mb-4 font-mono text-[.65rem] uppercase leading-[normal] tracking-[.1em] text-muted">Capabilities</p>
        <ul className="border-t border-line">
          {service.capabilities.map((capability, index) => (
            <li key={capability.title} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line py-6">
              <span className="pt-[.3rem] font-mono text-[.6rem] leading-[normal] text-accent">{padIndex(index + 1)}</span>
              <div>
                <h3 className="mb-[.6rem] text-[clamp(1.2rem,1.65vw,1.7rem)] font-medium leading-[1.2] tracking-[-.025em]">
                  {capability.title}
                </h3>
                <p className="max-w-[49ch] text-[.95rem] leading-[1.6] text-muted">{capability.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
