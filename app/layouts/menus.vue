<script setup>
useHead({
  htmlAttrs: {
    style: 'scroll-behavior: smooth'
  }
})
</script>
<template>
  <div class="menus-layout">
    <slot />
  </div>
</template>

<style scoped>
.menus-layout {
  scroll-behavior: smooth;
}
</style>
