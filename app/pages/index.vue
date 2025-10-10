<script setup lang="ts">
// Home page bootstrapping HeroSection
import HeroSection from '~/components/hero/HeroSection.vue'
import { PHONE_HREF, MAPS_HREF } from '~/constants/links'

const hero = {
  title: 'Willkommen in der Seña Bar',
  subtitle: 'Handgemachte Cocktails und gute Musik im Herzen von Hannover',
  heroImage: '/images/hero/Cocktail6.avif',
  happyHour: {
    active: true,
    text: 'Happy Hour täglich 17–19 Uhr — Alle Cocktails 7,95 €'
  },
  phoneHref: PHONE_HREF,
  mapsHref: MAPS_HREF,
  openInfo: 'Heute geöffnet ab 17:00'
}
</script>

<template>
  <main>
    <HeroSection v-bind="hero" />
  </main>
</template>