'use client'

import { useEffect, useState } from 'react'

/**
 * SSR-safe media query hook.
 *
 * Always returns `false` on the server and on the first client render, then
 * settles in an effect. That ordering matters: it means the *reduced* / mobile
 * experience is what renders first, so nothing janky flashes before hydration
 * and there is never a hydration mismatch.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)

    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
