import { getImageProps } from 'next/image'

import type { Film } from '@/data/home'
import { cn } from '@/lib/utils'

// Small screens and touch devices get the 720p encode. Shared with ScrollFilm.
export const COMPACT_MEDIA = '(max-width: 860px), (hover: none) and (pointer: coarse)'

// The clip's first frame, art-directed per encode. It's the LCP image and what
// reduced-motion visitors see instead of the video.
export function FilmPoster({ film, hidden }: { film: Film; hidden: boolean }) {
  const common = { alt: '', sizes: '100vw', priority: true, quality: 78 }
  const compact = getImageProps({ ...common, src: film.mobile.poster, width: film.mobile.width, height: film.mobile.height })
  const wide = getImageProps({ ...common, src: film.desktop.poster, width: film.desktop.width, height: film.desktop.height })
  const { srcSet, ...imgProps } = wide.props

  return (
    <picture>
      <source media={COMPACT_MEDIA} srcSet={compact.props.srcSet} sizes="100vw" />
      <source srcSet={srcSet} sizes="100vw" />
      {/* eslint-disable-next-line @next/next/no-img-element -- art direction via getImageProps */}
      <img
        {...imgProps}
        alt=""
        className={cn('absolute inset-0 h-full w-full object-cover transition-opacity duration-500', hidden && 'opacity-0')}
      />
    </picture>
  )
}
