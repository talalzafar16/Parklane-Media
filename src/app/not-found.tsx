import Link from 'next/link'

import { ArrowLine, Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { contactLink, mainNav } from '@/data/site'

// Faint test-card bars behind the 404.
const BARS = ['bg-silver', 'bg-muted', 'bg-signal-bright', 'bg-signal', 'bg-raised', 'bg-surface', 'bg-ink']

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85svh] items-center overflow-hidden pb-24 pt-[calc(var(--nav-offset)+4rem)]">
      <div aria-hidden="true" className="absolute inset-0 -z-10 flex opacity-[0.07]">
        {BARS.map((bar) => (
          <span key={bar} className={`h-full flex-1 ${bar}`} />
        ))}
      </div>

      <Container>
        <div className="max-w-3xl">
          <Eyebrow marker="404">No signal</Eyebrow>
          <h1 className="display mt-6 text-display-xl">Signal lost.</h1>
          <p className="mt-8 max-w-[44ch] text-lead text-ink/85">
            The link is broken or the page has moved. Here are the channels still broadcasting.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/">
                Back to home
                <ArrowLine />
              </Link>
            </Button>
            <Button asChild size="lg" variant="bracket">
              <Link href={contactLink.href}>{contactLink.label}</Link>
            </Button>
          </div>

          <nav aria-label="Site sections" className="mt-16 border-t border-line pt-8">
            <ul className="label flex flex-wrap gap-x-8 gap-y-3">
              {mainNav.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted transition-colors hover:text-signal-bright">
                    <span aria-hidden="true" className="text-signal-bright">{'// '}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  )
}
