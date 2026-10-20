# Parklane Media — Website

Single-page site for Parklane Media, built to match the approved design at
https://parklane-media.higgsfield.app (designer handover, 21 Sep 2026).

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion (scroll tracking) · lucide-react.
Deploy target is Vercel.

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run build` | Production build. The page is static; only `/api/contact` runs on demand. |
| `npm run start` | Serve the production build. |
| `npm run lint` | ESLint (`next/core-web-vitals`). |
| `npm run typecheck` | `tsc --noEmit`. |

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, `sitemap.xml` and `robots.txt`. |
| `CONTACT_WEBHOOK_URL` | Where enquiries are sent as JSON. Unset, the form opens a prefilled email (as in the demo). Read at build time, so redeploy after changing it. |

## Editing content

All copy lives in `src/data/`:

| File | Controls |
| --- | --- |
| `site.ts` | Name, description, nav links, enquiry email. |
| `home.ts` | Hero film, hero copy, "Built to connect", contact copy. |
| `services.ts` | The five services: title, statement, image, capabilities. |
| `proof.ts` | Partner logos and testimonials. |

Images are imported from `src/assets/` so Next.js knows their dimensions. The hero videos and their
first-frame posters live in `public/media/hero/`.

Search for `TODO: CLIENT` for content still awaiting approval (enquiry inbox, testimonials, figures).

## Structure

```
src/
├── app/            layout, page, 404, api/contact, sitemap, robots, manifest, icons
├── components/
│   ├── layout/     header (+ mobile menu), footer, logo
│   ├── hero/       scroll film, hero copy, about, partner proof, testimonial carousel
│   ├── services/   services index, service section
│   └── contact/    contact section, enquiry form
├── data/           all content
├── hooks/          media query, reduced motion, blob video, video scrub
└── lib/            enquiry parsing, small utils
```

Styling is Tailwind. `tailwind.config.ts` holds the design tokens (colours, fonts, gutter), the named
gradients (`bg-chapter-fade`, …) and the design's breakpoints, which are max-width screens:
`laptop` ≤1100px, `tablet` ≤900px, `compact` ≤860px, `mobile` ≤700px, plus `short` for wide-but-short
viewports. Colour values live as CSS variables in `src/app/globals.css`.

When merging classes with `cn()`, put a `text-*` size before any `leading-*`: tailwind-merge drops a
`leading-*` that comes earlier.

## How the hero works

`ScrollFilm` pins a stage and scrubs one video across three viewport heights of scroll (hero → about →
partner proof). The partner proof stays pinned while the last third plays, then everything scrolls on.
The video is downloaded in full after page load and played from a blob, so seeking never waits on the
network. Reduced-motion and data-saver visitors only see the poster.

## Old URLs

The previous multi-page site's URLs redirect to their section (`/about` → `/#about`, `/services/*` →
`/#services`, and so on). See `next.config.mjs`.
