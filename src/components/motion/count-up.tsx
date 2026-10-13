'use client'

import * as React from 'react'
import { animate, useInView } from 'framer-motion'

import { EASE_BRAND } from '@/lib/motion'
import { useMotionProfile } from '@/hooks/use-motion-profile'

// The final number is server-rendered (crawlers, no-JS), reset to 0 after
// hydration, then counted up in the DOM directly the first time it's seen.
export function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const { reduced } = useMotionProfile()
  const [armed, setArmed] = React.useState(false)

  React.useEffect(() => {
    if (reduced || inView || !ref.current) return
    ref.current.textContent = '0'
    setArmed(true)
  }, [reduced, inView])

  React.useEffect(() => {
    const node = ref.current
    if (!inView || !armed || !node) return
    const controls = animate(0, value, {
      duration: 1.2,
      ease: EASE_BRAND,
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [inView, armed, value])

  return (
    <span className="tabular-nums">
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span aria-hidden="true">
        <span ref={ref}>{value}</span>
        {suffix}
      </span>
    </span>
  )
}
