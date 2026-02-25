<script setup lang="ts">
import { computed } from "vue"
import { resolveMenuBgColor } from "~/utils/menuBackground"
import { slugify } from "~/utils/slugify"
import type { MenuPageModel } from "~/types/menu"
import { w } from "happy-dom/lib/PropertySymbol";

const props = defineProps<{
        model: MenuPageModel
    }>()

const bgColor = computed(
  () => resolveMenuBgColor(props.model.background?.color) ?? "#3f6977"
)

const categories = computed(() => 
    props.model.blocks
        .filter((block) => block.type === 'category')
        .map((block) => ({
            id: slugify(block.title),
            title: block.title
    }))
)
</script>
<template>
  <section 
        class="relative overflow-hidden text-white"
        :style="{ backgroundColor: bgColor }"
        >
    <MenuBackgroundDecor :motifs="model.background?.motifs" />
    <div class="relative mx-auto max-w-6xl px-8 py-10">
      <MenuHeader :title="model.pageTitle" v-if="model.pageTitle" />
      <MenuQuickNav :categories="categories" />
      <MenuFlow
        :blocks="model.blocks"
        :locale="model.locale"
        :default-currency="model.defaultCurrency"
      />
    </div>
  </section>
</template>

