'use client'

import * as React from 'react'
import { useInView } from 'framer-motion'

import { cn } from '@/lib/utils'

const CX = 160
const CY = 190

// Degrees, 0° = right, 90° = up.
function polar(radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180
  return { x: CX + radius * Math.cos(radians), y: CY - radius * Math.sin(radians) }
}

function arc(radius: number, from: number, to: number) {
  const start = polar(radius, from)
  const end = polar(radius, to)
  const large = Math.abs(from - to) > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`
}

const SCALE = [
  { angle: 180, label: '−20' },
  { angle: 135, label: '−10' },
  { angle: 90, label: '0' },
  { angle: 45, label: '+10' },
  { angle: 0, label: '+20' },
]

const TICKS = Array.from({ length: 31 }, (_, index) => 180 - index * 6)

// The needle sweeps to lock when the dial scrolls into view. It's a CSS
// transition, so reduced motion just parks it at the final angle.
export function SignalGauge({ className }: { className?: string }) {
  const ref = React.useRef<SVGSVGElement>(null)
  const locked = useInView(ref, { once: true, amount: 0.6 })

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 200"
      aria-hidden="true"
      className={cn('w-full text-signal-bright', className)}
      fill="none"
    >
      <path d={arc(170, 180, 0)} stroke="currentColor" strokeOpacity="0.25" />
      <path
        d={arc(170, 62, 34)}
        stroke="currentColor"
        strokeWidth="5"
        className="transition-opacity delay-700 duration-700"
        style={{ opacity: locked ? 1 : 0 }}
      />
      <path d={arc(128, 180, 0)} stroke="currentColor" strokeOpacity="0.35" />
      <path d={arc(84, 180, 0)} stroke="currentColor" strokeOpacity="0.2" strokeDasharray="2 5" />

      {TICKS.map((angle, index) => {
        const major = index % 5 === 0
        const outer = polar(128, angle)
        const inner = polar(major ? 116 : 122, angle)
        return (
          <line
            key={angle}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke="currentColor"
            strokeOpacity={major ? 0.8 : 0.35}
          />
        )
      })}

      {SCALE.map(({ angle, label }) => {
        const point = polar(146, angle)
        return (
          <text
            key={label}
            x={point.x}
            y={point.y + 4}
            textAnchor="middle"
            className="fill-muted font-mono text-[11px]"
          >
            {label}
          </text>
        )
      })}

      <text x={CX} y={CY - 44} textAnchor="middle" className="fill-muted font-mono text-[9px] tracking-[0.18em]">
        SIGNAL
      </text>
      <text x={CX} y={CY - 32} textAnchor="middle" className="fill-muted font-mono text-[9px] tracking-[0.18em]">
        QUALITY
      </text>

      <g
        className="transition-transform [transition-duration:1600ms] ease-brand"
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: `rotate(${locked ? -48 : -178}deg)`,
        }}
      >
        <line x1={CX} y1={CY} x2={CX + 176} y2={CY} stroke="currentColor" strokeWidth="1.5" />
      </g>
      <circle cx={CX} cy={CY} r="5" fill="currentColor" />
    </svg>
  )
}
