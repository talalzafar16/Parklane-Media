// Shared by the enquiry form and /api/contact so the two always validate the same way.

export type EnquiryValues = {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export type EnquiryField = keyof EnquiryValues
export type EnquiryErrors = Partial<Record<EnquiryField, string>>

export type EnquiryResponse =
  | { ok: true }
  | { ok: false; code: 'invalid'; errors: EnquiryErrors }
  | { ok: false; code: 'not_configured' | 'delivery_failed' | 'bad_request' }

export const ENQUIRY_FIELDS: EnquiryField[] = ['name', 'email', 'phone', 'company', 'service', 'message']

export const EMPTY_ENQUIRY: EnquiryValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
}

// Bots fill in every field; people never see this one.
export const HONEYPOT_FIELD = 'website'

const REQUIRED_MESSAGE: Partial<Record<EnquiryField, string>> = {
  name: 'Please enter your name.',
  email: 'Please enter your email address.',
  phone: 'Please enter a phone number.',
  message: 'Please tell us a little about the project.',
}

const MAX_LENGTH: Record<EnquiryField, number> = {
  name: 120,
  email: 254,
  phone: 32,
  company: 160,
  service: 120,
  message: 4000,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_PATTERN = /^\+?[\d\s().-]{7,24}$/

export function isRequired(field: EnquiryField) {
  return field in REQUIRED_MESSAGE
}

export function validateField(field: EnquiryField, rawValue: string): string | undefined {
  const value = rawValue.trim()

  if (!value) return REQUIRED_MESSAGE[field]
  if (value.length > MAX_LENGTH[field]) return `Please keep this under ${MAX_LENGTH[field]} characters.`

  if (field === 'name' && value.length < 2) return 'That name looks too short.'
  if (field === 'email' && !EMAIL_PATTERN.test(value)) return 'Please enter a valid email address.'
  if (field === 'phone' && !PHONE_PATTERN.test(value)) return 'Please enter a valid phone number.'
  if (field === 'message' && value.length < 10) return 'A sentence or two more would help us reply properly.'
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {}
  for (const field of ENQUIRY_FIELDS) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}

export function parseEnquiry(input: unknown) {
  const body = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const text = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '')

  const values = Object.fromEntries(ENQUIRY_FIELDS.map((field) => [field, text(field)])) as EnquiryValues
  const errors = validateEnquiry(values)

  return {
    values,
    errors: Object.keys(errors).length ? errors : null,
    isSpam: text(HONEYPOT_FIELD) !== '',
  }
}

export function buildMailtoHref(values: EnquiryValues, to: string) {
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    values.company && `Company: ${values.company}`,
    values.service && `Service: ${values.service}`,
    values.message && `\n${values.message}`,
  ]
    .filter(Boolean)
    .join('\n')

  return `mailto:${to}?subject=${encodeURIComponent('Parklane Media website enquiry')}&body=${encodeURIComponent(body)}`
}
