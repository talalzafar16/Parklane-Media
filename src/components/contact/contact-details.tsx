import type { ReactNode } from 'react'

import { PLACEHOLDER_LABEL, contactDetails, getWhatsAppHref } from '@/data/site'
import { cn } from '@/lib/utils'

type ContactDetailsProps = {
  layout?: 'row' | 'stack'
  showWhatsApp?: boolean
  className?: string
}

// Unconfirmed values show a placeholder rather than an invented address or a dead link.
export function ContactDetails({ layout = 'row', showWhatsApp = false, className }: ContactDetailsProps) {
  const whatsappHref = showWhatsApp ? getWhatsAppHref() : null

  return (
    <dl
      className={cn(
        'grid gap-8',
        layout === 'row' ? 'sm:grid-cols-[1.5fr_1fr_1fr]' : 'divide-y divide-line [&>div:not(:first-child)]:pt-8',
        className,
      )}
    >
      <Detail label="Email">
        {contactDetails.email ? (
          <a href={`mailto:${contactDetails.email}`} className="break-words transition-colors hover:text-signal-bright">
            {contactDetails.email}
          </a>
        ) : (
          <Placeholder />
        )}
      </Detail>
      <Detail label="Phone">
        {contactDetails.phone && contactDetails.phoneHref ? (
          <a href={`tel:${contactDetails.phoneHref}`} className="transition-colors hover:text-signal-bright">
            {contactDetails.phone}
          </a>
        ) : (
          <Placeholder />
        )}
      </Detail>
      <Detail label="Location">{contactDetails.location}</Detail>
      {whatsappHref ? (
        <Detail label="WhatsApp">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-signal-bright"
          >
            Message us<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
        </Detail>
      ) : null}
    </dl>
  )
}

function Detail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="label text-signal-bright">[ {label} ]</dt>
      <dd className="mt-3 text-body text-ink sm:text-lead">{children}</dd>
    </div>
  )
}

function Placeholder() {
  return (
    <span className="label inline-flex border border-dashed border-line-strong px-3 py-1.5 text-muted">
      {PLACEHOLDER_LABEL}
    </span>
  )
}
