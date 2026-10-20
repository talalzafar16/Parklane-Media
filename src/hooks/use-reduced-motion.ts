'use client'

import { useMediaQuery } from './use-media-query'

// Not framer's useReducedMotion: it reads matchMedia during the first client
// render, so markup that branches on it wouldn't match the server HTML.
export function useReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
