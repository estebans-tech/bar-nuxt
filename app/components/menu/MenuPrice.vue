<script setup lang="ts">
import { computed } from "vue"
import type { CurrencyCode, Locale, Money } from "~/types/menu"

const props = defineProps<{
  money?: Money | null
  locale: Locale
  defaultCurrency?: CurrencyCode
}>()

const formattedPrice = computed(() => {
  const amount = props.money?.amount
  if (amount === undefined || amount === null) return ""

  const currency = props.money?.currency ?? props.defaultCurrency ?? "EUR"

  return new Intl.NumberFormat(props.locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
})
</script>

<template>
  <span v-if="formattedPrice" class="whitespace-nowrap font-semibold tracking-wide">
    {{ formattedPrice }}
  </span>
</template>
