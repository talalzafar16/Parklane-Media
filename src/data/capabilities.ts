/**
 * The six capabilities. This replaces the earlier three-service structure.
 *
 * Each entry renders in three places:
 *   • a row in the homepage capabilities accordion
 *   • a card on /capabilities
 *   • a full detail page at /capabilities/[slug]
 *
 * All copy here is the client's own wording — do not reword it. The tag lists
 * are the substance of this section, not decoration.
 */

export type CapabilityIcon =
  | 'clapperboard'
  | 'megaphone'
  | 'target'
  | 'globe'
  | 'trophy'
  | 'sparkles'

export type Capability = {
  slug: string
  /** Two-digit label shown in the accordion and on the detail page. */
  number: string
  title: string
  /** One line. Used collapsed, on cards, and as the meta description. */
  description: string
  tags: string[]
  icon: CapabilityIcon
}

export const capabilities: Capability[] = [
  {
    slug: 'content',
    number: '01',
    title: 'Content',
    description:
      "We create, acquire, develop, distribute and commercialise content for today's multi-platform audiences.",
    icon: 'clapperboard',
    tags: [
      'Sports Programming',
      'Entertainment Programming',
      'Films & Documentaries',
      'Podcasts',
      'Digital Content',
      'Social Content',
      'Branded Content',
      'Esports Content',
      'AI-Generated Content',
      'Content Distribution',
    ],
  },
  {
    slug: 'advertising',
    number: '02',
    title: 'Advertising',
    description:
      'We create advertising solutions that help brands reach the right audiences across multiple platforms.',
    icon: 'megaphone',
    tags: [
      'Advertising Campaigns',
      'Digital Advertising',
      'Social Media Advertising',
      'Print Advertising',
      'Outdoor Advertising',
      'Billboards',
      'Signboards & Hoardings',
      'Brand Integrations',
      'Sponsorships',
      'Promotional Campaigns',
    ],
  },
  {
    slug: 'media-marketing',
    number: '03',
    title: 'Media & Marketing',
    description:
      'Strategic media and marketing solutions designed around business objectives and audience behaviour.',
    icon: 'target',
    tags: [
      'Media Planning',
      'Media Buying',
      'Media Sales',
      'Marketing Strategy',
      'Brand Development',
      'Brand Activation',
      'Trade Marketing',
      'Public Relations',
      'Direct Marketing',
      'Telemarketing',
      'Media Research',
      'Marketing Research',
    ],
  },
  {
    slug: 'digital-social',
    number: '04',
    title: 'Digital & Social',
    description:
      'Helping brands and content owners build a stronger presence across the digital ecosystem.',
    icon: 'globe',
    tags: [
      'Digital Strategy',
      'Online Marketing',
      'Social Media',
      'Digital Campaigns',
      'Audience Engagement',
      'Streaming',
      'OTT',
      'Webcasting',
      'Mobile Platforms',
      'Digital Distribution',
    ],
  },
  {
    slug: 'sports-entertainment',
    number: '05',
    title: 'Sports & Entertainment',
    description: 'We create commercial and content opportunities across sports and entertainment.',
    icon: 'trophy',
    tags: [
      'Sports Content',
      'Esports',
      'Entertainment Programming',
      'Sponsorships',
      'Brand Activations',
      'Content Partnerships',
      'Digital Distribution',
      'Audience Engagement',
    ],
  },
  {
    slug: 'events-activations',
    number: '06',
    title: 'Events & Activations',
    description:
      'From concept to execution, we create experiences that bring brands closer to their audiences.',
    icon: 'sparkles',
    tags: [
      'Event Management',
      'Brand Activations',
      'Experiential Marketing',
      'Promotional Events',
      'Sports Activations',
      'Corporate Events',
      'Sponsorship Activations',
    ],
  },
]

export function getCapability(slug: string): Capability | undefined {
  return capabilities.find((capability) => capability.slug === slug)
}

export const capabilitySlugs = capabilities.map((capability) => capability.slug)
