<script setup lang="ts">
import type { CurrencyCode, Locale, MenuBlock } from "~/types/menu"

defineProps<{
  blocks: MenuBlock[]
  locale: Locale
  defaultCurrency?: CurrencyCode
}>()

const blockKey = (block: MenuBlock, index: number) => {
  if (block.type === "item") return `item-${block.item.id}`
  if (block.type === "category") return `category-${block.title}-${index}`
  if (block.type === "note") return `note-${index}`
  return `callout-${block.title}-${index}`
}
</script>

<template>
  <div class="columns-1 lg:columns-2 lg:[column-gap:3.5rem]">
    <div
      v-for="(block, index) in blocks"
      :key="blockKey(block, index)"
      class="mb-8 break-inside-avoid"
    >
      <MenuCalloutCard
        v-if="block.type === 'callout'"
        :title="block.title"
        :body="block.body"
        :variant="block.variant"
      />

      <MenuCategoryHeader
        v-else-if="block.type === 'category'"
        :title="block.title"
        :subtitle="block.subtitle"
      />

      <MenuNote
        v-else-if="block.type === 'note'"
        :body="block.body"
      />

      <MenuItemRow
        v-else-if="block.type='item'"
        :item="block.item"
        :locale="locale"
        :default-currency="defaultCurrency"
      />
    </div>
  </div>
</template>
