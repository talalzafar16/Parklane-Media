import { cn } from '@/lib/utils'

const corners = ['left-0 top-0 border-l border-t', 'right-0 top-0 border-r border-t', 'bottom-0 left-0 border-b border-l', 'bottom-0 right-0 border-b border-r']

// Viewfinder crop marks in the corners of the nearest positioned parent.
export function CornerMarks({ inset = 'inset-3' }: { inset?: string }) {
  return (
    <span aria-hidden="true" className={cn('pointer-events-none absolute', inset)}>
      {corners.map((corner) => (
        <span key={corner} className={cn('absolute size-4 border-signal-bright/70', corner)} />
      ))}
    </span>
  )
}
