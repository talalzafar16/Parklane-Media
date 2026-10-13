import Link from 'next/link'

import { ParallaxImage } from '@/components/motion/parallax-image'
import { ArrowLine } from '@/components/ui/button'
import { getService } from '@/data/services'
import type { Project } from '@/data/work'

export function WorkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const service = project.service ? getService(project.service) : undefined

  return (
    <article className="h-full">
      <Link
        href={`/work/${project.slug}`}
        className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-bright focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
      >
        <div className="notch relative overflow-hidden [--notch:1.5rem]">
          <ParallaxImage
            src={project.coverImage}
            alt={project.coverAlt ?? `${project.name} — project cover`}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            priority={priority}
            className="aspect-[16/10] w-full"
            imageClassName="transition-transform duration-700 ease-brand group-hover:scale-105"
          />
          {service ? (
            <span className="label absolute left-4 top-4 z-10 bg-canvas/80 px-2 py-1 text-signal-bright backdrop-blur">
              {service.number} · {service.title}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col pt-6">
          <p className="label text-muted">
            {project.client} · {project.industry}
          </p>
          <h3 className="mt-3 text-title font-medium transition-colors group-hover:text-signal-bright">
            {project.name}
          </h3>
          <p className="mt-3 flex-1 text-muted">
            {project.summary ?? project.servicesDelivered.slice(0, 3).join(' · ')}
          </p>
          <span className="mt-6 flex items-center gap-3 text-signal-bright">
            <span className="label">View project</span>
            <ArrowLine />
          </span>
        </div>
      </Link>
    </article>
  )
}
