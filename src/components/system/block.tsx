import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * The core mark of the system: a solid rectangle with type knocked out of it.
 *
 * This is the logo's own construction — a filled block with "PM" reversed out
 * — reused as section numbers, CTAs, stat frames and the nav button. Sharp
 * corners, no shadow, no radius. Everything else on the page is a hairline;
 * the Block is the only solid mass, which is what gives it weight.
 */
const blockVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none',
    'font-display font-bold uppercase tracking-[0.02em]',
    'transition-colors duration-200 ease-brand',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
    'disabled:pointer-events-none disabled:opacity-55',
    '[&_svg]:size-[18px] [&_svg]:shrink-0',
  ),
  {
    variants: {
      variant: {
        /** Solid brand, knocked-out white type. The default. */
        solid: 'bg-brand text-white hover:bg-brand-dark',
        /** For use on --brand or --ink bands. */
        inverse: 'bg-white text-fg hover:bg-brand-tint',
        /** Hairline only — the quieter half of a CTA pair. */
        outline: 'border border-fg/25 bg-transparent text-fg hover:border-fg hover:bg-fg/[0.04]',
        /** Hairline on a dark band. */
        outlineOnDark:
          'border border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10',
      },
      size: {
        /** Square, for section numbers and counters. */
        mark: 'size-12 text-[0.9375rem]',
        sm: 'h-11 px-4 text-[0.8125rem]',
        default: 'h-12 px-6 text-[0.875rem]',
        lg: 'h-14 px-8 text-[0.9375rem]',
      },
    },
    defaultVariants: { variant: 'solid', size: 'default' },
  },
)

export interface BlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof blockVariants> {
  asChild?: boolean
}

const Block = React.forwardRef<HTMLButtonElement, BlockProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(blockVariants({ variant, size, className }))} {...props} />
  },
)
Block.displayName = 'Block'

/**
 * Non-interactive version — a solid mark holding a number or short label.
 * Used for `01`-style section numbers where a button would be wrong.
 */
export function BlockMark({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex size-12 shrink-0 items-center justify-center bg-brand',
        'font-mono text-[0.8125rem] tracking-[0.08em] text-white',
        className,
      )}
    >
      {children}
    </span>
  )
}

export { Block, blockVariants }
