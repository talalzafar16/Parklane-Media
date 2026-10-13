import type { ReactNode } from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { RadarPulse } from '@/components/broadcast/radar-pulse'
import { Magnetic } from '@/components/motion/magnetic'
import { ArrowLine, Button } from '@/components/ui/button'
import { finale } from '@/data/home'
import { getServiceHref, services } from '@/data/services'
import {
  PLACEHOLDER_LABEL,
  companyNav,
  contactDetails,
  contactLink,
  siteConfig,
  socials,
} from '@/data/site'

const socialIcons = { instagram: Instagram, facebook: Facebook, linkedin: Linkedin, youtube: Youtube }

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-canvas">
      <TransmissionBar />

      <div className="shell grid gap-12 border-t border-line py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="inline-flex text-base">
            <Logo />
          </Link>
          <p className="mt-6 max-w-[34ch] text-small text-muted">{siteConfig.tagline}</p>
          <ul className="mt-8 flex gap-2">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon]
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center border border-line text-muted transition-colors hover:border-signal-bright hover:text-signal-bright"
                  >
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-[18px]" />
                    <span className="sr-only">{social.label} (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <FooterColumn title="Services" className="lg:col-span-3 lg:col-start-5">
          {services.map((service) => (
            <FooterLink key={service.slug} href={getServiceHref(service)}>
              {service.title}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Company" className="lg:col-span-2">
          {companyNav.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact" className="lg:col-span-3">
          <li>
            {contactDetails.email ? (
              <a
                href={`mailto:${contactDetails.email}`}
                className="break-words text-small text-ink transition-colors hover:text-signal-bright"
              >
                {contactDetails.email}
              </a>
            ) : (
              <span className="text-small text-muted">{PLACEHOLDER_LABEL}</span>
            )}
          </li>
          <li className="text-small text-ink">
            {contactDetails.phone && contactDetails.phoneHref ? (
              <a href={`tel:${contactDetails.phoneHref}`} className="hover:text-signal-bright">
                {contactDetails.phone}
              </a>
            ) : (
              <span className="text-muted">Phone · {PLACEHOLDER_LABEL}</span>
            )}
          </li>
          <li className="text-small text-ink">{contactDetails.location}</li>
        </FooterColumn>
      </div>

      <div className="border-t border-line">
        <div className="shell label flex flex-col gap-3 py-6 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="text-ink">{siteConfig.name}</p>
          <p className="tabular-nums">{siteConfig.coordinates}</p>
          <p className="text-signal-bright">
            © {year} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  )
}

function TransmissionBar() {
  return (
    <div className="shell relative grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
      <h2 className="display relative z-10 text-display-xl lg:col-span-8">
        {finale.heading.lead}
        <br />
        <span className="text-signal-bright">{finale.heading.emphasis}</span> {finale.heading.trail}
      </h2>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[22%] top-1/2 hidden w-[min(28vw,420px)] -translate-y-1/2 lg:block"
      >
        <span className="absolute right-1/2 top-1/2 h-px w-[60vw] bg-gradient-to-r from-transparent to-signal-bright/60" />
        <RadarPulse className="w-full opacity-80" />
      </div>

      <div className="relative z-10 lg:col-span-3 lg:col-start-10">
        <p className="max-w-[36ch] text-small text-muted">{finale.body}</p>
        <Magnetic className="mt-8">
          <Button asChild size="lg">
            <Link href={`${contactLink.href}#enquiry`}>
              <span className="label text-[0.75rem]">[ {finale.cta} ]</span>
              <ArrowLine />
            </Link>
          </Button>
        </Magnetic>
      </div>
    </div>
  )
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <h2 className="label text-signal-bright">
        <span aria-hidden="true">{'// '}</span>
        {title}
      </h2>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  )
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-small text-ink transition-colors hover:text-signal-bright">
        {children}
      </Link>
    </li>
  )
}
