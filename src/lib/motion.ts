import type { Transition, Variants } from 'framer-motion'

/**
 * The motion contract for this site.
 *
 * Rules baked in here (see README → "Animation rules"):
 *   • one easing curve everywhere: cubic-bezier(.22, 1, .36, 1)
 *   • nothing runs longer than 800ms
 *   • tween only — no springs, so nothing ever overshoots
 *   • sections enter once: fade + 24px rise
 *   • cards in a row stagger by 80ms
 */

export const EASE_BRAND = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.2,
  base: 0.35,
  section: 0.6,
  slow: 0.8, // hard ceiling
} as const

export const STAGGER = 0.08 // 80ms between cards in a row

export const transition: Transition = {
  duration: DURATION.section,
  ease: EASE_BRAND,
}

/** Section enter: fade + 24px rise, once. Pair with `viewportOnce`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
}

/** Same, but with no vertical travel — used on mobile and for reduced motion. */
export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.section, ease: EASE_BRAND } },
}

/** Parent wrapper that staggers its `fadeUp` children. */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.05 },
  },
}

/** Hero headline: one word at a time. Hero only — never reused elsewhere. */
export const wordParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

export const wordChild: Variants = {
  hidden: { opacity: 0, y: '0.5em' },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_BRAND } },
}

/** Shared viewport config — every section reveal fires exactly once. */
export const viewportOnce = { once: true, amount: 0.2 } as const
