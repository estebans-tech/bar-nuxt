<script setup lang="ts">
import CarouselItem from '~/components/carousel/CarouselItem.vue'
import Button from '~/components/ui/Button.vue'
import type { CocktailCard } from '~/types/cocktail'

withDefaults(defineProps<{
  snap?: 'center' | 'start'
  ariaLabel?: string,
  items?: CocktailCard[]
}>(), {
  snap: 'center',
  ariaLabel: 'Carousel'
})

const viewport = ref<HTMLElement | null>(null)
const canPrev = ref(false)
const canNext = ref(false)
const viewportId = `carousel-vp-${Math.random().toString(36).slice(2, 8)}`

const updateArrows = () => {
  const el = viewport.value
  if (!el) return
  const maxScroll = el.scrollWidth - el.clientWidth
  canPrev.value = el.scrollLeft > 0
  canNext.value = el.scrollLeft < maxScroll - 1
}

const scrollByPage = (dir: 1 | -1) => {
  const el = viewport.value
  if (!el) return
  el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
}

/**
 * Simple keyboard support: Left/Right scrolls one viewport width
 */
const onKeydown = (e: KeyboardEvent) => {
  if (!viewport.value) return
  const el = viewport.value
  if (e.key === 'ArrowRight') {
    el.scrollBy({ left: el.clientWidth, behavior: 'smooth' })
    e.preventDefault()
  } else if (e.key === 'ArrowLeft') {
    el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' })
    e.preventDefault()
  }
}

onMounted(() => {
  updateArrows()
  viewport.value?.addEventListener('scroll', updateArrows, { passive: true })
  window.addEventListener('resize', updateArrows)
})

onBeforeUnmount(() => {
  viewport.value?.removeEventListener('scroll', updateArrows)
  window.removeEventListener('resize', updateArrows)
})
</script>

<template>
  <div
    class="relative"
    role="region"
    :aria-roledescription="'carousel'"
    :aria-label="ariaLabel"
  >
    <!-- Prev -->
    <Button
      type="button"
      variant="outline"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10"
      :class="!canPrev ? '' : '!bg-onyx'"
      :aria-controls="viewportId"
      :disabled="!canPrev"
      @click="scrollByPage(-1)"
      >←</Button>

    <!-- Next -->
     <Button
      type="button"
      variant="ghost"
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10"      
      :class="!canNext ? '' : '!bg-onyx'"
      :aria-controls="viewportId"
      :disabled="!canNext"
      @click="scrollByPage(1)"
      >→</Button>
    <ul
      ref="viewport"
      :aria-label="ariaLabel"
      aria-roledescription="carousel"
      role="list"
      tabindex="0"
      class="flex overflow-x-auto overflow-y-visible overscroll-x-contain
             gap-6 px-1
             snap-x snap-mandatory scroll-smooth
             [-ms-overflow-style:none] [scrollbar-width:none]"
      @keydown="onKeydown"
      v-if="items?.length"
      >
        <CarouselItem
          v-for="value in items"
          :key="value.id"
          :item="value"
          :snap="snap"
        />
    </ul>
  </div>
</template>
