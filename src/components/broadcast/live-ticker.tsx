import type { CSSProperties } from 'react'

import { RecDot } from './rec-dot'

// The list renders twice and the track slides by half its width for a seamless loop.
export function LiveTicker({ items, duration = 48 }: { items: string[]; duration?: number }) {
  const list = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="display whitespace-nowrap px-8 text-[1.75rem] leading-none tracking-wide text-ink">{item}</span>
          <span aria-hidden="true" className="size-1.5 rotate-45 bg-ink/60" />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="relative flex items-stretch overflow-hidden border-y border-line bg-signal">
      <p className="label relative z-10 flex shrink-0 items-center gap-2 bg-canvas px-5 text-ink">
        <RecDot />
        On air
      </p>
      <div className="flex min-w-0 flex-1 overflow-hidden py-4">
        <div
          className="marquee-track flex w-max animate-ticker motion-reduce:animate-none"
          style={{ '--ticker-duration': `${duration}s` } as CSSProperties}
        >
          {list(false)}
          {list(true)}
        </div>
      </div>
    </div>
  )
}
