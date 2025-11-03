<script setup lang="ts">
import Carousel from '~/components/carousel/Carousel.vue'
import type { CocktailCard } from '~/types/cocktail'

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  headingId?: string
  items?: CocktailCard[]
}>(), {
  title: 'Cocktails',
  subtitle: '',
  headingId: 'signature-cocktails-heading'
})
</script>
<template>
  <section
    :aria-labelledby="headingId"
    class="bg-onyx w-full min-h-screen h-full py-16 md:py-24 flex items-center">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 lg:px-8">
      <header>
        <h2
          :id="headingId"
          class="text-2xl md:text-3xl font-semibold text-white">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="mt-1 text-white/70">
          {{ subtitle }}
        </p>
      </header>

      <div class="relative pt-3">
        <Carousel :items="items" />
      </div>
    </div>
  </section>
</template>