<script setup lang="ts">
// Visit / Contact section – address, CTAs, map preview, hours
import { VISIT_INFO } from '~/constants/visit'
import HoursList from '~/components/visit/HoursList.vue'
import VisitInfo from '~/components/visit/VisitInfo.vue'
import OpenStatus from '~/components/visit/OpenStatus.vue'
import MapPreview from '~/components/visit/MapPreview.vue'

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
  <section
    ref="root.target"
    class="bg-onyx w-full py-12 md:py-16">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6 lg:px-8">
      <!-- Target grid: mobile stack, desktop 2 cols -->
      <div class="grid lg:grid-cols-2 items-start lg:items-stretch lg:grid-rows-[auto_auto] gap-x-10 gap-y-6 lg:gap-y-8">
          <!-- INFO -->
          <div class="lg:col-start-1 lg:row-start-1">
            <VisitInfo
              :info="info"
              @call-click="onCall"
              @route-click="onRoute"
              />
          </div>

          <!-- MAP -->
          <div class="lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div class="w-full h-[320px] sm:h-[360px] lg:h-full">
              <MapPreview
                :static-src="info.mapStaticSrc"
                :iframe-src="info.mapIframeSrc"
                :alt="info.mapAlt"
              />
            </div>
          </div>

          <!-- HOURS -->
          <section
             class="lg:col-start-1 lg:row-start-2"
            aria-labelledby="hours-heading">
            <div
              class="p-4 md:p-5"
              :class="card.class"
              :style="card.style"
            >
              <OpenStatus
                :hours="info.hours"
                :soon-threshold-min="45"
                class="mb-3"
              />

              <h3 id="hours-heading" class="sr-only">Öffnungszeiten</h3>
              <HoursList
                :hours="info.hours"
                />
            </div>
          </section>
      </div>
    </div>
  </section>
</template>
