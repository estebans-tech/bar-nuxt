<script setup lang="ts">
// Hero section with background image, actions and happy hour badge
import type { HeroProps } from '~/types/hero'
import { track } from '~/utils/analytics'
import { useIntersection } from '~/composables/useIntersection'

const heroRoot = useIntersection({ threshold: 0.5, once: true })
const badgeRef = useIntersection({ threshold: 0.6, once: true })

const props = defineProps<HeroProps>()

const emit = defineEmits<{
  callClick: []
  routeClick: []
  happyHourView: []
  impression: []
}>()

onMounted(() => {
  // Track hero impression when component becomes visible
  heroRoot.startOnce(() => track('hero_impression'))
  // Track happy hour badge visibility when present
  badgeRef.startOnce(() => track('hero_happyhour_view'))
})
</script>

<template>
<section
  id="hero-root"
  class="relative min-h-screen isolate flex items-center"
  style="position:relative;min-height:100vh;display:flex;align-items:center" 
>
  <!-- Background image -->
  <img
    :src="props.heroImage"
    alt=""
    aria-hidden="true"
    class="absolute inset-0 h-full w-full object-cover"
    style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" 
    decoding="async"
    fetchpriority="high"
  />

  <!-- Dark overlay -->
  <div
    class="absolute inset-0 bg-black/70"
    style="position:absolute;inset:0;background:rgba(0,0,0,.1)"             
  />

    <!-- Content -->
    <div class="relative z-10 mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <div class="max-w-xl">
        <h1 class="text-4xl font-semibold leading-tight text-white md:text-6xl">
          {{ props.title }}
        </h1>

        <p class="mt-4 text-white/80 text-base md:text-lg">
          {{ props.subtitle }}
        </p>

        <!-- Happy hour chip -->
        <div
          v-if="props.happyHour?.active"
          id="happy-hour-badge"
          class="mt-6 inline-flex select-none items-center rounded-full bg-gold px-4 py-2 text-sm font-medium text-onyx shadow"
        >
          {{ props.happyHour.text }}
        </div>

        <!-- Actions -->
        <div class="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
          <a
            :href="props.phoneHref"
            aria-label="Anrufen"
            @click="() => { track('hero_call_click'); emit('callClick') }"
            class="inline-flex items-center justify-center rounded-xl bg-gold px-4 py-3 font-medium text-onyx shadow hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
          >
            Anrufen
          </a>

          <a
            :href="props.mapsHref"
            target="_blank"
            rel="noopener"
            aria-label="Route öffnen"
            @click="() => { track('hero_route_click'); emit('routeClick') }"
            class="inline-flex items-center justify-center rounded-xl border border-white/20 bg-transparent px-4 py-3 font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Route öffnen
          </a>
        </div>

        <!-- Open info line -->
        <p v-if="props.openInfo" class="mt-3 text-sm text-white/60">
          {{ props.openInfo }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No custom CSS rules necessary — kept empty on purpose */
</style>
