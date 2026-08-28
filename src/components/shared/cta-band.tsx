import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Magnetic } from '@/components/motion/magnetic'
import { Reveal } from '@/components/motion/reveal'
import { Block } from '@/components/system/block'
import { TimecodeLabel } from '@/components/system/timecode-label'
import { Container } from '@/components/ui/container'

type CtaBandProps = {
  title?: string
  description?: string
  ctaLabel?: string
  ctaHref?: string
}

/**
 * Full-bleed --brand band. The one place on the site that centres, and the one
 * place display type runs at full scale on colour. One button: a white block
 * with dark type, the exact inverse of the mark.
 */
export function CtaBand({
  title = "Let's Create What's Next",
  description = 'Have a campaign, content idea, media opportunity or partnership in mind? Let’s talk.',
  ctaLabel = "Let's Talk",
  ctaHref = '/contact',
}: CtaBandProps) {
  return (
    <section className="bg-brand py-18 text-white lg:py-32" aria-labelledby="cta-band-heading">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <TimecodeLabel index="Parklane Media" label="Get in touch" tone="onBrand" />

          <h2
            id="cta-band-heading"
            className="mt-10 max-w-[14ch] text-display text-white"
          >
            {title}
          </h2>

          <p className="mt-8 max-w-copy text-lead text-white/75">{description}</p>

          <Magnetic className="mt-12">
            <Block asChild size="lg" variant="inverse">
              <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Block>
          </Magnetic>
        </Reveal>
      </Container>
    </section>
  )
}
