<script setup lang="ts">
import { computed } from "vue"
import { resolveMenuBgColor } from "~/utils/menuBackground"
import type { MenuPageModel } from "~/types/menu"

const props = defineProps<{
        model: MenuPageModel
    }>()

const bgColor = computed(
  () => resolveMenuBgColor(props.model.background?.color) ?? "#3f6977"
)
</script>
<template>
  <section 
        class="relative overflow-hidden text-white"
        :style="{ backgroundColor: bgColor }"
    >
        <!--    <MenuBackgroundDecor motifs="model.background?.motif" /> -->

    <div class="relative mx-auto max-w-6xl px-8 py-10">
      <MenuHeader :title="model.pageTitle" v-if="model.pageTitle" />

      <MenuFlow
        :blocks="model.blocks"
        :locale="model.locale"
        :default-currency="model.defaultCurrency"
      />
    </div>
  </section>
</template>

