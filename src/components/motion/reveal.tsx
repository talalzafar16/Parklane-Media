'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'

import { DURATION, EASE_BRAND, STAGGER, viewportOnce } from '@/lib/motion'
import { useMotionProfile } from '@/hooks/use-motion-profile'
import { cn } from '@/lib/utils'

type Tag = 'div' | 'section' | 'article' | 'li' | 'ul' | 'ol' | 'header'

/**
 * Typed as `ElementType` rather than the exact union of motion components:
 * TypeScript will not accept one set of props against a union of element
 * types (a div's `onCopy` is not an li's), and the alternative is a generic
 * signature that makes every call site noisier than it is worth.
 */
const motionTag: Record<Tag, React.ElementType> = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  header: motion.header,
}

/**
 * Reduced motion renders the *same* motion component, just parked at its final
 * state — it never falls back to a plain element.
 *
 * That matters because `useReducedMotion()` resolves in an effect, one render
 * after mount. Swapping the component type at that point leaves React
 * reconciling the same DOM node, and the `opacity: 0` Framer already wrote
 * imperatively is not a prop React knows to clear — so the element would stay
 * invisible forever. Keeping the component identical and switching to
 * `initial={false} animate="visible"` resolves correctly from either direction.
 */
function revealMotionProps(reduced: boolean) {
  return reduced
    ? ({ initial: false, animate: 'visible' } as const)
    : ({ initial: 'hidden', whileInView: 'visible', viewport: viewportOnce } as const)
}

/** Final resting state, shared by every reduced-motion variant below. */
const SETTLED = { opacity: 1, y: 0, transition: { duration: 0 } }

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: Tag
  /** Seconds. Use sparingly — `RevealGroup` handles row staggering. */
  delay?: number
  children: React.ReactNode
}

/**
 * The standard section entrance: fade + 24px rise, 0.6s, fires once.
 * Mobile drops the rise and fades only; reduced motion does not move at all.
 *
 * `data-reveal` pairs with a <noscript> rule in the root layout so the content
 * is still visible if JavaScript never runs.
 */
export function Reveal({ as = 'div', delay = 0, className, children, ...props }: RevealProps) {
  const { reduced, allowTransform } = useMotionProfile()
  const Comp = motionTag[as]

  const variants: Variants = reduced
    ? { hidden: SETTLED, visible: SETTLED }
    : {
        hidden: { opacity: 0, y: allowTransform ? 24 : 0 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: DURATION.section, ease: EASE_BRAND, delay },
        },
      }

  return (
    <Comp data-reveal="" className={cn(className)} variants={variants} {...revealMotionProps(reduced)} {...props}>
      {children}
    </Comp>
  )
}

/** Parent for a row of cards — staggers its `RevealItem` children by 80ms. */
export function RevealGroup({ as = 'div', className, children, ...props }: RevealProps) {
  const { reduced } = useMotionProfile()
  const Comp = motionTag[as]

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: STAGGER, delayChildren: 0.05 },
    },
  }

  return (
    <Comp className={cn(className)} variants={variants} {...revealMotionProps(reduced)} {...props}>
      {children}
    </Comp>
  )
}

/** Child of `RevealGroup`. Inherits the animation state from its parent. */
export function RevealItem({ as = 'div', className, children, ...props }: RevealProps) {
  const { reduced, allowTransform } = useMotionProfile()
  const Comp = motionTag[as]

  const variants: Variants = reduced
    ? { hidden: SETTLED, visible: SETTLED }
    : {
        hidden: { opacity: 0, y: allowTransform ? 24 : 0 },
        visible: { opacity: 1, y: 0, transition: { duration: DURATION.section, ease: EASE_BRAND } },
      }

  return (
    <Comp data-reveal="" className={cn(className)} variants={variants} {...props}>
      {children}
    </Comp>
  )
}
