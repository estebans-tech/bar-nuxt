<script setup lang="ts">
import { btnClass } from '~/utils/button'
import type { ButtonVariant, ButtonSize } from '~/types/button'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  size?: ButtonSize
  full?: boolean
  to?: string
  href?: string
  target?: string
  rel?: string
  ariaLabel?: string
  pill?: boolean // new: choose pill or rounded
}>(), {
  variant: 'primary',
  size: 'md',
  full: false,
  type: 'button',
  disabled: false,
  loading: false,
  pill: false
})

const classes = computed(() => btnClass(props.variant, props.size, props.full, props.pill))
const computedRel = computed(() =>
  props.rel ?? (props.target === '_blank' ? 'noopener noreferrer' : undefined)
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :aria-label="ariaLabel"
    :class="classes"
  >
    <slot />
  </NuxtLink>
  <!-- external link -->
  <a
    v-else
    :href="href"
    :target="target"
    :rel="computedRel"
    :aria-label="ariaLabel"
    :class="classes"
  >
    <slot />
  </a>
</template>
