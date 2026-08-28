/**
 * Generates every placeholder asset the site references.
 *
 * Run with `npm run placeholders`. Safe to re-run — it overwrites in place.
 *
 * Each image is a flat brand-family colour with a soft tonal wash, rendered at
 * the exact aspect ratio the layout expects, so swapping in real photography
 * never shifts the page. Everything is written as WebP except the logo, which
 * the brief specifies as /public/logo.jpeg.
 */

import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

import sharp from 'sharp'

const PUBLIC_DIR = path.join(process.cwd(), 'public')

/** Flat panel with an off-centre radial wash, so it reads as art-directed. */
function panelSvg({ width, height, base, wash }) {
  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="wash" cx="32%" cy="26%" r="82%">
          <stop offset="0%" stop-color="${wash}" stop-opacity="0.85" />
          <stop offset="100%" stop-color="${base}" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="55%" stop-color="#000000" stop-opacity="0" />
          <stop offset="100%" stop-color="#000000" stop-opacity="0.16" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="${base}" />
      <rect width="${width}" height="${height}" fill="url(#wash)" />
      <rect width="${width}" height="${height}" fill="url(#depth)" />
    </svg>
  `)
}

async function writeWebp({ file, width, height, base, wash }) {
  const target = path.join(PUBLIC_DIR, file)
  await mkdir(path.dirname(target), { recursive: true })

  await sharp(panelSvg({ width, height, base, wash }))
    .webp({ quality: 82, effort: 5 })
    .toFile(target)

  return file
}

/**
 * The logo lockup: blue "PM" monogram tile plus the wordmark, on white.
 * Letterforms are drawn as paths rather than <text> so the output does not
 * depend on which fonts happen to be installed on the machine running this.
 */
function logoSvg() {
  const width = 860
  const height = 160
  const blue = '#1B5A8C'
  const dark = '#0E3352'

  return Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect width="${width}" height="${height}" fill="#FFFFFF" />

      <!-- Monogram tile -->
      <rect x="24" y="24" width="112" height="112" rx="24" fill="${blue}" />

      <!-- "P" -->
      <path d="M50 52h24a17 17 0 0 1 0 34H61v22H50z M61 63v12h13a6 6 0 0 0 0-12z"
            fill="#FFFFFF" fill-rule="evenodd" />
      <!-- "M" -->
      <path d="M92 108V52h11l10 20 10-20h11v56h-11V75l-10 19-10-19v33z" fill="#FFFFFF" />

      <!-- Wordmark: "Parklane" -->
      <g fill="${dark}">
        <path d="M176 46h26a20 20 0 0 1 0 40h-15v28h-11z M187 57v18h15a9 9 0 0 0 0-18z" fill-rule="evenodd" />
        <path d="M243 66c11 0 19 6 19 17v31h-10l-1-6a17 17 0 0 1-14 7c-10 0-17-6-17-15s7-14 19-15l12-1v-1c0-5-3-8-9-8-5 0-9 2-10 6l-10-2c2-8 10-13 21-13z M251 92l-10 1c-6 1-9 3-9 7s3 6 8 6c7 0 11-4 11-10z" fill-rule="evenodd" />
        <path d="M272 67h10l1 8c3-6 8-9 15-9h3v11h-4c-9 0-14 5-14 15v22h-11z" />
        <path d="M306 42h11v42l19-17h14l-22 19 23 28h-13l-17-21-4 4v17h-11z" />
        <path d="M357 42h11v72h-11z" />
        <path d="M400 66c11 0 19 6 19 17v31h-10l-1-6a17 17 0 0 1-14 7c-10 0-17-6-17-15s7-14 19-15l12-1v-1c0-5-3-8-9-8-5 0-9 2-10 6l-10-2c2-8 10-13 21-13z M408 92l-10 1c-6 1-9 3-9 7s3 6 8 6c7 0 11-4 11-10z" fill-rule="evenodd" />
        <path d="M429 67h10l1 8c3-6 9-9 16-9 12 0 19 7 19 20v28h-11V88c0-8-4-12-11-12-8 0-13 5-13 14v24h-11z" />
        <path d="M508 66c14 0 23 10 23 25v3h-36c1 8 6 13 14 13 6 0 10-2 12-7l10 3c-4 8-12 12-22 12-15 0-25-10-25-25s10-24 24-24z M520 86c-1-7-6-11-12-11-7 0-12 4-13 11z" fill-rule="evenodd" />
      </g>

      <!-- Wordmark: "Media" -->
      <g fill="${blue}">
        <path d="M551 46h14l19 47 19-47h14v68h-11V66l-17 43h-10l-17-43v48h-11z" />
        <path d="M645 66c14 0 23 10 23 25v3h-36c1 8 6 13 14 13 6 0 10-2 12-7l10 3c-4 8-12 12-22 12-15 0-25-10-25-25s10-24 24-24z M657 86c-1-7-6-11-12-11-7 0-12 4-13 11z" fill-rule="evenodd" />
        <path d="M716 42h10v72h-9l-1-7c-4 5-9 8-16 8-13 0-22-10-22-25s9-25 22-25c6 0 11 2 16 7z M716 90c0-9-6-15-14-15s-14 6-14 15 6 15 14 15 14-6 14-15z" fill-rule="evenodd" />
        <path d="M734 67h11v47h-11z M734 46h11v12h-11z" />
        <path d="M776 66c11 0 19 6 19 17v31h-10l-1-6a17 17 0 0 1-14 7c-10 0-17-6-17-15s7-14 19-15l12-1v-1c0-5-3-8-9-8-5 0-9 2-10 6l-10-2c2-8 10-13 21-13z M784 92l-10 1c-6 1-9 3-9 7s3 6 8 6c7 0 11-4 11-10z" fill-rule="evenodd" />
      </g>
    </svg>
  `)
}

