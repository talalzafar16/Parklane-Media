# Parklane Media — Website

Marketing and portfolio site for Parklane Media, a Karachi media agency working across content
production, video production and advertising.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui (Radix) · Framer Motion ·
lucide-react. Deploy target is Vercel.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build. All 19 routes prerender to static HTML. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | ESLint (`next/core-web-vitals`). |
| `npm run typecheck` | `tsc --noEmit`. |
| `npm run placeholders` | Regenerate every placeholder image in `/public`. |

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real domain. It drives
canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. On Vercel, set it in
**Project Settings → Environment Variables**.

---

## The four things you will most likely need to do

### 1. Swap the logo

The logo is referenced in exactly one component: [`src/components/brand/logo.tsx`](src/components/brand/logo.tsx).

1. Drop the new artwork at `public/logo.jpeg` (keep the filename, or update the `src` in that file).
2. Update `LOGO_WIDTH` / `LOGO_HEIGHT` at the top of `logo.tsx` to the artwork's real pixel
   dimensions. They exist so `next/image` reserves the right space and never causes layout shift —
   if they are wrong the logo will render at the wrong aspect ratio.

The nav renders it at 40px tall, shrinking to 34px on scroll; the footer and mobile menu use 36px.
Nothing else needs touching.

> **If you have an SVG, use it.** Change `src` to `/logo.svg` and delete the `variant="onDark"`
> branch described below. Vector will look sharper at every size.

**On the dark footer:** the supplied logo is a JPEG on a white background, so on the `--brand-dark`
footer it sits inside a white chip (`variant="onDark"`). The moment a reversed/white lockup or a
transparent SVG is supplied, drop that branch and render the mark directly.

### 2. Replace the hero video

The hero looks for `public/hero.mp4`. **It is not in the repo** — the hero currently falls back to
its poster image, which is the intended behaviour when the file is missing.

1. Export the showreel as MP4 (H.264, no audio track needed — it plays muted).
2. Save it as `public/hero.mp4`.
3. Replace `public/images/hero-poster.webp` with a still from the video at 1920×1080. This is the
   LCP element and the fallback, so it should closely match the video's first frame.

Keep it short and small — 8–15 seconds, under ~4 MB. The video uses `preload="none"`, so it does not
compete with the poster for bandwidth on first paint.

The hero degrades gracefully in three ways, all handled in
[`src/components/home/hero.tsx`](src/components/home/hero.tsx):

- **File missing / fails to decode** → `onError` swaps to the poster image.
- **`prefers-reduced-motion`** → the video is never mounted; the poster shows instead.
- **JavaScript disabled** → the poster is plain `next/image`, so it renders regardless.

### 3. Edit content

All copy lives in [`src/data/`](src/data/). There is no CMS, and no copy is hard-coded into page
components except section headings.

| File | Controls |
| --- | --- |
| `site.ts` | Company name, tagline, contact details, WhatsApp number, nav structure, socials. **Start here.** |
| `services.ts` | The three service lines — cards, hub rows, and the full detail pages. |
| `work.ts` | All six case studies. |
| `testimonials.ts` | Homepage quote slider. |
| `about.ts` | About page story, values, and team. |
| `process.ts` | The four process steps. |
| `stats.ts` | The animated counters. |
| `clients.ts` | Names in the "Trusted by" marquee. |

Every spot that needs the client's real input is flagged with `TODO: CLIENT` (as `{/* TODO: CLIENT */}`
in components, `// TODO: CLIENT` in data files). Search the project for `TODO: CLIENT` to get the
full punch list before launch — it covers contact details, social URLs, all statistics, every
testimonial, the team, and the hero headline.

### 4. Add a new case study

Append one object to the `caseStudies` array in [`src/data/work.ts`](src/data/work.ts). Everything
else is automatic — the grid, the category filters, the related-work rails, `generateStaticParams`,
and `sitemap.xml` all read from that array.

```ts
{
  slug: 'client-project-name',        // becomes /work/client-project-name
  title: 'A headline about the outcome, not the deliverable',
  client: 'Client Name',
  category: 'video',                  // 'content' | 'video' | 'advertising'
  year: '2026',
  summary: 'One line for the grid card.',
  intro: 'Opening paragraph on the detail page.',
  cover: '/images/work/client-project-name-cover.webp',   // 16:10
  coverAlt: 'Real description of what is in the image',
  hero:  '/images/work/client-project-name-hero.webp',    // 2:1
  heroAlt: 'Real description of what is in the image',
  services: ['Concept & scripting', 'Post-production'],
  facts: [{ label: 'Client', value: 'Client Name' }],
  challenge: 'What was actually hard about this.',
  approach: ['What we did, one point per string.'],
  results: [{ value: '2.4M', label: 'Views in first 6 weeks' }],
  gallery: [{ src: '/images/work/client-project-name-01.webp', alt: '…' }],  // 16:9
  quote: { text: '…', author: 'Name', role: 'Title, Company' },   // optional
  featured: false,   // true puts it on the homepage (first 3 featured win)
}
```

