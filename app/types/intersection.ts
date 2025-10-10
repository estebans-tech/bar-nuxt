// Public types for intersection helpers
// Keep types in /app/types to avoid mixing with component files

export type IntersectCallback = (entry: IntersectionObserverEntry) => void

export interface IntersectOptions {
  /**
   * Root element used for intersection calculation.
   * Defaults to the viewport when null.
   */
  root?: Element | Document | null
  /**
   * Margin around the root. Typical syntax: '0px 0px -25% 0px'
   */
  rootMargin?: string
  /**
   * One or multiple thresholds at which the observer callback fires.
   * 0..1 where 1 means fully visible.
   */
  threshold?: number | number[]
  /**
   * If true, the observer disconnects after the first intersect event.
   * Useful for "view" analytics or lazy one-shot effects.
   */
  once?: boolean
}
