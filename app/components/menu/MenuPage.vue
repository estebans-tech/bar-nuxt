<script setup lang="ts">
import type { MenuPageModel } from "~/types/menu"

defineProps<{
  model: MenuPageModel
}>()
</script>
<template>
  <section class="relative overflow-hidden bg-[#3f6977] text-white">
    <MenuBackgroundDecor />

    <div class="relative mx-auto max-w-6xl px-8 py-10">
      <MenuHeader :title="model.pageTitle" />

      <MenuFlow
        :blocks="model.blocks"
        :locale="model.locale"
        :default-currency="model.defaultCurrency"
      />
    </div>
  </section>
</template>

