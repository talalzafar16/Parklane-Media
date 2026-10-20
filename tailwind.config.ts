import type { Config } from 'tailwindcss'

// Colours are RGB channels in globals.css so opacity modifiers work (bg-navy/[.87]).
const rgb = (name: string) => `rgb(var(--pm-${name}-rgb) / <alpha-value>)`
const navy = (alpha = 1) => `rgb(var(--pm-navy-rgb) / ${alpha})`
const surface = (alpha = 1) => `rgb(var(--pm-surface-rgb) / ${alpha})`
const silver = 'rgb(var(--pm-silver-rgb))'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // The approved design is built on max-width breakpoints, so these replace Tailwind's defaults.
    // Order matters: later screens win, so they run largest to smallest.
    screens: {
      laptop: { max: '1100px' },
      tablet: { max: '900px' },
      compact: { max: '860px' },
      mobile: { max: '700px' },
      short: { raw: '(min-width: 701px) and (max-height: 800px)' },
    },
    extend: {
      colors: {
        navy: rgb('navy'),
        surface: rgb('surface'),
        accent: rgb('accent'),
        ink: rgb('ink'),
        silver: rgb('silver'),
        // Plain variables: the silver service section redefines them for everything inside it.
        muted: 'var(--pm-muted)',
        line: 'var(--pm-line)',
      },
      borderColor: {
        DEFAULT: 'var(--pm-line)',
      },
      fontFamily: {
        display: ['var(--font-barlow)', '"Arial Narrow"', 'sans-serif'],
        sans: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      spacing: {
        gutter: 'var(--pm-gutter)',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
      backgroundImage: {
        'stage-fade': `linear-gradient(90deg, ${navy(0.5)}, transparent 75%), linear-gradient(0deg, ${navy()}, transparent 30%)`,
        'stage-fade-mobile': `linear-gradient(0deg, ${navy(0.92)}, ${navy(0.3)} 65%, transparent)`,
        'about-fade': `linear-gradient(90deg, ${navy(0.6)}, ${navy(0.35)})`,
        'proof-fade': `linear-gradient(180deg, ${navy(0.36)}, ${navy(0.12)} 55%, ${navy(0.38)})`,
        'image-card-fade': `linear-gradient(0deg, transparent, ${navy(0.35)})`,
        'chapter-fade': `linear-gradient(90deg, ${navy(0.58)} 0%, ${navy(0.62)} 35%, ${navy()} 61%)`,
        'chapter-fade-silver': `linear-gradient(90deg, ${navy(0.55)}, ${navy(0.65)} 35%, ${silver} 61%)`,
        'chapter-fade-surface': `linear-gradient(90deg, ${surface(0.55)}, ${surface(0.6)} 35%, ${surface()} 61%)`,
        'chapter-fade-mobile': `linear-gradient(180deg, ${navy(0.6)}, ${navy(0.7)} 18rem, ${navy()} 28rem)`,
        'chapter-fade-silver-mobile': `linear-gradient(180deg, ${navy(0.7)}, ${navy(0.7)} 19rem, ${silver} 28rem)`,
      },
    },
  },
}

export default config
