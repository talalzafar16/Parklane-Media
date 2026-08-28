import { capabilities } from '@/data/capabilities'
import { cn } from '@/lib/utils'

/**
 * Full-bleed scrolling strip of the client's own capability surface.
 *
 * With no client logos and no photography to trade on, this is what carries
 * credibility: their actual service list, stated plainly and continuously.
 * Hairline top and bottom, mono uppercase, 40s linear loop, pauses on hover or
 * keyboard focus (see `.marquee-track` in globals.css).
 *
 * The list renders twice inside a track that translates -50% for a seamless
 * loop; the duplicate is `aria-hidden` so screen readers hear the list once.
 */
export function Ticker({
  items,
  className,
}: {
  /** Defaults to every tag across all six capabilities. */
  items?: string[]
  className?: string
}) {
  const entries = items ?? capabilities.flatMap((capability) => capability.tags)
  if (entries.length === 0) return null

  return (
    <div
      className={cn('relative border-y border-border bg-canvas py-4', className)}
      role="presentation"
    >
      <div className="overflow-hidden">
        <div className="marquee-track flex w-max animate-ticker items-center motion-reduce:animate-none">
          <TickerRun entries={entries} />
          <TickerRun entries={entries} muted />
        </div>
      </div>
    </div>
  )
}

function TickerRun({ entries, muted = false }: { entries: string[]; muted?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={muted ? 'true' : undefined}>
      {entries.map((entry) => (
        <li key={entry} className="flex shrink-0 items-center">
          <span className="micro whitespace-nowrap px-6 text-fg">{entry}</span>
          <span className="micro select-none text-brand" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  )
}
