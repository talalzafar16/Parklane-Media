import type { ComponentType } from 'react'
import { Facebook, Instagram, Youtube, type LucideProps } from 'lucide-react'

import { siteConfig, socials, type SocialLink } from '@/data/site'

import { Logo } from './logo'

// Lucide has no X brand mark, so it's drawn here, padded to sit on Lucide's 24px grid.
function XLogo({ className }: LucideProps) {
  return (
    <svg className={className} viewBox="-2 -2 28 28" fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

const socialIcons: Record<SocialLink['icon'], ComponentType<LucideProps>> = {
  instagram: Instagram,
  x: XLogo,
  facebook: Facebook,
  youtube: Youtube,
}

export function SiteFooter() {
  return (
    <footer className="grid grid-cols-[1fr_1fr_auto] items-center gap-8 px-gutter py-12 text-[.8rem] text-muted tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-6">
      <div className="w-40">
        <Logo />
      </div>
      <p>{siteConfig.tagline}</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 tablet:col-span-full mobile:col-auto">
        <ul className="flex gap-2">
          {socials.map((social) => {
            const Icon = socialIcons[social.icon]
            return (
              <li key={social.label}>
                <a
                  className="grid size-10 place-items-center rounded-full border border-line transition-colors duration-[180ms] hover:border-ink hover:text-ink"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                >
                  <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </a>
              </li>
            )
          })}
        </ul>
        <span>
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
      </div>
    </footer>
  )
}
