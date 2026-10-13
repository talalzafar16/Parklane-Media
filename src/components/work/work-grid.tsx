'use client'

import * as React from 'react'

import { projects, workFilters } from '@/data/work'
import { cn } from '@/lib/utils'

import { WorkCard } from './work-card'

export function WorkGrid() {
  const [active, setActive] = React.useState('all')
  const visible = active === 'all' ? projects : projects.filter((project) => project.service === active)

  return (
    <>
      <div role="group" aria-label="Filter work by service" className="flex flex-wrap gap-2">
        {workFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={filter.value === active}
            onClick={() => setActive(filter.value)}
            className={cn(
              'label inline-flex min-h-[44px] items-center border px-4 transition-colors hover:border-signal-bright hover:text-ink',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-bright',
              filter.value === active ? 'border-signal-bright bg-signal text-ink' : 'border-line text-muted',
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`}
      </p>

      <ul className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((project, index) => (
          <li key={project.slug}>
            <WorkCard project={project} priority={index < 3} />
          </li>
        ))}
      </ul>

      {visible.length === 0 ? <p className="mt-14 text-muted">No projects under this service yet.</p> : null}
    </>
  )
}
