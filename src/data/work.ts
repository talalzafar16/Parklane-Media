/**
 * Completed projects.
 *
 * Parklane Media is a new company and has no completed public projects yet, so
 * this array is intentionally empty. /work detects that and renders a designed
 * empty state instead of a grid.
 *
 * The card, the grid and the capability filter are all built and wired against
 * this type — add a project object below and the grid, the filter bar and the
 * detail page at /work/[slug] all start working with no further code changes.
 */

import { capabilities } from '@/data/capabilities'

export type Project = {
  /** URL segment — becomes /work/<slug>. */
  slug: string
  name: string
  client: string
  industry: string
  servicesDelivered: string[]
  platforms: string[]
  results: string[]
  /** 16:10 image under /public/images/work/. */
  coverImage: string
  /** Optional: ties the project to a capability so the filter can pick it up. */
  capability?: string
  /** Optional alt text for the cover; falls back to a name-based description. */
  coverAlt?: string
  /** Optional longer intro for the detail page. */
  summary?: string
}

export const projects: Project[] = [
  // Add real projects here. Shape reference — uncomment and edit:
  //
  // {
  //   slug: 'example-campaign',
  //   name: 'Campaign or project name',
  //   client: 'Client name',
  //   industry: 'Telecom',
  //   servicesDelivered: ['Media Planning', 'Media Buying', 'Digital Campaigns'],
  //   platforms: ['Television', 'Outdoor', 'Social Media'],
  //   results: ['Reach or outcome one', 'Reach or outcome two'],
  //   coverImage: '/images/work/example-campaign-cover.webp',
  //   capability: 'media-marketing',
  //   coverAlt: 'Describe what is actually in the image',
  //   summary: 'One or two sentences on what the project set out to do.',
  // },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export const projectSlugs = projects.map((project) => project.slug)

/**
 * Filter options for the work grid, derived from the capability list so the two
 * can never drift apart.
 */
export const workFilters: { value: string; label: string }[] = [
  { value: 'all', label: 'All Work' },
  ...capabilities.map((capability) => ({
    value: capability.slug,
    label: capability.title,
  })),
]
