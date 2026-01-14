<script setup lang="ts">
import Badge from '~/components/ui/Badge.vue'
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

// const root = useIntersection({ threshold: 0.35, once: true })
// onMounted(() => root.startOnce(() => track('menu_links_impression')))

// const onClick = (label: string) => {
//   track('menu_link_click', { label })
// }
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
          <NuxtLink
            :to="item.href"
            rel="noopener"
            :class="[plate.class, 'px-5 py-6 text-left group block transition-colors']"
            >
            <div
              class="flex items-center gap-4"
              :class="item.badge ? 'justify-between' : 'justify-center'">
              <h3
                class="text-white text-xl font-semibold"
                :class="item.badge ? 'text-left' : 'lg:text-center w-full'">
                {{ item.label }}
              </h3>
              <Badge v-if="item.badge" variant="elegant" tone="gold" size="sm">{{item.badge}}</Badge>

            </div>

            <p v-if="item.description" class="mt-2 text-white/70 text-sm">
              {{ item.description }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
