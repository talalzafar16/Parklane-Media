'use client'

import * as React from 'react'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'

import { ArrowLine, Button } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'
import { services } from '@/data/services'
import { contactDetails } from '@/data/site'
import {
  EMPTY_ENQUIRY,
  ENQUIRY_FIELDS,
  HONEYPOT_FIELD,
  buildMailtoHref,
  isRequired,
  validateEnquiry,
  validateField,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryResponse,
} from '@/lib/enquiry'

type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unavailable'

const SERVICE_OPTIONS = [...services.map((service) => service.title), 'Something else']

export function EnquiryForm({ className }: { className?: string }) {
  const idPrefix = React.useId()
  const [values, setValues] = React.useState(EMPTY_ENQUIRY)
  const [errors, setErrors] = React.useState<EnquiryErrors>({})
  const [touched, setTouched] = React.useState<Partial<Record<EnquiryField, boolean>>>({})
  const [status, setStatus] = React.useState<Status>('idle')
  const statusRef = React.useRef<HTMLDivElement>(null)

  const id = (name: string) => `${idPrefix}-${name}`
  const errorFor = (field: EnquiryField) => (touched[field] ? errors[field] : undefined)

  React.useEffect(() => {
    if (status === 'success' || status === 'unavailable') statusRef.current?.focus()
  }, [status])

  // Service pages link here with ?service=<title>. Read from location so the page stays static.
  React.useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('service')
    if (requested && SERVICE_OPTIONS.includes(requested)) setValues((previous) => ({ ...previous, service: requested }))
  }, [])

  // Errors show once a field has been left, then update live as it's corrected.
  const bind = (field: EnquiryField) => ({
    id: id(field),
    name: field,
    value: values[field],
    required: isRequired(field),
    'aria-invalid': errorFor(field) ? true : undefined,
    'aria-describedby': errorFor(field) ? `${id(field)}-error` : undefined,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value
      setValues((previous) => ({ ...previous, [field]: value }))
      if (touched[field]) setErrors((previous) => ({ ...previous, [field]: validateField(field, value) }))
    },
    onBlur: () => {
      setTouched((previous) => ({ ...previous, [field]: true }))
      setErrors((previous) => ({ ...previous, [field]: validateField(field, values[field]) }))
    },
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateEnquiry(values)
    setErrors(nextErrors)
    setTouched(Object.fromEntries(ENQUIRY_FIELDS.map((field) => [field, true])))

    const firstInvalid = ENQUIRY_FIELDS.find((field) => nextErrors[field])
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, [HONEYPOT_FIELD]: new FormData(event.currentTarget).get(HONEYPOT_FIELD) ?? '' }),
      })
      const result = (await response.json()) as EnquiryResponse

      if (result.ok) {
        setStatus('success')
        setValues(EMPTY_ENQUIRY)
        setTouched({})
      } else if (result.code === 'invalid') {
        setErrors(result.errors)
        setStatus('idle')
      } else {
        setStatus(result.code === 'not_configured' ? 'unavailable' : 'error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={className}>
        <CheckCircle2 className="size-10 text-signal-bright" strokeWidth={1.25} aria-hidden="true" />
        <h3 className="mt-6 text-title font-medium">Signal received.</h3>
        <p className="mt-3 max-w-[42ch] text-muted">Thanks — your enquiry is with the team. We usually reply within one working day.</p>
        <Button variant="bracket" className="mt-8" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    )
  }

  if (status === 'unavailable' && contactDetails.email) {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className={className}>
        <Mail className="size-10 text-signal-bright" strokeWidth={1.25} aria-hidden="true" />
        <h3 className="mt-6 text-title font-medium">One more step.</h3>
        <p className="mt-3 max-w-[44ch] text-muted">
          Online submissions aren&apos;t switched on yet. Your details are ready in an email — just press send.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a href={buildMailtoHref(values, contactDetails.email)}>Open email draft</a>
          </Button>
          <Button variant="outline" onClick={() => setStatus('idle')}>
            Back to form
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className={className}>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field htmlFor={id('name')} label="Name" required error={errorFor('name')}>
          <Input {...bind('name')} autoComplete="name" placeholder="Your name" />
        </Field>
        <Field htmlFor={id('email')} label="Email" required error={errorFor('email')}>
          <Input {...bind('email')} type="email" autoComplete="email" placeholder="you@company.com" />
        </Field>
        <Field htmlFor={id('phone')} label="Phone number" required error={errorFor('phone')}>
          <Input {...bind('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+92 300 0000000" />
        </Field>
        <Field htmlFor={id('company')} label="Company" error={errorFor('company')}>
          <Input {...bind('company')} autoComplete="organization" placeholder="Company name" />
        </Field>
        <Field htmlFor={id('service')} label="Service" error={errorFor('service')} className="sm:col-span-2">
          <Select {...bind('service')} className={values.service ? undefined : 'text-muted/60'}>
            <option value="">Select a service…</option>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
        <Field htmlFor={id('message')} label="About the project" required error={errorFor('message')} className="sm:col-span-2">
          <Textarea {...bind('message')} placeholder="What are you trying to achieve, and by when?" />
        </Field>
      </div>

      <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
        <label htmlFor={id(HONEYPOT_FIELD)}>Website</label>
        <input id={id(HONEYPOT_FIELD)} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' ? (
        <p role="alert" className="mt-8 border border-red-400/50 bg-red-500/10 px-4 py-3 text-small text-red-200">
          Something went wrong sending that. Please try again
          {contactDetails.email ? (
            <>
              , or email{' '}
              <a className="underline" href={`mailto:${contactDetails.email}`}>
                {contactDetails.email}
              </a>
            </>
          ) : null}
          .
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === 'submitting'} className="w-full sm:w-auto">
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <ArrowLine />
            </>
          )}
        </Button>
        <p className="text-small text-muted">
          Fields marked <span className="text-signal-bright">*</span> are required. We reply within one working day.
        </p>
      </div>
    </form>
  )
}
