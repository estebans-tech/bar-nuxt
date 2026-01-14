<script setup lang="ts">
import type { CurrencyCode, DietaryTag, Locale, Money } from "~/types/menu"

defineProps<{
  name: string
  tags?: DietaryTag[]
  price: Money
  locale: Locale
  defaultCurrency?: CurrencyCode
}>()

const hasTags = (tags?: DietaryTag[]) => (tags?.length ?? 0) > 0
</script>

<template>
  <div class="flex items-baseline justify-between gap-4">
    <div class="min-w-0">
      <span class="font-semibold tracking-wide">
        {{ name }}
      </span>

      <MenuItemBadges
        v-if="hasTags(tags)"
        class="ml-2"
        :tags="tags!"
      />
    </div>

    <MenuPrice
      :money="price"
      :locale="locale"
      :default-currency="defaultCurrency"
    />
  </div>
</template>
