<script setup lang="ts">
// Presentational card for a single cocktail
import type { CocktailCard } from '~/types/cocktail'
import type { CardVariant } from '~/types/card'
import { useIntersection } from '~/composables/useIntersection'
import { useAnalytics } from '~/composables/useAnalytics'
import { euro } from '~/utils/format'
import { cardClass } from '~/utils/card'

const props = defineProps<{
  item: CocktailCard;
  analyticsPrefix?: string
  variant?: CardVariant
  radius?: string
  shadow?: string
  hoverLift?: boolean
}>()

const cardRef = useIntersection({ threshold: 0.6, once: true })
const { click, view } = useAnalytics()

const getCard = () =>
cardClass(props.variant ?? 'elegant', {
  hoverLift: props.hoverLift ?? true,
  radius: props.radius,
  shadow: props.shadow
})

onMounted(() => {
  cardRef.startOnce(() => view(`${props.analyticsPrefix || 'sig'}_${props.item.id}`))
})

const onClick = () => {
  click(`${props.analyticsPrefix || 'sig'}_${props.item.id}`)
}
</script>

<template>
  <article
    ref="cardRef.target"
    @click="onClick"
    :aria-label="item.name"
    role="listitem"
    :class="[
      'h-full flex flex-col overflow-hidden isolate snap-start w-3/4 sm:w-72 shrink-0 md:snap-none md:w-full md:shrink md:mx-0',
      getCard().class
    ]"
    :style="getCard().style"
  >
    <div class="relative aspect-[4/5] flex-none">
      <img
        :src="item.imageSrc"
        :alt="item.alt || `${item.name} cocktail`"
        class="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        loading="lazy"
      />
      <!-- subtle bottom gradient for text legibility if needed later -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-20
                 bg-gradient-to-t from-black/40 to-transparent" />
    </div>

    <div class="p-4 flex-1 flex flex-col">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-white text-lg font-semibold leading-tight">
          {{ item.name }}
        </h3>
        <span class="text-gold text-sm font-semibold whitespace-nowrap hidden">
          {{ euro(item.price) }}
        </span>
      </div>

      <p class="mt-1 text-white/70 text-sm">
        {{ item.flavorNote }}
      </p>

      <div v-if="item.tags?.length" class="mt-auto pt-3 flex gap-2">
        <span
          v-for="t in item.tags"
          :key="t"
          class="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 ring-1 ring-white/15"
        >
          {{ t }}
        </span>
      </div>
    </div>
  </article>
</template>
