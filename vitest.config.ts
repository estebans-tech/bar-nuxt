// Vitest setup for Vue/Nuxt unit tests
import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { fileURLToPath, URL } from 'node:url'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  test: {
    globals: true, // saves importing describe/it/expect on test files
    projects: [
      {
        resolve: {
            alias: {
              '~': r('./app'),
              '@': r('./app'),
           },
        },
        test: {
          name: 'unit',
          environment: 'happy-dom',
          css: true,
          include: [
            'test/unit/**/*.{test,spec}.ts',
            'test/components/**/*.{test,spec}.ts',
            'test/composables/**/*.{test,spec}.ts',
            'test/tools/**/*.{test,spec}.ts',
            'test/app/**/*.{test,spec}.ts',
          ]
        }
      },
      await defineVitestProject({
        domEnvironment: 'jsdom',
        test: {
          name: 'nuxt',
          environment: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
        }
      }),
    ]
  }
})

