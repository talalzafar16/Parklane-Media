import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

// Vector version of the supplied logo for dark backgrounds: blue PM tile with the
// letters knocked out, wordmark in Outfit (the same geometric sans).
export function Logo({ variant = 'inline', className }: { variant?: 'inline' | 'mark'; className?: string }) {
  const markOnly = variant === 'mark'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 512 512"
        role={markOnly ? 'img' : undefined}
        aria-label={markOnly ? siteConfig.name : undefined}
        aria-hidden={markOnly ? undefined : true}
        className="h-[1.9em] w-[1.9em] shrink-0"
      >
        <rect width="512" height="512" rx="104" className="fill-signal" />
        <g transform="translate(256 256) scale(0.84) translate(-283 -256)" className="fill-ink">
          <path d="M86 130h121c58 0 94 31 94 82 0 52-37 84-96 84h-55v86H86V130Zm64 53v61h51c23 0 36-10 36-31 0-20-13-30-36-30h-51Z" />
          <path d="M284 130h55l43 77 43-77h55v252h-61V237l-37 65h-2l-36-64v144h-60V130Z" />
        </g>
      </svg>

      {markOnly ? null : (
        <span className="whitespace-nowrap font-sans text-[1.25em] font-semibold leading-none tracking-[-0.02em] text-ink">
          Parklane <span className="font-medium text-signal-bright">Media</span>
        </span>
      )}
    </span>
  )
}
