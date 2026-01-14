<script setup lang="ts">
import type { MultilineCopy } from "~/types/menu"

defineProps<{
  title: string
  subtitle?: MultilineCopy
}>()

const asLines = (text?: MultilineCopy) => {
  if (!text) return []
  return Array.isArray(text) ? text : [text]
}
</script>

<template>
  <div>
    <h2 class="text-[#d8c08a] text-xl md:text-2xl font-semibold leading-tight tracking-tight">
      {{ title }}
    </h2>

    <p
      v-for="(line, i) in asLines(subtitle)"
      :key="i"
      class="mt-1 text-sm text-white/95 font-medium leading-tight tracking-tight"
    >
      {{ line }}
    </p>
  </div>
</template>
