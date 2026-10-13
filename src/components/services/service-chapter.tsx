import type { ComponentType } from 'react'

import type { Service, ServiceLayout } from '@/data/services'

import { BroadcastChapter } from './chapters/broadcast-chapter'
import { ContentChapter } from './chapters/content-chapter'
import { EventsChapter } from './chapters/events-chapter'
import { MediaChapter } from './chapters/media-chapter'
import { RightsChapter } from './chapters/rights-chapter'

// Keyed by `layout` in data/services.ts. The Record type makes a missing layout a type error.
const chapters: Record<ServiceLayout, ComponentType<{ service: Service }>> = {
  media: MediaChapter,
  rights: RightsChapter,
  content: ContentChapter,
  events: EventsChapter,
  broadcast: BroadcastChapter,
}

export function ServiceChapter({ service }: { service: Service }) {
  const Chapter = chapters[service.layout]
  return <Chapter service={service} />
}
