<script setup lang="ts">
import MotifIcon from '~/components/ui/MotifIcon.vue'
import type { MenuMotif, DecorPlacement } from '~/types/menu'

withDefaults(
  defineProps<{
    motifs?: MenuMotif[], 
  }>(),
  {
    motifs: () => []
  }
)

const placementClass: Record<DecorPlacement, string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
  left: "top-1/2 left-0 -translate-y-1/2",
  right: "top-1/2 right-0 -translate-y-1/2",
  top: "top-0 left-1/2 -translate-x-1/2",
  bottom: "bottom-0 left-1/2 -translate-x-1/2",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
}

const motifStyle = (motif: MenuMotif) => ({
  opacity: motif.opacity ?? 0.05,
  transform: `scale(${motif.scale ?? 1}) rotate(${motif.rotate ?? 0}deg) scaleX(${motif.flipX ? -1 : 1}) scaleY(${motif.flipY ? -1 : 1})`
})
</script>

<template>
  <div class="pointer-events-none absolute inset-0">
    <div
      v-for="(motif, index) in motifs"
      :key="index"
      :class="['absolute', placementClass[motif.placement]]"
      :style="motifStyle(motif)"
    >
      <MotifIcon :motif="motif.motif" />
    </div>
  </div>
</template>
