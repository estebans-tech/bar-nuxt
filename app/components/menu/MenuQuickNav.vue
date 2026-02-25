<script setup lang="ts">
defineProps<{
  categories: { id: string; title: string }[]
}>()
</script>
<template>
  <nav
    v-if="categories.length"
    class="lg:hidden flex gap-3 overflow-x-auto pb-2 mb-6 scrollbar-none"
  >
    <a
      v-for="cat in categories"
      :key="cat.id"
      :href="`#${cat.id}`"
      class="whitespace-nowrap rounded-full border border-white/40 px-4 py-1.5 text-sm text-white/80 hover:text-white hover:border-white transition-colors"
    >
      {{ cat.title }}
    </a>
  </nav>
</template>

