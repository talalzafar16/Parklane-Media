import type { MetadataRoute } from 'next'

import { getServiceHref, services } from '@/data/services'
import { siteConfig } from '@/data/site'
import { projects } from '@/data/work'

type Entry = MetadataRoute.Sitemap[number]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const entry = (path: string, priority: number, changeFrequency: Entry['changeFrequency']): Entry => ({
    url: path === '/' ? siteConfig.url : `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  })

  return [
    entry('/', 1, 'monthly'),
    entry('/services', 0.9, 'monthly'),
    entry('/about', 0.8, 'yearly'),
    entry('/work', 0.8, 'monthly'),
    entry('/contact', 0.7, 'yearly'),
    ...services.map((service) => entry(getServiceHref(service), 0.8, 'monthly')),
    ...projects.map((project) => entry(`/work/${project.slug}`, 0.7, 'yearly')),
  ]
}
