import { cn } from '@/lib/utils'

import { Crosshair } from './crosshair'

export function RadarPulse({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('relative aspect-square', className)}>
      {[100, 76, 52].map((size) => (
        <span
          key={size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal-bright/15"
          style={{ width: `${size}%`, height: `${size}%` }}
        />
      ))}
      <span className="absolute inset-0 animate-pulse-ring rounded-full border border-signal-bright/50" />
      <span className="absolute inset-0 animate-pulse-ring rounded-full border border-signal-bright/40 [animation-delay:1.6s]" />
      <span className="absolute left-1/2 top-1/2 size-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/30 blur-2xl" />
      <span className="absolute left-1/2 top-1/2 flex size-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-signal-bright bg-canvas/60 shadow-[0_0_40px_rgb(61_155_224/0.55)]">
        <Crosshair className="size-1/2 text-ink" />
      </span>
    </div>
  )
}
