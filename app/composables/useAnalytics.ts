// Vue-friendly helper that exposes track functions to templates and scripts
import type { AnalyticsPayload, AnalyticsProvider } from '~/types/analytics'
import { track, trackClick, trackView, trackError, setAnalyticsProvider } from '~/utils/analytics'

export const useAnalytics = () => {
  /**
   * Sugar for click handlers in templates:
   * <button @click="click('hero_call')">...</button>
   */
  const click = (name: string, payload?: AnalyticsPayload) => trackClick(name, payload)

  /**
   * Expose provider swap in case you install it from a component-level plugin
   */
  const setProvider = (p: AnalyticsProvider) => setAnalyticsProvider(p)

  return {
    track,
    view: trackView,
    click,
    error: trackError,
    setProvider
  }
}
