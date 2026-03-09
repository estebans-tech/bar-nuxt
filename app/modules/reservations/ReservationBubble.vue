<script setup lang="ts">
import type {
  ReservationApiResponse,
  ReservationBubbleProps,
} from './types'
import {
  createReservationForm,
  getReservationTimeConfig,
  mergeReservationLabels,
  mergeReservationMessages,
  resolveReservationMessage,
} from './utils'

const props = withDefaults(defineProps<ReservationBubbleProps>(), {
  endpoint: '/api/reservations',
  labels: () => ({}),
  messages: () => ({}),
})

const open = ref(false)
const loading = ref(false)
const successMessage = ref<string | null>(null)
const errorMessage = ref<string | null>(null)

const form = reactive(createReservationForm())

const labels = computed(() => mergeReservationLabels(props.labels))
const messages = computed(() => mergeReservationMessages(props.messages))

async function submitReservation(): Promise<void> {
  loading.value = true
  successMessage.value = null
  errorMessage.value = null

  try {
    const response = await $fetch<ReservationApiResponse>(props.endpoint, {
      method: 'POST',
      body: {
        p_reservation_date: form.p_reservation_date,
        p_reservation_time: form.p_reservation_time,
        p_party_size: form.p_party_size,
        p_guest_name: form.p_guest_name,
        p_guest_phone: form.p_guest_phone,
        p_guest_email: form.p_guest_email,
      },
    })

    const resolved = resolveReservationMessage(response, messages.value)
    successMessage.value = resolved.successMessage
    errorMessage.value = resolved.errorMessage
  } catch (error) {
    console.error('Reservation submit failed', error)
    successMessage.value = null
    errorMessage.value = messages.value.REQUEST_FAILED
  } finally {
    loading.value = false
  }
}

const timeConfig = computed(() =>
  getReservationTimeConfig(form.p_reservation_date),
)

const isClosedDate = computed(() => timeConfig.value.closed)

watch(
  () => form.p_reservation_date,
  () => {
    successMessage.value = null
    errorMessage.value = null

    if (isClosedDate.value) {
      form.p_reservation_time = ''
      errorMessage.value = 'Closed on Sundays from Nov 1 to Jan 4.'
      return
    }

    if (
      form.p_reservation_time &&
      (
        form.p_reservation_time < timeConfig.value.min ||
        form.p_reservation_time > timeConfig.value.max
      )
    ) {
      form.p_reservation_time = ''
    }
  },
)

function closeReservation(): void {
  open.value = false
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape' && open.value) {
    closeReservation()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>
<template>
  <div>
    <button
      v-if="!open"
      type="button"
      class="fixed bottom-6 right-6 z-50 rounded-full bg-yellow-500 px-5 py-3 text-base font-semibold text-black shadow-lg transition hover:scale-[1.02]"
      @click="open = true"
    >
      {{ labels.open }}
    </button>

    <div
      v-if="open"
      class="fixed inset-0 z-50"
      aria-modal="true"
      role="dialog"
    >
      <button
        type="button"
        class="absolute inset-0 h-full w-full bg-black/60 backdrop-blur-[2px]"
        aria-label="Close reservation dialog"
        @click="closeReservation"
      />

      <div
        class="absolute bottom-24 right-6 w-[440px] max-w-[calc(100vw-2rem)] rounded-[24px] border border-white/10 bg-black p-6 text-white shadow-2xl"
        @click.stop
      >
        <h2 class="mb-5 text-2xl font-bold">
          {{ labels.title }}
        </h2>

        <div class="space-y-4">
          <input
            v-model="form.p_reservation_date"
            type="date"
            class="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-lg outline-none placeholder:text-zinc-400"
            :placeholder="labels.date"
          />

          <input
            v-model="form.p_reservation_time"
            type="time"
            :min="timeConfig.min"
            :max="timeConfig.max"
            step="900"
            :disabled="isClosedDate"
            class="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-lg outline-none placeholder:text-zinc-400 disabled:opacity-50"
            :placeholder="labels.time"
          />

          <input
            v-model.number="form.p_party_size"
            type="number"
            min="1"
            class="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-lg outline-none placeholder:text-zinc-400"
            :placeholder="labels.partySize"
          />

          <input
            v-model="form.p_guest_name"
            type="text"
            class="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-lg outline-none placeholder:text-zinc-400"
            :placeholder="labels.name"
          />

          <input
            v-model="form.p_guest_phone"
            type="text"
            class="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-lg outline-none placeholder:text-zinc-400"
            :placeholder="labels.phone"
          />

          <input
            v-model="form.p_guest_email"
            type="email"
            class="w-full rounded-2xl bg-zinc-900 px-5 py-4 text-lg outline-none placeholder:text-zinc-400"
            :placeholder="labels.email"
          />

          <button
            type="button"
            class="w-full rounded-2xl bg-yellow-500 px-5 py-4 text-lg font-semibold text-black disabled:opacity-60"
            :disabled="loading || isClosedDate"
            @click="submitReservation"
          >
            {{ loading ? labels.submitting : labels.submit }}
          </button>

          <p
            v-if="successMessage"
            class="text-base text-green-400"
          >
            {{ successMessage }}
          </p>

          <p
            v-if="errorMessage"
            class="text-base text-red-400"
          >
            {{ errorMessage }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

