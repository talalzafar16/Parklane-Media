import type { StaticImageData } from 'next/image'

import broadcastProduction from '@/assets/services/broadcast-production.webp'
import commercialRights from '@/assets/services/commercial-rights.webp'
import contentCreation from '@/assets/services/content-creation.webp'
import eventBranding from '@/assets/services/event-branding.webp'
import mediaProduction from '@/assets/services/media-production.webp'
import { padIndex } from '@/lib/utils'

export type Service = {
  id: string
  number: string
  title: string
  statement: string
  icon: 'camera' | 'handshake' | 'pen-tool' | 'flag' | 'radio'
  image: { src: StaticImageData; alt: string }
  tone: 'default' | 'silver' | 'surface'
  capabilities: { title: string; description: string }[]
}

const serviceList: Omit<Service, 'number'>[] = [
  {
    id: 'media-production',
    title: 'Media Production',
    statement: 'Broadcast-grade production. Strategic storytelling. Content built for every platform.',
    icon: 'camera',
    image: { src: mediaProduction, alt: 'Cinematic broadcast production equipment' },
    tone: 'default',
    capabilities: [
      {
        title: 'End-to-End Content Production',
        description:
          'From concept and scripting to filming and post-production, we deliver complete content production, including white-label work and advertising commercials.',
      },
      {
        title: 'OTT Strategy',
        description:
          'We help rights holders move from linear to digital, packaging content for streaming platforms and building direct-to-fan subscription models.',
      },
      {
        title: 'Live Streaming',
        description:
          'Professional live-streaming solutions that connect events and experiences with audiences across digital platforms.',
      },
    ],
  },
  {
    id: 'commercial-rights',
    title: 'Commercial Rights & Sales',
    statement:
      'Strategic commercial solutions that connect brands with the right audiences, properties, and opportunities.',
    icon: 'handshake',
    image: { src: commercialRights, alt: 'A precision network of connected commercial rights' },
    tone: 'default',
    capabilities: [
      {
        title: 'Sponsorship Packaging',
        description: 'Commercially compelling packages aligned with brand objectives, media, content, and event assets.',
      },
      {
        title: 'Commercial Deal Structuring',
        description:
          'Partnerships and commercial opportunities designed to create measurable value for brands, rights holders, and stakeholders.',
      },
      {
        title: 'Brand Activations',
        description:
          'Integrated on-ground, digital, and media-led activations that turn partnerships into meaningful audience engagement.',
      },
    ],
  },
  {
    id: 'content-creation',
    title: 'Content Creation',
    statement: 'Content designed to build relevance, strengthen brands, and drive audience engagement.',
    icon: 'pen-tool',
    image: { src: contentCreation, alt: 'Layered media frames representing content creation' },
    tone: 'silver',
    capabilities: [
      {
        title: 'Social Media Content',
        description:
          'Strategic, platform-specific content designed to strengthen brand presence and maintain meaningful audience connections.',
      },
      {
        title: 'Graphic Design',
        description:
          'Visual identities, campaign creatives, digital assets, and communication materials built for consistency and impact.',
      },
      {
        title: 'Video Content',
        description:
          'From short-form social content to branded films and campaign assets, we create video for modern audiences and digital platforms.',
      },
    ],
  },
  {
    id: 'event-branding',
    title: 'Event Branding & Sponsorship',
    statement: 'Turning events into high-impact brand experiences.',
    icon: 'flag',
    image: { src: eventBranding, alt: 'Conceptual stadium stage and event lighting' },
    tone: 'surface',
    capabilities: [
      {
        title: 'Event Coverage',
        description:
          'End-to-end visual coverage of corporate, sporting, and large-scale events, capturing every moment with precision and consistency.',
      },
      {
        title: 'Event Branding',
        description:
          'Cohesive visual identities and branded environments that create a strong presence across every event touchpoint.',
      },
      {
        title: 'Sponsorship Integration',
        description: 'Relevant event assets that create opportunities for visibility, engagement, and brand association.',
      },
      {
        title: 'On-Ground Execution',
        description: 'Planning, creative development, and implementation managed in detail for seamless brand experiences.',
      },
    ],
  },
  {
    id: 'broadcast-production',
    title: 'Broadcast Production',
    statement: 'From concept to final delivery: broadcast solutions built for quality, scale, and reach.',
    icon: 'radio',
    image: { src: broadcastProduction, alt: 'A broadcast signal spreading across a distribution field' },
    tone: 'default',
    capabilities: [
      {
        title: 'Concept Development',
        description:
          'Broadcast concepts, formats, and content approaches aligned with audience, platform, and commercial objectives.',
      },
      {
        title: 'Production Management',
        description: 'Complete creative, technical, and operational production management from start to finish.',
      },
      {
        title: 'Broadcast Infrastructure',
        description: 'The technical infrastructure required for professional live and recorded broadcast production.',
      },
      {
        title: 'Distribution & Delivery',
        description: 'Broadcast-ready content prepared and delivered across the required platforms and distribution channels.',
      },
    ],
  },
]

export const services: Service[] = serviceList.map((service, index) => ({ ...service, number: padIndex(index + 1) }))
