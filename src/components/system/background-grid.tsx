import { cn } from '@/lib/utils'

/**
 * The column rules the whole page is set against.
 *
 * Four hairlines on the 12-column grid — at columns 1, 5, 9 and 13, i.e. every
 * four columns — fixed, full viewport height, behind all content. On mobile the
 * two interior lines are dropped so 360px does not look striped.
 *
 * Positioned `fixed` rather than `absolute` so the rules stay put while the
 * page scrolls, which is what makes them read as structure rather than
 * decoration. `pointer-events-none` and `aria-hidden` keep them inert.
 */
export function BackgroundGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none fixed inset-0 z-0 select-none', className)}
    >
      <div className="container-px relative h-full">
        <div className="relative h-full">
          {/* Container edges — always visible. */}
          <Rule className="left-0" />
          <Rule className="right-0" />
          {/* Interior thirds — desktop only. */}
          <Rule className="left-1/3 hidden md:block" />
          <Rule className="left-2/3 hidden md:block" />
        </div>
      </div>
    </div>
  )
}

function Rule({ className }: { className?: string }) {
  return (
    <span className={cn('absolute inset-y-0 w-px bg-border/40', className)} />
  )
}
