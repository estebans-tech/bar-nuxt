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
  <div class="text-md font-light text-white/85">
    <p
      v-for="(line, index) in descriptionLines"
      :key="index"
      class="leading-relaxed"
    >
      {{ line }}
    </p>
  </div>
</template>
