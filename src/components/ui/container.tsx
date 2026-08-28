import * as React from 'react'

import { cn } from '@/lib/utils'

/** 1280px max width, 24px gutters. The one horizontal rhythm on the site. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('container-px', className)} {...props} />
}

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  /** Alternating section background, per the brand spec. */
  tone?: 'canvas' | 'tint' | 'white' | 'dark'
  /** Set false to manage vertical padding yourself (e.g. the hero). */
  padded?: boolean
  as?: 'section' | 'div' | 'article' | 'aside'
}

const toneClasses: Record<NonNullable<SectionProps['tone']>, string> = {
  canvas: 'bg-canvas',
  tint: 'bg-brand-tint',
  white: 'bg-white',
  dark: 'bg-brand-dark text-white',
}

/** Vertical rhythm: 72px on mobile, 128px from `lg` up. */
export function Section({
  className,
  tone = 'canvas',
  padded = true,
  as: Comp = 'section',
  ...props
}: SectionProps) {
  return (
    <Comp className={cn(toneClasses[tone], padded && 'section-y', className)} {...props} />
  )
}
