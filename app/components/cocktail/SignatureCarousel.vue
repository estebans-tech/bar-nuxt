<script setup lang="ts">
import { toRefs } from 'vue'
import type { CocktailCard } from '~/types/cocktail'

import Button from '~/components/ui/Button.vue'
import CocktailCardComp from '~/components/cocktail/CocktailCard.vue'
import HorizontalCarousel from '~/components/ui/HorizontalCarousel.vue'
import Hero from '~/components/Hero.vue'

const props = defineProps<{
  title?: string
  cta?: { label: string; href: string }
  items: CocktailCard[]
}>()

const { title, cta, items } = toRefs(props)
</script>

<template>
  <section class="bg-onyx relative isolate flex items-center min-h-screen">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 lg:px-8">

          <!-- Header -->
          <header class="flex items-end justify-between gap-4 mb-6 md:mb-8">
            <h2 class="text-2xl md:text-3xl font-semibold text-white">
              {{ title || 'Signature Cocktails' }}
            </h2>

            <!-- Visa CTA alltid (ändra till hidden md:inline-flex om du vill gömma på mobil) -->
            <Button v-if="cta" :href="cta.href" size="sm">
              {{ cta.label }}
            </Button>
          </header>

          <div class="mt-10 md:mt-14 mb-10 md:mb-16">
            <!-- Endast karusell över alla breakpoints -->
            <HorizontalCarousel
              :items="items"
              :aria-label="title"
              class="mt-8 md:mt-10 mb-8 md:mb-12">
              <template #item="{ item }">
                <CocktailCardComp :item="item" analytics-prefix="sig" />
              </template>
            </HorizontalCarousel>
          </div>
    </div>
  </section>
</template>