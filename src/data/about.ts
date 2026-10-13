import type { IconName } from '@/lib/icons'

export const manifesto = {
  eyebrow: 'Our manifesto',
  heading: 'We turn attention into lasting value',
  body: [
    'Parklane Media exists at the intersection of story, systems, and scale. We build and operate media that performs in the real world — driving measurable outcomes for ambitious brands across broadcast, digital, and social.',
    'Our approach is equal parts precision and creativity. We don’t chase attention. We compound it.',
  ],
  principle: {
    label: 'Operational principle',
    lines: ['Attention is volatile.', 'Trust is earned.', 'Value is built.'],
  },
}

export const principles: { key: string; title: string; icon: IconName }[] = [
  { key: 'Focus', title: 'Clarity before content.', icon: 'crosshair' },
  { key: 'Systems', title: 'Built to scale. Built to last.', icon: 'layers' },
  { key: 'Impact', title: 'Outcomes over output.', icon: 'trending-up' },
]

export const connect = {
  eyebrow: 'About Parklane',
  heading: ['Built to', 'connect.'] as const,
  title: 'Elevating brands through media and beyond.',
  body: 'A full-service media, content, and advertising agency. We connect strategic thinking with purposeful execution, from the first idea to the final audience.',
  facts: [
    {
      label: 'Experience',
      items: ['ICC', 'FIFA', 'FIH', 'International cricket', 'PSL', 'Champions League', 'EPL', 'F1', 'Big Bash'],
    },
    { label: 'Delivery', items: ['Concept', 'Production', 'Promotion'] },
  ],
}

// The client's own wording — don't rewrite.
export const companyStory = {
  eyebrow: 'Who we are',
  heading: 'One team across media, content and commercial',
  paragraphs: [
    'Parklane Media is a media, content, marketing and advertising company focused on creating meaningful connections between businesses, audiences and content.',
    'From content creation and distribution to advertising, media planning, digital marketing and brand activations, we develop solutions across traditional, digital and emerging media platforms.',
    'Our work spans content, advertising, digital media, sports, entertainment, events and emerging technologies, creating opportunities for brands and content owners to engage audiences and grow.',
  ],
}
