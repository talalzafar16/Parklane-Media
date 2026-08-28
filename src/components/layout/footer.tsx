import Link from 'next/link'
import { ArrowRight, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { Block } from '@/components/system/block'
import { Ticker } from '@/components/system/ticker'
import { PLACEHOLDER_LABEL, footerNav, officeDetails, siteConfig, socials } from '@/data/site'

const socialIcons = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
} as const

/**
 * Ticker, one asymmetric link band, then a mono meta bar.
 *
 * The identity column carries the real wordmark at nav scale — an oversized PM
 * mark here left a large dead area beside it and pulled attention away from the
 * links, which are the reason anyone looks at a footer.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-canvas">
      <Ticker />

      <div className="container-px py-16 lg:py-20">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Identity */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" className="inline-flex" aria-label={`${siteConfig.name} — home`}>
              {/* Vector lockup: the raster asset has white baked in, which
                  shows as a pale box against --base. */}
              <Logo variant="vector" height={30} />
            </Link>

            <p className="mt-6 max-w-[34ch] text-body text-muted">
              A media, content, marketing and advertising company connecting brands, audiences and
              content.
            </p>

            <div className="mt-8">
              <h2 className="micro text-muted">Office</h2>
              {/* TODO: CLIENT — supply the registered office address. */}
              {officeDetails.address ? (
                <address className="mt-3 not-italic text-body text-fg">
                  {officeDetails.address}
                </address>
              ) : (
                <p className="micro mt-3 inline-flex border border-dashed border-border px-3 py-2 text-muted">
                  {PLACEHOLDER_LABEL}
                </p>
              )}
            </div>

            <Block asChild size="sm" className="mt-8">
              <Link href="/contact">
                Let&rsquo;s Talk
                <ArrowRight aria-hidden="true" />
              </Link>
            </Block>
          </div>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="lg:col-span-2 lg:col-start-6">
            <h2 id="footer-company" className="micro text-muted">
              Company
            </h2>
            <ul className="mt-5 border-t border-border">
              {footerNav.company.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    className="flex min-h-[44px] items-center text-body text-fg transition-colors duration-200 ease-brand hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Capabilities */}
          <nav aria-labelledby="footer-capabilities" className="lg:col-span-3 lg:col-start-8">
            <h2 id="footer-capabilities" className="micro text-muted">
              Capabilities
            </h2>
            <ul className="mt-5 border-t border-border">
              {footerNav.capabilities.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <Link
                    href={link.href}
                    className="flex min-h-[44px] items-center text-body text-fg transition-colors duration-200 ease-brand hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <nav aria-labelledby="footer-connect" className="lg:col-span-2 lg:col-start-11">
            <h2 id="footer-connect" className="micro text-muted">
              Connect
            </h2>
            <ul className="mt-5 border-t border-border">
              {socials.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <li key={social.label} className="border-b border-border">
                    {/* TODO: CLIENT — confirm or replace this social profile URL. */}
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center gap-3 text-body text-fg transition-colors duration-200 ease-brand hover:text-brand"
                    >
                      <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                      {social.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-t border-border">
        <div className="container-px flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro text-muted">
            © {year} {siteConfig.name} — All rights reserved
          </p>
          <p className="micro text-muted">Karachi, Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
