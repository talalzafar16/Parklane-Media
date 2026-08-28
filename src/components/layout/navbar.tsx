'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu } from 'lucide-react'

import { Logo } from '@/components/brand/logo'
import { Block } from '@/components/system/block'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useScrolled } from '@/hooks/use-scrolled'
import { capabilities } from '@/data/capabilities'
import { mainNav, siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

/** The mono breadcrumb that appears beside the logo once the page scrolls. */
function useSectionName(pathname: string): string {
  return React.useMemo(() => {
    if (pathname === '/') return 'Home'

    const capabilityMatch = pathname.match(/^\/capabilities\/(.+)$/)
    if (capabilityMatch) {
      const capability = capabilities.find((item) => item.slug === capabilityMatch[1])
      return capability ? capability.title : 'Capabilities'
    }

    const segment = pathname.split('/').filter(Boolean)[0] ?? ''
    const item = mainNav.find((entry) => entry.href === `/${segment}`)
    return item?.label ?? segment.replace(/-/g, ' ')
  }, [pathname])
}

/**
 * Logo left, links centred, a solid Block CTA right, full-bleed hairline
 * beneath. Transparent over the hero, switching to white past 80px of scroll —
 * at which point a mono breadcrumb fades in next to the logo.
 */
export function Navbar() {
  const pathname = usePathname()
  const scrolled = useScrolled(80)
  const hasFinePointer = useMediaQuery('(pointer: fine)')
  const [capabilitiesOpen, setCapabilitiesOpen] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const sectionName = useSectionName(pathname)

  const isHome = pathname === '/'
  const overHero = isHome && !scrolled
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    setMobileOpen(false)
    setCapabilitiesOpen(false)
  }, [pathname])

  React.useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  const openOnHover = () => {
    if (!hasFinePointer) return
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setCapabilitiesOpen(true)
  }

  const closeOnHover = () => {
    if (!hasFinePointer) return
    // Small grace period so the pointer can cross the gap to the panel.
    closeTimer.current = setTimeout(() => setCapabilitiesOpen(false), 120)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,height] duration-300 ease-brand',
        overHero ? 'border-transparent bg-transparent' : 'border-border bg-white',
      )}
    >
      <div
        className={cn(
          'container-px flex items-center justify-between gap-6 transition-[height] duration-300 ease-brand',
          scrolled ? 'h-[68px]' : 'h-[76px]',
        )}
      >
        <div className="flex min-w-0 shrink items-center gap-5">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center"
            aria-label={`${siteConfig.name} — home`}
          >
            <Logo height={scrolled ? 30 : 34} priority />
          </Link>

          {/* Breadcrumb — fades in on scroll, never moves. */}
          <span
            aria-hidden={!scrolled}
            className={cn(
              'micro hidden truncate text-muted transition-opacity duration-300 ease-brand lg:block',
              scrolled ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span className="text-brand">/</span> {sectionName}
          </span>
        </div>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav
              .filter((item) => item.label !== 'Contact')
              .map((item) =>
                item.children ? (
                  <li
                    key={item.href}
                    onPointerEnter={openOnHover}
                    onPointerLeave={closeOnHover}
                    className="relative"
                  >
                    <DropdownMenu
                      open={capabilitiesOpen}
                      onOpenChange={setCapabilitiesOpen}
                      modal={false}
                    >
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className={cn(
                            'group inline-flex h-11 items-center gap-1.5 px-4 font-sans text-[0.9375rem] font-medium',
                            'transition-colors duration-200 ease-brand',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                            'text-fg hover:text-brand',
                            isActive(item.href) && 'text-brand',
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className="size-4 transition-transform duration-200 ease-brand group-data-[state=open]:rotate-180"
                            aria-hidden="true"
                          />
                          <NavUnderline active={isActive(item.href)} />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="start"
                        onPointerEnter={openOnHover}
                        onPointerLeave={closeOnHover}
                      >
                        {item.children.map((child, index) => (
                          <DropdownMenuItem key={child.href} asChild>
                            <Link href={child.href}>
                              <span className="flex items-baseline gap-3">
                                <span className="micro text-brand" aria-hidden="true">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="font-display text-[0.9375rem] font-bold text-brand-dark">
                                  {child.label}
                                </span>
                              </span>
                              <span className="pl-9 text-small text-muted">
                                {child.description}
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex h-11 items-center px-4 font-sans text-[0.9375rem] font-medium',
                        'transition-colors duration-200 ease-brand',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                        'text-fg hover:text-brand',
                        isActive(item.href) && 'text-brand',
                      )}
                    >
                      {item.label}
                      <NavUnderline active={isActive(item.href)} />
                    </Link>
                  </li>
                ),
              )}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Block asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Let&rsquo;s Talk</Link>
          </Block>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className={cn(
                  'inline-flex size-11 items-center justify-center lg:hidden',
                  'transition-colors duration-200 ease-brand',
                  'text-brand-dark hover:bg-brand-tint',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
                )}
              >
                <Menu className="size-6" aria-hidden="true" />
              </button>
            </SheetTrigger>

            <SheetContent className="w-full sm:max-w-md">
              <SheetTitle className="sr-only">Site navigation</SheetTitle>

              <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-6">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="mb-10 inline-flex w-fit"
                    aria-label={`${siteConfig.name} — home`}
                  >
                    <Logo height={32} />
                  </Link>
                </SheetClose>

                <nav aria-label="Mobile" className="flex-1">
                  <ul className="border-t border-border">
                    {mainNav.map((item, index) => (
                      <li key={item.href} className="border-b border-border">
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            aria-current={isActive(item.href) ? 'page' : undefined}
                            className={cn(
                              'flex min-h-[60px] items-baseline gap-4 font-display text-h3',
                              'transition-colors duration-200 ease-brand hover:text-brand',
                              isActive(item.href) ? 'text-brand' : 'text-brand-dark',
                            )}
                          >
                            <span className="micro text-muted" aria-hidden="true">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            {item.label}
                          </Link>
                        </SheetClose>

                        {item.children ? (
                          <ul className="mb-4 ml-9 border-l border-border">
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <SheetClose asChild>
                                  <Link
                                    href={child.href}
                                    className={cn(
                                      'flex min-h-[44px] items-center pl-4 text-body',
                                      'transition-colors duration-200 ease-brand hover:text-brand',
                                      isActive(child.href) ? 'text-brand' : 'text-muted',
                                    )}
                                  >
                                    {child.label}
                                  </Link>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-10">
                  <SheetClose asChild>
                    <Block asChild size="lg" className="w-full">
                      <Link href="/contact">Let&rsquo;s Talk</Link>
                    </Block>
                  </SheetClose>
                  {/* The office phone number is not confirmed yet, so the menu
                      routes to /contact rather than showing a dead tel: link. */}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/** Amber underline marking the current route — one of accent's three uses. */
function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-4 bottom-1.5 h-[2px] origin-left bg-accent',
        'transition-transform duration-300 ease-brand',
        active ? 'scale-x-100' : 'scale-x-0',
      )}
    />
  )
}
