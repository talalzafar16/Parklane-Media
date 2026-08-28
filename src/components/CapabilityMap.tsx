'use client'

import * as React from 'react'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Minus, Plus, Search, X } from 'lucide-react'

import { Block } from '@/components/system/block'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { Container } from '@/components/ui/container'
import { useMotionProfile } from '@/hooks/use-motion-profile'
import { EASE_BRAND } from '@/lib/motion'
import { capabilities, type Capability } from '@/data/capabilities'
import { cn } from '@/lib/utils'

/* ==========================================================================
   Layout configuration
   Percentage coordinates inside the map box. Tune these freely — nothing in
   the logic below depends on the values, only on the keys matching the slugs
   in data/capabilities.ts.
   ========================================================================== */

type NodeConfig = {
  /** Node centre, % of map width / height. */
  x: number
  y: number
  /** Orbit radii for this node's tags, % of map width / height. */
  rx: number
  ry: number
  /** Where the orbit starts, in radians. Varying this keeps clusters irregular. */
  start: number
}

const NODE_LAYOUT: Record<string, NodeConfig> = {
  content: { x: 21, y: 23, rx: 13, ry: 19, start: -2.1 },
  advertising: { x: 57, y: 12, rx: 13, ry: 16, start: -0.5 },
  'media-marketing': { x: 80, y: 42, rx: 11, ry: 22, start: 0.9 },
  'digital-social': { x: 30, y: 60, rx: 13, ry: 18, start: 2.4 },
  'sports-entertainment': { x: 68, y: 78, rx: 13, ry: 16, start: 1.7 },
  'events-activations': { x: 15, y: 86, rx: 12, ry: 13, start: -1.2 },
}

/**
 * Which nodes are drawn as related. This is layout configuration, not data —
 * the capability file makes no claims about relationships between areas.
 */
const CONNECTIONS: ReadonlyArray<readonly [string, string]> = [
  ['content', 'advertising'],
  ['content', 'digital-social'],
  ['advertising', 'media-marketing'],
  ['media-marketing', 'sports-entertainment'],
  ['digital-social', 'sports-entertainment'],
  ['digital-social', 'events-activations'],
  ['content', 'sports-entertainment'],
  ['advertising', 'events-activations'],
]

const RESTING_TAG_OPACITY = 0.35
const MUTED_TAG_OPACITY = 0.15
const EXCLUDED_TAG_OPACITY = 0.08
const HOVER_STAGGER = 0.06 // 60ms
const CHIP_STAGGER = 0.08 // 80ms
const SEARCH_DEBOUNCE_MS = 120

/* ==========================================================================
   Derived from the data — never hardcoded
   ========================================================================== */

/** Total service tags across all six areas. Drives the counter and placeholder. */
const TOTAL_SERVICES = capabilities.reduce((total, area) => total + area.tags.length, 0)

type PositionedTag = {
  label: string
  /** % of map width / height. */
  x: number
  y: number
}

type PositionedNode = {
  capability: Capability
  config: NodeConfig
  tags: PositionedTag[]
}

/**
 * Deterministic 0–1 hash. Used to jitter tag positions so each cluster reads as
 * a constellation rather than a mechanical ring — and, being deterministic, it
 * produces identical markup on the server and the client, so there is no
 * hydration mismatch and no layout shift.
 */
