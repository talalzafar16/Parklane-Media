import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom font-size scale keys, declared to tailwind-merge.
 *
 * Without this, `cn('text-display', 'text-brand-dark')` silently drops
 * `text-display`: tailwind-merge cannot tell a custom `text-*` size from a
 * `text-*` colour, so it treats them as one conflicting group and keeps the
 * last one. That is a near-invisible failure — the heading just renders at body
 * size — so every custom key in `fontSize` must be listed here.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['micro', 'small', 'body', 'lead', 'h4', 'h3', 'h2', 'display'] }],
    },
  },
})

/** shadcn/ui's class helper: conditional classes with conflict-aware merging. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
