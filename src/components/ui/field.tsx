import * as React from 'react'

import { cn } from '@/lib/utils'

const controlClasses = [
  'block w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-lead text-ink',
  'placeholder:text-muted/60 transition-colors duration-200 ease-brand',
  'focus:border-signal-bright focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-400',
]

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(controlClasses, className)} {...props} />,
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} rows={4} className={cn(controlClasses, 'resize-y', className)} {...props} />
  ),
)
Textarea.displayName = 'Textarea'

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select ref={ref} className={cn(controlClasses, 'appearance-none pr-8 [&>option]:bg-surface', className)} {...props}>
        {children}
      </select>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-1 top-1/2 size-2 -translate-y-1/2 rotate-45 border-b border-r border-muted"
      />
    </div>
  ),
)
Select.displayName = 'Select'

type FieldProps = {
  htmlFor: string
  label: string
  required?: boolean
  error?: string
  className?: string
  children: React.ReactNode
}

export function Field({ htmlFor, label, required, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="label flex items-center gap-2 text-muted">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-signal-bright">
            *
          </span>
        ) : (
          <span className="normal-case tracking-normal text-muted/70">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-2 text-small text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
