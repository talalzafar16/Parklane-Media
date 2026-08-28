import type { Config } from 'tailwindcss'

/**
 * Parklane Media design tokens.
 *
 * Every colour reads from a CSS variable in `src/app/globals.css`, so
 * rebranding is a single-file change. The `-rgb` variants hold bare channel
 * values so Tailwind's `/opacity` modifiers keep working (e.g. `bg-brand/10`).
 *
 * Light theme only — no `dark:` variants anywhere in this project.
 */
const config: Config = {
  darkMode: [], // explicitly disabled: the client does not want a dark theme
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'rgb(var(--brand-rgb) / <alpha-value>)',
          dark: 'rgb(var(--brand-dark-rgb) / <alpha-value>)',
          tint: 'rgb(var(--brand-tint-rgb) / <alpha-value>)',
          /* On-dark brand text only — see the note in globals.css. */
          light: 'rgb(var(--brand-light-rgb) / <alpha-value>)',
        },
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        canvas: 'rgb(var(--base-rgb) / <alpha-value>)',
        /* Body copy. Named `fg` so `ink` can be the near-black band colour. */
        fg: 'rgb(var(--text-rgb) / <alpha-value>)',
        /* The single full-bleed near-black band. */
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        border: 'rgb(var(--border-rgb) / <alpha-value>)',
      },
      fontFamily: {
        // Body — Inter. Set on <body>; `font-sans` is the default everywhere.
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Display — Archivo, variable width axis. Applied via `font-display`
        // and to h1–h6 in globals.css.
        display: ['var(--font-archivo)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Micro layer — JetBrains Mono. Prefer the `.micro` component class.
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        micro: ['var(--fs-micro)', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        small: ['0.9375rem', { lineHeight: '1.6' }],
        body: ['var(--fs-body)', { lineHeight: '1.7' }],
        lead: ['clamp(1.125rem, 0.95rem + 0.6vw, 1.375rem)', { lineHeight: '1.6' }],
        h4: ['1.125rem', { lineHeight: '1.35', fontWeight: '700' }],
        h3: ['var(--fs-h3)', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['var(--fs-h2)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        display: [
          'var(--fs-display)',
          { lineHeight: '0.92', letterSpacing: '-0.03em', fontWeight: '700' },
        ],
      },
      spacing: {
        // The brand scale is 8/16/24/40/64/96/128 → 2/4/6/10/16/24/32 in
        // Tailwind units (root stays at 16px). 18 = 72px, the mobile rhythm.
        18: '4.5rem',
      },
      maxWidth: {
        container: '1280px',
        copy: '68ch',
      },
      borderRadius: {
        // Sharp corners are the identity. Only form inputs soften.
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        input: 'var(--radius-input)',
        full: '9999px',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        /* The oversized PM mark behind the hero: a 2–3px drift, nothing more. */
        'mark-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(3px, -2px, 0)' },
        },
      },
      animation: {
        ticker: 'ticker var(--ticker-duration, 40s) linear infinite',
        'accordion-down': 'accordion-down 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-up': 'accordion-up 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
        'mark-drift': 'mark-drift 18s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      },
      transitionTimingFunction: {
        brand: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      /* No boxShadow extensions: the design uses 1px hairlines, never shadows. */
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
