import { ContactSection } from '@/components/contact/contact-section'
import { HeroJourney } from '@/components/hero/hero-journey'
import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'
import { ServiceChapter } from '@/components/services/service-chapter'
import { ServicesIndex } from '@/components/services/services-index'
import { services } from '@/data/services'

export default function HomePage() {
  return (
    <div id="top">
      <SiteHeader />
      <main>
        <HeroJourney />
        <ServicesIndex />
        {services.map((service) => (
          <ServiceChapter key={service.id} service={service} />
        ))}
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
