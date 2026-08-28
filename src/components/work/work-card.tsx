import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { ParallaxImage } from '@/components/motion/parallax-image'
import { Badge } from '@/components/ui/badge'
import { getCapability } from '@/data/capabilities'
import type { Project } from '@/data/work'
import { cn } from '@/lib/utils'

type WorkCardProps = {
  project: Project
  /** Above-the-fold cards skip lazy loading so they do not delay LCP. */
  priority?: boolean
  sizes?: string
  className?: string
}

/**
 * Project card for the /work grid.
 *
 * Built and wired against the `Project` type but currently unrendered — there
 * are no projects yet. It starts working the moment an object is added to
 * `projects` in data/work.ts.
 *
 * Two motions layer here without fighting: the cover parallaxes on scroll
 * (desktop only, handled inside ParallaxImage) while the image itself scales
 * to 1.05 on hover via CSS. They act on different elements, so neither one
 * clobbers the other's transform.
 */
export function WorkCard({ project, priority = false, sizes, className }: WorkCardProps) {
  const capability = project.capability ? getCapability(project.capability) : undefined

  return (
    <article className={cn('h-full', className)}>
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
      >
        <div className="relative overflow-hidden border border-border">
          <ParallaxImage
            src={project.coverImage}
            alt={project.coverAlt ?? `${project.name} — project cover`}
            sizes={sizes ?? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            priority={priority}
            className="aspect-[16/10] w-full"
            imageClassName="transition-transform duration-500 ease-brand group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />

          {capability ? (
            <div className="absolute left-4 top-4 z-10">
              <Badge variant="overlay">{capability.title}</Badge>
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col pt-6">
          <p className="micro text-muted">
            {project.client} · {project.industry}
          </p>

          <h3 className="mt-3 text-h3 transition-colors duration-300 ease-brand group-hover:text-brand">
            {project.name}
          </h3>

          {project.summary ? (
            <p className="mt-3 flex-1 text-body text-muted">{project.summary}</p>
          ) : (
            <p className="mt-3 flex-1 text-body text-muted">
              {project.servicesDelivered.slice(0, 3).join(' · ')}
            </p>
          )}

          <span className="mt-6 inline-flex items-center gap-2 font-display text-[0.9375rem] font-bold text-brand">
            View project
            <ArrowUpRight
              className="size-[18px] transition-transform duration-300 ease-brand group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  )
}
