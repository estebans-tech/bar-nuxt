<script setup lang="ts">
import type { MultilineCopy } from "~/types/menu"

const props = defineProps<{
  description: MultilineCopy
}>()

const descriptionLines = computed(() => {
  return Array.isArray(props.description) ? props.description : [props.description]
})
</script>

<template>
  <div class="text-sm text-white/85">
    <p
      v-for="(line, lineIndex) in descriptionLines"
      :key="lineIndex"
      class="leading-relaxed"
    >
      {{ line }}
    </p>
  </div>
</template>
