<script setup lang="ts">
// Simple week list with current day highlight
import type { HoursMap, Weekday } from '~/types/visit'

withDefaults(defineProps<{
  hours: HoursMap
  title?: string
  closedLabel?: string
}>(), {
  closedLabel: '-'
})


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
  const day = new Date().getDay() // 0=Sun ... 6=Sat
  return ['sun','mon','tue','wed','thu','fri','sat'][day] as Weekday
})
</script>

<template>
  <h3 v-if="title" class="text-white font-medium mb-2">
    {{ title }}
  </h3>
  <ul class="divide-y divide-white/5">
    <li
      v-for="day in DAYS"
      :key="day.key"
      :aria-current="day.key === todayKey ? 'date' : undefined"
      class="flex items-center justify-between py-2.5 px-3 transition-colors"
      :class="day.key === todayKey ? 'bg-white/5 px-3 -mx-2' : 'px-0'"
    >
    <span
      :class="day.key === todayKey ? 'font-bold text-white' : 'text-white/80'"
      >
      {{ day.label }}</span>
      <span
        class="tabular-nums font-mono"
        :class="day.key === todayKey ? 'font-bold text-white' : 'text-white/80'">
        {{ hours[day.key] || closedLabel }}
      </span>
    </li>
  </ul>
</template>
