<script setup lang="ts">
import type { CurrencyCode, DietaryTag, Locale, MenuItem } from "~/types/menu"

defineProps<{
  item: MenuItem
  locale: Locale
  defaultCurrency?: CurrencyCode
}>()

const hasTags = (tags?: DietaryTag[]) => (tags?.length ?? 0) > 0

function formatMeasure(measure: any): string {
  if (!measure) return ""
  if (measure.label) return String(measure.label)

  // quantity + unit
  if (measure.quantity != null && measure.unit) {
    const q = Number(measure.quantity)
    const u = String(measure.unit)

    // Pretty-print ml as liters for menu readability
    if (u === "ml") {
      const l = q / 1000
      // de-style comma
      const s = (Math.round(l * 100) / 100).toString().replace(".", ",")
      return `${s}l`
    }

    return `${q}${u}`
  }

  return ""
}

function lineLabel(line: any): string {
  const parts: string[] = []
  if (line?.label) parts.push(String(line.label))
  if (line?.unit) parts.push(String(line.unit))
  return parts.join(" · ")
}
</script>

<template>
  <div class="flex items-baseline justify-between gap-4">
    <div class="min-w-0">
      <span class="font-semibold tracking-wide">
        {{ item.name }}
      </span>

      <MenuItemBadges
        v-if="hasTags(item.tags)"
        class="ml-2"
        :tags="item.tags!"
      />
    </div>

    <div v-if="item.prices?.length" class="text-right space-y-1">
      <div
        v-for="(line, idx) in item.prices"
        :key="lineLabel(line) || idx"
        class="flex justify-end items-baseline gap-3"
      >
        <span v-if="lineLabel(line)" class="text-sm opacity-80">
          {{ lineLabel(line) }}
        </span>

        <MenuPrice
          :money="line.price"
          :locale="locale"
          :default-currency="defaultCurrency"
        />
      </div>
    </div>
    <MenuPrice
      v-else-if="item.price"
      :money="item.price"
      :locale="locale"
      :default-currency="defaultCurrency"
    />
  </div>
</template>
