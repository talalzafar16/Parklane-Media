import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Magnetic } from '@/components/motion/magnetic'
import { Reveal } from '@/components/motion/reveal'
import { Block } from '@/components/system/block'
import { Frame } from '@/components/system/frame'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { cn } from '@/lib/utils'

type EmptyStateProps = {
  eyebrow: string
  index?: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  /** Optional secondary line, e.g. a note about what is coming. */
  note?: string
  /** Caption for the holding frame alongside the copy. */
  frameCaption?: string
  className?: string
}

/**
 * Holding space for sections whose data arrays are still empty.
 *
 * A deliberate composition, not an error path: no "no results" message, no
 * empty grid, no blank screen. Asymmetric like every other section — copy at
 * columns 1–6, a captioned Frame at 8–12.
 */
export function EmptyState({
  eyebrow,
  index = 'Parklane Media',
  title,
  description,
  ctaLabel,
  ctaHref,
  note,
  frameCaption = 'Reserved',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('border-t border-border pt-12', className)}>
      <TimecodeLabel index={index} label={eyebrow} />

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <h2 className="max-w-[14ch] text-h2">{title}</h2>
          <p className="mt-8 max-w-copy text-lead text-muted">{description}</p>
          {note ? <p className="micro mt-6 text-muted">{note}</p> : null}

          <Magnetic className="mt-10">
            <Block asChild size="lg">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Block>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-5 lg:col-start-8">
          <Frame ratio="3/2" caption={frameCaption} />
        </Reveal>
      </div>
    </div>
  )
}
