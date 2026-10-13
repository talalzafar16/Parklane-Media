import type { IconName } from '@/lib/icons'

export type WhyReason = {
  title: string
  description: string
  icon: IconName
}

export const whyParklane: WhyReason[] = [
  {
    title: 'Integrated',
    description: 'Content, media, marketing and advertising brought together under one roof.',
    icon: 'layers',
  },
  {
    title: 'Audience-Focused',
    description:
      'We create strategies around how audiences consume and engage with media today.',
    icon: 'users',
  },
  {
    title: 'Commercially Driven',
    description:
      'We look beyond visibility to create meaningful business and revenue opportunities.',
    icon: 'trending-up',
  },
  {
    title: 'Multi-Platform',
    description: 'From print and outdoor to digital, social, streaming and emerging platforms.',
    icon: 'monitor-smartphone',
  },
  {
    title: 'Creative & Strategic',
    description: 'Strong ideas backed by strategic thinking and disciplined execution.',
    icon: 'lightbulb',
  },
  {
    title: 'Future-Ready',
    description:
      'We embrace new formats, technologies and opportunities shaping the media industry.',
    icon: 'rocket',
  },
]
