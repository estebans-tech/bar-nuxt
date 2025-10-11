<script setup lang="ts">
import { ref, onMounted } from 'vue'

type KeyGetter<T> = (item: T, index: number) => string | number

const props = withDefaults(defineProps<{
  /** Listan som ska renderas i karusellen */
  items: any[]
  /** Fält att använda som key (om du inte skickar keyFn) */
  keyField?: string
  /** Alternativt: egen key-funktion */
  keyFn?: KeyGetter<any>
  /** ARIA-beskrivning av karusellen */
  ariaLabel?: string
  /** Tailwind-breddklass per item (behåller dina tidigare storlekar som default) */
  itemWidthClass?: string
  /** Gap mellan kort (px via Tailwind) */
  gapClass?: string
  /** Visar edge-fades (vänster/höger) på mobilt */
  edgeFade?: boolean
}>(), {
  keyField: 'id',
  keyFn: undefined,
  ariaLabel: 'Karusell',
  itemWidthClass: 'w-[80%] sm:w-72 shrink-0',
  gapClass: 'gap-1 sm:gap-5',
  edgeFade: true,
})

const scroller = ref<HTMLElement | null>(null)

const itemKey = (item: any, index: number) =>
  props.keyFn ? props.keyFn(item, index) : (item?.[props.keyField] ?? index)

function scrollByCards(dir: 'left' | 'right') {
  const el = scroller.value
  if (!el) return
  const first = el.querySelector('[data-carousel-item]') as HTMLElement | null
  const gap = 16 // motsvarar gap-4
  const delta = first ? first.offsetWidth + gap : el.clientWidth * 0.8
  el.scrollBy({ left: dir === 'left' ? -delta : delta, behavior: 'smooth' })
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') scrollByCards('left')
  if (e.key === 'ArrowRight') scrollByCards('right')
}

onMounted(() => {
  // inget specifikt nu – men hooken finns om du vill bygga vidare
})
</script>

<template>
  <div class="relative isolate">
    <!-- vänster/höger-knappar (mobilt) -->
    <button
      type="button"
      class="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/55 xl:hidden"
      aria-label="Scrolla vänster"
      @click="scrollByCards('left')"
    >
      ‹
    </button>
    <button
      type="button"
      class="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur hover:bg-black/55 xl:hidden"
      aria-label="Scrolla höger"
      @click="scrollByCards('right')"
    >
      ›
    </button>

    <!-- edge fade (valfritt) -->
    <div
      v-if="edgeFade"
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-onyx to-transparent"
    ></div>
    <div
      v-if="edgeFade"
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-onyx to-transparent"
    ></div>

    <!-- spår -->
    <div
      ref="scroller"
      class="flex gap-4 overflow-x-auto overflow-y-visible snap-start snap-mandatory scroll-smooth pl-6 pr-6 -mx-6"
      :class="gapClass"
      style="scroll-padding-left: 1.5rem"
      role="region"
      aria-roledescription="carousel"
      :aria-label="ariaLabel"
      tabindex="0"
      @keydown="onKey"
    >
      <div
        v-for="(item, i) in items"
        :key="itemKey(item, i)"
        data-carousel-item
        class="snap-start"
        :class="itemWidthClass"
        role="listitem"
      >
        <!-- Din rendering -->
        <slot name="item" :item="item" :index="i" />
      </div>
    </div>
  </div>
</template>
