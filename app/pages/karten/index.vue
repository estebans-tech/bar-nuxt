<script setup lang="ts">
import MenuLinksSection from '~/components/menu/PdfLinks.vue'
import HeroSection from '~/components/hero/HeroSection.vue'
import OffersSection from '~/components/offer/OffersSection.vue'
import SiteFooter from '~/components/footer/SiteFooter.vue'
import { PDF_MENU } from '~/constants//pdf-menu'
import { OFFERS, OFFER_HEADING } from '~/constants/offers'

const hero = {
  title: 'Unsere Speise- und Getränkekarten',
  subtitle: 'Auf unserer Speisekarte findet ihr Gerichte wie Enchilada, Bruschetta, Pizza, Tapas und eine Auswahl an Salaten.',
  heroImage: '/images/food/pizza.avif',
  happyHour: { active: true, text: 'Happy Hour täglich 17–19 Uhr — Alle Cocktails 7,95 €' },
  phoneHref: '',
  mapsHref: '',
  openInfo: 'Heute geöffnet ab 17:00'
}
</script>
<template>
    <main>
    <HeroSection v-bind="hero" />
<OffersSection
      :title="OFFER_HEADING.title"
      :subtitle="OFFER_HEADING.subtitle"
      variant="elegant"
      hoverLift
      :items="OFFERS"
    />
        <section>
        </section>
       <MenuLinksSection
          title="Cocktails & Menüs"
          :intro="'Unsere aktuellen Karten als PDF.'"
          :items="PDF_MENU"
          class="h-[100vh]"
        />
    </main>
  <SiteFooter />
</template>

