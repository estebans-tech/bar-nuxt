<script setup lang="ts">
import PageHeader from '~/components/PageHeader.vue'
// import SectionHeader from '~/components/section-header/SectionHeader.vue'
// import HeroSection from '~/components/hero-section/HeroSection.vue'

// const { data, pending } = await useAsyncData('home', () => queryContent('/sena/json').findOne())

// // computed
// const header = computed(() => data.value?.header)
// const sections = computed(() => data.value?.sections)

// // page meta
// definePageMeta({
//   layout: 'sena-default',
// })
</script>
<template>
  <main>
    <PageHeader />
    <!-- <div v-if="!pending">
      <HeroSection>
        <PageHeader v-if="header" :title="header.title" :description="header.description" :text-centered="true" />
      </HeroSection>

      <section v-for="(section, index) in sections" :key="index">
        <SectionHeader :title="section.header.title" :text-centered="true" :description="section.header.description" />

        <div class="button-group">
          <a v-for="(button, index) in section.buttons" :key="index" :href="button.url" v-html="button.html" />
        </div>
      </section>
    </div>
    <div v-else>Daten laden...</div> -->
  </main>
</template>

