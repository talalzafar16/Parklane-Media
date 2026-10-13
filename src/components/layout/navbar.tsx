'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useScrolled } from '@/hooks/use-scrolled'
import { contactDetails, contactLink, mainNav, siteConfig } from '@/data/site'
import { cn, padIndex } from '@/lib/utils'

function isActivePath(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

// The border is the 1px gap between two clipped layers — clip-path would cut a
// real border off at the bevelled corners.
export function Navbar() {
  const pathname = usePathname()
  const scrolled = useScrolled(40)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const isActive = (href: string) => isActivePath(pathname, href)

  React.useEffect(() => setMenuOpen(false), [pathname])

  const solid = scrolled || pathname !== '/'

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          'bevel mx-auto max-w-shell p-px transition-colors duration-500 ease-brand [--notch:0.875rem]',
          solid ? 'bg-line-strong' : 'bg-line',
        )}
      >
        <div
          className={cn(
            'bevel flex h-16 items-center justify-between gap-6 pl-5 pr-2 backdrop-blur-xl transition-colors duration-500 ease-brand [--notch:0.85rem]',
            solid ? 'bg-canvas/85' : 'bg-canvas/35',
          )}
        >
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="text-[0.95rem]">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((link, index) => {
                const active = isActive(link.href)
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'label flex h-11 items-center gap-2 px-4 text-[0.75rem] transition-colors duration-200 ease-brand',
                        'hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-bright',
                        active ? 'text-ink' : 'text-muted',
                      )}
                    >
                      <span aria-hidden="true" className="text-signal-bright">
                        {padIndex(index + 1)}
                      </span>
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'size-1 bg-signal-bright transition-opacity duration-200',
                          active ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href={contactLink.href}>Contact us</Link>
            </Button>

            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex size-11 items-center justify-center text-ink transition-colors hover:text-signal-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-bright lg:hidden"
                >
                  <Menu className="size-6" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <MobileMenu isActive={isActive} />
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const links = [{ label: 'Home', href: '/' }, ...mainNav, contactLink]

  return (
    <SheetContent>
      <SheetTitle className="sr-only">Site navigation</SheetTitle>
      <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6">
        <SheetClose asChild>
          <Link href="/" aria-label={`${siteConfig.name} — home`} className="mb-12 w-fit">
            <Logo />
          </Link>
        </SheetClose>

        <nav aria-label="Mobile" className="flex-1">
          <ul className="border-t border-line">
            {links.map((link, index) => (
              <li key={link.href} className="border-b border-line">
                <SheetClose asChild>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={cn(
                      'display flex min-h-[64px] items-center gap-5 text-[2rem] leading-none transition-colors hover:text-signal-bright',
                      isActive(link.href) ? 'text-signal-bright' : 'text-ink',
                    )}
                  >
                    <span aria-hidden="true" className="label text-muted">
                      {padIndex(index + 1)}
                    </span>
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-2">
          <p className="label text-muted">[ Location ]</p>
          <p className="text-ink">{contactDetails.location}</p>
          {contactDetails.email ? (
            <a href={`mailto:${contactDetails.email}`} className="block text-signal-bright">
              {contactDetails.email}
            </a>
          ) : null}
        </div>
      </div>
    </SheetContent>
  )
}