Then add the images to `public/images/work/` at the aspect ratios noted above. Use WebP.

**Adding a fourth service** works the same way — append to `services.ts` and the nav dropdown,
services hub, detail route and sitemap all follow.

---

## Design system

Every colour is a CSS variable in [`src/app/globals.css`](src/app/globals.css), mapped into Tailwind
in [`tailwind.config.ts`](tailwind.config.ts). Rebranding is a one-file change.

| Token | Value | Used for |
| --- | --- | --- |
| `--brand` | `#1B5A8C` | Buttons, links, icons |
| `--brand-dark` | `#0E3352` | Headings, footer, CTA band |
| `--brand-tint` | `#EAF1F7` | Alternating section backgrounds |
| `--base` | `#F7F9FB` | Page background |
| `--text` | `#1A1D21` | Body copy |
| `--muted` | `#6B7785` | Secondary copy |
| `--accent` | `#E9A23B` | CTA hover, active filter, nav underline — **and nothing else** |
| `--border` | `#E3E9EF` | All hairlines |

Each colour is declared twice — as a hex value and as bare RGB channels (`--brand-rgb`) — so
Tailwind's opacity modifiers (`bg-brand/10`) keep working.

- **Light theme only.** `darkMode` is explicitly disabled in the Tailwind config and there is not a
  single `dark:` variant in the codebase.
- **Type:** Poppins 600/700 for headings, Inter 400/500/600 for body at 17px / 1.7. Both self-hosted
  by `next/font` — no request to Google at runtime, no layout shift.
- **Spacing:** the 8/16/24/40/64/96/128 scale maps onto Tailwind's `2/4/6/10/16/24/32` (root stays
  16px). Sections are `py-18 lg:py-32` — 72px mobile, 128px desktop.
- **Radius:** 12px everywhere (`rounded-xl`, and the Tailwind `DEFAULT`).
- **Borders over shadows:** `1px solid var(--border)` is the default separator. Shadows are limited
  to the scrolled nav and card hover lift.
- **Line length:** body copy is capped with `max-w-copy` (70ch).

---

## Animation

The rules live in one place — [`src/lib/motion.ts`](src/lib/motion.ts) for the variants, and
[`src/hooks/use-motion-profile.ts`](src/hooks/use-motion-profile.ts) for who gets what.

- One easing curve site-wide: `cubic-bezier(.22, 1, .36, 1)`.
- Section enter: fade + 24px rise, 0.6s, fires once.
- Cards in a row: 80ms stagger.
- Nothing exceeds 800ms. Tween only — no springs, so nothing overshoots. The one spring in the
  codebase (magnetic buttons) is deliberately overdamped, ratio ≈ 1.5.
- No scroll-jacking, no autoplaying audio, and no animation on paragraph text.

**`useMotionProfile()` is the single gate.** Components never test breakpoints or
`prefers-reduced-motion` themselves:

| | Reduced motion | Mobile / coarse pointer | Desktop |
| --- | --- | --- | --- |
| Section reveals | none | fade only | fade + rise |
| Parallax | ✗ | ✗ | ✓ (12%, capped at 15) |
| Magnetic buttons | ✗ | ✗ | ✓ (40px radius) |
| Hero video | ✗ (poster) | ✓ | ✓ |
| Marquee | ✗ | 72s | 48s |
| Process line draw | drawn | static | scroll-linked |

`prefers-reduced-motion` is honoured twice over: Framer Motion is disabled in JS, and a hard CSS
override in `globals.css` collapses every remaining transition, animation and smooth scroll.

---

## Accessibility & performance notes

- Semantic landmarks, one `<h1>` per page, skip link, visible focus rings on a single consistent
  style, 44px minimum tap targets throughout.
- The mobile menu, services dropdown and FAQ accordion are Radix primitives, so focus trapping,
  Escape, arrow-key navigation and ARIA wiring are handled correctly rather than approximated.
- Counters render their **final** value server-side and reset to zero after hydration, so the real
  figure is in the HTML for crawlers and no-JS visitors. Screen readers get the final number once,
  not 48 intermediate frames.
- Scroll-revealed content is `opacity: 0` until Framer animates it. A `<noscript>` rule in the root
  layout forces `[data-reveal]` visible if JavaScript never runs.
- All images are WebP via `next/image`, lazily loaded except the hero poster and above-the-fold
  case-study covers, with real descriptive alt text.

