<script setup lang="ts">
import type { DietaryTag } from "~/types/menu"

defineProps<{
  tags: DietaryTag[]
}>()
</script>

<template>
  <span class="inline-flex gap-1 align-baseline">
    <span
      v-for="tag in tags"
      :key="tag"
      class="text-xs font-semibold text-white/80"
    >
      {{ tag }}
    </span>
  </span>
</template>
