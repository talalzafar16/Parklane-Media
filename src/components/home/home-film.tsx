import { ScrollFilm } from '@/components/film/scroll-film'
import { heroFilm } from '@/data/home'

import { ConnectChapter } from './connect-chapter'
import { HeroIntro } from './hero-intro'
import { ProofChapter } from './proof-chapter'

// The chapters are server components passed through the client ScrollFilm,
// so only the film controller ships as JavaScript.
export function HomeFilm() {
  return (
    <ScrollFilm film={heroFilm}>
      <HeroIntro />
      <ConnectChapter />
      <ProofChapter />
    </ScrollFilm>
  )
}
