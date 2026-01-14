<script setup lang="ts">
import type { MenuPageModel } from "~/types/menu"

const model2: MenuPageModel = {
  pageTitle: "Speisekarte",
  locale: "de-DE",
  defaultCurrency: "EUR",
  blocks: [
    { type: "callout", title: "Montag ist Pizzatag", body: ["...", "..."], variant: "promo" },

    { type: "category", title: "PIZZA", subtitle: "Weizentortilla Boden, 30 cm, extra dünn" },
    { type: "item", item: { id: "pizza-salami", name: "Salami", description: "...", price: { amount: 12.9, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },
    { type: "item", item: { id: "pizza-leni", name: "Leni", description: "...", price: { amount: 12.9, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },
    { type: "item", item: { id: "pizza-caprese", name: "Caprese", description: "Tomatensauce, Tomaten, Mozzarella", price: { amount: 12.9, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },

    { type: "category", title: "PASTA" },
    { type: "item", item: { id: "pasta-linguine-1", name: "Linguine", description: "...", price: { amount: 13.5, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },
    { type: "item", item: { id: "pasta-linguine-1", name: "Linguine", description: "...", price: { amount: 13.5, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },
    { type: "item", item: { id: "pasta-linguine-1", name: "Linguine", description: "...", price: { amount: 13.5, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },
    { type: "item", item: { id: "pasta-linguine-1", name: "Linguine", description: "...", price: { amount: 13.5, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },

    { type: "note", body: "Die Küche ist bis 22.00 Uhr geöffnet. Danach servieren wir weiter mit ☆ gekennzeichnete Snacks!" },

    { type: "callout", title: "Mittwoch ist Salattag", body: ["...", "..."], variant: "promo" },

    { type: "category", title: "ENCHILADAS", subtitle: ["Gefüllte Weizentortillas mit Käse überbacken.", "Serviert mit Salatabeilage"] },
    { type: "item", item: { id: "ench-veg", name: "Vegetarisch", description: "...", price: { amount: 17.5, currency: "EUR" }, allergens: ["GLUTEN", "MILK"] } },
    { type: "category", title: "SALATE DER SAISON", subtitle: ["Gemischter frischer Salat mit", "verschiedenen Hauptzutaten."] },
    // ... fler enchiladas    // lägg in block här (callout/category/item)
  ]
}
const { data: model } = await useAsyncData("menu-speise", () =>
  queryCollection("menus")
    .where("stem", "=", "menus/karte/speise")
    .first()
)
</script>

<template>
  <MenuPage v-if="model" :model="model as unknown as MenuPageModel" />
    <!-- <MenuPage :model="model" /> -->
</template>
