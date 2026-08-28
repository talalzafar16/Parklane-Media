import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Native `<select>` with the bordered treatment.
 *
 * Deliberately native rather than a custom listbox: the OS picker is the better
 * experience on touch, it is keyboard- and screen-reader-correct with no work,
 * and there is nothing here a custom widget would improve. The default arrow is
 * replaced so the control matches the other fields; `pr-11` reserves room.
 */
const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'h-14 w-full appearance-none rounded-none border border-border bg-white',
          'px-4 pr-11 text-body text-fg',
          'transition-colors duration-200 ease-brand',
          'hover:border-muted/50',
          'focus:border-brand focus:outline-none focus:ring-1 focus:ring-inset focus:ring-brand',
          'disabled:cursor-not-allowed disabled:opacity-55',
          'aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600',
          className,
        )}
        {...props}
      >
        {children}
      </select>

      {/* Sits in its own bordered cell on the right edge, echoing the +/− marks
          used elsewhere, so the control reads as designed rather than default. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 flex w-11 items-center justify-center border-l border-border text-brand"
      >
        <ChevronDown className="size-4" />
      </span>
    </div>
  ),
)
Select.displayName = 'Select'

export { Select }
