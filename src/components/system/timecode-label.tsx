import { cn } from '@/lib/utils'

/**
 * Broadcast slate label, pinned at the top-left of a section.
 *
 * Two mono fields separated by a slash — `SEC. 04 / CAPABILITIES`,
 * `PARKLANE / KHI`. The left field is the index, the right is the name. The
 * leading rule is what makes it read as furniture rather than a caption.
 */
export function TimecodeLabel({
  index,
  label,
  className,
  tone = 'default',
}: {
  /** Left field, e.g. `SEC. 04` or `PARKLANE MEDIA`. */
  index: string
  /** Right field, e.g. `CAPABILITIES`. */
  label?: string
  className?: string
  tone?: 'default' | 'onDark' | 'onBrand'
}) {
  const toneClass = {
    default: 'text-muted',
    onDark: 'text-white/60',
    onBrand: 'text-white/70',
  }[tone]

  const ruleClass = {
    default: 'bg-brand',
    onDark: 'bg-brand-light',
    onBrand: 'bg-white/50',
  }[tone]

  return (
    <p className={cn('micro flex items-center gap-3', toneClass, className)} data-reveal="">
      <span aria-hidden="true" className={cn('block h-px w-8 shrink-0', ruleClass)} />
      <span>{index}</span>
      {label ? (
        <>
          <span aria-hidden="true" className="opacity-50">
            /
          </span>
          <span>{label}</span>
        </>
      ) : null}
    </p>
  )
}
