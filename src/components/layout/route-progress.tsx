'use client'

import * as React from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

import { EASE_BRAND } from '@/lib/motion'
import { useMotionProfile } from '@/hooks/use-motion-profile'

/**
 * Thin brand-blue bar that wipes across the top on route change.
 *
 * The App Router gives no navigation-start event in Next 14, so the bar is
 * started by a captured click on any internal <a> and completed when
 * `usePathname()` actually changes. That ordering means the bar shows up during
 * the wait — which is the whole point — rather than after the page has landed.
 *
 * Suppressed entirely under `prefers-reduced-motion`.
 */
export function RouteProgress() {
  const pathname = usePathname()
  const { reduced } = useMotionProfile()
  const [loading, setLoading] = React.useState(false)
  const settleTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    if (reduced) return

    const onClick = (event: MouseEvent) => {
      // Ignore modified clicks — those open a new tab, the page never changes.
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Same page, or a pure hash jump — no navigation to indicate.
      if (url.pathname === window.location.pathname) return

      setLoading(true)
    }

    document.addEventListener('click', onClick, { capture: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [reduced])

  // Navigation finished: let the bar complete, then clear it.
  React.useEffect(() => {
    if (!loading) return

    settleTimer.current = setTimeout(() => setLoading(false), 280)
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  React.useEffect(() => () => {
    if (settleTimer.current) clearTimeout(settleTimer.current)
  }, [])

  if (reduced) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="route-progress"
            className="h-full origin-left bg-brand"
            initial={{ scaleX: 0, opacity: 1 }}
            // Creeps to 90% while waiting, so it never looks finished early.
            animate={{ scaleX: 0.9, opacity: 1 }}
            exit={{
              scaleX: 1,
              opacity: 0,
              // Snap to full, then fade — the completing half of the wipe.
              transition: {
                scaleX: { duration: 0.2, ease: EASE_BRAND },
                opacity: { duration: 0.25, ease: EASE_BRAND, delay: 0.15 },
              },
            }}
            transition={{ scaleX: { duration: 0.8, ease: EASE_BRAND } }}
          />
        ) : null}
      </AnimatePresence>
    </div>
  )
}
