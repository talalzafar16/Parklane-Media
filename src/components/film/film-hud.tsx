'use client'

import { motion, useTransform, type MotionValue } from 'framer-motion'

import { RecDot } from '@/components/broadcast/rec-dot'
import { TickRuler } from '@/components/broadcast/tick-ruler'
import type { Film } from '@/data/home'
import { padIndex } from '@/lib/utils'

function timecode(seconds: number, fps: number) {
  const frames = Math.round(seconds * fps)
  const secs = Math.floor(frames / fps)
  return [Math.floor(secs / 3600), Math.floor(secs / 60) % 60, secs % 60, frames % fps].map(padIndex).join(':')
}

// Monitor overlay bound to scroll progress via motion values — no React re-renders.
export function FilmHud({ film, progress }: { film: Film; progress: MotionValue<number> }) {
  const count = film.chapters.length
  const chapterAt = (value: number) => Math.min(count - 1, Math.floor(value * count))

  const time = useTransform(progress, (value) => timecode(value * film.duration, film.fps))
  const chapter = useTransform(
    progress,
    (value) => `CH ${padIndex(chapterAt(value) + 1)}/${padIndex(count)} · ${film.chapters[chapterAt(value)]}`,
  )
  // Out of the way once the proof cards take over.
  const opacity = useTransform(progress, [0, 0.62, 0.74], [1, 1, 0])

  return (
    <motion.div aria-hidden="true" style={{ opacity }} className="pointer-events-none absolute inset-0 z-[2]">
      <div className="absolute bottom-10 right-gutter hidden w-64 md:block">
        <div className="label flex items-center justify-between text-ink">
          <span className="flex items-center gap-2">
            <RecDot />
            Rec
          </span>
          <motion.span className="tabular-nums text-signal-bright">{time}</motion.span>
        </div>
        <div className="mt-3 h-px bg-line-strong">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-signal-bright" />
        </div>
        <motion.p className="label mt-3 text-muted">{chapter}</motion.p>
      </div>

      <div className="absolute bottom-[18%] right-6 top-[18%] hidden lg:block">
        <TickRuler vertical ticks={31} className="text-muted/40" />
      </div>
    </motion.div>
  )
}
