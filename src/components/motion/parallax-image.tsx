'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

import { useMotionProfile } from '@/hooks/use-motion-profile'
import { cn } from '@/lib/utils'

const TRAVEL = 12 // % of the frame

type ParallaxImageProps = {
  src: string
  alt: string
  sizes: string
  className?: string
  imageClassName?: string
  priority?: boolean
}

// The image layer is oversized by TRAVEL% so it never shows an edge while moving.
export function ParallaxImage({ src, alt, sizes, className, imageClassName, priority = false }: ParallaxImageProps) {
  const { fullMotion } = useMotionProfile()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${TRAVEL / 2}%`, `${TRAVEL / 2}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="absolute inset-x-0"
        style={fullMotion ? { y, top: `-${TRAVEL / 2}%`, height: `${100 + TRAVEL}%` } : { top: 0, height: '100%' }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn('object-cover', imageClassName)} />
      </motion.div>
    </div>
  )
}
