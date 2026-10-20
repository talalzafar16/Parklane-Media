export const siteConfig = {
  name: 'Parklane Media',
  tagline: 'Ideas that engage. Content that converts.',
  description: 'A full-service media, content, commercial rights, events, and broadcast production agency.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://parklanemedia.com',
}

export const navLinks = [
  { label: 'Our work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
]

export const contactLink = { label: 'Contact us', href: '#contact' }

// TODO: CLIENT — confirm the inbox enquiries should go to.
export const contactEmail = 'info@parklanemedia.com'
