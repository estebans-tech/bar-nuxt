import { projectRootId } from './config/setup'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-07',
  devtools: { enabled: true },
  nitro: { preset: "netlify" },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/content'],
  typescript: {
    strict: true,
    typeCheck: false, 
  },
  tailwindcss: {
    viewer: false // disable Tailwind viewer in prod
  },
  css: ['~/assets/css/app.css'],
  app: {
    head: {
      title: 'Seña Bar — Cocktail Lounge in Hannover',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Handgemachte Cocktails, gute Musik und lange Nächte — mitten in Hannover'
        },
        {
          name: 'description',
          content: 'Beste Bar in Hannover Südstadt',
        },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'keywords',
          content: 'Bar, Bar, Cocktail, Lounge, Südstadt, Hannover',
        },
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        // { rel: 'manifest', href: '/site.webmanifest' }
      ],
    },
    rootId: projectRootId || 'barAppNuxt',
    buildAssetsDir: '/_nuxt/',
  },
  runtimeConfig: {
    n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
    n8nWebhookKey: process.env.N8N_WEBHOOK_KEY,
    public: {
      // add safe public runtime envs here when needed
    }
  }
})
