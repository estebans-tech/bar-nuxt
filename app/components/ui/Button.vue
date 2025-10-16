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
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
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
const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel || (target === '_blank' ? 'noopener noreferrer' : undefined)"
    :type="tag === 'button' ? type : undefined"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :aria-busy="loading || undefined"
    :aria-label="ariaLabel"
    :class="classes"
  >
    <slot />
    <svg
      v-if="loading"
      class="ml-2 h-4 w-4 animate-spin text-current"
      viewBox="0 0 24 24" aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" class="opacity-20" stroke="currentColor" stroke-width="4" fill="none" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" stroke-width="4" fill="none" />
    </svg>
  </component>
</template>
