import { cn } from '@/lib/utils'

/**
 * The PM block, scaled up and turned on its side, used to separate major
 * sections.
 *
 * Repeating one shape down the page is what builds the identity — the same mark
 * as the logo, the same mark as the hero backdrop, the same mark here. Sits on
 * a full-bleed hairline so it reads as a rule with a mark set into it.
 */
export function MarkDivider({
  className,
  tone = 'default',
}: {
  className?: string
  tone?: 'default' | 'onDark'
}) {
  const rule = tone === 'onDark' ? 'bg-white/15' : 'bg-border'
  const mark = tone === 'onDark' ? 'text-white/25' : 'text-brand'

  return (
    <div aria-hidden="true" className={cn('relative flex items-center justify-center', className)}>
      <span className={cn('absolute inset-x-0 h-px', rule)} />
      <span className={cn('relative bg-canvas px-6', tone === 'onDark' && 'bg-ink')}>
        <svg
          viewBox="0 0 112 112"
          className={cn('size-10 rotate-90', mark)}
          fill="none"
          role="presentation"
        >
          {/* The logo tile, hairline rather than solid so it reads as a rule mark. */}
          <rect x="1" y="1" width="110" height="110" stroke="currentColor" strokeWidth="2" />
          {/* "P" */}
          <path
            d="M26 28h24a17 17 0 0 1 0 34H37v22H26z M37 39v12h13a6 6 0 0 0 0-12z"
            fill="currentColor"
            fillRule="evenodd"
          />
          {/* "M" */}
          <path d="M68 84V28h11l10 20 10-20h11v56H99V51l-10 19-10-19v33z" fill="currentColor" />
        </svg>
      </span>
    </div>
  )
}
