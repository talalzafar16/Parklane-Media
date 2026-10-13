type FilmSource = {
  src: string
  poster: string // must be the clip's exact first frame
  width: number
  height: number
}

export type Film = {
  desktop: FilmSource
  mobile: FilmSource
  duration: number
  fps: number
  chapters: readonly string[]
}

export const heroFilm: Film = {
  desktop: {
    src: '/media/hero/signal-desktop.mp4',
    poster: '/media/hero/signal-desktop-poster.webp',
    width: 1920,
    height: 1080,
  },
  mobile: {
    src: '/media/hero/signal-mobile.mp4',
    poster: '/media/hero/signal-mobile-poster.webp',
    width: 1280,
    height: 720,
  },
  duration: 15.04,
  fps: 24,
  chapters: ['Signal', 'Connect', 'Reach'],
}

export const heroIntro = {
  kicker: 'Parklane Media',
  heading: { lead: 'Ideas that engage.', trail: 'Content that', emphasis: 'converts' },
  body: 'We shape brands, stories, and growth through strategy, production, and commercial thinking.',
  tags: ['Media', 'Rights', 'Content'],
}

export const servicesIntro = {
  eyebrow: 'Services index',
  heading: ['Precision.', 'Performance.'] as const,
  emphasis: 'Delivered.',
  body: 'End-to-end media services engineered for impact. From concept to broadcast, we make every frame count.',
}

export const contactIntro = {
  eyebrow: 'Contact',
  heading: 'Let’s talk',
  body: 'Have a project in mind or need expert guidance? Get in touch — we’re ready when you are.',
  formEyebrow: 'Start a conversation',
  formHeading: 'Make your next campaign matter.',
  formBody: 'Tell us where you want to go. We will shape the strategy, content, and execution.',
}

export const finale = {
  heading: { lead: 'Make the next', emphasis: 'Signal', trail: 'matter.' },
  body: 'We partner with broadcasters, brands, and platforms to deliver impactful content that resonates — and endures.',
  cta: 'Start a conversation',
}
