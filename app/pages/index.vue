<script setup lang="ts">
import HeroSection from '~/components/hero/HeroSection.vue'
import SignatureCarousel from '~/components/cocktail/SignatureCarousel.vue'
import VisitSection from '~/components/visit/VisitSection.vue'
import VibeGallerySection from '~/components/gallery/VibeGallerySection.vue'
import SiteFooter from '~/components/footer/SiteFooter.vue'
import MenuLinksSection from '~/components/menu/PdfLinks.vue'
import OffersSection from '~/components/offer/OffersSection.vue'

import { SIGNATURE_COCKTAILS } from '~/constants/cocktails'
import { PHONE_HREF, MAPS_HREF } from '~/constants/links'
import { PDF_MENU } from '~/constants//pdf-menu'
import { OFFERS, OFFER_HEADING } from '~/constants/offers'

const hero = {
  title: 'Willkommen in der Seña Bar',
  subtitle: 'Handgemachte Cocktails und gute Musik im Herzen von Hannover',
  heroImage: '/images/hero/bg-sena-bar.avif',
  happyHour: { active: true, text: 'Happy Hour täglich 17–19 Uhr — Alle Cocktails 7,95 €' },
  phoneHref: PHONE_HREF,
  mapsHref: MAPS_HREF,
  openInfo: 'Heute geöffnet ab 17:00'
}
</script>

<template>
  <main>
    <HeroSection v-bind="hero" />

    <MenuLinksSection
      title="Cocktails & Menüs"
      :intro="'Unsere aktuellen Karten als PDF zum Download.'"
      :items="PDF_MENU"
    />
    <OffersSection
      :title="OFFER_HEADING.title"
      :subtitle="OFFER_HEADING.subtitle"
      variant="elegant"
      hoverLift
      :items="OFFERS"
    />
    <SignatureCarousel
      :items="SIGNATURE_COCKTAILS"
      :title="'Signature Cocktails'"
    />

    <VibeGallerySection />
    <VisitSection id="visit" />
  </main>
  <SiteFooter />
</template>
