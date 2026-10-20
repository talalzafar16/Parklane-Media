'use client'

import { useState, type FormEvent, type InputHTMLAttributes } from 'react'

import { contactEmail } from '@/data/site'
import { HONEYPOT_FIELD, buildMailtoHref, type Enquiry } from '@/lib/enquiry'

type Status = 'idle' | 'sending' | 'sent' | 'failed'

const directNotes: Record<Status, string> = {
  idle: '',
  sending: '',
  sent: 'Thank you — your enquiry has been sent. We will be in touch soon.',
  failed: `Something went wrong. Please email us at ${contactEmail}.`,
}

export function EnquiryForm({ directDelivery }: { directDelivery: boolean }) {
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Enquiry

    if (!directDelivery) {
      window.location.href = buildMailtoHref(data, contactEmail)
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error(`Status ${response.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <form className="border-t border-white/50" onSubmit={handleSubmit}>
      <Field label="Name" name="name" autoComplete="name" placeholder="Your name" />
      <Field label="Phone number" name="phone" type="tel" autoComplete="tel" placeholder="+92 300 0000000" />
      <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@company.com" />
      {directDelivery ? (
        <input className="absolute -left-[10000px]" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      ) : null}

      <button
        className="mt-6 flex w-full items-center justify-between rounded-[3rem] bg-ink px-6 py-4 text-[1.15rem] font-medium leading-[normal] text-navy transition-transform duration-200 hover:-translate-y-[3px]"
        type="submit"
        disabled={status === 'sending'}
      >
        <span>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</span>
        <span className="text-[1.6rem]" aria-hidden="true">
          ↗
        </span>
      </button>
      <p className="mt-4 text-[.75rem] leading-[1.5] text-ink/80" aria-live="polite">
        {directDelivery ? directNotes[status] : 'Submitting opens your email app with the details ready to send.'}
      </p>
    </form>
  )
}

function Field({ label, ...input }: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="grid gap-2 border-b border-white/40 py-[1.1rem]">
      <span className="font-mono text-[.65rem] uppercase leading-[normal] tracking-[.1em]">{label}</span>
      <input
        className="w-full bg-transparent py-[.4rem] text-[1.3rem] leading-[normal] text-ink outline-none placeholder:text-ink/[.65] focus:shadow-[0_2px_rgb(var(--pm-ink-rgb))]"
        required
        {...input}
      />
    </label>
  )
}
