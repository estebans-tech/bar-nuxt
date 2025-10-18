<script setup lang="ts">
// Tiny badge for open/closed/soon – layout only, no logic
import { useOpenStatus } from '~/composables/useOpenStatus'
import type { HoursMap } from '~/types/visit'
import type { FormatStatus } from '~/types/open'

const props = withDefaults(defineProps<{
  hours: HoursMap
  tz?: string
  soonThresholdMin?: number
  refreshMs?: number
}>(), {
  soonThresholdMin: 60,
  refreshMs: 60000
})

const loading = ref(true)

// status will tick on client; on SSR we will not show it (placeholder instead)
const status: ComputedRef<FormatStatus> = useOpenStatus(props.hours, {
  tz: props.tz,
  soonThresholdMin: props.soonThresholdMin,
  refreshMs: props.refreshMs
})

onMounted(() => loading.value = false)
</script>

<template>
  <!-- SSR/first paint: stable placeholder so DOM matches server and client -->
  <span
    v-if="loading"
    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm bg-white/10 text-white/60"
  >
    <span class="w-2 h-2 rounded-full bg-white/40" />
    <span>Lädt…</span>
  </span>
  <div
    v-else
    role="status"
    aria-atomic="true"
    class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm"
    :class="{
      'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20': status.state === 'open',
      'bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/20': status.state === 'soon',
      'bg-white/10 text-white/70 ring-1 ring-white/15': status.state === 'closed'
    }"
  >
    <span class="inline-block w-2 h-2 rounded-full"
      :class="{
        'bg-emerald-400': status.state === 'open',
        'bg-amber-400': status.state === 'soon',
        'bg-white/50': status.state === 'closed'
      }"
    />
    <span class="whitespace-nowrap">{{ status.text }}</span>
  </div>
</template>
