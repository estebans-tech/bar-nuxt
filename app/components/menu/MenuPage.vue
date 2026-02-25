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
      <MenuQuickNav :categories="categories" />
      <MenuFlow
        :blocks="model.blocks"
        :locale="model.locale"
        :default-currency="model.defaultCurrency"
      />
    <Transition name="fade">
<button
  v-if="showBackToTop"
  @click="sectionRef?.scrollIntoView({ behavior: 'smooth' })"
  class="fixed bottom-6 right-6 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
>
  ↑
</button>
    </Transition>
    </div>
  </section>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
