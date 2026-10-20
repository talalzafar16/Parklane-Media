import { siteConfig } from '@/data/site'

import { Logo } from './logo'

export function SiteFooter() {
  return (
    <footer className="grid grid-cols-[1fr_1fr_auto] items-center gap-8 px-gutter py-12 text-[.8rem] text-muted tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-6">
      <div className="w-40">
        <Logo />
      </div>
      <p>{siteConfig.tagline}</p>
      <span className="tablet:col-span-full mobile:col-auto">
        © {new Date().getFullYear()} {siteConfig.name}
      </span>
    </footer>
  )
}
