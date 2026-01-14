<script setup lang="ts">
import { computed } from "vue"
import type { MultilineCopy } from "~/types/menu"

const props = defineProps<{
  body: MultilineCopy
}>()

const bodyLines = computed(() =>
  Array.isArray(props.body) ? props.body : [props.body]
)
</script>

<template>
  <div class="text-center text-sm font-semibold tracking-wide text-white/80">
    <p v-for="(line, index) in bodyLines" :key="index">
      {{ line }}
    </p>
  </div>
</template>
