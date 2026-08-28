import { cn } from '@/lib/utils'

/**
 * The PM mark at enormous scale, cropped hard by the viewport edge.
 *
 * Not decoration — it is the logo itself, blown up past the point of being
 * readable as a logo, so it registers as structure. It bleeds off the right and
 * bottom edges deliberately: a complete, centred mark would read as a
 * watermark, while a cropped one reads as composition.
 *
 * Motion is a 2–3px drift on an 18s loop — enough to feel alive, not enough to
 * notice. Transform-only, so no layout or paint cost and no CLS.
 * `motion-reduce:animate-none` freezes it.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <svg
        viewBox="0 0 112 112"
        className={cn(
          'absolute text-brand animate-mark-drift motion-reduce:animate-none',
          // Cropped by the right and bottom edges at every breakpoint.
          '-bottom-[22%] -right-[18%] h-auto w-[150vw] sm:w-[95vw] lg:-right-[10%] lg:w-[62vw]',
        )}
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="110"
          height="110"
          stroke="currentColor"
          strokeWidth="0.5"
          opacity="0.18"
        />
        {/* "P" */}
        <path
          d="M26 28h24a17 17 0 0 1 0 34H37v22H26z M37 39v12h13a6 6 0 0 0 0-12z"
          fill="currentColor"
          fillRule="evenodd"
          opacity="0.05"
        />
        {/* "M" */}
        <path
          d="M68 84V28h11l10 20 10-20h11v56H99V51l-10 19-10-19v33z"
          fill="currentColor"
          opacity="0.05"
        />
      </svg>
    </div>
  )
}
