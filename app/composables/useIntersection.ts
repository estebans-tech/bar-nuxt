// Vue-friendly wrapper around the intersection utils
// Works with template refs, auto-cleans on unmount, and supports "once" mode

import type { IntersectCallback, IntersectOptions } from '~/types/intersection'
import { isIntersectionSupported, observe, observeOnce } from '~/utils/intersection'

export const useIntersection = (options: IntersectOptions = {}) => {
  // Bind this to your element via ref="target"
  const target = ref<Element | null>(null)

  // Keep a reference to the current stop() cleaner
  let stop: (() => void) | null = null

  /**
   * Start observing using a persistent observer.
   * Provide onEnter and optionally onLeave callbacks.
   */
  const start = (onEnter: IntersectCallback, onLeave?: IntersectCallback) => {
    if (!import.meta.client || !target.value) return
    // Disconnect previous observer if any to avoid leaks
    if (stop) stop()
    stop = observe(target.value, onEnter, onLeave, options)
  }

  /**
   * Start a one-shot observation that auto-disconnects
   * after the first intersect event.
   */
  const startOnce = (onEnter: IntersectCallback) => {
    if (!import.meta.client || !target.value) return
    if (stop) stop()
    stop = observeOnce(target.value, onEnter, options)
  }

  // Ensure cleanup when the component is destroyed
  onBeforeUnmount(() => {
    if (stop) stop()
  })

  return {
    target,                                // template ref
    start,                                  // persistent observation
    startOnce,                              // one-shot observation
    supported: computed(() => isIntersectionSupported()) // feature flag
  }
}
