/**
 * Global site configuration: identity, contact routing, navigation, socials.
 *
 * Parklane Media is a new company. Anything the client has not yet confirmed is
 * left as `null` and rendered as a visible placeholder rather than invented —
 * see the `contactChannels` array below.
 */

export const siteConfig = {
  name: 'Parklane Media',
  shortName: 'Parklane',
  tagline: 'Connecting Brands, Audiences & Content',
  description:
    'Parklane Media is a media, content, marketing and advertising company focused on creating meaningful connections between businesses, audiences and content.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parklanemedia.com',
  locale: 'en_PK',
} as const

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string; description: string }[]
}

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Capabilities',
    href: '/capabilities',
    children: [
      {
        label: 'Content',
        href: '/capabilities/content',
        description:
          "Create, acquire, develop, distribute and commercialise content for multi-platform audiences.",
      },
      {
        label: 'Advertising',
        href: '/capabilities/advertising',
        description: 'Advertising solutions that reach the right audiences across platforms.',
      },
      {
        label: 'Media & Marketing',
        href: '/capabilities/media-marketing',
        description: 'Media and marketing built around business objectives and audience behaviour.',
      },
      {
        label: 'Digital & Social',
        href: '/capabilities/digital-social',
        description: 'A stronger presence across the digital ecosystem.',
      },
      {
        label: 'Sports & Entertainment',
        href: '/capabilities/sports-entertainment',
        description: 'Commercial and content opportunities across sports and entertainment.',
      },
      {
        label: 'Events & Activations',
        href: '/capabilities/events-activations',
        description: 'Experiences that bring brands closer to their audiences.',
      },
    ],
  },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export const footerNav = {
  company: [
    { label: 'About', href: '/about' },
    { label: 'Our Work', href: '/work' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  capabilities: [
    { label: 'Content', href: '/capabilities/content' },
    { label: 'Advertising', href: '/capabilities/advertising' },
    { label: 'Media & Marketing', href: '/capabilities/media-marketing' },
    { label: 'Digital & Social', href: '/capabilities/digital-social' },
    { label: 'Sports & Entertainment', href: '/capabilities/sports-entertainment' },
    { label: 'Events & Activations', href: '/capabilities/events-activations' },
  ],
}

/**
 * Routed contact points shown on /contact.
 *
 * `value: null` means the client has not supplied it yet. Every consumer
 * renders a visible "to be confirmed" placeholder in that case — nothing here
 * is guessed, and no fake mailto: link is ever produced.
 */
export type ContactChannel = {
  id: string
  heading: string
  description: string
  icon: 'mail' | 'handshake' | 'megaphone' | 'map-pin'
  value: string | null
  href: string | null
}

export const contactChannels: ContactChannel[] = [
  {
    id: 'general',
    heading: 'General Enquiries',
    description: 'Questions about Parklane Media, or anything that does not fit the boxes below.',
    icon: 'mail',
    // TODO: CLIENT — supply the general enquiries email address.
    value: null,
    href: null,
  },
  {
    id: 'partnerships',
    heading: 'Business & Partnerships',
    description: 'Content partnerships, commercial opportunities and new business.',
    icon: 'handshake',
    // TODO: CLIENT — supply the business & partnerships email address.
    value: null,
    href: null,
  },
  {
    id: 'sales',
    heading: 'Advertising & Media Sales',
    description: 'Advertising enquiries, media planning, buying and sales.',
    icon: 'megaphone',
    // TODO: CLIENT — supply the advertising & media sales email address.
    value: null,
    href: null,
  },
]

export const officeDetails = {
  heading: 'Office',
  description: 'Where to find us.',
  // TODO: CLIENT — supply the registered office address.
  address: null as string | null,
  // TODO: CLIENT — supply the main office telephone number.
  phone: null as string | null,
  phoneHref: null as string | null,
}

/**
 * WhatsApp floating button.
 * TODO: CLIENT — supply the WhatsApp business number (digits only, incl. country
 * code). While `number` is null the button is not rendered at all, so visitors
 * never hit a dead chat link.
 */
export const whatsapp = {
  number: null as string | null,
  message: 'Hi Parklane Media — I would like to talk about a project.',
}

export function getWhatsAppHref(): string | null {
  if (!whatsapp.number) return null
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`
}

export type SocialLink = {
  label: string
  href: string
  icon: 'instagram' | 'facebook' | 'linkedin' | 'youtube'
}

// TODO: CLIENT — confirm or replace every social profile URL below.
export const socials: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/parklanemedia', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/parklanemedia', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/parklanemedia', icon: 'linkedin' },
  { label: 'YouTube', href: 'https://youtube.com/@parklanemedia', icon: 'youtube' },
]

/** Shown wherever a value is pending client confirmation. */
export const PLACEHOLDER_LABEL = 'To be confirmed'
