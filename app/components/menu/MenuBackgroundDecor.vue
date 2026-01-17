<script setup lang="ts">
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

const motifStyle = (m: MenuMotif) => ({
  opacity: m.opacity ?? 0.35,
  transform: `scale(${m.scale ?? 1}) rotate(${m.rotate ?? 0}deg)`
})
</script>

<template>
  <div class="pointer-events-none absolute inset-0">
    <!-- Stora ton-i-ton blad (bakgrund) -->
    <div class="absolute inset-0 opacity-40">
      <!-- Lägg SVG eller bakgrundsbild här -->
    </div>

    <!-- Accentdekor (t.ex. nere till höger) -->
    <div class="absolute bottom-0 right-0 opacity-35">
      <!-- Lägg SVG eller bild här -->
    </div>
  </div>
</template>
