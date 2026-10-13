// Drives the services index, the homepage chapters, /services/[slug], the footer,
// the sitemap and the enquiry form. Copy is from the designer handover (21 Sep 2026).

import type { IconName } from '@/lib/icons'
import { padIndex } from '@/lib/utils'

export type Capability = {
  title: string
  description: string
  icon: IconName
}

// Which homepage chapter component renders the service.
export type ServiceLayout = 'media' | 'rights' | 'content' | 'events' | 'broadcast'

type ServiceInput = {
  slug: string
  title: string
  summary: string
  tagline: readonly [string, string]
  headline: string
  motto?: string
  layout: ServiceLayout
  image: { src: string; alt: string }
  capabilities: Capability[]
}

export type Service = ServiceInput & { number: string }

const serviceInputs: ServiceInput[] = [
  {
    slug: 'media-production',
    title: 'Media Production',
    summary:
      'Broadcast-grade production. Strategic storytelling. Content built for every platform.',
    tagline: ['Cinematic storytelling. Broadcast excellence.', 'Built around your vision.'],
    headline: 'Every moment, live.',
    motto: 'Concept. Production. Promotion.',
    layout: 'media',
    image: {
      src: '/images/services/media-production.webp',
      alt: 'A broadcast lens surrounded by layered screens and a blue audio waveform',
    },
    capabilities: [
      {
        title: 'End-to-End Content Production',
        description:
          'From concept and scripting to filming and post-production, we deliver complete content production, including white-label work and advertising commercials.',
        icon: 'clapperboard',
      },
      {
        title: 'OTT Strategy',
        description:
          'We help rights holders move from linear to digital, packaging content for streaming platforms and building direct-to-fan subscription models.',
        icon: 'monitor-play',
      },
      {
        title: 'Live Streaming',
        description:
          'Professional live-streaming solutions that connect events and experiences with audiences across digital platforms.',
        icon: 'cast',
      },
    ],
  },
  {
    slug: 'commercial-rights-sales',
    title: 'Commercial Rights & Sales',
    summary:
      'Strategic commercial solutions that connect brands with the right audiences, properties, and opportunities.',
    tagline: ['Maximising value. Expanding reach.', 'Global networks. Strategic partnerships.'],
    headline: 'Value finds its audience.',
    motto: 'Rights. Relationships. Results.',
    layout: 'rights',
    image: {
      src: '/images/services/commercial-rights-sales.webp',
      alt: 'Polished steel rings joined into a precise commercial network',
    },
    capabilities: [
      {
        title: 'Sponsorship Packaging',
        description:
          'Commercially compelling packages aligned with brand objectives, media, content, and event assets.',
        icon: 'package',
      },
      {
        title: 'Commercial Deal Structuring',
        description:
          'Partnerships and commercial opportunities designed to create measurable value for brands, rights holders, and stakeholders.',
        icon: 'handshake',
      },
      {
        title: 'Brand Activations',
        description:
          'Integrated on-ground, digital, and media-led activations that turn partnerships into meaningful audience engagement.',
        icon: 'sparkles',
      },
    ],
  },
  {
    slug: 'content-creation',
    title: 'Content Creation',
    summary:
      'Content designed to build relevance, strengthen brands, and drive audience engagement.',
    tagline: ['Ideas that connect. Content that performs.', 'Designed for every platform.'],
    headline: 'Ideas engineered for attention. Built for impact.',
    motto: 'From concept to connection.',
    layout: 'content',
    image: {
      src: '/images/services/content-creation.webp',
      alt: 'Layered translucent media frames with waveforms in deep blue',
    },
    capabilities: [
      {
        title: 'Social Media Content',
        description:
          'Strategic, platform-specific content designed to strengthen brand presence and maintain meaningful audience connections.',
        icon: 'smartphone',
      },
      {
        title: 'Graphic Design',
        description:
          'Visual identities, campaign creatives, digital assets, and communication materials built for consistency and impact.',
        icon: 'pen-tool',
      },
      {
        title: 'Video Content',
        description:
          'From short-form social content to branded films and campaign assets, we create video for modern audiences and digital platforms.',
        icon: 'film',
      },
    ],
  },
  {
    slug: 'event-branding-sponsorship',
    title: 'Event Branding & Sponsorship',
    summary: 'Turning events into high-impact brand experiences.',
    tagline: ['Elevate experiences. Amplify brands.', 'Meaningful connections that last.'],
    headline: 'Experiences designed to be felt. Built to be remembered.',
    motto: 'Strategy. Story. Experience.',
    layout: 'events',
    image: {
      src: '/images/services/event-branding-sponsorship.webp',
      alt: 'A stadium stage washed in blue light in front of a full crowd',
    },
    capabilities: [
      {
        title: 'Event Coverage',
        description:
          'End-to-end visual coverage of corporate, sporting, and large-scale events, capturing every moment with precision and consistency.',
        icon: 'aperture',
      },
      {
        title: 'Event Branding',
        description:
          'Cohesive visual identities and branded environments that create a strong presence across every event touchpoint.',
        icon: 'flag',
      },
      {
        title: 'Sponsorship Integration',
        description:
          'Relevant event assets that create opportunities for visibility, engagement, and brand association.',
        icon: 'infinity',
      },
      {
        title: 'On-Ground Execution',
        description:
          'Planning, creative development, and implementation managed in detail for seamless brand experiences.',
        icon: 'move-up-right',
      },
    ],
  },
  {
    slug: 'broadcast-production',
    title: 'Broadcast Production',
    summary:
      'From concept to final delivery: broadcast solutions built for quality, scale, and reach.',
    tagline: ['Live. Reliable. Remarkable.', 'From studio to stadium.'],
    headline: 'End-to-end broadcast solutions. Engineered for clarity. Delivered worldwide.',
    layout: 'broadcast',
    image: {
      src: '/images/services/broadcast-production.webp',
      alt: 'A broadcast signal radiating across a global distribution field',
    },
    capabilities: [
      {
        title: 'Concept Development',
        description:
          'Broadcast concepts, formats, and content approaches aligned with audience, platform, and commercial objectives.',
        icon: 'lightbulb',
      },
      {
        title: 'Production Management',
        description:
          'Complete creative, technical, and operational production management from start to finish.',
        icon: 'clipboard-list',
      },
      {
        title: 'Broadcast Infrastructure',
        description:
          'The technical infrastructure required for professional live and recorded broadcast production.',
        icon: 'radio-tower',
      },
      {
        title: 'Distribution & Delivery',
        description:
          'Broadcast-ready content prepared and delivered across the required platforms and distribution channels.',
        icon: 'satellite-dish',
      },
    ],
  },
]

export const services: Service[] = serviceInputs.map((service, index) => ({
  ...service,
  number: padIndex(index + 1),
}))

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getServiceHref(service: Pick<Service, 'slug'>) {
  return `/services/${service.slug}`
}

export function getNextService(slug: string): Service {
  const index = services.findIndex((service) => service.slug === slug)
  return services[(index + 1) % services.length]
}
