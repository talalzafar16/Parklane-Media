import Link from 'next/link'

import { Reveal } from '@/components/motion/reveal'
import { ArrowLine, Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Panel } from '@/components/ui/panel'
import { connect } from '@/data/about'

export function ConnectChapter() {
  return (
    <section id="about-parklane" aria-labelledby="connect-heading" className="relative flex min-h-[100svh] items-center py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <Eyebrow>{connect.eyebrow}</Eyebrow>
          <h2 id="connect-heading" className="display mt-6 text-[clamp(4.5rem,2rem+9vw,11.5rem)] leading-[0.8]">
            {connect.heading[0]}
            <span className="block text-signal-bright">{connect.heading[1]}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <Panel tone="glass" notch="1.75rem" className="p-7 sm:p-9">
            <h3 className="text-title font-medium">{connect.title}</h3>
            <p className="mt-5 text-muted">{connect.body}</p>

            <dl className="mt-8">
              {connect.facts.map((fact) => (
                <div key={fact.label} className="grid gap-2 border-t border-line py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                  <dt className="label pt-0.5 text-signal-bright">{fact.label}</dt>
                  <dd className="text-small text-ink">{fact.items.join(' · ')}</dd>
                </div>
              ))}
            </dl>

            <Button asChild variant="link" className="mt-6">
              <Link href="/about">
                More about Parklane
                <ArrowLine />
              </Link>
            </Button>
          </Panel>
        </Reveal>
      </Container>
    </section>
  )
}
