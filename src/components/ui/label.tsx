'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/lib/utils'

/**
 * Mono field label, matching the rest of the micro layer (timecode labels,
 * counters, captions). Bold sans labels read as a default form; mono ties the
 * form into the same system as everything around it.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    /** Two-digit sequence number, e.g. "01". */
    index?: string
    required?: boolean
    optional?: boolean
  }
>(({ className, children, index, required, optional, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn('micro flex items-baseline gap-3 text-muted', className)}
    {...props}
  >
    {index ? (
      <span aria-hidden="true" className="text-brand">
        {index}
      </span>
    ) : null}
    <span className="text-fg">{children}</span>
    {required ? (
      <span aria-hidden="true" className="text-brand">
        *
      </span>
    ) : null}
    {optional ? <span className="opacity-70">Optional</span> : null}
  </LabelPrimitive.Root>
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
