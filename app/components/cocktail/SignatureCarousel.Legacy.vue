<script setup lang="ts">
// Responsive carousel that scrolls on mobile and becomes a grid on md+
// Adds scroll buttons and keyboard support

import Button from '~/components/ui/Button.vue'
import CocktailCardComp from '~/components/cocktail/CocktailCard.vue'
import type { CocktailCard } from '~/types/cocktail'
import { toRefs, ref } from 'vue'

const props = defineProps<{
  title?: string
  cta?: { label: string; href: string }
  items: CocktailCard[]
}>()

// så du kan fortsätta skriva {{ title }}, {{ cta }}, {{ items }} i templatet:
const { title, cta, items } = toRefs(props)

// (endast för mobilt horisontellt scroll – lämna om du redan har detta)
const scroller = ref<HTMLElement | null>(null)
const scrollByCards = (dir: 'left' | 'right') => {
  const el = scroller.value
  if (!el) return
  const card = el.querySelector('[role="listitem"]') as HTMLElement | null
  const delta = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
  el.scrollBy({ left: dir === 'left' ? -delta : delta, behavior: 'smooth' })
}
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') scrollByCards('left')
  if (e.key === 'ArrowRight') scrollByCards('right')
}
</script>

<template>
  <section class="bg-onyx w-full min-h-[85vh] md:min-h-screen py-12 md:py-12">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 lg:px-8">
      <header class="flex items-end justify-between gap-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-white">
          {{ title || 'Signature Cocktails' }}
        </h2>

        <Button v-if="cta" :href="cta.href" size="sm" class="hidden md:inline-flex">
          {{ cta.label }}
        </Button>
      </header>

      <!-- Mobile: horizontal scroll with snap -->
      <div class="relative mt-6 md:hidden isolate">
        <!-- scroll buttons -->
        <button
          class="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/55"
          aria-label="Scroll left"
          @click="scrollByCards('left')"
        >
          ‹
        </button>
        <button
          class="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/55"
          aria-label="Scroll right"
          @click="scrollByCards('right')"
        >
          ›
        </button>

        <div
          ref="scroller"
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pl-6 pr-10 -mx-8"
          style="scroll-padding-left: 1.5rem"
          role="region"
          aria-roledescription="carousel"
          tabindex="0"
          @keydown="onKey"
        >
          <CocktailCardComp
            v-for="c in items"
            :key="c.id"
            :item="c"
            analytics-prefix="sig"
            class="first:ml-0 last:mr-6"
          />
        </div>
      </div>

      <!-- ≥ md: grid (3 → 4 kolumner) -->
      <div
        class="mt-10 hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 items-stretch"
      >
        <CocktailCardComp
          v-for="c in items"
          :key="c.id"
          :item="c"
          analytics-prefix="sig"
        />
      </div>

      <!-- Mobile CTA -->
      <div class="mt-6 md:hidden">
        <a
          v-if="cta"
          :href="cta.href"
          class="inline-flex items-center rounded-xl bg-gold px-4 py-2 text-sm font-medium text-onyx hover:opacity-90"
        >
          {{ cta.label }}
        </a>
      </div>
    </div>
  </section>
</template>