---

## Decisions made without the client

The brief said to make sensible calls and note them. These are the ones worth knowing about.

1. **shadcn/ui was hand-authored, not `npx shadcn init`.** The generator would have overwritten
   `globals.css` with its own token set — including a full dark-mode palette this project explicitly
   does not want. The components in `src/components/ui/` follow shadcn's exact structure (CVA
   variants, `cn()`, Radix under the hood) and `components.json` is present, so
   `npx shadcn@latest add <component>` still works for anything new.

2. **A lightened brand blue on dark backgrounds.** The brief asks for one hero headline word in
   brand-blue italic. `#1B5A8C` on the hero scrim measures ~2.1:1 — a clear AA failure on the site's
   most prominent text. `--brand-light` (`#8FC1E3`) is a tint of the same hue at ~6.9:1. It is used
   **only** for brand-coloured text on dark surfaces; `--brand` is unchanged everywhere else.

3. **Client logos are inline SVG, not files in `/public`.** The marquee renders all six twice, so
   inline drawing removes twelve network requests and makes the greyscale → colour hover a plain CSS
   filter. They live in `src/components/brand/client-logo.tsx`.

4. **The nav is only transparent on the homepage.** It is the only route with a hero behind it.
   Every other page renders the solid bar from first paint, which avoids white-on-white text.

5. **The testimonial slider does not auto-advance.** Moving a quote while someone is reading it is
   exactly what the brief's "no animation on paragraph text" rule prohibits. Arrows, dots and
   left/right arrow keys all work.

6. **Work filters use local state, not the URL.** Six items on one static page did not justify a
   Suspense boundary and a client-side navigation per filter click. To make categories deep-linkable
   later, swap `useState` for `useSearchParams` in `work-filter-grid.tsx`.

7. **The route transition bar is triggered by link clicks.** Next 14's App Router exposes no
   navigation-start event, so `route-progress.tsx` starts the bar on a captured click on any
   internal `<a>` and completes it when `usePathname()` changes.

8. **Placeholder imagery is generated, not stock.** `npm run placeholders` writes 35 flat brand-toned
   WebP panels at the exact aspect ratios the layout expects, so dropping in real photography never
   shifts the page. The script also draws `logo.jpeg` and the favicon monogram as vector paths —
   no font dependency, so it produces identical output on any machine.

9. **Statistics, client names and quotes are invented.** They are placeholder content and are marked
   as such. Every one needs replacing, and each testimonial needs written sign-off from the named
   person, before this site goes live.

---

## Contact form

[`src/components/contact/contact-form.tsx`](src/components/contact/contact-form.tsx) has full inline
validation (on blur once touched, then on submit), a loading state, a success state and an error
state — but **no backend**. The submit handler is stubbed:

```ts
// TODO: CLIENT — replace with the real endpoint
await new Promise((resolve) => setTimeout(resolve, 1200))
```

To wire it up, replace those lines with a `fetch` to your endpoint and leave the surrounding
`try/catch` — the error state is already built:

```ts
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(values),
})
if (!response.ok) throw new Error('Request failed')
```

A Next.js Route Handler at `src/app/api/contact/route.ts` talking to Resend, Postmark or a Vercel
integration is the shortest path. Add spam protection (honeypot or Turnstile) at the same time.

---

## Deploying to Vercel

1. Push the repo and import it at [vercel.com/new](https://vercel.com/new). The framework preset is
   detected automatically; no build settings need changing.
2. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
3. Deploy. Every route is static, so it serves from the edge cache.

After the domain is live, submit `https://yourdomain.com/sitemap.xml` to Google Search Console.

---

## Project structure

```
src/
├── app/                    Routes (App Router)
│   ├── layout.tsx          Fonts, metadata, nav/footer shell, JSON-LD
│   ├── page.tsx            Homepage — composes the sections below
│   ├── about|services|work|contact/
│   ├── services/[slug]/    Service detail — sticky sidebar layout
│   ├── work/[slug]/        Case study detail
│   ├── not-found.tsx  sitemap.ts  robots.ts  globals.css
├── components/
│   ├── brand/              Logo, client marks, service icons
│   ├── contact/            Enquiry form
│   ├── home/               The eight homepage sections
│   ├── layout/             Navbar, footer, WhatsApp FAB, route progress
│   ├── motion/             Reveal, Magnetic, Counter, ParallaxImage
│   ├── shared/             PageHero, CtaBand
│   ├── ui/                 shadcn/ui primitives + Container/Section
│   └── work/               WorkCard, filterable grid
├── data/                   ← all content lives here
├── hooks/                  Media query, scroll position, motion profile
└── lib/                    cn(), motion tokens, SEO builder
```
