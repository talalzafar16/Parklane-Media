import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[9rem] w-full border border-border bg-white px-4 py-3 text-body text-fg',
      'placeholder:text-muted/80',
      'transition-colors duration-200 ease-brand',
      'focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/25',
      'disabled:cursor-not-allowed disabled:opacity-55',
      'aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus-visible:ring-red-600/25',
      className,
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export { Textarea }
