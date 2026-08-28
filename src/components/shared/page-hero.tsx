import * as React from 'react'

import { Reveal } from '@/components/motion/reveal'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

type PageHeroProps = {
  /** Right-hand field of the timecode label, e.g. `CAPABILITIES`. */
  eyebrow?: string
  /** Left-hand field. Defaults to the company slate. */
  index?: string
  title: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

/**
 * Interior page header.
 *
 * Asymmetric by default: the heading takes columns 1–7 and the standfirst
 * columns 9–12, so no interior page opens with a centred stack. The nav is
 * `fixed`, so this opens its own clearance — `--nav-height` plus the section
 * rhythm — rather than relying on document flow.
 */
export function PageHero({
  eyebrow,
  index = 'Parklane Media',
  title,
  description,
  children,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'border-b border-border bg-canvas',
        'pb-18 pt-[calc(var(--nav-height)+2.5rem)] lg:pb-24 lg:pt-[calc(var(--nav-height)+5rem)]',
        className,
      )}
    >
      <Container>
        <TimecodeLabel index={index} label={eyebrow} />

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h1 className="text-h2">{title}</h1>
          </Reveal>

          {description ? (
            <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9 lg:self-end">
              <div className="max-w-copy text-lead text-muted">{description}</div>
            </Reveal>
          ) : null}
        </div>

        {children}
      </Container>
    </section>
  )
}
