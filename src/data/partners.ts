/**
 * Partner organisations.
 *
 * Empty until the client confirms which partners may be named and displayed.
 * The partners band on the homepage is text-led and renders regardless; the
 * logo marquee underneath it only mounts once this array has entries, so
 * adding a partner here is all it takes to bring the marquee back.
 *
 * TODO: CLIENT — supply partner names, logo files and written permission to
 * display each mark before populating this array.
 */

export type Partner = {
  id: string
  name: string
  /** SVG or WebP under /public/images/partners/. */
  logo: string
  /** Optional link to the partner's site. */
  href?: string
}

export const partners: Partner[] = [
  // {
  //   id: 'partner-id',
  //   name: 'Partner name',
  //   logo: '/images/partners/partner-id.svg',
  //   href: 'https://example.com',
  // },
]
