import type { MetadataRoute } from 'next'

import { capabilities } from '@/data/capabilities'
import { siteConfig } from '@/data/site'
import { posts } from '@/data/insights'
import { projects } from '@/data/work'

/**
 * Generated from the same data files that build the pages, so a new capability,
 * project or article appears in the sitemap the moment it is added — nothing to
 * remember to update by hand. `projects` and `posts` are currently empty, which
 * simply means no entries are emitted for them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes = [
    { path: '/', priority: 1, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'yearly' as const },
    { path: '/capabilities', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/work', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/insights', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
  ]

  return [
    ...staticRoutes.map((route) => ({
      url: route.path === '/' ? siteConfig.url : `${siteConfig.url}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...capabilities.map((capability) => ({
      url: `${siteConfig.url}/capabilities/${capability.slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
