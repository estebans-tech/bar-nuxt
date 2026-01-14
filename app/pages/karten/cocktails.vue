<script setup lang="ts">
import SiteFooter from '~/components/footer/SiteFooter.vue'
import type { MenuPageModel } from "~/types/menu"

const { data: model } = await useAsyncData("menu-cocktails", () =>
  queryCollection("menus")
    .where("stem", "=", "menus/karte/cocktails")
    .first()
)
</script>

<template>
  <MenuPage v-if="model" :model="model as unknown as MenuPageModel" />
  <SiteFooter />
</template>
