'use client'

// A native <details> disclosure; the only script is closing it once a link is picked.
export function MobileMenu({ links }: { links: { label: string; href: string }[] }) {
  return (
    <details
      className="relative hidden tablet:block"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest('a')) event.currentTarget.open = false
      }}
    >
      <summary className="cursor-pointer list-none p-[.8rem] text-[.85rem] [&::-webkit-details-marker]:hidden" aria-label="Open navigation">
        Menu
      </summary>
      <nav className="absolute right-0 top-12 grid w-56 rounded-2xl border border-line bg-navy p-2" aria-label="Mobile navigation">
        {links.map((link) => (
          <a key={link.href} className="p-4" href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </details>
  )
}
