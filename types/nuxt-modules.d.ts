import type { ModuleOptions as TailwindModuleOptions } from '@nuxtjs/tailwindcss'

// Teach TS about the '@nuxtjs/tailwindcss' config key in nuxt.config
declare module 'nuxt/schema' {
    interface TailwindModuleOptions {
      viewer?: boolean
    }
    interface NuxtConfig {
      tailwindcss?: TailwindModuleOptions
    }
    interface NuxtOptions {
      tailwindcss?: TailwindModuleOptions
    }
  }
  export {}