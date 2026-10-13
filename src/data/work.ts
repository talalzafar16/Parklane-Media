// No public case studies yet, so /work shows a holding state. Adding a project
// here turns on the grid, the service filter and /work/[slug].

import { services } from '@/data/services'

export type Project = {
  slug: string
  name: string
  client: string
  industry: string
  servicesDelivered: string[]
  platforms: string[]
  results: string[]
  coverImage: string // 16:10, under /public/images/work/
  service?: string // a service slug, for the filter
  coverAlt?: string
  summary?: string
}

export const projects: Project[] = [
  // Example:
  // {
  //   slug: 'example-campaign',
  //   name: 'Campaign or project name',
  //   client: 'Client name',
  //   industry: 'Sport',
  //   servicesDelivered: ['Live Streaming', 'OTT Strategy'],
  //   platforms: ['Broadcast', 'OTT', 'Social'],
  //   results: ['Reach or outcome one', 'Reach or outcome two'],
  //   coverImage: '/images/work/example-campaign-cover.webp',
  //   service: 'media-production',
  //   coverAlt: 'Describe what is actually in the image',
  //   summary: 'One or two sentences on what the project set out to do.',
  // },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export const workFilters: { value: string; label: string }[] = [
  { value: 'all', label: 'All work' },
  ...services.map((service) => ({ value: service.slug, label: service.title })),
]
