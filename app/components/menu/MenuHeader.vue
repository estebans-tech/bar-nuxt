<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <header class="mb-10">
        <h1 class="text-[#d8c08a] text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
      {{ title }}
    </h1>
  </header>
</template>
