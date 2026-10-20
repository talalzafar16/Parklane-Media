import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn('mb-[1.7rem] font-mono text-[.68rem] uppercase leading-[normal] tracking-[.12em] text-muted', className)}>
      {children}
    </p>
  )
}
