'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

import { useMotionProfile } from '@/hooks/use-motion-profile'
import { cn } from '@/lib/utils'

const MAX_OFFSET = 12
const RADIUS = 40
const STRENGTH = 0.3

// Leans the child toward the cursor once it's within RADIUS px of its edge.
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const { fullMotion } = useMotionProfile()
  const ref = React.useRef<HTMLSpanElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  // Overdamped so it settles without overshoot.
  const springX = useSpring(x, { stiffness: 200, damping: 30, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 200, damping: 30, mass: 0.5 })

  React.useEffect(() => {
    if (!fullMotion) return

    const clamp = (value: number) => Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, value))
    const reset = () => {
      x.set(0)
      y.set(0)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      // Distance from the edge, not the centre, so wide and narrow buttons behave alike.
      const gap = Math.hypot(Math.max(0, Math.abs(dx) - rect.width / 2), Math.max(0, Math.abs(dy) - rect.height / 2))

      if (gap > RADIUS) return reset()
      x.set(clamp(dx * STRENGTH))
      y.set(clamp(dy * STRENGTH))
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', reset)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', reset)
      reset()
    }
  }, [fullMotion, x, y])

  return (
    <motion.span
      ref={ref}
      className={cn('inline-flex', className)}
      style={fullMotion ? { x: springX, y: springY } : undefined}
    >
      {children}
    </motion.span>
  )
}
