'use client'

import { useRef, type ReactNode } from 'react'
import { getImageProps } from 'next/image'
import { motion, useScroll, useSpring } from 'framer-motion'

import type { HeroFilm } from '@/data/home'
import { useBlobVideo } from '@/hooks/use-blob-video'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useVideoScrub } from '@/hooks/use-video-scrub'

// Small screens and touch devices get the lighter 720p encode and its poster.
const COMPACT_MEDIA = '(max-width: 860px), (hover: none) and (pointer: coarse)'

const mediaClasses = 'absolute inset-0 h-full w-full object-cover object-center compact:object-[50%_42%]'

// A sticky stage plays one clip as the visitor scrolls through `film.scrollLength`
// viewports; the chapters scroll over it. Reduced motion keeps the poster only.
export function ScrollFilm({ film, children }: { film: HeroFilm; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const reduced = useReducedMotion()
  const compact = useMediaQuery(COMPACT_MEDIA)
  const videoUrl = useBlobVideo(reduced ? null : (compact ? film.mobile : film.desktop).src)

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end start'] })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35, restDelta: 0.0005 })
  const painted = useVideoScrub(videoRef, smoothProgress, { enabled: Boolean(videoUrl), primeOnTouch: compact })

  return (
    <div className="relative isolate bg-navy">
      <div
        ref={trackRef}
        className="pointer-events-none invisible absolute left-0 top-0 w-px"
        style={{ height: `${film.scrollLength * 100}dvh` }}
      />

      <div className="sticky top-0 z-0 h-dvh overflow-hidden bg-navy after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:bg-stage-fade mobile:after:bg-stage-fade-mobile">
        <Poster film={film} hidden={painted} />
        {videoUrl ? (
          <video ref={videoRef} className={`${mediaClasses} z-[1]`} src={videoUrl} muted playsInline preload="auto" aria-hidden="true" />
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-0.5 bg-ink/[.14]" aria-hidden="true">
          <motion.div className="h-full origin-left bg-accent" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>

      <div className="relative z-[3] -mt-[100dvh]">{children}</div>
    </div>
  )
}

// The clip's first frame, art-directed per encode. Doubles as the LCP image.
function Poster({ film, hidden }: { film: HeroFilm; hidden: boolean }) {
  const common = { alt: '', sizes: '100vw', priority: true }
  const compact = getImageProps({ ...common, src: film.mobile.poster, width: film.mobile.width, height: film.mobile.height })
  const { srcSet, ...wide } = getImageProps({
    ...common,
    src: film.desktop.poster,
    width: film.desktop.width,
    height: film.desktop.height,
  }).props

  return (
    <picture>
      <source media={COMPACT_MEDIA} srcSet={compact.props.srcSet} sizes="100vw" />
      <source srcSet={srcSet} sizes="100vw" />
      {/* eslint-disable-next-line @next/next/no-img-element -- art direction via getImageProps */}
      <img {...wide} alt="" className={hidden ? `${mediaClasses} invisible` : mediaClasses} />
    </picture>
  )
}
