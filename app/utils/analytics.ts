// Minimal analytics stub you can swap for your provider later
export const track = (name: string, payload?: Record<string, unknown>) => {
  if (!import.meta.client) return
  console.debug('[analytics]', name, payload || {})

}
