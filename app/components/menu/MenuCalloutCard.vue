<script setup lang="ts">
import type { MultilineCopy } from "~/types/menu"

defineProps<{
  title: string
  body: MultilineCopy
  variant?: "default" | "promo"
}>()

const asLines = (text: MultilineCopy) => (Array.isArray(text) ? text : [text])
</script>

<template>
  <div class="rounded-2xl bg-white/10 p-6">
    <h3 class="mb-2 text-xl font-semibold tracking-wide">
      {{ title }}
    </h3>

    <p
      v-for="(line, i) in asLines(body)"
      :key="i"
      class="text-sm leading-relaxed text-white/90"
    >
      {{ line }}
    </p>
  </div>
</template>
