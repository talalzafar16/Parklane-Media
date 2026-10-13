import { cn } from '@/lib/utils'

type TickRulerProps = {
  ticks?: number
  vertical?: boolean
  className?: string
}

// Every fifth tick is a major tick.
export function TickRuler({ ticks = 41, vertical = false, className }: TickRulerProps) {
  const step = 100 / (ticks - 1)

  return (
    <svg
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox={vertical ? '0 0 10 100' : '0 0 100 10'}
      className={cn(vertical ? 'h-full w-2.5' : 'h-2.5 w-full', 'text-muted/60', className)}
    >
      <g stroke="currentColor">
        <line {...(vertical ? { x1: 5, x2: 5, y1: 0, y2: 100 } : { x1: 0, x2: 100, y1: 5, y2: 5 })} vectorEffect="non-scaling-stroke" />
        {Array.from({ length: ticks }, (_, index) => {
          const at = index * step
          const half = index % 5 === 0 ? 5 : 2.5
          const coords = vertical
            ? { x1: 5 - half, x2: 5 + half, y1: at, y2: at }
            : { x1: at, x2: at, y1: 5 - half, y2: 5 + half }
          return <line key={index} {...coords} vectorEffect="non-scaling-stroke" />
        })}
      </g>
    </svg>
  )
}
