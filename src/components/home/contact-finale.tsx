import { ContactDetails } from '@/components/contact/contact-details'
import { EnquiryForm } from '@/components/contact/enquiry-form'
import { Reveal } from '@/components/motion/reveal'
import { Container, Section } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Panel } from '@/components/ui/panel'
import { contactIntro } from '@/data/home'

export function ContactFinale() {
  return (
    <Section id="contact" aria-labelledby="contact-heading" ruled className="dot-grid">
      <Container>
        <Reveal className="grid gap-10 border-b border-line pb-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-3">
            <Eyebrow>{contactIntro.eyebrow}</Eyebrow>
            <h2 id="contact-heading" className="display mt-4 text-display-md">
              {contactIntro.heading}
            </h2>
          </div>
          <p className="max-w-[36ch] text-muted lg:col-span-3">{contactIntro.body}</p>
          <ContactDetails className="lg:col-span-6" />
        </Reveal>

        <div className="grid gap-14 pt-16 lg:grid-cols-12 lg:pt-20">
          <Reveal className="lg:col-span-5">
            <Eyebrow marker="/">{contactIntro.formEyebrow}</Eyebrow>
            <h3 className="mt-6 max-w-[14ch] text-statement font-medium">{contactIntro.formHeading}</h3>
            <p className="mt-6 max-w-[40ch] text-muted">{contactIntro.formBody}</p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <Panel tone="surface" notch="2rem" className="p-7 sm:p-10">
              <EnquiryForm />
            </Panel>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
