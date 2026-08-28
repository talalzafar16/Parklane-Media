'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'

import { HeroBackdrop } from '@/components/home/hero-backdrop'
import { Magnetic } from '@/components/motion/magnetic'
import { Block } from '@/components/system/block'
import { CountUp } from '@/components/system/count-up'
import { KnockoutHeading } from '@/components/system/knockout-heading'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { Container } from '@/components/ui/container'
import { useMotionProfile } from '@/hooks/use-motion-profile'
import { EASE_BRAND } from '@/lib/motion'
import { capabilities } from '@/data/capabilities'

/**
 * Counts derived from the capability data rather than typed in, so they can
 * never drift from what the site actually lists.
 *
 * `serviceFloor` rounds *down* to the nearest ten. With 57 services that gives
 * "50+", which is true, rather than rounding up to a figure the site cannot
 * substantiate — see the README note.
 */
const CAPABILITY_COUNT = capabilities.length
const SERVICE_COUNT = capabilities.reduce((total, capability) => total + capability.tags.length, 0)
const SERVICE_FLOOR = Math.floor(SERVICE_COUNT / 10) * 10

/**
 * Asymmetric hero: headline occupies columns 1–7, the stat block 8–12.
 * No photography, no video, no gradient — type, hairlines and one solid block.
 */
export function Hero() {
  const { reduced } = useMotionProfile()

  const enter = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0, y: 16 } as const),
    animate: { opacity: 1, y: 0 },
    transition: reduced ? { duration: 0 } : { duration: 0.5, ease: EASE_BRAND, delay },
  })

  // Mono labels fade only — no movement, per the motion rules.
  const fadeOnly = (delay: number) => ({
    initial: reduced ? false : ({ opacity: 0 } as const),
    animate: { opacity: 1 },
    transition: reduced ? { duration: 0 } : { duration: 0.5, ease: EASE_BRAND, delay },
  })

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-canvas">
      <HeroBackdrop />

      <Container className="relative z-10 py-32">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Columns 1–8. Eight rather than seven because at 115px the line
              "Audiences &" needs ~690px of measure; in a 7-column column the
              ampersand orphans onto a line of its own. */}
          <div className="lg:col-span-8">
            <motion.div data-reveal="" {...fadeOnly(0)}>
              <TimecodeLabel index="Parklane Media" label="Est. Karachi" />
            </motion.div>

            <KnockoutHeading
              as="h1"
              size="display"
              // Explicit breaks: at 115px in a 7-column measure the line
              // "Brands, Audiences &" wraps to three ragged lines on its own.
              lead={'Connecting\nBrands,\nAudiences &'}
              knockout="Content"
              className="mt-8"
            />

            <motion.p
              data-reveal=""
              {...enter(0.5)}
              className="mt-10 max-w-copy text-lead text-muted"
            >
              A media, content, marketing and advertising company building meaningful connections
              between businesses, audiences and content.
            </motion.p>

            <motion.div
              data-reveal=""
              {...enter(0.62)}
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Magnetic>
                <Block asChild size="lg">
                  <Link href="/capabilities">
                    Our Capabilities
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Block>
              </Magnetic>

              <Magnetic>
                <Block asChild size="lg" variant="outline">
                  <Link href="/contact">Let&rsquo;s Talk</Link>
                </Block>
              </Magnetic>
            </motion.div>
          </div>

          {/* Columns 8–12 — counts of real data, not claimed metrics. */}
          <motion.dl
            data-reveal=""
            {...fadeOnly(0.35)}
            className="border-t border-border lg:col-span-3 lg:col-start-10 lg:self-end"
          >
            <StatRow
              value={<CountUp value={CAPABILITY_COUNT} pad={2} />}
              label="Capabilities"
            />
            <StatRow
              value={<CountUp value={SERVICE_FLOOR} suffix="+" />}
              label="Services"
            />
            <StatRow value="One" label="Partner" />
          </motion.dl>
        </div>
      </Container>

      <ScrollCue reduced={reduced} />
    </section>
  )
}

function StatRow({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-5">
      <dt className="micro text-muted">{label}</dt>
      <dd className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-none text-brand-dark">
        {value}
      </dd>
    </div>
  )
}

function ScrollCue({ reduced }: { reduced: boolean }) {
  return (
    <a
      href="#about"
      className="absolute bottom-8 left-6 z-10 inline-flex items-center gap-3 px-2 py-2 text-muted transition-colors duration-200 ease-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <span className="micro">Scroll</span>
      <motion.span
        aria-hidden="true"
        animate={reduced ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
      >
        <ArrowDown className="size-4" />
      </motion.span>
      <span className="sr-only">Skip to the section below the hero</span>
    </a>
  )
}
