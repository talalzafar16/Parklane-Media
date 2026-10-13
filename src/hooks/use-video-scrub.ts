'use client'

import { useEffect, useState, type RefObject } from 'react'
import type { MotionValue } from 'framer-motion'

// Maps a 0–1 progress value onto video.currentTime. While the decoder is busy
// only the latest target is kept, so fast scrolling never queues up seeks.
// Returns true once a frame has painted (the cue to hide the poster).
export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement>,
  progress: MotionValue<number>,
  { enabled, primeOnTouch }: { enabled: boolean; primeOnTouch: boolean },
) {
  const [painted, setPainted] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!enabled || !video) return

    video.muted = true
    let pending: number | null = null

    const timeAt = (value: number) => Math.min(Math.max(value, 0), 0.999) * (video.duration || 0)

    const seek = (value: number) => {
      if (!video.duration) return
      const time = timeAt(value)
      if (video.seeking) pending = time
      else if (Math.abs(video.currentTime - time) > 0.01) video.currentTime = time
    }

    const onSeeked = () => {
      setPainted(true)
      if (pending !== null) {
        video.currentTime = pending
        pending = null
      }
    }

    // 0.001 rather than 0 so a seeked event fires even at the very start.
    const onReady = () => {
      video.currentTime = timeAt(progress.get()) || 0.001
    }

    // iOS only paints seeked frames after a play() from a user gesture.
    const prime = () => {
      video
        .play()
        .then(() => video.pause())
        .catch(() => {})
    }

    video.addEventListener('loadeddata', onReady)
    video.addEventListener('seeked', onSeeked)
    const unsubscribe = progress.on('change', seek)
    if (video.readyState >= 2) onReady()
    if (primeOnTouch) window.addEventListener('touchstart', prime, { once: true, passive: true })

    return () => {
      unsubscribe()
      video.removeEventListener('loadeddata', onReady)
      video.removeEventListener('seeked', onSeeked)
      window.removeEventListener('touchstart', prime)
      setPainted(false)
    }
  }, [enabled, primeOnTouch, progress, videoRef])

  return painted
}
