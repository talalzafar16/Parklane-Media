import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/** Category chips on work cards, plus the eyebrow tags above section headings. */
const badgeVariants = cva(
  'inline-flex items-center border px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.1em] font-display',
  {
    variants: {
      variant: {
        default: 'border-brand/20 bg-brand/[0.07] text-brand',
        tint: 'border-transparent bg-brand-tint text-brand-dark',
        /** Overlaid on case-study imagery — needs its own contrast. */
        overlay: 'border-white/25 bg-brand-dark/75 text-white backdrop-blur-sm',
        outline: 'border-border bg-white text-muted',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
