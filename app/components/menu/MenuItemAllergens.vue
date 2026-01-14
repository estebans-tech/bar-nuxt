<script setup lang="ts">
import type { AllergenWarning } from "~/types/menu"

defineProps<{
  allergens: AllergenWarning[]
}>()

const formatAllergenLabel = (allergen: AllergenWarning) => {
  return allergen
}
</script>

<template>
  <p class="text-xs text-white/70">
    <span class="font-semibold">Allergens:</span>
    <span class="ml-2">
      <span v-for="(allergen, allergenIndex) in allergens" :key="allergenIndex">
        <span v-if="allergenIndex > 0">, </span>
        {{ formatAllergenLabel(allergen) }}
      </span>
    </span>
  </p>
</template>
