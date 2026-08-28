import type { Metadata } from 'next'
import { Handshake, Mail, MapPin, Megaphone, Phone, type LucideIcon } from 'lucide-react'

import { ContactForm } from '@/components/contact/contact-form'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { PageHero } from '@/components/shared/page-hero'
import { Container, Section } from '@/components/ui/container'
import {
  PLACEHOLDER_LABEL,
  contactChannels,
  officeDetails,
  type ContactChannel,
} from '@/data/site'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    "Have a campaign, content idea, media opportunity or partnership in mind? Let's talk.",
  path: '/contact',
})

const channelIcons: Record<ContactChannel['icon'], LucideIcon> = {
  mail: Mail,
  handshake: Handshake,
  megaphone: Megaphone,
  'map-pin': MapPin,
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Create What's Next"
        description="Have a campaign, content idea, media opportunity or partnership in mind? Let's talk."
      />

      {/* Routed contact points */}
      <Section tone="canvas" aria-labelledby="contact-routes-heading">
        <Container>
          <h2 id="contact-routes-heading" className="sr-only">
            Ways to reach us
          </h2>

          <RevealGroup as="ul" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactChannels.map((channel) => {
              const Icon = channelIcons[channel.icon]
              return (
                <RevealItem
                  as="li"
                  key={channel.id}
                  className="flex h-full flex-col border border-border bg-white p-8"
                >
                  <span className="inline-flex size-12 items-center justify-center bg-brand-tint text-brand">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-h4">{channel.heading}</h3>
                  <p className="mt-3 flex-1 text-body text-muted">{channel.description}</p>

                  <div className="mt-6">
                    {/* TODO: CLIENT — supply the address for {channel.heading}. */}
                    {channel.value && channel.href ? (
                      <a
                        href={channel.href}
                        className="break-all font-display text-[0.9375rem] font-bold text-brand transition-colors duration-200 ease-brand hover:text-brand-dark"
                      >
                        {channel.value}
                      </a>
                    ) : (
                      <Placeholder />
                    )}
                  </div>
                </RevealItem>
              )
            })}

            {/* Office */}
            <RevealItem
              as="li"
              className="flex h-full flex-col border border-border bg-white p-8"
            >
              <span className="inline-flex size-12 items-center justify-center bg-brand-tint text-brand">
                <MapPin className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-h4">{officeDetails.heading}</h3>
              <p className="mt-3 flex-1 text-body text-muted">{officeDetails.description}</p>

              <div className="mt-6 space-y-3">
                {/* TODO: CLIENT — supply the registered office address. */}
                {officeDetails.address ? (
                  <address className="not-italic text-body text-fg">
                    {officeDetails.address}
                  </address>
                ) : (
                  <Placeholder />
                )}

                {/* TODO: CLIENT — supply the main office telephone number. */}
                {officeDetails.phone && officeDetails.phoneHref ? (
                  <a
                    href={`tel:${officeDetails.phoneHref}`}
                    className="inline-flex items-center gap-2 font-display text-[0.9375rem] font-bold text-brand transition-colors duration-200 ease-brand hover:text-brand-dark"
                  >
                    <Phone className="size-[18px]" aria-hidden="true" />
                    {officeDetails.phone}
                  </a>
                ) : (
                  <Placeholder />
                )}
              </div>
            </RevealItem>
          </RevealGroup>
        </Container>
      </Section>

      {/* Form */}
      <Section tone="tint" aria-labelledby="contact-form-heading">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-4">
              <h2 id="contact-form-heading" className="text-h2">
                Send us a message
              </h2>
              <p className="mt-6 max-w-copy text-body text-muted">
                Tell us what you are trying to achieve rather than writing a spec — the more context
                you give, the more useful our first reply will be.
              </p>

              <div className="mt-10 border border-border bg-white p-6">
                <h3 className="text-h4">Working with agencies?</h3>
                <p className="mt-3 text-body text-muted">
                  We partner with agencies and content owners that need media, production or
                  distribution capacity. Mention it in your message.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

/**
 * Stands in for a value the client has not supplied yet.
 * Deliberately styled to look unfinished — an invented email address that
 * silently shipped would be far worse than a visible gap.
 */
function Placeholder() {
  return (
    <span className="inline-flex items-center gap-2 border border-dashed border-brand/35 bg-brand/[0.04] px-3 py-1.5 font-display text-small font-medium text-muted">
      {PLACEHOLDER_LABEL}
    </span>
  )
}
