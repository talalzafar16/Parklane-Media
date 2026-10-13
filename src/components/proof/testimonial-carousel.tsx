'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react'

import { useMotionProfile } from '@/hooks/use-motion-profile'
import type { Testimonial } from '@/data/proof'
import { cn, padIndex } from '@/lib/utils'

const INTERVAL_MS = 7000

const control =
  'inline-flex size-11 items-center justify-center border border-canvas/20 transition-colors hover:bg-canvas/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-bright'

// Auto-advances; hover or focus holds it, Pause stops it, reduced motion turns it off.
// Changes are only announced when the visitor is driving it.
export function TestimonialCarousel({ testimonials, className }: { testimonials: Testimonial[]; className?: string }) {
  const count = testimonials.length
  const { reduced } = useMotionProfile()
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const [held, setHeld] = React.useState(false)

  const playing = count > 1 && !paused && !held && !reduced

  React.useEffect(() => {
    if (!playing) return
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), INTERVAL_MS)
    return () => window.clearTimeout(timer)
  }, [playing, index, count])

  const step = (direction: 1 | -1) => setIndex((current) => (current + direction + count) % count)
  const testimonial = testimonials[index]

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className={cn('flex flex-col', className)}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false)
      }}
    >
      <Quote aria-hidden="true" className="size-6 opacity-40" strokeWidth={1.25} />

      <div aria-live={playing ? 'off' : 'polite'} aria-atomic="true" className="mt-4 min-h-[9.5rem] flex-1">
        <figure key={index} aria-label={`${index + 1} of ${count}`} className="duration-500 animate-in fade-in">
          <blockquote className="text-lead leading-snug tracking-[-0.01em]">“{testimonial.quote}”</blockquote>
          <figcaption className="mt-4 text-small">
            {testimonial.name} · {testimonial.company}
            {testimonial.draft ? (
              <span className="label ml-2 inline-block border border-canvas/30 px-1.5 py-0.5 text-[0.625rem] opacity-80">Draft</span>
            ) : null}
          </figcaption>
        </figure>
      </div>

      <div className="mt-6 h-px bg-canvas/15" aria-hidden="true">
        <span
          key={`${index}-${playing}`}
          className={cn('block h-full origin-left bg-signal', playing ? 'animate-progress' : 'scale-x-0')}
          style={{ '--progress-duration': `${INTERVAL_MS}ms` } as React.CSSProperties}
        />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <button type="button" className={control} onClick={() => step(-1)} aria-label="Previous testimonial">
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <button type="button" className={control} onClick={() => step(1)} aria-label="Next testimonial">
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <p className="label tabular-nums" aria-hidden="true">
          {padIndex(index + 1)} / {padIndex(count)}
        </p>

        {!reduced && count > 1 ? (
          <button type="button" className={cn(control, 'w-auto gap-2 px-3')} onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
            {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
            <span className="label">{paused ? 'Play' : 'Pause'}</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}
