import Link from 'next/link'

import { RecDot } from '@/components/broadcast/rec-dot'
import { ArrowLine, Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { contactLink } from '@/data/site'
import { heroIntro } from '@/data/home'

export function HeroIntro() {
  const { heading } = heroIntro

  return (
    <section aria-labelledby="hero-heading" className="relative flex min-h-[100svh] items-end pb-28 pt-nav md:items-center md:pb-20">
      <Container>
        <div className="max-w-[72rem]">
          <p className="label flex items-center gap-3 text-ink">
            <RecDot />
            <span className="text-signal-bright">On air</span>
            <span aria-hidden="true" className="h-px w-10 bg-line-strong" />
            {heroIntro.kicker}
          </p>

          <h1 id="hero-heading" className="display mt-7 text-display-xl">
            <span className="block">{heading.lead}</span>
            <span className="block">
              {heading.trail} <span className="text-signal-bright">{heading.emphasis}</span>.
            </span>
          </h1>

          <p className="mt-8 max-w-[40ch] text-lead text-ink/85">{heroIntro.body}</p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="#services">
                Explore services
                <ArrowLine />
              </Link>
            </Button>
            <Button asChild variant="bracket" size="lg">
              <Link href={contactLink.href}>Start a project</Link>
            </Button>
          </div>

          <ul className="label mt-12 flex gap-8 text-muted" aria-label="Disciplines">
            {heroIntro.tags.map((tag) => (
              <li key={tag}>
                <span aria-hidden="true" className="text-signal-bright">/ </span>
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <a
        href="#about-parklane"
        className="label absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors hover:text-ink md:flex"
      >
        Scroll
        <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-scan bg-signal-bright" />
        </span>
        <span className="sr-only">to the next section</span>
      </a>
    </section>
  )
}
