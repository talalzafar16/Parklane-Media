'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

import { useMotionProfile } from '@/hooks/use-motion-profile'
import { cn } from '@/lib/utils'

const MAX_OFFSET = 12 // px — keeps the nudge subtle rather than slippery

type MagneticProps = {
  children: React.ReactNode
  className?: string
  /** How far outside the button's edge the pull starts, in px. */
  radius?: number
  /** Fraction of the cursor offset the button travels. */
  strength?: number
}

/**
 * Magnetic wrapper for primary CTAs: the button leans toward the cursor once
 * it comes within `radius` px of the button's edge.
 *
 * Desktop with a fine pointer only, and never under `prefers-reduced-motion` —
 * both decided by `useMotionProfile`. The spring is deliberately overdamped
 * (ratio ≈ 1.5), so it settles without any overshoot or bounce.
 */
export function Magnetic({ children, className, radius = 40, strength = 0.3 }: MagneticProps) {
  const { allowMagnetic } = useMotionProfile()
  const ref = React.useRef<HTMLSpanElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  React.useEffect(() => {
    if (!allowMagnetic) return

    const clamp = (value: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value))

    const onPointerMove = (event: PointerEvent) => {
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)

      // Measure from the button's edge rather than its centre, so the 40px
      // radius means the same thing for a wide button as for a narrow one.
      const gapX = Math.max(0, Math.abs(dx) - rect.width / 2)
      const gapY = Math.max(0, Math.abs(dy) - rect.height / 2)

      if (Math.hypot(gapX, gapY) <= radius) {
        x.set(clamp(dx * strength))
        y.set(clamp(dy * strength))
      } else {
        x.set(0)
        y.set(0)
      }
    }

    const reset = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', reset)
    document.addEventListener('pointerleave', reset)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', reset)
      document.removeEventListener('pointerleave', reset)
      reset()
    }
  }, [allowMagnetic, radius, strength, x, y])

  if (!allowMagnetic) {
    return <span className={cn('inline-flex', className)}>{children}</span>
  }

  return (
    <motion.span
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.span>
  )
}
