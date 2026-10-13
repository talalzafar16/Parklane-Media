import type { IconName } from '@/lib/icons'

import { Icon } from './icon'
import { Panel } from './panel'

type IndexCardProps = {
  index: string
  icon: IconName
  title: string
  description: string
  tone?: 'surface' | 'canvas'
}

export function IndexCard({ index, icon, title, description, tone = 'surface' }: IndexCardProps) {
  return (
    <Panel tone={tone} className="flex h-full flex-col p-8">
      <div className="flex items-center justify-between text-signal-bright">
        <span className="label">{index}</span>
        <Icon name={icon} className="size-6" />
      </div>
      <h3 className="mt-10 text-title font-medium">{title}</h3>
      <p className="mt-3 text-muted">{description}</p>
    </Panel>
  )
}
