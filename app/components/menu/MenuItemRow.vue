<script setup lang="ts">
import type { CurrencyCode, Locale, MenuItem } from "~/types/menu"

defineProps<{
  item: MenuItem
  locale: Locale
  defaultCurrency?: CurrencyCode
}>()

const hasAllergens = (item: MenuItem) => (item.allergens?.length ?? 0) > 0
</script>

<template>
  <article>
    <MenuItemTitleLine
      :item="item"
      :locale="locale"
      :default-currency="defaultCurrency"
    />

    <div class="mt-1">
      <MenuItemDescription :description="item.description" />
    </div>

    <MenuItemAllergens
      v-if="hasAllergens(item)"
      class="mt-2"
      :allergens="item.allergens!"
    />
  </article>
</template>
