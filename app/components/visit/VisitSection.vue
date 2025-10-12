<script setup lang="ts">
// Visit / Contact section – address, CTAs, map preview, hours
import { VISIT_INFO } from '~/constants/visit'
import MapPreview from './MapPreview.vue'
import HoursList from './HoursList.vue'
import Button from '~/components/ui/Button.vue'
import { useIntersection } from '~/composables/useIntersection'
import { useAnalytics } from '~/composables/useAnalytics'
import { cardClass } from '~/utils/card'

const info = VISIT_INFO
const { view, click } = useAnalytics()

const root = useIntersection({ threshold: 0.5, once: true })
onMounted(() => {
  root.startOnce(() => view('visit_view'))
})

const card = cardClass('flat', { hoverLift: false })
const onCall = () => click('visit_call_click')
const onRoute = () => click('visit_route_click')
</script>

<template>
  <section ref="root.target" class="bg-onyx py-12 md:py-16 w-full min-h-[240px]">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-2 items-start lg:items-stretch">
        <div>
          <!-- vänster spalt: text + tider -->
          <header class="flex items-end justify-between">
            <h2 class="text-2xl md:text-3xl font-semibold text-white">
              Hier findest du uns
            </h2>
          </header>
          <div class="text-white">
            <p class="text-lg font-medium">{{ info.name }}</p>
            <p class="text-white/80">{{ info.street }}</p>
            <p class="text-white/80">{{ info.postalCity }}</p>
          </div>

          <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button
              size="md"
              :href="info.phoneHref"
              aria-label="Anrufen Seña Bar"
              @click="onCall"
            >
              Anrufen
            </Button>
            <Button
              variant="outline"
              size="md"
              :href="info.mapsHref"
              aria-label="Route öffnen"
              @click="onRoute"
            >
              Route öffnen
            </Button>
          </div>

          <p class="mt-3 text-white/70 text-sm">
            {{ info.todayOpenText }}
          </p>

          <!-- <div class="mt-12 rounded-2xl bg-white/5 ring-1 ring-white/10 p-4 md:p-5"> -->
          <div 
            class="mt-12 p-4 md:p-5 bg-black"
            :class="card.class"
            :style="card.style">
            <p class="text-white font-medium mb-2">Öffnungszeiten</p>
            <HoursList :hours="info.hours" />
          </div>
        </div>

        <div class="self-stretch lg:flex">
          <!-- höger spalt -->
            <MapPreview
              :static-src="info.mapStaticSrc"
              :iframe-src="info.mapIframeSrc"
              :alt="info.mapAlt"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Bar Seña – Karte"
            />
        </div>
      </div>
    </div>
  </section>
</template>
