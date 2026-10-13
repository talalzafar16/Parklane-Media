// `illustrative` and `draft` drive the on-page caveats — set them to false once
// a figure is verified or a quote is signed off.

export type Partner = {
  id: string
  name: string
  logo: string
  // Slate colour behind the logo, so dark or white lettering stays visible.
  tone: 'light' | 'dark'
}

// Artwork supplied by the client on 21 Sep 2026.
export const partners: Partner[] = [
  { id: 'ptv', name: 'PTV', logo: '/images/partners/ptv.webp', tone: 'light' },
  { id: 'tamasha', name: 'Tamasha', logo: '/images/partners/tamasha.webp', tone: 'light' },
  { id: 'myco', name: 'MYCO', logo: '/images/partners/myco.webp', tone: 'dark' },
  { id: 'psl', name: 'PSL', logo: '/images/partners/psl.webp', tone: 'light' },
  { id: 'fifa', name: 'FIFA', logo: '/images/partners/fifa.webp', tone: 'light' },
  { id: 'pcb', name: 'PCB', logo: '/images/partners/pcb.webp', tone: 'light' },
  { id: 'bigbash', name: 'Big Bash', logo: '/images/partners/bigbash.webp', tone: 'light' },
]

export type Stat = {
  label: string
  value: number
  suffix: string
  caption?: string
  illustrative: boolean
}

export const stats = {
  campaigns: {
    label: 'Ideas in action',
    value: 120,
    suffix: '+',
    caption: 'Campaigns imagined. Connections made.',
    illustrative: true,
  },
  commitment: {
    label: 'Commitment to measurable impact',
    value: 100,
    suffix: '%',
    illustrative: true,
  },
  audience: {
    label: 'Audience connections',
    value: 100,
    suffix: 'M+',
    caption: 'Content that travels further. Stories that stay with people.',
    illustrative: false, // client supplied
  },
  markets: {
    label: 'Markets reached',
    value: 20,
    suffix: '+',
    illustrative: true,
  },
} satisfies Record<string, Stat>

export type Testimonial = {
  quote: string
  name: string
  company: string
  draft: boolean
}

// TODO: CLIENT — replace each quote and attribution once approved in writing.
export const testimonials: Testimonial[] = [
  'Parklane turned our brief into a clear campaign idea, then brought it to life with care and creativity.',
  'Their understanding of sport helped us connect our brand with fans in a way that felt natural and relevant.',
  'From the first production meeting to the final delivery, the team kept every detail moving in the right direction.',
  'They helped us see the commercial potential in our property and shape a stronger proposition for partners.',
  'Our event needed a consistent brand presence. Parklane brought the spaces, sponsorships and content together.',
  'The content felt true to our brand and right for each platform, giving us a story we could build on.',
  'They understood the demands of live broadcasting and approached each stage with preparation and composure.',
  'Parklane worked as an extension of our team, balancing ambitious ideas with practical, dependable execution.',
].map((quote) => ({ quote, name: 'Client name', company: 'Company', draft: true }))

export const proofStatement = {
  eyebrow: 'About us',
  lead: 'A global digital partner dedicated to building',
  emphasis: 'smarter',
  trail: 'and more adaptive campaigns.',
}

export const hasIllustrativeStats = Object.values(stats).some((stat) => stat.illustrative)
export const hasDraftTestimonials = testimonials.some((testimonial) => testimonial.draft)
