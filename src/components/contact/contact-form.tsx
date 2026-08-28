'use client'

import * as React from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'

import { Block } from '@/components/system/block'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { capabilities } from '@/data/capabilities'

type FieldName = 'name' | 'email' | 'company' | 'service' | 'budget' | 'message'
type Errors = Partial<Record<FieldName, string>>

const initialValues: Record<FieldName, string> = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  message: '',
}

// TODO: CLIENT — confirm the budget bands shown in the enquiry form.
const budgetOptions = [
  'Under PKR 500,000',
  'PKR 500,000 – 1,500,000',
  'PKR 1,500,000 – 4,000,000',
  'Over PKR 4,000,000',
  'Not sure yet',
]

/** Deliberately permissive — just enough to catch a genuine typo. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(name: FieldName, value: string): string | undefined {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Please enter your name.'
      if (value.trim().length < 2) return 'That name looks too short.'
      return undefined
    case 'email':
      if (!value.trim()) return 'Please enter your email address.'
      if (!EMAIL_PATTERN.test(value.trim())) return 'Please enter a valid email address.'
      return undefined
    case 'service':
      if (!value) return 'Please choose what you need help with.'
      return undefined
    case 'message':
      if (!value.trim()) return 'Please tell us a little about the project.'
      if (value.trim().length < 20) return 'A sentence or two more would help us reply properly.'
      return undefined
    default:
      return undefined
  }
}

/**
 * Enquiry form.
 *
 * There is no backend yet — `onSubmit` simulates a round trip and resolves.
 * See the README for the two-line change that points it at a real endpoint.
 *
 * Validation runs on blur (only after a field has been touched, so nobody is
 * scolded mid-typing) and again for every field on submit.
 */
export function ContactForm() {
  const [values, setValues] = React.useState(initialValues)
  const [errors, setErrors] = React.useState<Errors>({})
  const [touched, setTouched] = React.useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const successRef = React.useRef<HTMLDivElement>(null)

  const setValue = (name: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear an existing error as soon as the field becomes valid again.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const onBlur = (name: FieldName) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, values[name]) }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Errors = {}
    ;(Object.keys(values) as FieldName[]).forEach((field) => {
      const error = validateField(field, values[field])
      if (error) nextErrors[field] = error
    })

    setErrors(nextErrors)
    setTouched({ name: true, email: true, service: true, message: true })

    if (Object.keys(nextErrors).length > 0) {
      // Move focus to the first problem so keyboard users are not stranded.
      const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0]
      document.getElementById(firstInvalid)?.focus()
      return
    }

    setStatus('submitting')

    try {
      // TODO: CLIENT — replace with the real endpoint (see README → Contact form).
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setStatus('success')
      setValues(initialValues)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  React.useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border border-border bg-white p-10 focus-visible:outline-none"
      >
        <span className="inline-flex size-14 items-center justify-center bg-brand text-white">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <h2 className="mt-8 text-h3">Thanks — that has reached us.</h2>
        <p className="mt-4 max-w-copy text-body text-muted">
          We read every enquiry ourselves and usually reply within one working day. If it is
          urgent, call the studio line and ask for the producer on duty.
        </p>
        <Block className="mt-8" variant="outline" onClick={() => setStatus('idle')}>
          Send another message
        </Block>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="border border-border bg-white p-8 lg:p-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field
          id="name"
          index="01"
          label="Your name"
          required
          error={errors.name}
          value={values.name}
          onChange={(value) => setValue('name', value)}
          onBlur={() => onBlur('name')}
          autoComplete="name"
          placeholder="Jane Ahmed"
        />

        <Field
          id="email"
          index="02"
          label="Email address"
          type="email"
          required
          error={errors.email}
          value={values.email}
          onChange={(value) => setValue('email', value)}
          onBlur={() => onBlur('email')}
          autoComplete="email"
          placeholder="you@company.com"
        />

        <Field
          id="company"
          index="03"
          label="Company"
          error={errors.company}
          value={values.company}
          onChange={(value) => setValue('company', value)}
          onBlur={() => onBlur('company')}
          autoComplete="organization"
          optional
          placeholder="Company name"
        />

        <FieldShell id="service" index="04" label="What do you need?" required error={errors.service}>
          <Select
            id="service"
            name="service"
            value={values.service}
            onChange={(event) => setValue('service', event.target.value)}
            onBlur={() => onBlur('service')}
            aria-invalid={errors.service ? 'true' : undefined}
            aria-describedby={errors.service ? 'service-error' : undefined}
          >
            <option value="">Select a capability…</option>
            {capabilities.map((capability) => (
              <option key={capability.slug} value={capability.title}>
                {`${capability.number} — ${capability.title}`}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </Select>
        </FieldShell>

        <FieldShell
          id="budget"
          index="05"
          label="Approximate budget"
          optional
          className="sm:col-span-2"
        >
          <Select
            id="budget"
            name="budget"
            value={values.budget}
            onChange={(event) => setValue('budget', event.target.value)}
          >
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </FieldShell>

        <FieldShell
          id="message"
          index="06"
          label="About the project"
          required
          error={errors.message}
          hint="The more context you give, the more useful our first reply will be."
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            name="message"
            value={values.message}
            onChange={(event) => setValue('message', event.target.value)}
            onBlur={() => onBlur('message')}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'message-error' : 'message-hint'}
            placeholder="What are you trying to achieve, and by when?"
          />
        </FieldShell>
      </div>

      {status === 'error' ? (
        <p
          role="alert"
          className="mt-8 border border-red-600 bg-red-50 px-4 py-3 text-small text-red-700"
        >
          Something went wrong sending that. Please try again, or email us directly.
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Block type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <Send aria-hidden="true" />
            </>
          )}
        </Block>

        <p className="text-small text-muted">We reply within one working day.</p>
      </div>
    </form>
  )
}

/**
 * Sentence case, not mono. The micro layer is for labels, counters and
 * captions — a full sentence set in uppercase mono is noticeably slower to
 * read, which is the opposite of what an error message needs to be.
 */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-small text-red-700">
      {message}
    </p>
  )
}

/** Label + control + message, so every field is spaced identically. */
function FieldShell({
  id,
  index,
  label,
  required,
  optional,
  error,
  hint,
  className,
  children,
}: {
  id: string
  index: string
  label: string
  required?: boolean
  optional?: boolean
  error?: string
  hint?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} index={index} required={required} optional={optional} className="mb-3">
        {label}
      </Label>
      {children}
      {error ? (
        <FieldError id={`${id}-error`} message={error} />
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-small text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

type FieldProps = {
  id: FieldName
  index: string
  label: string
  value: string
  onChange: (value: string) => void
  onBlur: () => void
  error?: string
  type?: string
  required?: boolean
  optional?: boolean
  autoComplete?: string
  placeholder?: string
}

function Field({
  id,
  index,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = 'text',
  required = false,
  optional = false,
  autoComplete,
  placeholder,
}: FieldProps) {
  return (
    <FieldShell id={id} index={index} label={label} required={required} optional={optional} error={error}>
      <Input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </FieldShell>
  )
}
