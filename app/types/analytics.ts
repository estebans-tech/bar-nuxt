// Public types for the analytics utilities

export type AnalyticsPayload = Record<string, unknown>

export interface AnalyticsProvider {
  /**
   * Send a tracking event to the underlying provider
   */
  track: (event: string, payload?: AnalyticsPayload) => void
}
