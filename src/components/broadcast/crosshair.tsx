import { cn } from '@/lib/utils'

export function Crosshair({ variant = 'plus', className }: { variant?: 'plus' | 'node'; className?: string }) {
  if (variant === 'node') {
    return (
      <svg viewBox="0 0 40 40" aria-hidden="true" className={cn('size-10 text-signal-bright', className)} fill="none" stroke="currentColor">
        <circle cx="20" cy="20" r="18.5" strokeOpacity="0.18" />
        <circle cx="20" cy="20" r="12" strokeOpacity="0.4" />
        <circle cx="20" cy="20" r="7" fill="currentColor" fillOpacity="0.25" stroke="none" />
        <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
        <path d="M20 0v8M20 32v8M0 20h8M32 20h8" strokeOpacity="0.6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn('size-6 text-muted', className)} fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="6.5" />
      <path d="M12 0v24M0 12h24" />
    </svg>
  )
}
