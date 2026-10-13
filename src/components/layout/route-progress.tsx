'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import { EASE_BRAND } from '@/lib/motion'
import { useMotionProfile } from '@/hooks/use-motion-profile'

// The App Router has no navigation-start event, so the bar starts on a click on
// any internal link and finishes when the pathname changes.
export function RouteProgress() {
  const pathname = usePathname()
  const { reduced } = useMotionProfile()
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (reduced) return

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin === window.location.origin && url.pathname !== window.location.pathname) setLoading(true)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [reduced])

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 280)
    return () => clearTimeout(timer)
  }, [pathname])

  if (reduced) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="route-progress"
            className="h-full origin-left bg-signal-bright shadow-[0_0_12px_rgb(61_155_224/0.8)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.9 }}
            exit={{
              scaleX: 1,
              opacity: 0,
              transition: { scaleX: { duration: 0.2, ease: EASE_BRAND }, opacity: { duration: 0.25, delay: 0.15 } },
            }}
            transition={{ duration: 0.8, ease: EASE_BRAND }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
