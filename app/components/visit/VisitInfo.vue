<script setup lang="ts">
// Info block for the Visit section (header, address, CTAs, status line)
import LinkButton from '~/components/ui/LinkButton.vue'

// Types
import type { VisitInfo } from '~/types/visit'

// const info = VISIT_INFO
defineProps<{
  info: VisitInfo
}>()

const emit = defineEmits(['call-click', 'route-click'])
</script>

<template>
  <h2 class="text-2xl md:text-3xl font-semibold text-white">
    Hier findest du uns
  </h2>

  <address class="not-italic text-white mt-3 leading-relaxed space-y-1">
    <p class="text-lg font-medium">{{ info.name }}</p>
    <p class="text-white/80">{{ info.street }}</p>
    <p class="text-white/80">{{ info.postalCity }}</p>
  </address>

  <div class="mt-5 sm:mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
    <LinkButton
      size="md"
      :href="info.phoneHref"
      :aria-label="`${info.name} anrufen`"
      @click="emit('call-click')"
    >
      Anrufen
    </LinkButton>

    <LinkButton
      variant="outline"
      size="md"
      :href="info.mapsHref"
      target="_blank"
      aria-label="Route zu Bar Seña öffnen"
      rel="noopener noreferrer"
      @click="emit('route-click')"
    >
      Route öffnen
    </LinkButton>
  </div>
</template>
