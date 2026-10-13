'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'

import { EASE_BRAND, REVEAL_DURATION, STAGGER, viewportOnce } from '@/lib/motion'
import { useMotionProfile } from '@/hooks/use-motion-profile'

type Tag = 'div' | 'ul' | 'ol' | 'li'

const motionTag: Record<Tag, React.ElementType> = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
}

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  as?: Tag
  delay?: number
}

const SETTLED = { opacity: 1, y: 0, transition: { duration: 0 } }

function itemVariants(reduced: boolean, rise: boolean, delay = 0): Variants {
  if (reduced) return { hidden: SETTLED, visible: SETTLED }
  return {
    hidden: { opacity: 0, y: rise ? 24 : 0 },
    visible: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: EASE_BRAND, delay } },
  }
}

// `reduced` settles one render after mount. Keep the same motion component and
// switch to animate="visible" — swapping to a plain element would leave the
// opacity:0 framer already wrote stuck on the node.
function triggerProps(reduced: boolean) {
  return reduced
    ? ({ initial: false, animate: 'visible' } as const)
    : ({ initial: 'hidden', whileInView: 'visible', viewport: viewportOnce } as const)
}

// data-reveal pairs with the <noscript> rule in the root layout.
export function Reveal({ as = 'div', delay, children, ...props }: RevealProps) {
  const { reduced, fullMotion } = useMotionProfile()
  const Comp = motionTag[as]

  return (
    <Comp data-reveal="" variants={itemVariants(reduced, fullMotion, delay)} {...triggerProps(reduced)} {...props}>
      {children}
    </Comp>
  )
}

export function RevealGroup({ as = 'div', children, ...props }: RevealProps) {
  const { reduced } = useMotionProfile()
  const Comp = motionTag[as]
  const variants: Variants = {
    hidden: {},
    visible: { transition: reduced ? {} : { staggerChildren: STAGGER, delayChildren: 0.05 } },
  }

  return (
    <Comp variants={variants} {...triggerProps(reduced)} {...props}>
      {children}
    </Comp>
  )
}

export function RevealItem({ as = 'div', children, ...props }: RevealProps) {
  const { reduced, fullMotion } = useMotionProfile()
  const Comp = motionTag[as]

  return (
    <Comp data-reveal="" variants={itemVariants(reduced, fullMotion)} {...props}>
      {children}
    </Comp>
  )
}
