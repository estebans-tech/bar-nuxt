<script setup lang="ts">
import type { CategoryNavItem } from '~/types/categoryNav'
import { useOverlay } from '~/composables/useOverlay'

const props = defineProps<{
  categories: CategoryNavItem[]
  label?: string
  closeLabel?: string
}>()

const {
  isOpen,
  close: closeMenu,
  toggle: toggleMenu,
} = useOverlay()

const onSelectCategory = () => {
  closeMenu()
}

</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-5 right-5 z-40">
      <button
        type="button"
        class="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 shadow-lg transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-black/40"
        :aria-expanded="isOpen"
        aria-haspopup="dialog"
        :aria-label="props.label ?? 'Open menu'"
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>

        <span v-if="props.label" class="text-sm font-medium">
          {{ props.label }}
        </span>
      </button>
    </div>

    <div
      v-if="isOpen"
      class="fixed inset-0 z-50"
    >
      <button
        type="button"
        class="absolute inset-0 bg-black/40 backdrop-blur-sm"
        :aria-label="props.closeLabel ?? 'Close menu'"
        @click="closeMenu"
      />

      <div
        role="dialog"
        aria-modal="true"
        class="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-hidden rounded-t-3xl bg-white shadow-2xl"
      >
        <div class="flex justify-center pt-3">
          <div class="h-1.5 w-12 rounded-full bg-neutral-300" />
        </div>

        <div class="flex items-center justify-between px-4 pb-3 pt-4">
          <div class="min-w-0 flex-1">
            <h2
              v-if="props.label"
              class="text-base font-semibold text-neutral-900"
            >
              {{ props.label }}
            </h2>
          </div>

          <button
            type="button"
            class="ml-4 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-neutral-200 px-3 text-neutral-700 transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-black/30"
            :aria-label="props.closeLabel ?? 'Close menu'"
            @click="closeMenu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6l-12 12" />
            </svg>

            <span
              v-if="props.closeLabel"
              class="text-sm font-medium"
            >
              {{ props.closeLabel }}
            </span>
          </button>
        </div>

        <div class="max-h-[70vh] overflow-y-auto px-4 pb-6">
          <ul class="space-y-2">
            <li
              v-for="category in props.categories"
              :key="category.id"
            >
              <a
                :href="category.href"
                class="block rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
                @click="onSelectCategory"
              >
                {{ category.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
 </Teleport>
</template>
