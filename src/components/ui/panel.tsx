import * as React from 'react'

import { cn } from '@/lib/utils'

const tones = {
  glass: 'border-line-strong bg-canvas/55 backdrop-blur-md',
  surface: 'border-line bg-surface',
  canvas: 'border-line bg-canvas',
  signal: 'border-signal-bright/40 bg-signal text-ink',
  silver: 'border-transparent bg-silver text-canvas',
}

type PanelProps = React.HTMLAttributes<HTMLElement> & {
  as?: 'div' | 'article' | 'section'
  tone?: keyof typeof tones
  notch?: string
}

// Card with a clipped top-right corner. clip-path cuts the border off at the
// corner, so the diagonal edge is drawn back in with a 1px rule.
export function Panel({ as: Comp = 'div', tone = 'surface', notch = '1.25rem', className, style, children, ...props }: PanelProps) {
  return (
    <Comp
      className={cn('notch relative border', tones[tone], className)}
      style={{ '--notch': notch, ...style } as React.CSSProperties}
      {...props}
    >
      {tone !== 'silver' ? (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute top-0 h-px origin-left rotate-45',
            tone === 'signal' ? 'bg-signal-bright/40' : 'bg-line-strong',
          )}
          style={{ left: `calc(100% - ${notch} - 0.5px)`, width: `calc(${notch} * 1.4142 + 1px)` }}
        />
      ) : null}
      {children}
    </Comp>
  )
}
