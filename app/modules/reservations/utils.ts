import { defaultReservationLabels, defaultReservationMessages } from './copy'
import type {
  ReservationApiResponse,
  ReservationForm,
  ReservationLabels,
  ReservationMessages,
} from './types'

export function createReservationForm(): ReservationForm {
  return {
    p_reservation_date: '',
    p_reservation_time: '',
    p_party_size: 2,
    p_guest_name: '',
    p_guest_phone: '',
    p_guest_email: '',
  }
}

export function mergeReservationLabels(
  labels?: Partial<ReservationLabels>,
): ReservationLabels {
  return {
    ...defaultReservationLabels,
    ...labels,
  }
}

export function mergeReservationMessages(
  messages?: Partial<ReservationMessages>,
): ReservationMessages {
  return {
    ...defaultReservationMessages,
    ...messages,
  }
}

export function resolveReservationMessage(
  response: ReservationApiResponse,
  messages: ReservationMessages,
): { successMessage: string | null; errorMessage: string | null } {
  if (response.success) {
    return {
      successMessage:
        messages[response.code as keyof ReservationMessages] ||
        response.message ||
        messages.RESERVATION_CREATED,
      errorMessage: null,
    }
  }

  return {
    successMessage: null,
    errorMessage:
      messages[response.code as keyof ReservationMessages] ||
      response.message ||
      messages.UNKNOWN_ERROR,
  }
}

export function getReservationTimeConfig(dateString: string): {
  min: string
  max: string
  closed: boolean
} {
  const fallback = {
    min: '17:00',
    max: '22:00',
    closed: false,
  }

  if (!dateString) {
    return fallback
  }

  const date = parseLocalDate(dateString)

  if (!date) {
    return fallback
  }

  const isSunday = date.getDay() === 0
  const month = date.getMonth() + 1
  const day = date.getDate()

  const isWinterClosurePeriod =
    month === 11 ||
    month === 12 ||
    (month === 1 && day <= 4)

  return {
    min: '17:00',
    max: '22:00',
    closed: isSunday && isWinterClosurePeriod,
  }
}

function parseLocalDate(value: string): Date | null {
  const parts = value.split('-')

  if (parts.length !== 3) {
    return null
  }

  const year = Number(parts[0])
  const month = Number(parts[1])
  const day = Number(parts[2])

  if (!year || !month || !day) {
    return null
  }

  return new Date(year, month - 1, day, 12, 0, 0)
}

