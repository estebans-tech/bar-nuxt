// Tailwind for Nuxt 4 module, keeps scanning common Nuxt paths
import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './app/modules/**/*.{vue,js,ts}',
  ],
  theme: {
    fontFamily: {
        sans: ['"Open Sans"', 'Helvetica', 'serif'],
    },
    extend: {
      colors: {
        onyx: '#0E0E0E',
        gold: '#E0A731',
        sena: 'rgb(234 191 60)',
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: []
} satisfies Config
