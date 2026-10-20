// Shared by the enquiry form and /api/contact.

export type Enquiry = {
  name: string
  phone: string
  email: string
}

// Bots fill in every field; people never see this one.
export const HONEYPOT_FIELD = 'website'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[\d\s().-]{7,24}$/

export function parseEnquiry(input: unknown) {
  const body = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const text = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '')

  const enquiry: Enquiry = { name: text('name'), phone: text('phone'), email: text('email') }
  const valid =
    enquiry.name.length >= 2 &&
    enquiry.name.length <= 120 &&
    PHONE_PATTERN.test(enquiry.phone) &&
    enquiry.email.length <= 254 &&
    EMAIL_PATTERN.test(enquiry.email)

  return { enquiry, valid, isSpam: text(HONEYPOT_FIELD) !== '' }
}

export function buildMailtoHref({ name, phone, email }: Enquiry, to: string) {
  const subject = encodeURIComponent('Parklane Media website enquiry')
  const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}`)
  return `mailto:${to}?subject=${subject}&body=${body}`
}
