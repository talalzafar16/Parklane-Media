import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

import { CountUp } from '@/components/motion/count-up'
import { Panel } from '@/components/ui/panel'
import { hasDraftTestimonials, hasIllustrativeStats, stats, testimonials, type Stat } from '@/data/proof'
import { cn } from '@/lib/utils'

import { TestimonialCarousel } from './testimonial-carousel'

const LEVELS = [38, 62, 48, 80, 56, 92, 70, 100, 64, 84, 52, 74, 44, 66, 30, 54]

export function ProofGrid() {
  const { campaigns, commitment, audience, markets } = stats
  const notes = [
    hasIllustrativeStats && '* Illustrative figures pending verification.',
    hasDraftTestimonials && 'Testimonials are drafts awaiting client approval.',
  ].filter(Boolean)

  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        <Panel tone="signal" notch="1.5rem" className="flex min-h-[24rem] flex-col justify-between overflow-hidden p-6">
          <Image
            src="/images/services/event-branding-sponsorship.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-45 mix-blend-luminosity"
          />
          <div className="label relative flex items-center justify-between text-ink">
            {campaigns.label}
            <span className="inline-flex size-8 items-center justify-center bg-ink text-canvas">
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </span>
          </div>
          <div className="notch relative mt-16 bg-ink p-5 text-canvas [--notch:0.9rem]">
            <Figure stat={campaigns} />
            <p className="mt-3 text-small">{campaigns.caption}</p>
          </div>
        </Panel>

        <Panel tone="silver" notch="1.5rem" className="flex flex-col p-6">
          <p className="label text-canvas/70">{commitment.label}</p>
          <Figure stat={commitment} className="mt-3" />
          <TestimonialCarousel testimonials={testimonials} className="mt-8 flex-1" />
        </Panel>

        <div className="grid gap-3 md:col-span-2 md:grid-cols-2 lg:col-span-1 lg:grid-cols-1 lg:grid-rows-[1fr_auto] lg:gap-4">
          <Panel tone="glass" notch="1.5rem" className="flex flex-col justify-between p-6">
            <p className="label text-muted">{audience.label}</p>
            <div className="mt-8">
              <div aria-hidden="true" className="flex h-12 items-end gap-1">
                {LEVELS.map((level, index) => (
                  <span
                    key={index}
                    className={cn('w-full', level > 80 ? 'bg-signal-bright' : 'bg-signal-bright/40')}
                    style={{ height: `${level}%` }}
                  />
                ))}
              </div>
              <Figure stat={audience} className="mt-6 text-signal-bright" />
              <p className="mt-3 max-w-[30ch] text-small text-muted">{audience.caption}</p>
            </div>
          </Panel>

          <Panel tone="canvas" notch="1rem" className="flex items-center justify-between gap-4 p-6">
            <p className="label text-muted">{markets.label}</p>
            <Figure stat={markets} className="text-[2.75rem]" />
          </Panel>
        </div>
      </div>

      {notes.length ? <p className="mt-6 text-center text-[0.75rem] text-muted">{notes.join(' ')}</p> : null}
    </div>
  )
}

function Figure({ stat, className }: { stat: Stat; className?: string }) {
  return (
    <p className={cn('text-[clamp(2.75rem,2rem+3vw,4.5rem)] font-light leading-none tracking-[-0.05em]', className)}>
      <CountUp value={stat.value} suffix={stat.suffix} />
      {stat.illustrative ? (
        <sup className="ml-1 text-[0.35em] opacity-70">
          *<span className="sr-only"> illustrative figure</span>
        </sup>
      ) : null}
    </p>
  )
}
