// ESLint for Nuxt 4 + Vue 3 + TS, aligned with Prettier
module.exports = {
    root: true,
    extends: [
      '@nuxt/eslint-config',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:vue/vue3-recommended',
      'plugin:unicorn/recommended',
      'prettier'
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    rules: {
      // Keep style aligned with Prettier
      semi: ['error', 'never'],
      'vue/multi-word-component-names': 'off', // allow single-word SFC names
      'unicorn/prefer-module': 'off', // Nuxt uses ESM but this rule is noisy
      'unicorn/filename-case': 'off', // keep Vue SFC names as-is
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
          groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']]
        }
      ]
    },
    overrides: [
      {
        files: ['**/*.spec.{js,ts}', '**/tests/**'],
        // Provide Vitest globals without adding an extra plugin
        globals: { describe: 'readonly', it: 'readonly', expect: 'readonly', vi: 'readonly' }
      }
    ]
  }
  