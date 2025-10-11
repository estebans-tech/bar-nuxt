<script setup lang="ts">
// Simple week list with current day highlight

import type { HoursMap, Weekday } from '~/types/visit'

const props = defineProps<{ hours: HoursMap }>()

const DAYS: { key: Weekday, label: string }[] = [
  { key: 'mon', label: 'Mo' },
  { key: 'tue', label: 'Di' },
  { key: 'wed', label: 'Mi' },
  { key: 'thu', label: 'Do' },
  { key: 'fri', label: 'Fr' },
  { key: 'sat', label: 'Sa' },
  { key: 'sun', label: 'So' }
]

// map JS day (0=Sun) to our keys
const todayKey = computed<Weekday>(() => {
  const d = new Date().getDay()
  return ['sun','mon','tue','wed','thu','fri','sat'][d] as Weekday
})
</script>

<template>
  <ul class="divide-y divide-white/5">
    <li
      v-for="d in DAYS"
      :key="d.key"
      class="flex items-center justify-between py-2"
      :aria-current="d.key === todayKey ? 'date' : undefined"
    >
      <span
        class="text-white/80"
        :class="d.key === todayKey ? 'font-medium text-white' : ''"
      >{{ d.label }}</span>
      <span class="text-white/70">{{ hours[d.key] || '—' }}</span>
    </li>
  </ul>
</template>
