<script setup lang="ts">
import CocktailCard from '~/components/cocktail/CocktailCard.vue'
import type { CocktailCard as CocktailType } from '~/types/cocktail'

withDefaults(defineProps<{
  item: CocktailType
  snap?: 'center' | 'start'
  ariaLabel?: string
}>(), {
  snap: 'center',
  ariaLabel: ''
})
</script>

<template>
  <li
    :aria-label="ariaLabel || undefined"
    role="listitem"
    class="shrink-0 snap-always
           basis-[15.5rem] sm:basis-[18rem] md:basis-[20rem] lg:basis-[22rem]"
    :class="snap === 'center' ? 'snap-center' : 'snap-start'"
  >
    <CocktailCard :cocktail="item" />
  </li>
</template>
