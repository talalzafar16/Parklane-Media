'use client'

import * as React from 'react'
import { animate } from 'framer-motion'

import { DURATION, EASE_BRAND } from '@/lib/motion'
import { useMotionProfile } from '@/hooks/use-motion-profile'
import { cn } from '@/lib/utils'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

/**
 * Counts up once on mount. Used only in the hero, where the numbers are counts
 * of real data (capabilities and services) rather than claimed metrics.
 *
 * Two details worth keeping:
 *  • The final number is what renders on the server, so the real figure is in
 *    the HTML for crawlers and for anyone without JavaScript. A layout effect
 *    resets it to zero after hydration — before paint, so nothing flickers.
 *  • Digits are written straight to the DOM node instead of through state,
 *    which keeps ~48 frames of counting from re-rendering the React tree. The
 *    accessible name is set once, so screen readers announce "06", not every
 *    intermediate value.
 */
export function CountUp({
  value,
  /** Zero-pads to this width, e.g. 2 → "06". */
  pad = 0,
  suffix = '',
  className,
}: {
  value: number
  pad?: number
  suffix?: string
  className?: string
}) {
  const numberRef = React.useRef<HTMLSpanElement>(null)
  const { reduced } = useMotionProfile()

  const format = React.useCallback(
    (n: number) => String(Math.round(n)).padStart(pad, '0'),
    [pad],
  )

  useIsomorphicLayoutEffect(() => {
    if (reduced) return
    if (numberRef.current) numberRef.current.textContent = format(0)
  }, [reduced, format])

  React.useEffect(() => {
    if (reduced) {
      if (numberRef.current) numberRef.current.textContent = format(value)
      return
    }

    const controls = animate(0, value, {
      duration: DURATION.slow,
      ease: EASE_BRAND,
      onUpdate: (latest) => {
        if (numberRef.current) numberRef.current.textContent = format(latest)
      },
    })

    return () => controls.stop()
  }, [reduced, value, format])

  return (
    <span className={cn('tabular-nums', className)}>
      {/* Screen readers get the final figure once, not every frame. */}
      <span className="sr-only">{`${format(value)}${suffix}`}</span>
      <span aria-hidden="true">
        <span ref={numberRef}>{format(value)}</span>
        {suffix}
      </span>
    </span>
  )
}
