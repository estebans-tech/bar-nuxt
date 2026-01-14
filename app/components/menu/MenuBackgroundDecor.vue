<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: "default" | "brown" | "red" | "blue"
  }>(),
  {
    variant: "default"
  }
)
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
