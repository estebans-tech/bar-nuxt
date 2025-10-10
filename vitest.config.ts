// Vitest setup for Vue/Nuxt unit tests
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/unit/**/*.spec.{js,ts}'],
    setupFiles: ['tests/unit/setup.ts'], // create when you add testing-library, etc.
    css: true
  }
})
