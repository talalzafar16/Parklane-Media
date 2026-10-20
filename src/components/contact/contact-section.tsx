import { Eyebrow } from '@/components/ui/eyebrow'
import { contact } from '@/data/home'

import { EnquiryForm } from './enquiry-form'

export function ContactSection() {
  return (
    <section
      className="grid grid-cols-[1.1fr_.9fr] items-center gap-[8vw] rounded-t-[2rem] bg-accent px-gutter py-[clamp(5rem,8vw,9rem)] text-ink mobile:grid-cols-1 mobile:gap-10"
      id="contact"
    >
      <div>
        <Eyebrow className="text-ink">{contact.eyebrow}</Eyebrow>
        <h2 className="max-w-[12ch] font-display text-[clamp(4rem,7.5vw,8.5rem)] font-semibold uppercase leading-[.85] tracking-[-.02em] mobile:text-[clamp(4.5rem,19vw,7rem)]">
          {contact.heading}
        </h2>
        <p className="mt-[1.8rem] max-w-[36ch] text-[.95rem] leading-[1.65]">{contact.body}</p>
      </div>
      {/* Read at build time: until a webhook is set, the form opens a prefilled email. */}
      <EnquiryForm directDelivery={Boolean(process.env.CONTACT_WEBHOOK_URL)} />
    </section>
  )
}
