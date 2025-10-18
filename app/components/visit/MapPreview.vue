<script setup lang="ts">
import { cardClass } from '~/utils/card'

withDefaults(defineProps<{
  staticSrc: string
  iframeSrc: string
  alt?: string
  activateLabel?: string
}>(), {
  alt: 'Karte: Bar Seña in Hannover',
  activateLabel: 'Karte aktivieren'
})

const activated = ref(false)
const iframeRef = ref<HTMLIFrameElement | null>(null)
const activate = () => {
  activated.value = true
  requestAnimationFrame(() => iframeRef.value?.focus())
}
const card = cardClass('elegant', { hoverLift: false })

</script>

<template>
  <!-- Viktigt: lägg aspect *här* och INTE på föräldern -->
  <div class="relative block w-full h-full overflow-hidden"
      :class="card.class"
      :style="card.style"
      role="group"
      aria-label="Karte anzeigen"
  >
    <!-- static preview -->
    <img
      v-if="!activated"
      :src="staticSrc"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="absolute inset-0 w-full h-full object-cover rounded-2xl"
      draggable="false"
    />

    <!-- overlay-knapp (absolut, påverkar ej layout) -->
    <button
      v-if="!activated"
      type="button"
      @click="activate"
      class="absolute left-1/2 bottom-6 -translate-x-1/2 z-10 
            whitespace-nowrap rounded-full px-5 py-2
            text-white bg-black/30 backdrop-blur-md 
            ring-1 ring-white/30 
            hover:bg-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold shadow-lg"
      :aria-label="activateLabel"
      aria-controls="map-iframe"
      :aria-expanded="false"
    >
      {{ activateLabel }}
    </button>

    <!-- iframe ersätter bilden, samma absoluta sizing -->
    <iframe
      v-else
      id="map-iframe"
      ref="iframeRef"
      :src="iframeSrc"
      class="absolute inset-0 w-full h-full border-0 rounded-2xl"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="Google Maps – Bar Seña"
      tabindex="0"
      aria-label="Interaktive Karte"
    />
  </div>
</template>