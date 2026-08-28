import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

import { Block } from '@/components/system/block'
import { Container } from '@/components/ui/container'
import { mainNav } from '@/data/site'

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-brand-tint pb-24 pt-[calc(var(--nav-height)+4rem)]">
      <Container>
        <div className="max-w-2xl">
          <p className="micro text-brand">Error 404</p>

          <h1 className="mt-4 text-h2">This page has left the edit</h1>

          <p className="mt-6 max-w-copy text-lead text-muted">
            The link is broken or the page has moved. Nothing you did — here are the places worth
            going instead.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Block asChild size="lg">
              <Link href="/">
                <Home aria-hidden="true" />
                Back to home
              </Link>
            </Block>
            <Block asChild size="lg" variant="outline">
              <Link href="/work">
                See our work
                <ArrowRight aria-hidden="true" />
              </Link>
            </Block>
          </div>

          <nav aria-label="Site sections" className="mt-16 border-t border-border pt-8">
            <h2 className="micro text-muted">All pages</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-body text-brand transition-colors duration-200 ease-brand hover:text-brand-dark"
                  >
                    {item.label}
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
