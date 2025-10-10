<script setup lang="ts">
// Responsive carousel that scrolls on mobile and becomes a grid on md+
// Adds scroll buttons and keyboard support

import type { CocktailCard } from '~/types/cocktail'
import CocktailCardComp from '~/components/cocktail/CocktailCard.vue'
import Button from '~/components/ui/Button.vue'

const props = defineProps<{
  items: CocktailCard[]
  title?: string
  cta?: { label: string; href: string }
}>()

const scroller = ref<HTMLDivElement | null>(null)

// simple scroll helpers
const scrollByCards = (dir: 'left' | 'right') => {
  const el = scroller.value
  if (!el) return
  const card = el.querySelector('article')
  const cardWidth = card ? (card as HTMLElement).offsetWidth : 280
  el.scrollBy({ left: dir === 'left' ? -cardWidth - 16 : cardWidth + 16, behavior: 'smooth' })
}

const onKey = (e: KeyboardEvent) => {
  if (!scroller.value) return
  if (e.key === 'ArrowRight') scrollByCards('right')
  if (e.key === 'ArrowLeft') scrollByCards('left')
}
</script>

<template>
  <section class="py-12 md:py-16 bg-onyx">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6">
      <header class="flex items-end justify-between gap-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-white">
          {{ title || 'Signature Cocktails' }}
        </h2>

        <!-- <a
          v-if="cta"
          :href="cta.href"
          class="hidden md:inline-flex items-center rounded-xl bg-gold px-4 py-2 text-sm font-medium text-onyx hover:opacity-90"
        >
          {{ cta.label }}
        </a> -->
        <Button v-if="cta" :href="cta.href" size="md"> {{ cta.label }} </Button>
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
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
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
            class="first:ml-0 last:mr-4"
          />
        </div>
      </div>

      <!-- md/desktop: grid -->
      <div class="mt-8 hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-7 2xl:gap-8 items-stretch isolate [&>*]:w-full">
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
