import type {
  ReservationApiResponse,
  ReservationPayload,
  ReservationRequestBody,
  UpstreamReservationResponse,
} from '~~/types/reservation'

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function toPositiveInteger(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)

    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed
    }
  }

  return null
}

function toReservationId(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number(value)

    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed
    }
  }

  return null
}

export function buildReservationPayload(
  body: ReservationRequestBody,
): ReservationPayload | null {
  const p_reservation_date = isNonEmptyString(body.p_reservation_date)
    ? body.p_reservation_date.trim()
    : ''
  const p_reservation_time = isNonEmptyString(body.p_reservation_time)
    ? body.p_reservation_time.trim()
    : ''
  const p_guest_name = isNonEmptyString(body.p_guest_name)
    ? body.p_guest_name.trim()
    : ''
  const p_guest_phone = isNonEmptyString(body.p_guest_phone)
    ? body.p_guest_phone.trim()
    : ''
  const p_guest_email = isNonEmptyString(body.p_guest_email)
    ? body.p_guest_email.trim()
    : ''
  const p_party_size = toPositiveInteger(body.p_party_size)

  if (
    !p_reservation_date ||
    !p_reservation_time ||
    !p_party_size ||
    !p_guest_name ||
    !p_guest_phone ||
    !p_guest_email
  ) {
    return null
  }

  return {
    p_reservation_date,
    p_reservation_time,
    p_party_size,
    p_guest_name,
    p_guest_phone,
    p_guest_email,
  }
}

export function normalizeReservationResponse(
  response: UpstreamReservationResponse,
): ReservationApiResponse {
  const success = response.success === true
  const reservation_id = toReservationId(response.reservation_id)

  if (success) {
    return {
      success: true,
      code:
        typeof response.code === 'string' && response.code.trim() !== ''
          ? response.code
          : 'RESERVATION_CREATED',
      message:
        typeof response.message === 'string' && response.message.trim() !== ''
          ? response.message
          : 'Reservation created',
      reservation_id,
    }
  }

  return {
    success: false,
    code:
      typeof response.code === 'string' && response.code.trim() !== ''
        ? response.code
        : 'UNKNOWN_ERROR',
    message:
      typeof response.message === 'string' && response.message.trim() !== ''
        ? response.message
        : 'Unknown error',
    reservation_id,
  }
}

export function validationErrorResponse(): ReservationApiResponse {
  return {
    success: false,
    code: 'VALIDATION_ERROR',
    message: 'Missing or invalid required fields',
    reservation_id: null,
  }
}

export function requestFailedResponse(): ReservationApiResponse {
  return {
    success: false,
    code: 'REQUEST_FAILED',
    message: 'Reservation request failed',
    reservation_id: null,
  }
}
