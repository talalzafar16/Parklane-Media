# Parklane Media — Website

Marketing site for Parklane Media: media production, commercial rights & sales, content creation,
event branding & sponsorship, and broadcast production.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Radix (dialog) · Framer Motion ·
lucide-react. Deploy target is Vercel.

The visual direction — **"Signal Engine"** — follows the designer handover of 21 Sep 2026: deep
broadcast navy, a single signal-blue accent, condensed display type, and broadcast furniture
(crosshairs, tick rulers, timecode, bracketed labels, clipped "aperture" corners). The prototype was
used as a design reference only; none of its code is carried over.

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run build` | Production build. Every page prerenders; only `/api/contact` runs on demand. |
| `npm run start` | Serve the production build. |
| `npm run lint` | ESLint (`next/core-web-vitals`). |
| `npm run typecheck` | `tsc --noEmit`. |

### Environment

Copy `.env.example` to `.env.local`.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin — drives metadata, Open Graph, `sitemap.xml`, `robots.txt`. |
| `CONTACT_WEBHOOK_URL` | Server-side. Where enquiries are POSTed as JSON (Zapier, Make, Formspree, a Slack workflow, a CRM). Unset = the form offers a prefilled email instead, so nothing is lost. |

---

## Editing content

All copy lives in [`src/data/`](src/data/). Components only render it.

| File | Controls |
| --- | --- |
| `site.ts` | Name, tagline, nav, contact details, WhatsApp number, socials. **Start here.** |
| `services.ts` | The five services — index bands, homepage chapters, detail pages, sitemap, form options. |
| `home.ts` | Hero film sources, hero / services / contact / footer headlines. |
| `about.ts` | Manifesto, principles, "Built to connect" facts, the company description. |
| `why-parklane.ts` | The six differentiators on /about. |
| `proof.ts` | Partner logos, headline figures, testimonials. |
| `work.ts` | Case studies (empty today — /work shows a holding state). |

**Approval flags live in the data.** Figures carry `illustrative: true` and testimonials
`draft: true`; the on-page asterisks and footnote are generated from those flags and disappear when
you set them to `false`.

Search the project for `TODO: CLIENT` for the pre-launch punch list (inbox, phone, WhatsApp number,
social URLs, testimonial sign-off).

### Add a service

Append an object to `serviceInputs` in [`src/data/services.ts`](src/data/services.ts) and pick a
`layout` (`media` · `rights` · `content` · `events` · `broadcast`). The number, index band, homepage
chapter, `/services/<slug>` page, footer link, sitemap entry and form option all follow. A new
composition is one component in `src/components/services/chapters/` plus one line in
`service-chapter.tsx` — TypeScript fails the build if a layout is left unmapped.

### Add a partner logo

Drop a trimmed, transparent WebP in `public/images/partners/` and add an entry to `partners` in
`proof.ts`. Set `tone: 'dark'` if the artwork has white lettering.

### Replace the hero film

`public/media/hero/` holds a desktop (1080p) and mobile (720p) encode plus a **first-frame** poster
for each. Encode with frequent keyframes (every ~8 frames) so scrubbing stays smooth, keep the
desktop file under ~12 MB, and update `heroFilm` in `home.ts`.

---

## Architecture

```
src/
├── app/                      Routes (App Router) + api/contact, sitemap, robots, manifest, icons
├── components/
│   ├── ui/                   Primitives: Button (+ArrowLine), Panel, IndexCard, Eyebrow, Field/Input, Icon, Sheet
│   ├── broadcast/            Signature ornaments: RecDot, Crosshair, TickRuler, SignalGauge, RadarPulse, LiveTicker…
│   ├── film/                 ScrollFilm — the scroll-scrubbed hero video, poster and HUD
│   ├── home/                 Homepage chapters
│   ├── services/             Services index, bands, per-layout chapters, Up Next slate
│   ├── proof/                Partner strip, proof grid, testimonial carousel
│   ├── contact/              EnquiryForm, ContactDetails
│   ├── layout/               Navbar, Footer, RouteProgress, WhatsApp button
│   ├── motion/               Reveal, CountUp, Magnetic, ParallaxImage
│   └── shared/ · seo/ · work/
├── data/                     ← all content
├── hooks/                    Media query, motion profile, scroll state, blob video, video scrub
└── lib/                      cn(), icon registry, enquiry contract, SEO builders, motion constants
```

Principles worth keeping:

- **Server components by default.** Client code is limited to what needs the browser (film, nav,
  carousel, form, filters, reveals). The film's chapters are server components passed through the
  client `ScrollFilm`.
- **Data is plain and serialisable.** Icons are referenced by key and resolved in `lib/icons.ts`,
  so content can move to a CMS without touching components.
- **One source of truth per rule.** Validation lives in `lib/enquiry.ts` and is shared by the form
  and the API route.

### The hero film

`ScrollFilm` pins a stage for the height of its chapters and maps scroll progress onto the clip.
The video is downloaded in full after the page `load` event (so it never competes with the poster
for LCP) and played from a blob URL, which makes every seek local. Seeks are coalesced while the
decoder is busy. **Reduced motion and data-saver never download the video** and keep the poster.

### Contact form

`EnquiryForm` (the same form on the homepage and /contact) posts to `/api/contact`, which
re-validates, drops honeypot submissions silently, and forwards JSON to `CONTACT_WEBHOOK_URL` with an
8 s timeout. Service pages link to `/contact?service=…`, which preselects that service.

---

## Design system

Tokens are CSS variables in [`src/app/globals.css`](src/app/globals.css), mapped in
[`tailwind.config.ts`](tailwind.config.ts).

| Token | Value | Use |
| --- | --- | --- |
| `canvas` | `#08131D` | Page background |
| `surface` / `raised` | `#0E2030` / `#142A3D` | Panels |
| `ink` | `#F2F6F8` | Text |
| `muted` | `#8FA4B2` | Secondary text (7.2:1) |
| `signal` | `#166C9F` | Fills — buttons, tabs (white text 5.7:1) |
| `signal-bright` | `#3D9BE0` | Accent text and strokes on dark (6.2:1) |
| `silver` | `#E5EAED` | Light slates and the review card |

- **Type:** Barlow Condensed (display, uppercase), Outfit (body/statements), IBM Plex Mono (labels),
  self-hosted by `next/font`. Scale: `text-display-xl/lg/md`, `statement`, `title`, `lead`, `body`,
  `small`, `label`. New size keys must also be added to `lib/utils.ts` for tailwind-merge.
- **Shape:** `notch`, `notch-bl`, `bevel` utilities clip corners (size via `--notch`). Use `Panel`
  for bordered notched cards — it redraws the border on the cut edge.
- **Motion:** one easing curve, reveals fire once, `useMotionProfile()` is the single gate (reduced
  motion → nothing moves; touch → fades only). It resolves after mount so server and client HTML
  always match.

---

## Deploying to Vercel

1. Import the repo; the Next.js preset needs no changes.
2. Set `NEXT_PUBLIC_SITE_URL` and `CONTACT_WEBHOOK_URL`.
3. Deploy, then submit `https://<domain>/sitemap.xml` to Search Console.

Retired URLs redirect permanently (`next.config.mjs`): `/capabilities` → `/services`, `/insights` → `/`.