async function writeLogo() {
  const target = path.join(PUBLIC_DIR, 'logo.jpeg')
  await sharp(logoSvg()).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(target)
  return 'logo.jpeg'
}

const WORK_TONES = {
  'meridian-bank-brand-film': { base: '#1B3F5C', wash: '#3C7AA8' },
  'vertex-motors-launch': { base: '#1E2A33', wash: '#4E6E80' },
  'saffron-kitchen-brand-refresh': { base: '#4A2E1E', wash: '#A5643C' },
  'aurora-fc-launch-campaign': { base: '#241E42', wash: '#5B4E96' },
  'lumen-skincare-performance': { base: '#3A4348', wash: '#8FA3AC' },
  'northbay-outfitters-social-engine': { base: '#223A2C', wash: '#547F62' },
}

const SERVICE_TONES = {
  'content-production': { base: '#1B5A8C', wash: '#5D9BC7' },
  'video-production': { base: '#0E3352', wash: '#40729B' },
  advertising: { base: '#8A5A18', wash: '#E9A23B' },
}

const TEAM_TONES = [
  { base: '#2C3E4C', wash: '#6B8698' },
  { base: '#3A4A3F', wash: '#7E9A85' },
  { base: '#42353F', wash: '#8E7686' },
  { base: '#2E3A4A', wash: '#6E819C' },
]

async function main() {
  const jobs = []

  // Hero poster (16:9) and the Open Graph card (1.91:1).
  jobs.push(
    writeWebp({
      file: 'images/hero-poster.webp',
      width: 1920,
      height: 1080,
      base: '#0E3352',
      wash: '#2A6D9E',
    }),
  )
  jobs.push(
    writeWebp({ file: 'og.webp', width: 1200, height: 630, base: '#0E3352', wash: '#2A6D9E' }),
  )

  // About + team.
  jobs.push(
    writeWebp({
      file: 'images/about/studio.webp',
      width: 1000,
      height: 1250,
      base: '#22333F',
      wash: '#5C8AA8',
    }),
  )
  TEAM_TONES.forEach((tone, index) => {
    jobs.push(
      writeWebp({
        file: `images/team/member-0${index + 1}.webp`,
        width: 800,
        height: 800,
        ...tone,
      }),
    )
  })

  // Services (4:3 — also used inside 16:9 frames with object-cover).
  for (const [slug, tone] of Object.entries(SERVICE_TONES)) {
    jobs.push(
      writeWebp({ file: `images/services/${slug}.webp`, width: 1600, height: 1200, ...tone }),
    )
  }

  // Case studies: card cover (16:10), page hero (2:1), two gallery stills (16:9).
  for (const [slug, tone] of Object.entries(WORK_TONES)) {
    jobs.push(
      writeWebp({ file: `images/work/${slug}-cover.webp`, width: 1600, height: 1000, ...tone }),
    )
    jobs.push(
      writeWebp({ file: `images/work/${slug}-hero.webp`, width: 2400, height: 1200, ...tone }),
    )
    jobs.push(
      writeWebp({ file: `images/work/${slug}-01.webp`, width: 1600, height: 900, ...tone }),
    )
    jobs.push(
      writeWebp({ file: `images/work/${slug}-02.webp`, width: 1600, height: 900, ...tone }),
    )
  }

  jobs.push(writeLogo())

  const written = await Promise.all(jobs)
  console.log(`Generated ${written.length} placeholder assets in /public`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
