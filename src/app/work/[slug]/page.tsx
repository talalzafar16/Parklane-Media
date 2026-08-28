import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'

import { ParallaxImage } from '@/components/motion/parallax-image'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { CtaBand } from '@/components/shared/cta-band'
import { Badge } from '@/components/ui/badge'
import { Block } from '@/components/system/block'
import { Container, Section } from '@/components/ui/container'
import { getCapability } from '@/data/capabilities'
import { getProject, projects } from '@/data/work'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: { slug: string } }

/**
 * Project detail template.
 *
 * `projects` is currently empty, so this generates no pages and every
 * /work/<slug> URL correctly 404s. The template is written against the live
 * `Project` type and starts producing pages as soon as data is added.
 */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug)
  if (!project) {
    return buildMetadata({ title: 'Project not found', description: '', noIndex: true })
  }

  return buildMetadata({
    title: project.name,
    description: project.summary ?? `${project.client} — ${project.servicesDelivered.join(', ')}`,
    path: `/work/${project.slug}`,
    image: project.coverImage,
    imageAlt: project.coverAlt ?? `${project.name} — project cover`,
    type: 'article',
  })
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const capability = project.capability ? getCapability(project.capability) : undefined

  const index = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(index + 1) % projects.length]

  return (
    <>
      {/* Header */}
      <section className="bg-brand-tint pb-16 pt-[calc(var(--nav-height)+2.5rem)] lg:pt-[calc(var(--nav-height)+4rem)]">
        <Container>
          <Reveal className="max-w-4xl">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-small text-muted">
                <li>
                  <Link href="/work" className="transition-colors hover:text-brand">
                    Work
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-brand-dark">{project.client}</li>
              </ol>
            </nav>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {capability ? <Badge>{capability.title}</Badge> : null}
              <span className="text-small text-muted">{project.industry}</span>
            </div>

            <h1 className="mt-6 text-h2">{project.name}</h1>
            {project.summary ? (
              <p className="mt-6 max-w-copy text-lead text-muted">{project.summary}</p>
            ) : null}
          </Reveal>
        </Container>
      </section>

      {/* Cover */}
      <div className="bg-canvas">
        <Container>
          <ParallaxImage
            src={project.coverImage}
            alt={project.coverAlt ?? `${project.name} — project cover`}
            sizes="(min-width: 1280px) 1232px, 100vw"
            priority
            className="aspect-[2/1] w-full border border-border"
          />
        </Container>
      </div>

      {/* Body */}
      <Section tone="canvas">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:sticky lg:top-[calc(var(--nav-height)+2rem)] lg:col-span-4">
              <dl className="border border-border bg-white p-8">
                <div className="border-b border-border py-4 first:pt-0">
                  <dt className="micro text-muted">Client</dt>
                  <dd className="mt-2 text-body text-fg">{project.client}</dd>
                </div>
                <div className="border-b border-border py-4">
                  <dt className="micro text-muted">Industry</dt>
                  <dd className="mt-2 text-body text-fg">{project.industry}</dd>
                </div>
                <div className="py-4 last:pb-0">
                  <dt className="micro text-muted">Platforms</dt>
                  <dd className="mt-2 text-body text-fg">{project.platforms.join(', ')}</dd>
                </div>
              </dl>

              <div className="mt-6 border border-border bg-white p-8">
                <h2 className="micro text-muted">
                  Services delivered
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.servicesDelivered.map((service) => (
                    <li key={service}>
                      <Badge variant="tint">{service}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="lg:col-span-8">
              <h2 className="text-h2">Results</h2>
              <RevealGroup as="ul" className="mt-8 grid gap-4">
                {project.results.map((result) => (
                  <RevealItem
                    as="li"
                    key={result}
                    className="flex items-start gap-3 border border-border bg-white p-6"
                  >
                    <Check className="mt-1 size-[18px] shrink-0 text-brand" aria-hidden="true" />
                    <span className="text-body text-fg">{result}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </Container>
      </Section>

      {/* Next project */}
      <Section tone="tint" aria-labelledby="next-project-heading">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="next-project-heading" className="text-h2">
              Keep looking
            </h2>
            <div className="flex flex-wrap gap-3">
              <Block asChild variant="outline">
                <Link href="/work">
                  <ArrowLeft aria-hidden="true" />
                  All work
                </Link>
              </Block>
              {nextProject && nextProject.slug !== project.slug ? (
                <Block asChild>
                  <Link href={`/work/${nextProject.slug}`}>Next project</Link>
                </Block>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
