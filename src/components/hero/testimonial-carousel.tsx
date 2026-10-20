'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, Quote, Star } from 'lucide-react'

import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { padIndex } from '@/lib/utils'

const INTERVAL_MS = 7000

const arrowClasses = 'grid h-11 w-7 place-items-center rounded-[20px] hover:bg-navy/[.08] focus-visible:outline-offset-2'

type TestimonialCarouselProps = {
  quotes: string[]
  attribution: string
  status: string
}

// Rotates every 7s. Hover or keyboard focus holds it, Pause stops it, and
// reduced motion turns autoplay off. Changes are announced only when paused.
export function TestimonialCarousel({ quotes, attribution, status }: TestimonialCarouselProps) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [held, setHeld] = useState(false)

  const rotating = !paused && !held && !reduced

  useEffect(() => {
    if (!rotating) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % quotes.length), INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [rotating, index, quotes.length])

  const move = (step: number) => setIndex((current) => (current + step + quotes.length) % quotes.length)

  return (
    <div
      className="relative mt-auto pt-6"
      role="region"
      aria-roledescription="carousel"
      aria-label="Draft client testimonials"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false)
      }}
    >
      <span className="flex gap-[3px] text-accent" aria-label="Template rating: 5 out of 5">
        {Array.from({ length: 5 }, (_, star) => (
          <Star key={star} size={15} fill="currentColor" aria-hidden="true" />
        ))}
      </span>
      <Quote className="absolute right-0 top-[2.4rem] w-[1.2rem] opacity-30" aria-hidden="true" />

      <div className="grid min-h-48 grid-cols-[28px_minmax(0,1fr)_28px] items-center gap-[.45rem] mobile:min-h-44">
        <button type="button" className={arrowClasses} onClick={() => move(-1)} aria-label="Previous testimonial">
          <ChevronLeft size={18} />
        </button>
        <div aria-live={rotating ? 'off' : 'polite'} aria-atomic="true">
          <blockquote className="my-[.7rem] text-[1.05rem] leading-[1.4] tracking-[-.02em] short:text-[.95rem]">
            “{quotes[index]}”
          </blockquote>
          <p className="text-[.65rem] leading-[1.5]">{attribution}</p>
          <p className="mt-[.2rem] text-[.6rem] leading-[1.5] opacity-70">{status}</p>
        </div>
        <button type="button" className={arrowClasses} onClick={() => move(1)} aria-label="Next testimonial">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between font-mono text-[.6rem] leading-[normal]">
        <span>
          {padIndex(index + 1)} / {padIndex(quotes.length)}
        </span>
        {reduced ? null : (
          <button
            type="button"
            className="flex min-h-8 items-center gap-[.3rem] focus-visible:outline-offset-2"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? 'Play testimonials' : 'Pause testimonials'}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />} {paused ? 'Play' : 'Pause'}
          </button>
        )}
      </div>
    </div>
  )
}
