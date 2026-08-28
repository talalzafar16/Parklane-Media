import { cn } from '@/lib/utils'

/**
 * An outlined aspect-ratio box with corner crop marks and a mono caption.
 *
 * Stands where an image will eventually go. The crop marks and the caption are
 * what make it read as a deliberate composition rather than a failed image —
 * it is a framing device on a page that has no photography, not a placeholder
 * waiting to be filled.
 */
export function Frame({
  caption,
  ratio = '16/9',
  className,
  children,
}: {
  caption?: string
  ratio?: '16/9' | '4/5' | '1/1' | '3/2'
  className?: string
  /** Optional content centred inside the frame. */
  children?: React.ReactNode
}) {
  const ratioClass = {
    '16/9': 'aspect-video',
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    '3/2': 'aspect-[3/2]',
  }[ratio]

  return (
    <figure className={cn('w-full', className)}>
      <div className={cn('relative w-full border border-border bg-white', ratioClass)}>
        <CornerMark className="left-0 top-0 border-l border-t" />
        <CornerMark className="right-0 top-0 border-r border-t" />
        <CornerMark className="bottom-0 left-0 border-b border-l" />
        <CornerMark className="bottom-0 right-0 border-b border-r" />

        {children ? (
          <div className="absolute inset-0 flex items-center justify-center p-8">{children}</div>
        ) : null}
      </div>

      {caption ? <figcaption className="micro mt-3 text-muted">{caption}</figcaption> : null}
    </figure>
  )
}

/** 16px crop mark, inset from the frame edge — the broadcast/print detail. */
function CornerMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('absolute size-4 border-brand', className)}
      style={{ margin: '-1px' }}
    />
  )
}
