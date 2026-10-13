'use client'

import * as React from 'react'
import { useScroll, useSpring } from 'framer-motion'

import type { Film } from '@/data/home'
import { useBlobVideo } from '@/hooks/use-blob-video'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useMotionProfile } from '@/hooks/use-motion-profile'
import { useVideoScrub } from '@/hooks/use-video-scrub'

import { FilmHud } from './film-hud'
import { COMPACT_MEDIA, FilmPoster } from './film-poster'

// One film scrubbed by scroll behind its chapters. The stage is sticky for the
// whole wrapper and the chapters are pulled up over it by one viewport, so the
// clip reaches its last frame as the last chapter ends, then the block scrolls
// away normally. Reduced motion never loads the video and keeps the poster.
export function ScrollFilm({ film, children }: { film: Film; children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const { reduced } = useMotionProfile()
  const compact = useMediaQuery(COMPACT_MEDIA)
  const videoUrl = useBlobVideo(reduced ? null : (compact ? film.mobile : film.desktop).src)

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.35, restDelta: 0.0005 })
  const painted = useVideoScrub(videoRef, progress, { enabled: Boolean(videoUrl), primeOnTouch: compact })

  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-canvas">
        <FilmPoster film={film} hidden={painted} />

        {videoUrl ? (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        <div aria-hidden="true" className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-r from-canvas/80 via-canvas/30 to-transparent max-md:from-canvas/40" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-canvas/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-canvas to-transparent max-md:h-2/3" />
        </div>

        <FilmHud film={film} progress={progress} />
      </div>

      <div className="relative z-10 -mt-[100svh]">{children}</div>
    </div>
  )
}
