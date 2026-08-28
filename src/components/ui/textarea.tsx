import * as React from 'react'

import { cn } from '@/lib/utils'

/** Same bordered treatment as Input — see the note there. */
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'w-full resize-y rounded-none border border-border bg-white',
      'min-h-[10rem] px-4 py-4 text-body text-fg',
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
))
Textarea.displayName = 'Textarea'

export { Textarea }
