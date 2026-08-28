import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Bordered field.
 *
 * Sharp corners and a 1px hairline, matching the Block language rather than a
 * default browser control: 56px tall so it feels substantial, white against the
 * tinted section, and a crisp 1px inner ring on focus instead of a soft glow.
 */
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'h-14 w-full appearance-none rounded-none border border-border bg-white',
        'px-4 text-body text-fg',
        'placeholder:text-muted/60',
        'transition-colors duration-200 ease-brand',
        'hover:border-muted/50',
        'focus:border-brand focus:outline-none focus:ring-1 focus:ring-inset focus:ring-brand',
        'disabled:cursor-not-allowed disabled:opacity-55',
        'aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }
