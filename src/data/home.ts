export const heroFilm = {
  desktop: {
    src: '/media/hero/signal-desktop.mp4',
    poster: '/media/hero/signal-desktop-poster.webp', // exact first frame of the clip
    width: 1920,
    height: 1080,
  },
  mobile: {
    src: '/media/hero/signal-mobile.mp4',
    poster: '/media/hero/signal-mobile-poster.webp',
    width: 1280,
    height: 720,
  },
  // Viewport heights of scroll the clip plays across: hero, about, then the partner proof.
  scrollLength: 3,
}

export type HeroFilm = typeof heroFilm

export const hero = {
  kicker: 'Parklane Media',
  title: 'Ideas that engage. Content that converts.',
  body: 'We shape brands, stories, and growth through strategy, production, and commercial thinking.',
  tags: ['Media', 'Rights', 'Content'],
  cta: { label: 'View our work', href: '#work' },
}

export const about = {
  eyebrow: 'About Parklane',
  heading: 'Built to',
  emphasis: 'connect.',
  title: 'Elevating brands through media and beyond.',
  body: 'A full-service media, content, and advertising agency. We connect strategic thinking with purposeful execution, from the first idea to the final audience.',
  facts: [
    {
      label: 'Experience',
      value: 'ICC · FIFA · FIH · International cricket · PSL · Champions League · EPL · F1 · Big Bash · ILT20',
    },
    { label: 'Delivery', value: 'Concept · Production · Promotion' },
  ],
}

export const contact = {
  eyebrow: 'Start a conversation',
  heading: 'Make your next campaign matter.',
  body: 'Tell us where you want to go. We will shape the strategy, content, and execution.',
}
