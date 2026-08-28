import {
  Clapperboard,
  Globe,
  Megaphone,
  Sparkles,
  Target,
  Trophy,
  type LucideIcon,
} from 'lucide-react'

import type { CapabilityIcon as CapabilityIconName } from '@/data/capabilities'
import { cn } from '@/lib/utils'

const icons: Record<CapabilityIconName, LucideIcon> = {
  clapperboard: Clapperboard,
  megaphone: Megaphone,
  target: Target,
  globe: Globe,
  trophy: Trophy,
  sparkles: Sparkles,
}

export function CapabilityIcon({
  name,
  className,
}: {
  name: CapabilityIconName
  className?: string
}) {
  const Icon = icons[name]
  return <Icon className={cn('size-6', className)} aria-hidden="true" />
}
