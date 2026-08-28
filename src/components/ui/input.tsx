import * as React from 'react'

import { cn } from '@/lib/utils'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-12 w-full border border-border bg-white px-4 text-body text-fg',
        'placeholder:text-muted/80',
        'transition-colors duration-200 ease-brand',
        'focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25',
        'disabled:cursor-not-allowed disabled:opacity-55',
        'aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus-visible:ring-red-600/25',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export { Input }
