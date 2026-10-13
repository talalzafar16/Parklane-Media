import * as React from 'react'

import { cn } from '@/lib/utils'

export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('shell', className)} {...props} />
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: 'canvas' | 'surface'
  ruled?: boolean
}

export function Section({ className, tone = 'canvas', ruled = false, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        'section-y relative',
        tone === 'surface' ? 'bg-surface' : 'bg-canvas',
        ruled && 'border-t border-line',
        className,
      )}
      {...props}
    />
  )
}
