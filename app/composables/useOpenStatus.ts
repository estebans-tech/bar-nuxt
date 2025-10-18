// Reactive open status that refreshes on an interval
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { HoursMap } from '~/types/visit'
import type { UseOpenStatusOpts } from '~/types/open'
import { formatStatusDE } from '~/utils/hours'

export const useOpenStatus = (hours: HoursMap, opts: UseOpenStatusOpts = {}) => {
  const tz = opts.tz
  const soonThresholdMin = opts.soonThresholdMin ?? 60
  const refreshMs = opts.refreshMs ?? 60_000

  const now = ref(new Date())
  let timer: any

  const status = computed(() => formatStatusDE(hours, now.value, tz, soonThresholdMin))

  onMounted(() => {
    timer = setInterval(() => { now.value = new Date() }, refreshMs)
  })

  onBeforeUnmount(() => {
    if (timer) clearInterval(timer)
  })

  return status
}
