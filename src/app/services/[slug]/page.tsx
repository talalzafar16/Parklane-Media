import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { JsonLd } from '@/components/seo/json-ld'
import { UpNext } from '@/components/services/up-next'
import { PageHero } from '@/components/shared/page-hero'
import { ArrowLine, Button } from '@/components/ui/button'
import { Container, Section } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { IndexCard } from '@/components/ui/index-card'
import { getNextService, getService, getServiceHref, services } from '@/data/services'
import { contactLink } from '@/data/site'
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from '@/lib/seo'
import { padIndex } from '@/lib/utils'

type PageProps = { params: { slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = getService(params.slug)
  if (!service) return buildMetadata({ title: 'Service not found', description: '', noIndex: true })

  return buildMetadata({
    title: service.title,
    description: service.summary,
    path: getServiceHref(service),
  })
}

export default function ServicePage({ params }: PageProps) {
  const service = getService(params.slug)
  if (!service) notFound()

  const path = getServiceHref(service)
  const enquiryHref = `${contactLink.href}?service=${encodeURIComponent(service.title)}#enquiry`

  return (
    <>
      <PageHero
        eyebrow="Service"
        marker={service.number}
        title={service.title}
        description={service.summary}
        image={service.image}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: service.title }]}
      >
        <Button asChild size="lg">
          <Link href={enquiryHref}>
            Start a project
            <ArrowLine />
          </Link>
        </Button>
        <Button asChild size="lg" variant="bracket">
          <Link href="/services">All services</Link>
        </Button>
      </PageHero>

      <Section aria-labelledby="capabilities-heading">
        <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--nav-offset)+2.5rem)]">
              <Eyebrow>Capabilities</Eyebrow>
              <h2 id="capabilities-heading" className="mt-6 text-statement font-medium">
                {service.headline}
              </h2>
              {service.motto ? <p className="label mt-8 text-signal-bright">{service.motto}</p> : null}
            </div>
          </Reveal>

          <RevealGroup as="ol" className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {service.capabilities.map((capability, index) => (
              <RevealItem as="li" key={capability.title}>
                <IndexCard
                  index={`${service.number}.${padIndex(index + 1)}`}
                  icon={capability.icon}
                  title={capability.title}
                  description={capability.description}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>

      <UpNext service={getNextService(service.slug)} />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path },
          ]),
          serviceJsonLd(service, path),
        ]}
      />
    </>
  )
}
