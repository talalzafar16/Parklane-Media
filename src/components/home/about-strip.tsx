import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { Block } from '@/components/system/block'
import { Frame } from '@/components/system/frame'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { Container, Section } from '@/components/ui/container'
import { aboutIntro } from '@/data/about'

/**
 * About — a numbered editorial column.
 *
 * The paragraphs sit in columns 3–9 with a deep left margin holding the mono
 * numbers, so the block reads as a set piece rather than a paragraph stack.
 * Column 10–12 holds a single Frame.
 */
export function AboutStrip() {
  return (
    <Section id="about" tone="canvas" aria-labelledby="about-heading">
      <Container>
        <TimecodeLabel index="Sec. 01" label="About" />

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/*
              No heading here on purpose. The client's About heading is
              "Connecting Brands, Audiences & Content" — the same line the hero
              already carries as the page h1. Repeating it as a second knockout
              two screens later reads as a mistake, so on the homepage this
              block leads with the numbered paragraphs and the heading lives on
              /about, where it is the h1 and does not collide with anything.
            */}
            <h2 id="about-heading" className="sr-only">
              About Parklane Media
            </h2>

            {/* Body copy is deliberately not animated — it is what the reader
                is reading. Only the mono numbers carry a reveal. */}
            <ol className="space-y-10">
              {aboutIntro.paragraphs.map((paragraph, index) => (
                <li key={paragraph.slice(0, 32)} className="grid grid-cols-[3rem_1fr] gap-6">
                  <span className="micro pt-1 text-brand" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="max-w-copy text-body text-muted">{paragraph}</p>
                </li>
              ))}
            </ol>

            <Reveal delay={0.1} className="mt-14 pl-[4.5rem]">
              <Block asChild variant="outline">
                <Link href="/about">
                  More about us
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Block>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <Frame ratio="4/5" caption="Parklane Media — Studio" />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
