// Anything the client hasn't confirmed yet is null and shows as "To be confirmed".

export const siteConfig = {
  name: 'Parklane Media',
  shortName: 'Parklane',
  tagline: 'Ideas that engage. Content that converts.',
  description:
    'Parklane Media is a full-service media, content and advertising agency — media production, commercial rights and sales, content creation, event branding and broadcast production.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parklanemedia.com',
  locale: 'en_PK',
  coordinates: '24.8607° N, 67.0011° E',
} as const

export type NavLink = { label: string; href: string }

export const mainNav: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
]

export const contactLink: NavLink = { label: 'Contact', href: '/contact' }

export const companyNav: NavLink[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  contactLink,
]

export const contactDetails = {
  // TODO: CLIENT — confirm the enquiries inbox (taken from the designer handover).
  email: 'info@parklanemedia.com' as string | null,
  // TODO: CLIENT — office phone; phoneHref in E.164, e.g. +922100000000.
  phone: null as string | null,
  phoneHref: null as string | null,
  location: 'Karachi / Worldwide',
}

// TODO: CLIENT — real WhatsApp business number (digits only, with country code).
// The all-zero placeholder is invalid on purpose so it can't reach a stranger; null hides the button.
export const whatsapp = {
  number: '920000000000' as string | null,
  message: 'Hi Parklane Media — I would like to talk about a project.',
}

export function getWhatsAppHref() {
  if (!whatsapp.number) return null
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`
}

export type SocialLink = {
  label: string
  href: string
  icon: 'instagram' | 'facebook' | 'linkedin' | 'youtube'
}

// TODO: CLIENT — confirm the social profile URLs.
export const socials: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/parklanemedia', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/parklanemedia', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/parklanemedia', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://youtube.com/@parklanemedia', icon: 'youtube' },
]

export const PLACEHOLDER_LABEL = 'To be confirmed'
