import Image from 'next/image'

import { partners } from '@/data/partners'

/**
 * Infinite partner logo marquee.
 *
 * Renders nothing while `partners` is empty — which is the current state — so
 * the homepage never shows an empty rail. Adding entries to data/partners.ts is
 * all it takes to bring this back; no code change required.
 *
 * The list is rendered twice inside a track that translates -50% for a seamless
 * loop. Only the first copy is exposed to assistive tech. The track pauses on
 * hover or keyboard focus, and runs slower on small screens.
 */
export function PartnerMarquee() {
  if (partners.length === 0) return null

  return (
    /* No edge fades: gradients are out of the system, so the rail hard-cuts
       against the hairline instead. */
    <div className="relative mt-16 border-y border-border py-6">
      <div className="overflow-hidden [--ticker-duration:56s] md:[--ticker-duration:40s]">
        <ul className="marquee-track flex w-max animate-ticker items-center motion-reduce:animate-none">
          {partners.map((partner) => (
            <MarqueeItem key={partner.id} name={partner.name} logo={partner.logo} />
          ))}
          {partners.map((partner) => (
            <MarqueeItem
              key={`${partner.id}-duplicate`}
              name={partner.name}
              logo={partner.logo}
              muted
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

function MarqueeItem({
  name,
  logo,
  muted = false,
}: {
  name: string
  logo: string
  muted?: boolean
}) {
  return (
    <li
      className="flex h-10 shrink-0 items-center px-8 sm:px-12"
      aria-hidden={muted ? 'true' : undefined}
    >
      <span className="relative block h-8 w-32 grayscale opacity-60 transition duration-300 ease-brand hover:grayscale-0 hover:opacity-100">
        <Image
          src={logo}
          alt={muted ? '' : name}
          fill
          loading="lazy"
          sizes="128px"
          className="object-contain object-left"
        />
      </span>
    </li>
  )
}