function hashUnit(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return ((h >>> 0) % 1000) / 1000
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

/** Positions every tag once, at module scope. */
const NODES: PositionedNode[] = capabilities.map((capability) => {
  const config = NODE_LAYOUT[capability.slug] ?? { x: 50, y: 50, rx: 14, ry: 18, start: 0 }
  const count = capability.tags.length

  const tags = capability.tags.map((label, index) => {
    const angle =
      config.start + (index / count) * Math.PI * 2 + (hashUnit(label) - 0.5) * 0.34
    // Alternating rings stop the cluster reading as a single circle.
    const ring = index % 2 === 0 ? 0.95 : 1.3
    const radius = ring + (hashUnit(`${label}#${capability.slug}`) - 0.5) * 0.24

    /**
     * Labels are wide and short, so a tag placed near horizontal overlaps its
     * own node long before a tag placed above or below it does. Pushing the
     * radius out in proportion to |cos| clears the node box without inflating
     * the cluster vertically.
     */
    const horizontalPush = 1 + 0.55 * Math.abs(Math.cos(angle))

    return {
      label,
      x: clamp(config.x + Math.cos(angle) * config.rx * radius * horizontalPush, 9, 91),
      y: clamp(config.y + Math.sin(angle) * config.ry * radius, 5, 95),
    }
  })

  return { capability, config, tags }
})

const nodeBySlug = new Map(NODES.map((node) => [node.capability.slug, node]))

/* ==========================================================================
   Component
   ========================================================================== */

export function CapabilityMap() {
  const { reduced } = useMotionProfile()

  const [query, setQuery] = React.useState('')
  const [debouncedQuery, setDebouncedQuery] = React.useState('')
  const [hoveredSlug, setHoveredSlug] = React.useState<string | null>(null)
  const [openSlug, setOpenSlug] = React.useState<string | null>(null)
  const [expandedSlug, setExpandedSlug] = React.useState<string | null>(null)

  const nodeRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map())
  const lastTriggerSlug = React.useRef<string | null>(null)

  React.useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [query])

  const search = debouncedQuery.trim().toLowerCase()
  const isSearching = search.length > 0

  /** Matching tag labels per slug. Empty map when the query is empty. */
  const matches = React.useMemo(() => {
    const result = new Map<string, Set<string>>()
    if (!isSearching) return result

    for (const { capability } of NODES) {
      const hits = capability.tags.filter((tag) => tag.toLowerCase().includes(search))
      result.set(capability.slug, new Set(hits))
    }
    return result
  }, [isSearching, search])

  const matchCount = React.useMemo(() => {
    if (!isSearching) return TOTAL_SERVICES
    let total = 0
    matches.forEach((set) => {
      total += set.size
    })
    return total
  }, [isSearching, matches])

  const nodeHasMatch = React.useCallback(
    (slug: string) => !isSearching || (matches.get(slug)?.size ?? 0) > 0,
    [isSearching, matches],
  )

  const tagMatches = React.useCallback(
    (slug: string, tag: string) => !isSearching || Boolean(matches.get(slug)?.has(tag)),
    [isSearching, matches],
  )

  /** Search takes precedence over hover — a filtered map ignores the pointer. */
  const effectiveHover = isSearching ? null : hoveredSlug

  const openPanel = (slug: string) => {
    lastTriggerSlug.current = slug
    setOpenSlug(slug)
  }

  const activeCapability = openSlug ? nodeBySlug.get(openSlug)?.capability ?? null : null

  /** Roving arrow-key movement between the six nodes. */
  const onNodeKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()

    let next = index
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % NODES.length
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp')
      next = (index - 1 + NODES.length) % NODES.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = NODES.length - 1

    const slug = NODES[next].capability.slug
    nodeRefs.current.get(slug)?.focus()
  }

  const counterId = React.useId()
  const searchId = React.useId()

  const searchField = (
    <div className="w-full sm:w-[19rem]">
      <label htmlFor={searchId} className="sr-only">
        Search Parklane Media services
      </label>
      <div className="flex items-center gap-3 border-b border-border pb-2 focus-within:border-brand">
        <Search className="size-4 shrink-0 text-muted" aria-hidden="true" />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search ${TOTAL_SERVICES} services`}
          autoComplete="off"
          aria-describedby={counterId}
          className="micro w-full bg-transparent text-fg placeholder:text-muted focus:outline-none"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="micro shrink-0 text-muted transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Clear search</span>
          </button>
        ) : null}
      </div>
      <p id={counterId} aria-live="polite" className="micro mt-3 text-muted">
        <span className="text-brand">{matchCount}</span> / {TOTAL_SERVICES} Services
      </p>
    </div>
  )

  return (
    <section
      aria-labelledby="capability-map-heading"
      className="relative overflow-hidden border-y border-border bg-canvas"
    >
      <Container className="relative z-10 py-18 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <TimecodeLabel index="Sec. 02" label="Capabilities" />
            <h2 id="capability-map-heading" className="mt-8 max-w-[16ch] text-h2">
              Everything under one roof
            </h2>
            <p className="mt-6 max-w-copy text-lead text-muted">
              Six areas, {TOTAL_SERVICES} services, one team. Search across all of them at once.
            </p>
          </div>

          {/* Pinned top-right on desktop; sits above the accordion on mobile. */}
          <div className="shrink-0 lg:pb-2">{searchField}</div>
        </div>
      </Container>

      {/* ---------------- Desktop map ---------------- */}
      <div className="relative z-10 hidden md:block">
        <Container>
          <div
            className="relative mb-24 h-[clamp(38rem,58vw,52rem)] w-full"
            onMouseLeave={() => setHoveredSlug(null)}
          >
            <MapConnectors
              hoveredSlug={effectiveHover}
              isSearching={isSearching}
              nodeHasMatch={nodeHasMatch}
              tagMatches={tagMatches}
              reduced={reduced}
            />

            {/* Orbiting tags — decorative. The accessible copy is the sr-only
                list below, so screen readers never meet a floating word soup. */}
            <div aria-hidden="true">
              {NODES.map(({ capability, tags }) => {
                const isHovered = effectiveHover === capability.slug
                const isDimmed = effectiveHover !== null && !isHovered

                return tags.map((tag, index) => {
                  const matched = tagMatches(capability.slug, tag.label)
                  let opacity = RESTING_TAG_OPACITY
                  if (isSearching) opacity = matched ? 1 : EXCLUDED_TAG_OPACITY
                  else if (isHovered) opacity = 1
                  else if (isDimmed) opacity = MUTED_TAG_OPACITY

                  const emphasised = (isSearching && matched) || (!isSearching && isHovered)

                  return (
                    <motion.span
                      key={`${capability.slug}-${tag.label}`}
                      className="micro absolute whitespace-nowrap text-[0.6875rem] text-fg"
                      style={{
                        left: `${tag.x}%`,
                        top: `${tag.y}%`,
                        // Centring lives in `translate` so `scale` stays free
                        // for animation — no transform conflict, no reflow.
                        translate: '-50% -50%',
                      }}
                      initial={false}
                      animate={{
                        opacity,
                        scale: emphasised && !reduced ? 1.14 : 1,
                      }}
                      transition={{
                        duration: reduced ? 0 : 0.4,
                        ease: EASE_BRAND,
                        delay: !reduced && isHovered ? index * HOVER_STAGGER : 0,
                      }}
                    >
                      {tag.label}
                    </motion.span>
                  )
                })
              })}
            </div>

            {/* Nodes — real buttons, so Tab, Enter and arrow keys all work. */}
            {NODES.map(({ capability }, index) => {
              const config = NODE_LAYOUT[capability.slug]
              const isHovered = effectiveHover === capability.slug
              const dimmedByHover = effectiveHover !== null && !isHovered
              const dimmedBySearch = isSearching && !nodeHasMatch(capability.slug)
              const matchedCount = matches.get(capability.slug)?.size ?? 0

              return (
                <motion.div
                  key={capability.slug}
                  className="absolute"
                  style={{
                    left: `${config.x}%`,
                    top: `${config.y}%`,
                    translate: '-50% -50%',
                  }}
                  initial={false}
                  animate={{ opacity: dimmedByHover || dimmedBySearch ? 0.15 : 1 }}
                  transition={{ duration: reduced ? 0 : 0.4, ease: EASE_BRAND }}
                >
                  <Block
                    ref={(element) => {
                      if (element) nodeRefs.current.set(capability.slug, element)
                      else nodeRefs.current.delete(capability.slug)
                    }}
                    size="default"
                    onMouseEnter={() => setHoveredSlug(capability.slug)}
                    onFocus={() => setHoveredSlug(capability.slug)}
                    onBlur={() => setHoveredSlug(null)}
                    onClick={() => openPanel(capability.slug)}
                    onKeyDown={(event) => onNodeKeyDown(event, index)}
                    aria-haspopup="dialog"
                    className="h-auto w-[11.5rem] flex-col items-start justify-start gap-1 px-4 py-3 text-left"
                  >
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/70">
                      {capability.number}
                    </span>
                    <span className="whitespace-normal text-[0.9375rem] leading-tight">
                      {capability.title}
                    </span>
                    <span className="sr-only">
                      {isSearching
                        ? `. ${matchedCount} of ${capability.tags.length} services match`
                        : `. ${capability.tags.length} services. Opens a panel.`}
                    </span>
                  </Block>
                </motion.div>
              )
            })}
          </div>
        </Container>

        {/*
          Parallel semantic list. The map above is a visualisation: its tag
          layer and connectors are aria-hidden, so this carries the same content
          in reading order for assistive tech. Rendered inside the md-and-up
          wrapper, so mobile users get the accordion instead and neither
          audience meets the list twice.
        */}
        {/*
          Text only — deliberately no links in here. `sr-only` hides content
          visually but keeps it focusable, so links would put six invisible
          stops in the desktop tab order. Each node button already opens the
          panel, and the panel carries the link to the detail page.
        */}
        <div className="sr-only">
          <h3>All capabilities and services</h3>
          <ul>
            {capabilities.map((capability) => (
              <li key={capability.slug}>
                <h4>{`${capability.number} — ${capability.title}`}</h4>
                <p>{capability.description}</p>
                <ul>
                  {capability.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---------------- Mobile accordion ---------------- */}
      <Container className="relative z-10 pb-18 md:hidden">
        <ul className="border-t border-border">
          {capabilities.map((capability) => {
            const matchedTags = matches.get(capability.slug)
            const hasMatch = nodeHasMatch(capability.slug)
            // While searching, expansion is derived from the query rather than
            // from state — matching rows open themselves, the rest collapse.
            const isOpen = isSearching ? hasMatch : expandedSlug === capability.slug
            const panelId = `capability-row-${capability.slug}`

            const visibleTags = isSearching
              ? capability.tags.filter((tag) => matchedTags?.has(tag))
              : capability.tags

            return (
              <li
                key={capability.slug}
                className={cn(
                  'border-b border-border transition-opacity duration-300 ease-brand',
                  isSearching && !hasMatch && 'opacity-30',
                )}
              >
                <div className="flex items-stretch gap-3 py-4">
                  <Block
                    size="default"
                    onClick={() =>
                      setExpandedSlug((current) =>
                        current === capability.slug ? null : capability.slug,
                      )
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="h-auto flex-1 flex-col items-start justify-start gap-1 px-4 py-3 text-left"
                  >
                    <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-white/70">
                      {capability.number}
                    </span>
                    <span className="whitespace-normal text-[0.9375rem] leading-tight">
                      {capability.title}
                    </span>
                  </Block>

                  <span
                    aria-hidden="true"
                    className="inline-flex w-12 shrink-0 items-center justify-center border border-border text-brand"
                  >
                    {isOpen ? <Minus className="size-5" /> : <Plus className="size-5" />}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="panel"
                      id={panelId}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={
                        reduced
                          ? { height: 0, opacity: 0, transition: { duration: 0 } }
                          : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: reduced ? 0 : 0.35, ease: EASE_BRAND }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 text-body text-muted">{capability.description}</p>
                      <ul className="flex flex-wrap gap-2 pb-6">
                        {visibleTags.map((tag, index) => (
                          <motion.li
                            key={tag}
                            initial={reduced ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: reduced ? 0 : 0.3,
                              ease: EASE_BRAND,
                              delay: reduced ? 0 : index * CHIP_STAGGER,
                            }}
                          >
                            <span className="inline-flex items-center border border-brand/15 bg-brand/[0.06] px-3 py-1.5 text-small text-brand-dark">
                              {tag}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                      <Block asChild size="sm" variant="outline" className="mb-6">
                        <Link href={`/capabilities/${capability.slug}`}>
                          {`View ${capability.title}`}
                          <ArrowRight aria-hidden="true" />
                        </Link>
                      </Block>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </Container>

      <CapabilityPanel
        capability={activeCapability}
        reduced={reduced}
        onClose={() => setOpenSlug(null)}
        onClosed={() => {
          const slug = lastTriggerSlug.current
          if (slug) nodeRefs.current.get(slug)?.focus()
        }}
      />
    </section>
  )
}

/* ==========================================================================
   Connectors
   ========================================================================== */

type ConnectorProps = {
  hoveredSlug: string | null
  isSearching: boolean
  nodeHasMatch: (slug: string) => boolean
  tagMatches: (slug: string, tag: string) => boolean
  reduced: boolean
}

/**
 * Hairline paths between related nodes, plus a very faint line from every tag
 * back to its parent node.
 *
 * `preserveAspectRatio="none"` maps the 0–100 viewBox straight onto the same
 * percentage coordinates the HTML layer uses, so the two layers stay locked
 * together at any size. `vectorEffect="non-scaling-stroke"` keeps the hairline
 * exactly 1px despite that non-uniform scaling.
 */
function MapConnectors({
  hoveredSlug,
  isSearching,
  nodeHasMatch,
  tagMatches,
  reduced,
}: ConnectorProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full"
    >
      {/* Tag leaders */}
      {NODES.map(({ capability, config, tags }) =>
        tags.map((tag) => {
          const isHovered = hoveredSlug === capability.slug
          const matched = tagMatches(capability.slug, tag.label)
          let opacity = 0.1
          if (isSearching) opacity = matched ? 0.35 : 0.03
          else if (isHovered) opacity = 0.4
          else if (hoveredSlug !== null) opacity = 0.04

          return (
            <motion.line
              key={`leader-${capability.slug}-${tag.label}`}
              x1={config.x}
              y1={config.y}
              x2={tag.x}
              y2={tag.y}
              stroke="rgb(var(--brand-rgb))"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{ opacity }}
              transition={{ duration: reduced ? 0 : 0.4, ease: EASE_BRAND }}
            />
          )
        }),
      )}

      {/* Node-to-node connections */}
      {CONNECTIONS.map(([from, to]) => {
        const a = NODE_LAYOUT[from]
        const b = NODE_LAYOUT[to]
        if (!a || !b) return null

        const touchesHover = hoveredSlug === from || hoveredSlug === to
        const bothMatch = nodeHasMatch(from) && nodeHasMatch(to)

        let opacity = 0.18
        if (isSearching) opacity = bothMatch ? 0.3 : 0.04
        else if (hoveredSlug !== null) opacity = touchesHover ? 0.85 : 0.05

        return (
          <motion.line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgb(var(--brand-rgb))"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ opacity }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE_BRAND }}
          />
        )
      })}

      {/*
        Draw-in overlay: only the hovered node's connections, wiping outward
        from that node via stroke-dashoffset (Framer's `pathLength`). Kept as a
        separate layer so the resting lines never re-animate, and skipped
        entirely under reduced motion.
      */}
      <AnimatePresence>
        {!reduced && hoveredSlug
          ? CONNECTIONS.filter(([from, to]) => from === hoveredSlug || to === hoveredSlug).map(
              ([from, to]) => {
                const a = NODE_LAYOUT[from]
                const b = NODE_LAYOUT[to]
                if (!a || !b) return null
                // Always draw outward from the hovered node.
                const start = hoveredSlug === from ? a : b
                const end = hoveredSlug === from ? b : a

                return (
                  <motion.line
                    key={`draw-${from}-${to}`}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="rgb(var(--brand-rgb))"
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.4, ease: EASE_BRAND }}
                  />
                )
              },
            )
          : null}
      </AnimatePresence>
    </svg>
  )
}

/* ==========================================================================
   Detail panel
   ========================================================================== */

type PanelProps = {
  capability: Capability | null
  reduced: boolean
  onClose: () => void
  onClosed: () => void
}

/**
 * Slide-in detail panel.
 *
 * Built on Radix Dialog rather than hand-rolled: it brings the focus trap,
 * Escape handling, outside-click dismissal, scroll lock and `aria-modal`
 * wiring, all of which are easy to get subtly wrong. Framer drives the motion
 * via `forceMount` + `AnimatePresence` so the exit animation can finish.
 */
function CapabilityPanel({ capability, reduced, onClose, onClosed }: PanelProps) {
  const open = capability !== null

  return (
    <Dialog.Root open={open} onOpenChange={(next) => (next ? undefined : onClose())}>
      <AnimatePresence>
        {capability ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink/60"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.25 } }}
                transition={{ duration: reduced ? 0 : 0.3, ease: EASE_BRAND }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onCloseAutoFocus={(event) => {
                // Return focus to the node that opened the panel.
                event.preventDefault()
                onClosed()
              }}
            >
              <motion.div
                className={cn(
                  'fixed inset-y-0 right-0 z-50 flex w-full flex-col overflow-y-auto',
                  'bg-ink text-white md:w-[40vw] md:min-w-[26rem]',
                  'focus:outline-none',
                )}
                initial={reduced ? false : { x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE_BRAND }}
              >
                <div className="flex items-start justify-between gap-6 border-b border-white/15 p-8">
                  <p className="micro text-brand-light">{`${capability.number} / Capability`}</p>

                  <Dialog.Close
                    className="-mt-2 inline-flex size-11 shrink-0 items-center justify-center border border-white/20 text-white transition-colors duration-200 ease-brand hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <X className="size-5" aria-hidden="true" />
                    <span className="sr-only">Close panel</span>
                  </Dialog.Close>
                </div>

                <div className="p-8">
                  <Dialog.Title className="text-h2 text-white">{capability.title}</Dialog.Title>
                  <p className="mt-6 max-w-copy text-lead text-white/70">
                    {capability.description}
                  </p>

                  <h3 className="micro mt-12 text-white/50">
                    {`${capability.tags.length} Services`}
                  </h3>
                  <ul className="mt-6 grid gap-x-8 border-t border-white/15 sm:grid-cols-2">
                    {capability.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-b border-white/15 py-3 text-body text-white/85"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <Block asChild size="lg" variant="inverse" className="mt-12">
                    <Link href={`/capabilities/${capability.slug}`}>
                      {`View ${capability.title}`}
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Block>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  )
}
