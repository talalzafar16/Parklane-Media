'use client'

import { useMediaQuery } from '@/hooks/use-media-query'

// Not framer's useReducedMotion: that reads matchMedia during the first client
// render, so markup branching on it doesn't match the server HTML (React #418).
export function useMotionProfile() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const desktop = useMediaQuery('(min-width: 1024px) and (pointer: fine)')

  return {
    reduced,
    // Movement beyond simple fades: rises, parallax, magnetic buttons.
    fullMotion: !reduced && desktop,
  }
}
