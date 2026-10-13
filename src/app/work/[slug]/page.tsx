import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'

import { ParallaxImage } from '@/components/motion/parallax-image'
import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/shared/page-hero'
import { Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Panel } from '@/components/ui/panel'
import { getService } from '@/data/services'
import { getProject, projects } from '@/data/work'
import { buildMetadata } from '@/lib/seo'

type PageProps = { params: { slug: string } }

// No projects yet, so no pages are generated and every /work/<slug> 404s.
export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProject(params.slug)
  if (!project) return buildMetadata({ title: 'Project not found', description: '', noIndex: true })

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

  const service = project.service ? getService(project.service) : undefined
  const index = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(index + 1) % projects.length]

  const facts = [
    { label: 'Client', value: project.client },
    { label: 'Industry', value: project.industry },
    { label: 'Platforms', value: project.platforms.join(', ') },
    ...(service ? [{ label: 'Service', value: service.title }] : []),
  ]

  return (
    <>
      <PageHero
        eyebrow={project.client}
        title={project.name}
        description={project.summary}
        breadcrumbs={[{ label: 'Work', href: '/work' }, { label: project.client }]}
      />

      <Container className="pt-16">
        <ParallaxImage
          src={project.coverImage}
          alt={project.coverAlt ?? `${project.name} — project cover`}
          sizes="(min-width: 1600px) 1440px, 100vw"
          priority
          className="notch aspect-[2/1] w-full [--notch:3rem]"
        />
      </Container>

      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <aside className="space-y-3 lg:sticky lg:top-[calc(var(--nav-offset)+2rem)] lg:col-span-4">
            <Panel tone="surface" className="p-8">
              <dl>
                {facts.map((fact) => (
                  <div key={fact.label} className="border-b border-line py-4 first:pt-0 last:border-0 last:pb-0">
                    <dt className="label text-signal-bright">{fact.label}</dt>
                    <dd className="mt-2 text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
            <Panel tone="surface" className="p-8">
              <h2 className="label text-signal-bright">Services delivered</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.servicesDelivered.map((item) => (
                  <li key={item} className="label border border-line px-2 py-1 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Panel>
          </aside>

          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>Results</Eyebrow>
            <RevealGroup as="ul" className="mt-8 border-t border-line">
              {project.results.map((result) => (
                <RevealItem as="li" key={result} className="flex items-start gap-4 border-b border-line py-6">
                  <Check className="mt-1 size-5 shrink-0 text-signal-bright" aria-hidden="true" />
                  <span className="text-lead">{result}</span>
                </RevealItem>
              ))}
            </RevealGroup>

            <div className="mt-14 flex flex-wrap gap-4">
              <Button asChild variant="bracket">
                <Link href="/work">All work</Link>
              </Button>
              {nextProject && nextProject.slug !== project.slug ? (
                <Button asChild>
                  <Link href={`/work/${nextProject.slug}`}>Next project</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
