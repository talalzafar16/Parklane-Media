'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

import { useMotionProfile } from '@/hooks/use-motion-profile'
import { cn } from '@/lib/utils'

type ParallaxImageProps = {
  src: string
  alt: string
  sizes: string
  className?: string
  imageClassName?: string
  priority?: boolean
  /** Total vertical travel as a % of the frame. Capped at 15 per the brand spec. */
  amount?: number
}

/**
 * Case-study cover with a restrained scroll parallax.
 *
 * The inner layer is oversized by exactly `amount`% and offset by half of it,
 * so the image can travel the full range without ever exposing a bare edge.
 * Desktop only — mobile and reduced motion get a plain, static image.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority = false,
  amount = 12,
}: ParallaxImageProps) {
  const { allowParallax } = useMotionProfile()
  const ref = React.useRef<HTMLDivElement>(null)

  const travel = Math.min(amount, 15)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel / 2}%`, `${travel / 2}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {allowParallax ? (
        <motion.div
          className="absolute inset-x-0"
          style={{ y, top: `-${travel / 2}%`, height: `${100 + travel}%` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            loading={priority ? undefined : 'lazy'}
            className={cn('object-cover', imageClassName)}
          />
        </motion.div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={cn('object-cover', imageClassName)}
        />
      )}
    </div>
  )
}
