import Image from 'next/image'

import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

/** Intrinsic size of /public/logo.jpeg. Update both if the artwork changes. */
const LOGO_WIDTH = 860
const LOGO_HEIGHT = 160

type LogoProps = {
  /** Rendered height in px. The nav shrinks this from 34 → 30 on scroll. */
  height?: number
  /**
   * `raster` uses the supplied /public/logo.jpeg.
   * `vector` draws the PM mark and sets the wordmark in Archivo — no baked-in
   * background, so it sits cleanly on any surface.
   *
   * TODO: CLIENT — once a transparent SVG lockup is supplied, point `raster` at
   * it and the `vector` variant can be retired.
   */
  variant?: 'raster' | 'vector'
  priority?: boolean
  className?: string
}

export function Logo({ height = 40, variant = 'raster', priority = false, className }: LogoProps) {
  if (variant === 'vector') return <VectorLockup height={height} className={className} />

  const width = Math.round((height * LOGO_WIDTH) / LOGO_HEIGHT)

  return (
    <span className={cn('inline-flex', className)}>
      <Image
        src="/logo.jpeg"
        alt={`${siteConfig.name} logo`}
        width={width}
        height={height}
        priority={priority}
        className="object-contain transition-[height] duration-300 ease-brand"
        // Height drives the size and width follows the intrinsic ratio. Both are
        // set inline: `h-full`-style classes here would leave next/image warning
        // that one dimension is CSS-modified and the other is not.
        style={{ height, width: 'auto' }}
      />
    </span>
  )
}

/**
 * Mark + wordmark, drawn rather than loaded.
 *
 * The supplied artwork is a JPEG with white baked in, which reads as a pale box
 * on the `--base` footer. This draws the same lockup with no background at all.
 */
function VectorLockup({ height, className }: { height: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 112 112"
        role="img"
        aria-label={`${siteConfig.name} logo`}
        className="shrink-0 text-brand"
        style={{ height, width: height }}
        fill="currentColor"
      >
        <rect width="112" height="112" />
        <path
          d="M26 28h24a17 17 0 0 1 0 34H37v22H26z M37 39v12h13a6 6 0 0 0 0-12z"
          fill="#FFFFFF"
          fillRule="evenodd"
        />
        <path d="M68 84V28h11l10 20 10-20h11v56H99V51l-10 19-10-19v33z" fill="#FFFFFF" />
      </svg>

      <span
        aria-hidden="true"
        className="font-display font-bold leading-none text-brand-dark"
        style={{ fontSize: height * 0.62, letterSpacing: '-0.01em' }}
      >
        Parklane <span className="text-brand">Media</span>
      </span>
    </span>
  )
}
