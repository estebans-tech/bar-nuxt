<!-- ~/components/sections/MenuLinksSection.vue -->
<script setup lang="ts">
import { useIntersection } from '~/composables/useIntersection'
import { track } from '~/utils/analytics'
import type { MenuLink } from '~/types/menuLink'
import { cardClass } from '~/utils/card'
const plate = cardClass('elegant', { hoverLift: true })

const props = withDefaults(defineProps<{
  title?: string
  intro?: string
  items: MenuLink[]
}>(), {
  title: 'Menüs',
  intro: ''
})

const root = useIntersection({ threshold: 0.35, once: true })
onMounted(() => root.startOnce(() => track('menu_links_impression')))

const onClick = (label: string) => {
  track('menu_link_click', { label })
}
</script>

<template>
  <section ref="root.target" class="bg-onyx w-full min-h-[75vh] h-full py-16 md:py-24 flex items-center">
    <div class="mx-auto w-full max-w-4xl px-6 text-center">
      <h2 class="text-3xl md:text-4xl font-semibold text-white">
        {{ title }}
      </h2>
      <p v-if="intro" class="mt-3 text-white/75">
        {{ intro }}
      </p>

      <!-- Länkar/knappar -->
      <ul
        class="mt-8 grid gap-4 sm:gap-5
               grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
               justify-items-center"
        role="list"
      >
        <li v-for="item in items" :key="item.href" class="w-full my-auto">
          <a
            :href="item.href"
            target="_blank"
            rel="noopener"
            @click="onClick(item.label)"
            :class="[plate.class, 'px-5 py-6 text-left group block transition-colors']"
            :style="plate.style"
            aria-label="Öffnen  {{ item.label }} (PDF) in neuem Fenster"
            >
            <!-- class="group block rounded-2xl ring-1 ring-white/10 bg-white/5 hover:bg-white/7
                   transition-colors px-5 py-6 text-left" -->
            <div
              class="flex items-center gap-4"
              :class="item.badge ? 'justify-between' : 'justify-center'">
              <h3
                class="text-white text-xl font-semibold"
                :class="item.badge ? 'text-left' : 'lg:text-center w-full'">
                {{ item.label }}
              </h3>

              <span
                v-if="item.badge"
                class="inline-flex items-center rounded-full bg-gold/90 text-onyx/90
                      px-4 py-2 text-sm font-semibold ring-1 ring-black/5"
              >
                {{ item.badge }}
              </span>
            </div>

            <p v-if="item.description" class="mt-2 text-white/70 text-sm">
              {{ item.description }}
            </p>

            <!-- PDF meta / ikonrad -->
            <div class="mt-4 flex items-center gap-2 text-white/60 text-sm hidden">
              <span aria-hidden="true">📄</span>
              <span>PDF</span>
              <span class="mx-1">·</span>
              <span class="group-hover:underline">In Fenster öffnen</span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
