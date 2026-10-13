'use client'

import { useEffect, useState } from 'react'

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } }

// Downloads the whole clip and returns an object URL. Scrubbing seeks constantly
// in both directions; from a blob every seek is local, so it never stalls on the
// network. Waits for window load so it doesn't compete with the poster, and
// skips the download entirely on data-saver connections.
export function useBlobVideo(src: string | null) {
  const [objectUrl, setObjectUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!src || (navigator as NavigatorWithConnection).connection?.saveData) return

    const controller = new AbortController()
    let created: string | null = null

    const load = () => {
      fetch(src, { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`Video request failed: ${response.status}`)
          return response.blob()
        })
        .then((blob) => {
          created = URL.createObjectURL(blob)
          setObjectUrl(created)
        })
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === 'AbortError')) console.warn(error)
        })
    }

    if (document.readyState === 'complete') load()
    else window.addEventListener('load', load, { once: true })

    return () => {
      window.removeEventListener('load', load)
      controller.abort()
      if (created) URL.revokeObjectURL(created)
      setObjectUrl(null)
    }
  }, [src])

  return objectUrl
}
