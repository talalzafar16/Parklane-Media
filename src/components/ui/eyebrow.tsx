import * as React from 'react'

import { cn } from '@/lib/utils'

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement> & {
  marker?: string | null
  tone?: 'signal' | 'split' | 'muted'
}

// "// CAPABILITIES" — `split` keeps the marker blue and the text white.
export function Eyebrow({ marker = '//', tone = 'signal', className, children, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'label flex items-center gap-3',
        tone === 'signal' && 'text-signal-bright',
        tone === 'split' && 'text-ink',
        tone === 'muted' && 'text-muted',
        className,
      )}
      {...props}
    >
      {marker ? (
        <span aria-hidden="true" className={cn(tone !== 'muted' && 'text-signal-bright')}>
          {marker}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  )
}
