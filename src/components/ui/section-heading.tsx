import * as React from 'react'

import { Reveal } from '@/components/motion/reveal'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  /** Right-hand field of the timecode label, e.g. `CAPABILITIES`. */
  eyebrow?: string
  /** Left-hand field, e.g. `SEC. 02`. */
  index?: string
  title: React.ReactNode
  description?: React.ReactNode
  /** Heading level — pages keep exactly one h1, so sections default to h2. */
  as?: 'h2' | 'h3'
  tone?: 'light' | 'dark'
  className?: string
  id?: string
}

/**
 * Section header. Always left-aligned and asymmetric — the CTA band is the one
 * place on the site that centres, and it does not use this component.
 *
 * The heading sits at columns 1–7 and any standfirst at 9–12, which is the
 * default rhythm the rest of the page is built on.
 */
export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  as: Heading = 'h2',
  tone = 'light',
  className,
  id,
}: SectionHeadingProps) {
  const onDark = tone === 'dark'

  return (
    <div className={cn('grid gap-8 lg:grid-cols-12 lg:gap-10', className)}>
      <Reveal className="lg:col-span-7">
        {eyebrow || index ? (
          <TimecodeLabel
            index={index ?? 'Parklane Media'}
            label={eyebrow}
            tone={onDark ? 'onDark' : 'default'}
            className="mb-8"
          />
        ) : null}

        <Heading
          id={id}
          className={cn(
            Heading === 'h2' ? 'text-h2' : 'text-h3',
            'max-w-[16ch]',
            onDark && 'text-white',
          )}
        >
          {title}
        </Heading>
      </Reveal>

      {description ? (
        <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <div className={cn('max-w-copy text-lead', onDark ? 'text-white/70' : 'text-muted')}>
            {description}
          </div>
        </Reveal>
      ) : null}
    </div>
  )
}
