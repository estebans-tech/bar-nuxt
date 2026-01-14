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
    <h2 class="text-2xl font-semibold tracking-[0.2em] text-[#d8c08a]">
      {{ title }}
    </h2>

    <p
      v-for="(line, i) in asLines(subtitle)"
      :key="i"
      class="mt-2 text-sm text-white/85"
    >
      {{ line }}
    </p>
  </div>
</template>
