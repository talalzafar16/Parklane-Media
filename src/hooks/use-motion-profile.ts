'use client'

import { useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '@/hooks/use-media-query'

export type MotionProfile = {
  /** The visitor asked their OS for reduced motion. Nothing may move. */
  reduced: boolean
  /** Big screen with a precise pointer — the only place we run pointer effects. */
  isDesktop: boolean
  /** Fade + rise allowed. On mobile we fall back to fade-only. */
  allowTransform: boolean
  /** Parallax on case-study covers. Desktop only. */
  allowParallax: boolean
  /** Magnetic primary CTAs. Desktop only. */
  allowMagnetic: boolean
}

/**
 * One place that decides how much motion this visitor gets.
 *
 * Every animated component reads from here rather than testing breakpoints or
 * `prefers-reduced-motion` on its own, so the rules stay consistent:
 * mobile gets fades only, desktop gets the full set, reduced motion gets none.
 */
export function useMotionProfile(): MotionProfile {
  const prefersReduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px) and (pointer: fine)')

  const reduced = Boolean(prefersReduced)

  return {
    reduced,
    isDesktop,
    allowTransform: !reduced && isDesktop,
    allowParallax: !reduced && isDesktop,
    allowMagnetic: !reduced && isDesktop,
  }
}
