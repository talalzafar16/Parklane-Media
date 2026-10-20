import { heroFilm } from '@/data/home'

import { AboutSection } from './about-section'
import { HeroIntro } from './hero-intro'
import { PartnerProof } from './partner-proof'
import { ScrollFilm } from './scroll-film'

// One film behind three chapters. The chapters are server components passed
// through the client ScrollFilm, so only the film controller ships as JS.
export function HeroJourney() {
  return (
    <ScrollFilm film={heroFilm}>
      <HeroIntro />
      <AboutSection />
      <PartnerProof />
    </ScrollFilm>
  )
}
