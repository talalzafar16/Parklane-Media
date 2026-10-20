import Image from 'next/image'
import { ArrowUpRight, ChartPie, Lightbulb, type LucideIcon } from 'lucide-react'

import eventStage from '@/assets/services/event-branding.webp'
import { Eyebrow } from '@/components/ui/eyebrow'
import { partners, testimonials } from '@/data/proof'
import { cn } from '@/lib/utils'

import { TestimonialCarousel } from './testimonial-carousel'

const card =
  'relative overflow-hidden rounded-[1.3rem] border border-white/20 backdrop-blur-[5px] laptop:p-[1.3rem] mobile:p-6 short:p-[1.2rem]'
const cardText = 'text-[.83rem] leading-[1.5]'
const cardLabel = cn(cardText, 'mb-[1.3rem] short:mb-[.7rem]')

// Pinned for one viewport while the last third of the hero film plays behind it.
export function PartnerProof() {
  return (
    <div className="relative z-[3] min-h-[200dvh] mobile:min-h-0 motion-reduce:min-h-0 motion-reduce:bg-navy">
      <section
        className="sticky top-0 flex min-h-dvh flex-col justify-center bg-proof-fade px-gutter pb-6 pt-24 text-ink short:pb-4 short:pt-[5.5rem] mobile:relative mobile:pb-8 mobile:pt-[5.5rem] motion-reduce:relative"
        aria-labelledby="partner-proof-title"
      >
        <div className="border-b border-line pb-4">
          <p className="mb-3 text-center font-mono text-[.6rem] uppercase leading-[normal] tracking-[.13em] text-muted">
            Partner showcase · proposed references for client approval
          </p>
          {/* One equal-width row for however many partners there are; four per row on mobile. */}
          <ul className="grid auto-cols-[minmax(0,1fr)] grid-flow-col gap-4 mobile:grid-flow-row mobile:grid-cols-4 mobile:gap-x-2 mobile:gap-y-4">
            {partners.map((partner) => (
              <li key={partner.name} className="flex min-h-12 min-w-0 flex-col items-center justify-center gap-2">
                <Image
                  className={cn(
                    'h-14 w-[6.5rem] max-w-full rounded p-[.3rem] mobile:h-[2.7rem] mobile:w-[4.5rem]',
                    partner.dark ? 'bg-navy' : 'bg-white',
                    partner.crop ? 'object-cover' : 'object-contain',
                  )}
                  src={partner.logo}
                  alt={partner.name}
                  sizes="104px"
                />
                <span className="whitespace-nowrap text-[clamp(.7rem,1.2vw,1.1rem)] font-semibold leading-[normal] tracking-[.04em]" aria-hidden="true">
                  {partner.name}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <header className="py-[clamp(1.2rem,3svh,2rem)] text-center short:py-4 mobile:py-10">
          <Eyebrow className="mb-4">About us</Eyebrow>
          <h2
            className="mx-auto max-w-[28ch] text-[clamp(1.8rem,2.8vw,3.4rem)] leading-[1.13] tracking-[-.055em] [text-shadow:0_2px_20px_rgb(8_19_29/.4)] short:text-[clamp(1.8rem,2.5vw,2.6rem)] mobile:text-[1.9rem]"
            id="partner-proof-title"
          >
            A global digital partner
            <br className="mobile:hidden" /> dedicated to building <Symbol icon={ChartPie} tone="bg-[#35b7e6] text-white" />{' '}
            smarter
            <br className="mobile:hidden" />{' '}
            <span className="text-[#c0d0da]">
              and <Symbol icon={Lightbulb} tone="bg-[#c6f653] text-[#183127]" /> more adaptive campaigns
            </span>
          </h2>
        </header>

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-3 gap-5 mobile:grid-cols-1 mobile:gap-4">
          <article
            className={cn(
              card,
              'flex min-h-[18rem] flex-col justify-between bg-accent/[.45] p-[1.8rem] text-ink after:absolute after:inset-0 after:bg-image-card-fade short:min-h-[16rem] mobile:min-h-[22rem]',
            )}
          >
            <Image className="absolute inset-0 h-full w-full object-cover opacity-[.38]" src={eventStage} alt="" sizes="(max-width: 700px) 100vw, 33vw" />
            <div className="relative z-[1] flex items-center justify-between gap-4 font-mono text-[.7rem] uppercase leading-[normal] tracking-[.07em]">
              <span>Ideas in action</span>
              <ArrowUpRight className="size-8 rounded-[.6rem] bg-ink p-[.3rem] text-navy" aria-hidden="true" />
            </div>
            <div className="relative z-[1] mt-12 rounded-[.8rem] bg-white/[.84] p-[1.4rem] text-navy short:mt-8 short:p-4">
              <Figure value="120" suffix="+" />
              <p className={cn(cardText, 'mt-4')}>
                Campaigns imagined.
                <br />
                Connections made.
              </p>
            </div>
          </article>

          <article className={cn(card, 'flex flex-col bg-[rgb(233_237_239/.84)] p-[1.8rem] text-navy mobile:min-h-[21rem]')}>
            <p className={cardLabel}>Commitment to measurable impact</p>
            <Figure value="100" suffix="%" />
            <TestimonialCarousel {...testimonials} />
          </article>

          <div className="grid grid-rows-[1fr_auto] gap-5 mobile:gap-4">
            <article className={cn(card, 'bg-[rgb(198_246_83/.82)] p-[1.8rem] text-navy')}>
              <p className={cardLabel}>Audience connections</p>
              <Figure value="100M" suffix="+" />
              <p className={cn(cardText, 'mt-8 mobile:mt-6')}>
                Content that travels further.
                <br />
                Stories that stay with people.
              </p>
            </article>
            <article className={cn(card, 'flex items-center justify-between gap-4 bg-navy/[.68] px-[1.8rem] py-[1.3rem] text-ink')}>
              <p className={cardText}>Markets reached</p>
              <Figure value="20" suffix="+" compact />
            </article>
          </div>
        </div>

        <p className="mt-[1.2rem] text-center text-[.65rem] leading-[1.5] text-[#bfccd4] short:mt-[.7rem]">
          Testimonials are draft templates awaiting client approval. Campaign and market figures remain illustrative.
        </p>
      </section>
    </div>
  )
}

function Figure({ value, suffix, compact = false }: { value: string; suffix: string; compact?: boolean }) {
  return (
    <strong
      className={`block font-normal leading-none tracking-[-.065em] ${
        compact ? 'text-[2.5rem]' : 'text-[clamp(2.6rem,3.5vw,4rem)] mobile:text-[3.5rem]'
      }`}
    >
      {value}
      <span className="text-[.8em]">{suffix}</span>
    </strong>
  )
}

function Symbol({ icon: Icon, tone }: { icon: LucideIcon; tone: string }) {
  return (
    <span className={cn('inline-grid size-[.95em] -translate-y-[.08em] place-items-center rounded-full align-middle', tone)} aria-hidden="true">
      <Icon className="size-[.57em]" strokeWidth={2} />
    </span>
  )
}
