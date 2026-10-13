import type { LucideProps } from 'lucide-react'

import { icons, type IconName } from '@/lib/icons'

export function Icon({ name, strokeWidth = 1.5, ...props }: LucideProps & { name: IconName }) {
  const Component = icons[name]
  return <Component aria-hidden="true" strokeWidth={strokeWidth} {...props} />
}
