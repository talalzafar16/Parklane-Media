import { ChartPie, Lightbulb, type LucideIcon } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { PartnerStrip } from '@/components/proof/partner-strip'
import { ProofGrid } from '@/components/proof/proof-grid'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { proofStatement } from '@/data/proof'

export function ProofChapter() {
  return (
    <section aria-labelledby="proof-heading" className="relative min-h-[100svh] bg-gradient-to-b from-canvas/40 via-canvas/10 to-canvas/70 pb-24 pt-32">
      <Container>
        <Reveal>
          <PartnerStrip />
        </Reveal>

        <Reveal className="mx-auto mt-20 max-w-5xl text-center">
          <Eyebrow marker={null} tone="muted" className="justify-center">
            {proofStatement.eyebrow}
          </Eyebrow>
          <h2 id="proof-heading" className="mt-6 text-statement font-normal text-balance [text-shadow:0_2px_24px_rgb(8_19_29/0.6)]">
            {proofStatement.lead} <InlineIcon icon={ChartPie} /> <span className="text-signal-bright">{proofStatement.emphasis}</span>{' '}
            <span className="text-ink/60">
              <InlineIcon icon={Lightbulb} /> {proofStatement.trail}
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <ProofGrid />
        </Reveal>
      </Container>
    </section>
  )
}

function InlineIcon({ icon: Glyph }: { icon: LucideIcon }) {
  return (
    <span aria-hidden="true" className="inline-flex size-[0.9em] -translate-y-[0.06em] items-center justify-center rounded-full bg-signal align-middle text-ink">
      <Glyph className="size-[0.5em]" strokeWidth={2} />
    </span>
  )
}
