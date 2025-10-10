// Lightweight, framework-agnostic utilities around IntersectionObserver
// Usage: import { observe, observeOnce, isIntersectionSupported } from '~/utils/intersection'

import type { IntersectCallback, IntersectOptions } from '~/types/intersection'

/**
 * Feature-detect IntersectionObserver on the client
 * Never touches window on the server
 */
export const isIntersectionSupported = () =>
  import.meta.client && typeof window.IntersectionObserver !== 'undefined'

/**
 * Observe a single element for visibility changes.
 * Returns a stop() function to disconnect the observer.
 *
 * - el: element to observe
 * - onEnter: called when element intersects the root
 * - onLeave: called when element leaves the root (optional)
 * - opts: IntersectionObserver options + 'once'
 */
export const observe = (
  el: Element | null | undefined,
  onEnter: IntersectCallback,
  onLeave?: IntersectCallback,
  opts: IntersectOptions = {}
) => {
  // Guard: only run on client, with a real element and supported API
  if (!import.meta.client || !el || !isIntersectionSupported()) return () => {}

  const { root = null, rootMargin = '0px', threshold = 0, once = false } = opts

  const io = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onEnter(entry)
          if (once) {
            io.disconnect()
            return
          }
        } else if (onLeave) {
          onLeave(entry)
        }
      }
    },
    { root, rootMargin, threshold }
  )

  io.observe(el)

  // Expose manual cleanup to callers
  return () => io.disconnect()
}

/**
 * Convenience wrapper for one-shot observations.
 * Disconnects automatically after the first intersect event.
 */
export const observeOnce = (
  el: Element | null | undefined,
  onEnter: IntersectCallback,
  opts: Omit<IntersectOptions, 'once'> = {}
) => observe(el, onEnter, undefined, { ...opts, once: true })
