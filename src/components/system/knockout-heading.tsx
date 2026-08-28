'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'

import { useMotionProfile } from '@/hooks/use-motion-profile'
import { EASE_BRAND } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Level = 'h1' | 'h2' | 'h3'

const motionTag: Record<Level, React.ElementType> = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
}

type KnockoutHeadingProps = {
  /** Heading text with the knockout word omitted. `\n` splits lines. */
  lead: string
  /** The word that sits inside the filled brand block. */
  knockout: string
  as?: Level
  /** `display` for the hero and the CTA band, `h2` everywhere else. */
  size?: 'display' | 'h2' | 'h3'
  className?: string
  id?: string
}

const sizeClass = {
  display: 'text-display',
  h2: 'text-h2',
  h3: 'text-h3',
} as const

const LINE_DURATION = 0.7
const LINE_STAGGER = 0.06

/**
 * A heading with one word reversed out of a solid brand block — the logo's
 * construction applied to typography.
 *
 * Motion: each line mask-reveals upward, then the block's fill wipes in
 * left-to-right once the text has landed. The fill is a separate absolutely
 * positioned layer behind the word, so the wipe never reflows the line box.
 *
 * The viewport trigger sits on the heading itself, never on the lines. Each
 * line starts translated fully outside its own `overflow: hidden` mask, and an
 * ancestor's clip is applied when the browser computes intersection — so a
 * line's own intersection ratio is 0 and an `amount` threshold on it could
 * never be met. Driving the whole thing from the unclipped heading via
 * variants avoids that trap entirely.
 */
export function KnockoutHeading({
  lead,
  knockout,
  as: Tag = 'h2',
  size = 'h2',
  className,
  id,
}: KnockoutHeadingProps) {
  const { reduced } = useMotionProfile()
  const MotionTag = motionTag[Tag]

  const lines = React.useMemo(() => lead.split('\n').filter(Boolean), [lead])

  // The fill only starts once the last line has essentially landed.
  const wipeDelay = lines.length * LINE_STAGGER + LINE_DURATION * 0.6

  const settled = { y: '0%', transition: { duration: 0 } }
  const lineVariants: Variants = reduced
    ? { hidden: settled, visible: settled }
    : {
        hidden: { y: '110%' },
        visible: {
          y: '0%',
          transition: { duration: LINE_DURATION, ease: EASE_BRAND },
        },
      }

  const fillVariants: Variants = reduced
    ? { hidden: { scaleX: 1 }, visible: { scaleX: 1, transition: { duration: 0 } } }
    : {
        hidden: { scaleX: 0 },
        visible: {
          scaleX: 1,
          transition: { duration: 0.5, ease: EASE_BRAND, delay: wipeDelay },
        },
      }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : LINE_STAGGER } },
  }

  const motionProps = reduced
    ? ({ initial: false, animate: 'visible' } as const)
    : ({
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.3 },
      } as const)

  return (
    <MotionTag
      id={id}
      data-reveal=""
      className={cn(sizeClass[size], 'text-brand-dark', className)}
      variants={containerVariants}
      {...motionProps}
    >
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block overflow-hidden">
          <motion.span className="block" variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}

      <span className="block overflow-hidden">
        <motion.span
          className="relative inline-block px-[0.22em] pb-[0.04em] text-white"
          variants={lineVariants}
        >
          {/* Fill sits behind the word and wipes in from the left. */}
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 origin-left bg-brand"
            variants={fillVariants}
          />
          <span className="relative">{knockout}</span>
        </motion.span>
      </span>
    </MotionTag>
  )
}
