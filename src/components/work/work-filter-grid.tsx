'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { WorkHoldingSpace } from '@/components/work/work-holding-space'
import { WorkCard } from '@/components/work/work-card'
import { useMotionProfile } from '@/hooks/use-motion-profile'
import { DURATION, EASE_BRAND, STAGGER } from '@/lib/motion'
import { projects, workFilters } from '@/data/work'
import { cn } from '@/lib/utils'

/**
 * Filterable project grid.
 *
 * There are no projects yet, so this renders the designed empty state and the
 * filter bar is hidden — filtering nothing would be noise. Both the bar and the
 * grid are fully wired: adding an object to `projects` in data/work.ts brings
 * them back with no code change.
 */
export function WorkFilterGrid() {
  const [active, setActive] = React.useState<string>('all')
  const { reduced } = useMotionProfile()

  const visible = React.useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.capability === active)),
    [active],
  )

  // Editorial holding space rather than an apology — and the filter bar stays
  // hidden, since filtering nothing is noise.
  if (projects.length === 0) {
    return <WorkHoldingSpace />
  }

  return (
    <>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter work by capability"
      >
        {workFilters.map((filter) => {
          const isActive = filter.value === active
          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActive(filter.value)}
              aria-pressed={isActive}
              className={cn(
                'inline-flex min-h-[44px] items-center border px-5 font-display text-[0.9375rem] font-bold',
                'transition-colors duration-200 ease-brand',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
                isActive
                  ? 'border-accent bg-accent text-brand-dark'
                  : 'border-border bg-white text-muted hover:border-brand hover:text-brand',
              )}
            >
              {filter.label}
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`}
      </p>

      <ul className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              layout={false}
              // `animate` always targets the visible state: reduced motion
              // resolves after mount, and swapping it to undefined would leave
              // the card stranded at opacity 0.
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: reduced
                  ? { duration: 0 }
                  : { duration: DURATION.section, ease: EASE_BRAND, delay: index * STAGGER },
              }}
              exit={{ opacity: 0, transition: { duration: reduced ? 0 : 0.2 } }}
              className="h-full"
            >
              <WorkCard
                project={project}
                priority={index < 3}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {visible.length === 0 ? (
        <p className="mt-16 text-body text-muted">No projects in this capability yet.</p>
      ) : null}
    </>
  )
}
