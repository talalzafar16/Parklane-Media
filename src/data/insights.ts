/**
 * Insights articles.
 *
 * Nothing has been published yet, so this array is empty and /insights renders
 * a designed empty state. The topic taxonomy below is live: it drives the
 * filter chips now, and will filter real posts the moment any are added.
 */

export const insightTopics = [
  'Media Trends',
  'Advertising',
  'Digital Media',
  'Sports Media',
  'Entertainment',
  'OTT & Streaming',
  'Content',
  'Marketing',
  'Brand Strategy',
  'AI & Emerging Media',
] as const

export type InsightTopic = (typeof insightTopics)[number]

export type Post = {
  /** URL segment — becomes /insights/<slug> once detail pages are added. */
  slug: string
  title: string
  /** One or two sentences for the card. */
  excerpt: string
  topic: InsightTopic
  /** ISO date, e.g. '2026-03-14'. */
  date: string
  author: string
  readingTime: string
  coverImage?: string
}

export const posts: Post[] = [
  // Add published articles here. Shape reference — uncomment and edit:
  //
  // {
  //   slug: 'example-article',
  //   title: 'Article headline',
  //   excerpt: 'One or two sentences summarising the piece.',
  //   topic: 'Media Trends',
  //   date: '2026-03-14',
  //   author: 'Author name',
  //   readingTime: '5 min read',
  //   coverImage: '/images/insights/example-article.webp',
  // },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
