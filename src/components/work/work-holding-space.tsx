import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Magnetic } from '@/components/motion/magnetic'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { Block } from '@/components/system/block'
import { Frame } from '@/components/system/frame'
import { TimecodeLabel } from '@/components/system/timecode-label'

const SLOTS = [
  { caption: 'Project 01 — Coming soon' },
  { caption: 'Project 02 — Coming soon' },
  { caption: 'Project 03 — Coming soon' },
]

/**
 * Reserved space for the first projects, composed rather than apologetic.
 *
 * Three outlined frames with mono captions read as a page laid out and waiting
 * for plates — which is exactly what it is. No "no results" copy, no empty
 * grid, no shrug.
 */
export function WorkHoldingSpace() {
  return (
    <div>
      <TimecodeLabel index="Our Work" label="2026 —" />

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="text-h2 text-brand-dark">
            The first projects are in production. This is where they will run.
          </p>
        </Reveal>

        {/* Four columns, not three: at exactly 1024px a 3-column track is
            narrower than the nowrap "Start a conversation" block. */}
        <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="max-w-copy text-body text-muted">
            If you have a campaign, content idea or media opportunity in mind, we would like to hear
            about it.
          </p>
          <Magnetic className="mt-8">
            <Block asChild>
              <Link href="/contact">
                Start a conversation
                <ArrowRight aria-hidden="true" />
              </Link>
            </Block>
          </Magnetic>
        </Reveal>
      </div>

      {/* Deliberately uneven widths — three equal cards is the template look
          this design is getting away from. */}
      <RevealGroup as="ul" className="mt-20 grid gap-10 lg:grid-cols-12 lg:gap-6">
        <RevealItem as="li" className="lg:col-span-7">
          <Frame caption={SLOTS[0].caption} ratio="16/9" />
        </RevealItem>
        <RevealItem as="li" className="lg:col-span-4 lg:col-start-9 lg:mt-24">
          <Frame caption={SLOTS[1].caption} ratio="4/5" />
        </RevealItem>
        <RevealItem as="li" className="lg:col-span-5 lg:col-start-4">
          <Frame caption={SLOTS[2].caption} ratio="3/2" />
        </RevealItem>
      </RevealGroup>
    </div>
  )
}
