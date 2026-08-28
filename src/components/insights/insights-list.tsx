'use client'

import * as React from 'react'

import { EmptyState } from '@/components/shared/empty-state'
import { insightTopics, posts } from '@/data/insights'
import { cn } from '@/lib/utils'

/**
 * Insights index.
 *
 * Nothing is published yet, so the topic chips render as a preview of the
 * taxonomy (visibly inert, and marked as such for assistive tech) above the
 * designed empty state. Once `posts` has entries the chips become live filters
 * and the grid takes over.
 */
export function InsightsList() {
  const [active, setActive] = React.useState<string>('all')
  const isEmpty = posts.length === 0

  const visible = React.useMemo(
    () => (active === 'all' ? posts : posts.filter((post) => post.topic === active)),
    [active],
  )

  return (
    <>
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter insights by topic"
      >
        <TopicChip
          label="All Topics"
          active={active === 'all'}
          disabled={isEmpty}
          onClick={() => setActive('all')}
        />
        {insightTopics.map((topic) => (
          <TopicChip
            key={topic}
            label={topic}
            active={active === topic}
            disabled={isEmpty}
            onClick={() => setActive(topic)}
          />
        ))}
      </div>

      {isEmpty ? (
        <div className="mt-16">
          <EmptyState
            eyebrow="Insights"
            title="Publishing Soon"
            description="We are putting together perspectives on media, content and advertising — from platform shifts and audience behaviour to what is actually working commercially."
            note="The topics above are what we will be writing about."
            ctaLabel="Talk to us instead"
            ctaHref="/contact"
          />
        </div>
      ) : (
        <>
          <p className="sr-only" aria-live="polite">
            {`Showing ${visible.length} ${visible.length === 1 ? 'article' : 'articles'}`}
          </p>

          <ul className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {visible.map((post) => (
              <li key={post.slug} className="h-full">
                <article className="flex h-full flex-col border border-border bg-white p-8">
                  <p className="micro text-brand">{post.topic}</p>
                  <h3 className="mt-4 text-h3">{post.title}</h3>
                  <p className="mt-3 flex-1 text-body text-muted">{post.excerpt}</p>
                  <p className="mt-6 text-small text-muted">
                    {post.author} · {post.readingTime}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

function TopicChip({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string
  active: boolean
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={disabled ? undefined : active}
      className={cn(
        'inline-flex min-h-[44px] items-center border px-5 font-display text-[0.9375rem] font-bold',
        'transition-colors duration-200 ease-brand',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
        active && !disabled
          ? 'border-accent bg-accent text-brand-dark'
          : 'border-border bg-white text-muted',
        disabled ? 'cursor-default opacity-70' : 'hover:border-brand hover:text-brand',
      )}
    >
      {label}
    </button>
  )
}
