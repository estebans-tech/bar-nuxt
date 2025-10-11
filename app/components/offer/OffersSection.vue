<script setup lang="ts">
/**
 * Sektion: Aktuella erbjudanden (Cocktail + Essen)
 * - Ingen upprepning av menyknappar
 * - 1 kolumn på mobil, 2 kolumner på ≥ md
 * - Lätt analytics-hook via useIntersection (valfri)
 */

import { useIntersection } from '~/composables/useIntersection'

type OfferItem = {
  id: string
  title: string               // t.ex. "Cocktail Happy Hour"
  imageSrc: string
  alt?: string
  lines?: string[]            // kort beskrivning i flera rader (valfritt)
  badge?: string              // t.ex. "Neu", "Heute", "17–19 Uhr"
}

const props = defineProps<{
  title?: string              // t.ex. "Angebote"
  subtitle?: string           // t.ex. "Unsere aktuellen Specials"
  items: OfferItem[]          // 2–3 st (vi tänker primärt 2)
}>()

// enkel visnings-tracking om du vill
const root = useIntersection({ threshold: 0.35, once: true })
onMounted(() => {
  root.startOnce(() => {
    // track('offers_impression')  // om du vill aktivera
  })
})
</script>

<template>
  <section
    ref="root.target"
    class="bg-onyx/95 w-full py-14 md:py-18"
  >
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 lg:px-8">
      <!-- Header -->
      <header class="text-center max-w-3xl mx-auto">
        <h2 class="text-white text-3xl md:text-4xl font-semibold leading-tight">
          {{ title || 'Angebote' }}
        </h2>
        <p v-if="subtitle"
           class="mt-3 text-white/75 text-base md:text-lg">
          {{ subtitle }}
        </p>
      </header>

      <!-- Grid -->
      <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <article
          v-for="offer in items"
          :key="offer.id"
          class="overflow-hidden rounded-2xl ring-1 ring-white/10 bg-black/35 backdrop-blur-sm
                 transition-all hover:ring-white/20 hover:shadow-lg hover:shadow-black/25"
        >
          <!-- Bild -->
          <div class="relative aspect-[16/11] sm:aspect-[4/3]">
            <img
              :src="offer.imageSrc"
              :alt="offer.alt || offer.title"
              class="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              loading="lazy"
            />
            <!-- mjuk vignett i botten för läsbarhet om man vill lägga text över bilden senare -->
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <!-- Innehåll -->
          <div class="px-5 py-4">
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-white text-xl md:text-2xl font-semibold leading-tight">
                {{ offer.title }}
              </h3>

              <!-- Badge (valfri) -->
              <span
                v-if="offer.badge"
                class="shrink-0 inline-flex items-center rounded-full bg-gold/90 px-3 py-1 text-[13px] font-semibold text-onyx ring-1 ring-black/5"
              >
                {{ offer.badge }}
              </span>
            </div>

            <!-- Beskrivning (flera rader, valfritt) -->
            <ul v-if="offer.lines?.length" class="mt-2 space-y-1">
              <li
                v-for="(line, i) in offer.lines"
                :key="i"
                class="text-white/80 text-[15px]"
              >
                {{ line }}
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
