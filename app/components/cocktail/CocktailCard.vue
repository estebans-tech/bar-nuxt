<script setup lang="ts">
import { useAnalytics } from '~/composables/useAnalytics'
import { euro } from '~/utils/format'
import { cardClass } from '~/utils/card'
import type { CocktailCard as CocktailCardType } from '~/types/cocktail'

const props = withDefaults(defineProps<{
  cocktail: CocktailCardType,
  analyticsPrefix?: string
  variant?: string
}>(), {
  variant: 'elegant'
})

const cardRef = useIntersection({ threshold: 0.6, once: true })
const { click, view } = useAnalytics()

const card = cardClass('elegant', { hoverLift: false })

onMounted(() => {
  cardRef.startOnce(() => view(`${props.analyticsPrefix || 'sig'}_${props.cocktail.id}`))
})


const onClick = () => {
  click(`${props.analyticsPrefix || 'sig'}_${props.cocktail.id}`)
}
</script>

<template>
  <!-- semantic card -->
  <article
    class="group my-2"
    :class="card.class"
    @click="onClick"
  >
    <figure class="flex flex-col">
      <!-- image -->
      <img
        :src="cocktail.imageSrc"
        :alt="cocktail.name"
        loading="lazy"
        decoding="async"
        class="aspect-[4/5] w-full object-cover"
      />

      <!-- caption -->
      <figcaption class="p-4 flex-1 flex flex-col">
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-white text-lg font-semibold leading-tight">
            {{ cocktail.name }}
          </h3>
          <span class="text-gold text-sm font-semibold whitespace-nowrap hidden">
            {{ euro(cocktail.price) }}
          </span>
        </div>
        <p class="mt-1 text-white/70 text-sm">
          {{ cocktail.flavorNote }}
        </p>
        <!-- <p v-if="cocktail?.blurb" class="mt-1 text-white/70 text-sm line-clamp-2">
          {{ cocktail?.blurb }}
        </p> -->
        <div v-if="cocktail.tags?.length" class="mt-auto pt-3 flex gap-2">
          <span
            v-for="t in cocktail.tags"
            :key="t"
            class="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 ring-1 ring-white/15"
          >
            {{ t }}
          </span>
        </div>
      </figcaption>
    </figure>
  </article>
</template>