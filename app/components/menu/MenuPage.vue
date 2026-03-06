<script setup lang="ts">
import { computed } from "vue"
import { resolveMenuBgColor } from "~/utils/menuBackground"
import { slugify } from "~/utils/slugify"
import type { MenuPageModel } from "~/types/menu"

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
const sectionRef = ref<HTMLElement | null>(null)
const showBackToTop = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    const sectionTop = sectionRef.value?.getBoundingClientRect().top ?? 0
    showBackToTop.value = sectionTop < -200
  })
})
</script>
<template>
  <section 
    ref="sectionRef"
    class="relative overflow-hidden text-white"
    :style="{ backgroundColor: bgColor }"
    >
    <MenuBackgroundDecor :motifs="model.background?.motifs" />
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
