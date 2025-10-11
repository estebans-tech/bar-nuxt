<script setup lang="ts">
import type { HeroProps } from '~/types/hero'
import { track } from '~/utils/analytics'
import { useIntersection } from '~/composables/useIntersection'

const props = defineProps<HeroProps>()

// Observer för hela heron (en gång)
const heroRoot = useIntersection({ threshold: 0.5, once: true })
// Valfritt: observera happy-hour-badgen när/om den syns
const badgeRef = useIntersection({ threshold: 0.6, once: true })

onMounted(() => {
  heroRoot.startOnce(() => track('hero_impression'))
  badgeRef.startOnce(() => track('hero_happyhour_view'))
})
</script>
<template>
  <section
    id="hero-root"
    class="relative isolate flex items-center min-h-screen"
    ref="heroRoot.target"
  >
    <!-- Background image -->
    <img
      :src="props.heroImage"
      alt=""
      aria-hidden="true"
      class="absolute inset-0 h-full w-full object-cover"
      decoding="async"
      fetchpriority="high"
    />

    <!-- Overlay (gradient + vignette) -->
    <div class="pointer-events-none absolute inset-0 bg-black/40">
      <!-- riktad skugga från vänster (bakom texten) -->
      <div
        class="absolute inset-0 [background:linear-gradient(90deg,rgba(0,0,0,.8)_0%,rgba(0,0,0,.4)_38%,rgba(0,0,0,.22)_62%,rgba(0,0,0,.46)_100%)]">
      </div>
      <!-- mjuk vignette i kanterna -->
      <div
        class="absolute inset-0 [background:radial-gradient(120%_90%_at_50%_42%,rgba(0,0,0,0)_46%,rgba(0,0,0,.5)_100%)]">
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 mx-auto w-full max-w-5xl px-6 py-24 md:py-32">
      <div class="max-w-xl">
        <h1 class="text-4xl sm:text-6xl md:text-6xl font-semibold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
          {{ props.title }}
        </h1>

        <p class="mt-4 text-base md:text-lg text-white/80">
          {{ props.subtitle }}
        </p>

       <!-- Actions / happy hour / open info hålls gömda för nu -->
        <div
          v-if="props.happyHour?.active"
          id="happy-hour-badge"
          class="mt-6 inline-flex h-10 items-center rounded-full bg-gold/90 px-4 text-sm font-medium text-onyx/90 shadow-sm ring-1 ring-black/5 hidden"
        >
          {{ props.happyHour.text }}
        </div>

        <!-- Actions (dolda) -->
        <div class="mt-6 grid grid-cols-2 gap-3 sm:max-w-md hidden">
          <Button size="lg">Anrufen</Button>
          <Button variant="outline" size="lg" :href="mapsHref">Route öffnen</Button>
        </div>

        <!-- Open info (dold) -->
        <p v-if="props.openInfo" class="mt-3 text-sm text-white/90 hidden">
          {{ props.openInfo }}
        </p>
      </div>
    </div>
  </section>
</template>
