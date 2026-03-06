<script setup lang="ts">
import SiteFooter from '~/components/footer/SiteFooter.vue'
import StickyCategoryNav from '~/components/menu/StickyCategoryNav.vue'
import { useMenuCategories } from '~/composables/useMenuCategories'
import type { MenuPageModel } from "~/types/menu"

const { data: model4 } = await useAsyncData("menu-cocktails-4", () =>
  queryCollection("menus")
    .where("stem", "=", "menus/karte/cocktails4")
    .first()
)
const { data: model3 } = await useAsyncData("menu-cocktails-3", () =>
  queryCollection("menus")
    .where("stem", "=", "menus/karte/cocktails3")
    .first()
)
const { data: model2 } = await useAsyncData("menu-cocktails-2", () =>
  queryCollection("menus")
    .where("stem", "=", "menus/karte/cocktails2")
    .first()
)
const { data: model } = await useAsyncData("menu-cocktails", () =>
  queryCollection("menus")
    .where("stem", "=", "menus/karte/cocktails")
    .first()
)

const menuModels = computed<(MenuPageModel | null | undefined)[]>(() => [
  model.value,
  model2.value,
  model3.value,
  model4.value,
])

const { categories } = useMenuCategories(menuModels)

definePageMeta({
  layout: 'menus'
})
</script>

<template>
  <StickyCategoryNav
    :categories="categories"
    label="Kategorie"
    footer-selector="#site-footer"
  />
  <MenuPage v-if="model" :model="model as unknown as MenuPageModel" />
  <MenuPage v-if="model2" :model="model2 as unknown as MenuPageModel" />
  <MenuPage v-if="model3" :model="model3 as unknown as MenuPageModel" />
  <MenuPage v-if="model4" :model="model4 as unknown as MenuPageModel" />
  <SiteFooter id="site-footer" />
</template>
