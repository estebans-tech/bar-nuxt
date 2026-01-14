<script setup lang="ts">
import { computed } from "vue"
import type { CurrencyCode, Locale, Money } from "~/types/menu"

const props = defineProps<{
  money: Money
  locale: Locale
  defaultCurrency?: CurrencyCode
}>()

const formattedPrice = computed(() => {
const currency = props.money.currency || props.defaultCurrency || "EUR"

  return new Intl.NumberFormat(props.locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(props.money.amount)
})
</script>

<template>
  <span class="whitespace-nowrap font-semibold tracking-wide">
    {{ formattedPrice }}
  </span>
</template>






