import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

// Colours live as RGB channels in globals.css so opacity modifiers work (bg-signal/20).
const rgb = (name: string) => `rgb(var(--${name}-rgb) / <alpha-value>)`

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: rgb('canvas'),
        surface: rgb('surface'),
        raised: rgb('raised'),
        ink: rgb('ink'),
        muted: rgb('muted'),
        silver: rgb('silver'),
        signal: {
          DEFAULT: rgb('signal'),
          bright: rgb('signal-bright'),
        },
        line: {
          DEFAULT: 'rgb(var(--ink-rgb) / 0.12)',
          strong: 'rgb(var(--ink-rgb) / 0.24)',
        },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow)', '"Arial Narrow"', 'ui-sans-serif', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      // Keep in sync with the font-size list in src/lib/utils.ts.
      fontSize: {
        label: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.14em' }],
        small: ['0.875rem', { lineHeight: '1.55' }],
        body: ['1rem', { lineHeight: '1.65' }],
        lead: ['clamp(1.0625rem, 0.95rem + 0.45vw, 1.3125rem)', { lineHeight: '1.55' }],
        title: ['clamp(1.375rem, 1.1rem + 1vw, 2.125rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        statement: ['clamp(2rem, 1.2rem + 3.2vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)', { lineHeight: '0.9', letterSpacing: '-0.01em' }],
        'display-lg': ['clamp(2.75rem, 1.4rem + 4.4vw, 6.25rem)', { lineHeight: '0.88', letterSpacing: '-0.015em' }],
        'display-xl': ['clamp(3.25rem, 1rem + 6.6vw, 8.5rem)', { lineHeight: '0.86', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        shell: '1600px',
      },
      spacing: {
        nav: 'var(--nav-offset)',
        gutter: 'var(--gutter)',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        pulse_ring: {
          '0%': { transform: 'scale(0.35)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
        signal_travel: {
          '0%': { transform: 'translateX(-10%)', opacity: '0' },
          '15%, 85%': { opacity: '1' },
          '100%': { transform: 'translateX(110%)', opacity: '0' },
        },
        blink: {
          '0%, 55%': { opacity: '1' },
          '56%, 100%': { opacity: '0.25' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        progress: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        ticker: 'ticker var(--ticker-duration, 48s) linear infinite',
        'pulse-ring': 'pulse_ring 3.2s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'signal-travel': 'signal_travel 4.5s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        blink: 'blink 1.6s steps(1) infinite',
        scan: 'scan 2.4s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        progress: 'progress var(--progress-duration, 7s) linear forwards',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Clipped corners. Size with [--notch:2rem].
    plugin(({ addUtilities }) => {
      const n = 'var(--notch, 1.25rem)'
      addUtilities({
        '.notch': {
          'clip-path': `polygon(0 0, calc(100% - ${n}) 0, 100% ${n}, 100% 100%, 0 100%)`,
        },
        '.bevel': {
          'clip-path': `polygon(${n} 0, calc(100% - ${n}) 0, 100% ${n}, 100% calc(100% - ${n}), calc(100% - ${n}) 100%, ${n} 100%, 0 calc(100% - ${n}), 0 ${n})`,
        },
      })
    }),
  ],
}

export default config
