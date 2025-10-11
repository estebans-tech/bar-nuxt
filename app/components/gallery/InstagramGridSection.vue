<script setup lang="ts">
// Simple, responsive vibe grid with CTA to Instagram
import { INSTAGRAM } from '~/constants/gallery'
import Button from '~/components/ui/Button.vue'
import { useIntersection } from '~/composables/useIntersection'

import { useAnalytics } from '~/composables/useAnalytics'

const ig = INSTAGRAM

const root = useIntersection({ threshold: 0.4, once: true })
const { view, click } = useAnalytics()

onMounted(() => {
  root.startOnce(() => view('instagram_grid_impression'))
})

const onProfileClick = () => click('instagram_profile_click', { href: ig.href })
</script>

<template>
  <section ref="root.target" class="bg-onyx py-12 md:py-16">
    <div class="mx-auto w-full max-w-6xl xl:max-w-7xl px-6">
      <header class="flex items-end justify-between gap-4">
        <!-- <div> -->
          <h2 class="text-2xl md:text-3xl font-semibold text-white">
            Ein Blick in die Nacht
          </h2>
          <p class="mt-1 text-white/70">
            Momente aus der Bar – mehr auf Instagram
          </p>
        <!-- </div> -->

        <Button
          class="hidden md:inline-flex"
          variant="outline"
          size="md"
          :href="ig.href"
          target="_blank"
          rel="noopener"
          aria-label="Open Instagram profile"
          @click="onProfileClick"
        >
          {{ ig.handle || 'Instagram' }}
        </Button>
      </header>

      <!-- Grid: 2 / 3 / 4 columns -->
      <div class="mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
        <figure
          v-for="img in ig.images"
          :key="img.src"
          class="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05] select-none"
            draggable="false"
          />
          <!-- subtle overlay on hover -->
          <div
            class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                   bg-black/0 group-hover:bg-black/10"
            aria-hidden="true"
          />
          <figcaption class="sr-only">{{ img.alt }}</figcaption>
        </figure>
      </div>

      <!-- Mobile CTA -->
      <div class="mt-6 md:hidden">
        <Button
          variant="outline"
          size="md"
          :href="ig.href"
          target="_blank"
          rel="noopener"
          aria-label="Open Instagram profile"
          @click="onProfileClick"
        >
          {{ ig.handle || 'Instagram' }}
        </Button>
      </div>
    </div>
  </section>
</template>
