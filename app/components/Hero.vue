<script setup lang="ts">
import { btnClass } from '~/utils/button'

const props = withDefaults(defineProps<{
  variant?: 'full' | 'half'
  type?: 'dark' | 'light'
}>(), {
  variant: 'full',
  type: 'dark'
})

const classes = computed(() => [
    props.variant,
    props.type
  ].join(' '))
</script>

<template>
  <section class="flex flex-col justify-between min-h-screen items-center bg-onyx/95 py-12 md:py-16" :class="classes">
    <div class="flex items-center flex-grow flex-shrink-0">
      <slot />
    </div>
  </section>
</template>