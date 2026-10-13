import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'group/button relative inline-flex items-center justify-center gap-3 whitespace-nowrap',
    'transition-[color,background-color,border-color] duration-300 ease-brand',
    'disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none [&_svg]:size-4 [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        // Notched fill with a light sweep on hover. clip-path hides outer rings, so focus is inset.
        signal: [
          'notch overflow-hidden bg-signal font-medium text-ink [--notch:0.75rem] hover:bg-[#1b7cb6]',
          'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink',
          'before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:-skew-x-12',
          'before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent',
          'before:transition-transform before:duration-700 before:ease-brand hover:before:translate-x-[420%]',
        ],
        bracket: [
          'label border border-signal-bright/40 text-signal-bright',
          "before:content-['['] after:content-[']']",
          'hover:border-signal-bright hover:bg-signal-bright/10',
          'focus-visible:ring-2 focus-visible:ring-signal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        ],
        outline: [
          'border border-line-strong font-medium text-ink hover:border-ink/60 hover:bg-ink/5',
          'focus-visible:ring-2 focus-visible:ring-signal-bright focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        ],
        link: [
          'font-medium text-signal-bright',
          'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-[0.35] after:bg-signal-bright',
          'after:transition-transform after:duration-500 after:ease-brand hover:after:scale-x-100',
          'focus-visible:ring-2 focus-visible:ring-signal-bright focus-visible:ring-offset-4 focus-visible:ring-offset-canvas',
        ],
      },
      size: {
        sm: 'h-10 px-4 text-small',
        md: 'h-12 px-6 text-body',
        lg: 'h-14 px-8 text-body',
      },
    },
    // Size classes come after variant classes, so these overrides have to be compound.
    compoundVariants: [
      { variant: 'bracket', className: 'text-label' },
      { variant: 'link', className: 'h-auto px-0' },
    ],
    defaultVariants: { variant: 'signal', size: 'md' },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  },
)
Button.displayName = 'Button'

// Line + arrowhead that stretches on hover of a `group` or `group/button` parent.
export function ArrowLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-block h-px w-8 bg-current transition-[width] duration-500 ease-brand',
        'group-hover:w-12 group-hover/button:w-12',
        className,
      )}
    >
      <span className="absolute -top-[3px] right-0 size-[7px] rotate-45 border-r border-t border-current" />
    </span>
  )
}
