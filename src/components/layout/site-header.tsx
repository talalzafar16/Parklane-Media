import { contactLink, navLinks } from '@/data/site'

import { Logo } from './logo'
import { MobileMenu } from './mobile-menu'

export function SiteHeader() {
  return (
    <header className="fixed inset-x-5 top-4 z-50 flex h-[70px] items-center justify-between rounded-[50px] border border-line bg-navy/[.87] px-8 backdrop-blur-[18px] mobile:inset-x-[.6rem] mobile:top-[.6rem] mobile:h-[60px] mobile:px-[1.1rem]">
      <a className="block w-40 mobile:w-32" href="#top">
        <Logo priority />
      </a>

      <nav className="flex items-center gap-10 text-[.9rem] tablet:hidden" aria-label="Primary navigation">
        {navLinks.map((link) => (
          <a key={link.href} className="py-[.7rem] transition-colors duration-[180ms] hover:text-muted" href={link.href}>
            {link.label}
          </a>
        ))}
        <a
          className="rounded-[30px] bg-ink px-5 py-[.65rem] text-navy transition-colors duration-[180ms] hover:text-muted"
          href={contactLink.href}
        >
          {contactLink.label}
        </a>
      </nav>

      <MobileMenu links={[...navLinks, contactLink]} />
    </header>
  )
}
