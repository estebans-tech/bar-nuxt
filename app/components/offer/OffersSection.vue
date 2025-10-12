<script setup lang="ts">
import { computed } from 'vue'
import type { CardVariant} from '~/types/card' 
import type { OfferItem } from '~/types/offer' 
import { badgeClass } from '~/utils/badge'
import { cardClass } from '~/utils/card'
/**
 * Sektion: Aktuella erbjudanden (Cocktail + Essen)
 * - Ingen upprepning av menyknappar
 * - 1 kolumn på mobil, 2 kolumner på ≥ md
 * - Lätt analytics-hook via useIntersection (valfri)
 */

import { useIntersection } from '~/composables/useIntersection'


const props = defineProps<{
  title?: string 
  subtitle?: string
  items: OfferItem[],
  variant?: CardVariant
  radius?: string
  shadow?: string
  hoverLift?: boolean
}>()

// enkel visnings-tracking om du vill
const root = useIntersection({ threshold: 0.35, once: true })
onMounted(() => {
  root.startOnce(() => {
    // track('offers_impression')  // om du vill aktivera
  })
})

const getCard = () =>
  cardClass(props.variant ?? 'elegant', {
    hoverLift: props.hoverLift ?? true,
    radius: props.radius,
    shadow: props.shadow
  })

const cardClasses = computed(() => getCard().class)
const cardStyles = computed(() => getCard().style)
const count = computed(() => props.items?.length || 0)

const gridShellClass = computed(() => {
  const n = props.items?.length || 0
  // shell width + columns
  // single: keep it elegant, not hero-wide
  if (n === 1) return 'max-w-4xl grid-cols-1'
  if (n === 2) return 'max-w-5xl grid-cols-1 md:grid-cols-2 justify-items-stretch'
  return 'max-w-6xl lg:max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
})

const imageAspectClass = computed(() => {
  const n = props.items?.length || 0
  if (n === 1) return 'aspect-[16/10] sm:aspect-[5/3]'
  return 'aspect-[4/3]'
})
</script>

<template>
  <section
    ref="root.target"
    v-if="count > 0"
    class="bg-black w-full py-16 md:py-20 min-h-screen flex items-center min-h-screen"
  >
    <div class="mx-auto w-full sm:w-3/4 md:w-11/12 px-6 lg:px-8">
      <!-- Header -->
      <header class="text-center max-w-3xl mx-auto">
        <h2 class="text-white text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
          {{ title || 'Angebote' }}
        </h2>
        <p v-if="subtitle"
           class="mt-3 text-white/75 text-base md:text-lg">
          {{ subtitle }}
        </p>
      </header>

      <!-- Grid -->
      <div
        :class="['mt-10 grid gap-6 lg:gap-8 mx-auto', gridShellClass]"
        role="list"
        :aria-label="title"
        >
        <article
          v-for="offer in items"
          :key="offer.id"
          :style="cardStyles"
          :class="[
            'overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-card)] ring-1 ring-white/10 bg-onyx/80 mb-12 sm:mb-6',
            cardClasses
          ]"
          role="listitem"
          >
          <div :class="['relative', imageAspectClass]">
            <img
              :src="offer.imageSrc"
              :alt="offer.alt || offer.title"
              class="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              loading="lazy"
            />
            <!-- mjuk vignett i botten för läsbarhet om man vill lägga text över bilden senare -->
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
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
                :class="[badgeClass('elegant', 'sm'), 'shrink-0']"
              >
                {{ offer.badge }}
              </span>
            </div>

            <!-- Beskrivning (flera rader, valfritt) -->
            <ul v-if="offer.lines?.length" class="mt-2 space-y-1">
              <li
                v-for="(line, i) in offer.lines"
                :key="i"
                class="text-white/75 text-[15px] leading-relaxed"
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
