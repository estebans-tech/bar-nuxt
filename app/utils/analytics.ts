// Lightweight analytics dispatcher with swappable provider
// Usage: import { track, setAnalyticsProvider } from '~/utils/analytics'

import type { AnalyticsPayload, AnalyticsProvider } from '~/types/analytics'

/**
 * Default provider logs to console in development
 * Replace with your real provider (e.g. GTM, Plausible) via setAnalyticsProvider
 */
const createConsoleProvider = (): AnalyticsProvider => ({
  track: (event, payload) => {
    if (!import.meta.client) return
    if (process.env.NODE_ENV !== 'production') {
      // keep logging minimal but structured
      // eslint-disable-next-line no-console
      console.debug('[analytics]', event, payload || {})
    }
  }
})

let provider: AnalyticsProvider = createConsoleProvider()

/**
 * Swap the analytics provider at runtime (e.g. in a plugin)
 * Example:
 *  setAnalyticsProvider({
 *    track: (e, p) => window.dataLayer?.push({ event: e, ...p })
 *  })
 */
export const setAnalyticsProvider = (next: AnalyticsProvider) => {
  provider = next
}

/**
 * Track a named event with optional payload
 * Safe on SSR and does nothing if no client
 */
export const track = (event: string, payload?: AnalyticsPayload) => {
  if (!import.meta.client) return
  try {
    provider.track(event, payload)
  } catch {
    // never throw from analytics
  }
}

/**
 * Small helpers for common patterns
 */
export const trackView = (name: string, payload?: AnalyticsPayload) =>
  track(`${name}_view`, payload)

export const trackClick = (name: string, payload?: AnalyticsPayload) =>
  track(`${name}_click`, payload)

export const trackError = (name: string, payload?: AnalyticsPayload) =>
  track(`${name}_error`, payload)
