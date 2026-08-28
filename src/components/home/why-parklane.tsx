import { RevealGroup, RevealItem } from '@/components/motion/reveal'
import { KnockoutHeading } from '@/components/system/knockout-heading'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { Container } from '@/components/ui/container'
import { whyParklane } from '@/data/why-parklane'

/**
 * The one full-bleed --ink band on the site.
 *
 * It is punctuation in the page rhythm, not a dark theme — which is why it
 * appears exactly once. Six items on a hairline 3×2 grid: no cards, no boxes,
 * no circular icons. A mono number, a title, a line of copy. The dividers are
 * a 1px grid gap letting the band colour through from behind, so no cell ends
 * up with a doubled edge.
 */
export function WhyParklane() {
  return (
    <section className="bg-ink py-18 text-white lg:py-32" aria-labelledby="why-parklane-heading">
      <Container>
        <TimecodeLabel index="Sec. 03" label="Why Parklane" tone="onDark" />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <KnockoutHeading
              id="why-parklane-heading"
              lead={'Built Around'}
              knockout="What Matters"
              size="h2"
              className="text-white"
            />
          </div>
        </div>

        <RevealGroup
          as="ul"
          className="mt-20 grid gap-px border-t border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyParklane.map((reason, index) => (
            <RevealItem as="li" key={reason.title} className="bg-ink px-0 py-10 sm:px-8">
              <span className="micro text-brand-light" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-6 text-h3 text-white">{reason.title}</h3>
              <p className="mt-4 max-w-copy text-body text-white/65">{reason.description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
