<script setup lang="ts">
// Thin wrapper around badgeClass util
import { computed } from 'vue'
import { badgeClass } from '~/utils/badge'
import type { BadgeVariant, BadgeSize, BadgeTone } from '~/types/badge'

const props = withDefaults(defineProps<{
  label?: string
  variant?: BadgeVariant
  size?: BadgeSize
  tone?: BadgeTone
  hover?: boolean
  as?: string
}>(), {
  variant: 'elegant',
  size: 'sm',
  tone: 'neutral',
  hover: false,
  as: 'span'
})

const cssClass = computed(() => badgeClass(props.variant, props.size, props.tone, props.hover))
</script>

<template>
  <component :is="as" :class="cssClass">
    <slot>{{ props.label }}</slot>
  </component>
</template>