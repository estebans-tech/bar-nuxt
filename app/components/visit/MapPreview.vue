<script setup lang="ts">
type Props = {
  staticSrc: string
  iframeSrc: string
  alt?: string
  activateLabel?: string
}
const props = withDefaults(defineProps<Props>(), {
  alt: 'Karte: Bar Seña in Hannover',
  activateLabel: 'Karte aktivieren'
})

const activated = ref(false)
const iframeRef = ref<HTMLIFrameElement | null>(null)
const activate = () => {
  activated.value = true
  requestAnimationFrame(() => iframeRef.value?.focus())
}
</script>

<template>
  <!-- Viktigt: lägg aspect *här* och INTE på föräldern -->
  <div class="relative w-full overflow-hidden rounded-3xl bg-white/5 shadow-lg
           aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto lg:flex-1 lg:min-h-0 min-h-[240px]"
            >
    <!-- static preview -->
    <img
      v-if="!activated"
      :src="staticSrc"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 block h-full w-full min-h-full min-w-full max-w-none object-cover"
      draggable="false"
    />

    <!-- overlay-knapp (absolut, påverkar ej layout) -->
    <button
      v-if="!activated"
      type="button"
      @click="activate"
      class="group absolute left-1/2 bottom-5 -translate-x-1/2 z-10
             whitespace-nowrap rounded-full px-5 py-2
             text-white bg-black/30 backdrop-blur-md
             ring-1 ring-white/30 hover:bg-black/40
             focus:outline-none focus-visible:ring-2 focus-visible:ring-gold
             shadow-lg bottom-6 md:bottom-8"
      aria-label="Interaktive Karte laden"
    >
      {{ activateLabel }}
    </button>

    <!-- iframe ersätter bilden, samma absoluta sizing -->
    <iframe
      v-else
      ref="iframeRef"
      :src="iframeSrc"
      class="absolute inset-0 h-full w-full border-0"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Google Maps – Bar Seña"
      tabindex="0"
    />
  </div>
</template>