import type {
  ReservationApiResponse,
  ReservationRequestBody,
  UpstreamReservationResponse,
} from '~~/types/reservation'

export default defineEventHandler(
  async (event): Promise<ReservationApiResponse> => {
    const body = await readBody<ReservationRequestBody>(event)

    const payload = {
      p_reservation_date:
        typeof body?.p_reservation_date === 'string'
          ? body.p_reservation_date.trim()
          : '',
      p_reservation_time:
        typeof body?.p_reservation_time === 'string'
          ? body.p_reservation_time.trim()
          : '',
      p_party_size:
        typeof body?.p_party_size === 'number'
          ? body.p_party_size
          : Number(body?.p_party_size),
      p_guest_name:
        typeof body?.p_guest_name === 'string'
          ? body.p_guest_name.trim()
          : '',
      p_guest_phone:
        typeof body?.p_guest_phone === 'string'
          ? body.p_guest_phone.trim()
          : '',
      p_guest_email:
        typeof body?.p_guest_email === 'string'
          ? body.p_guest_email.trim()
          : '',
    }

    if (
      !payload.p_reservation_date ||
      !payload.p_reservation_time ||
      !Number.isInteger(payload.p_party_size) ||
      payload.p_party_size <= 0 ||
      !payload.p_guest_name ||
      !payload.p_guest_phone ||
      !payload.p_guest_email
    ) {
      return {
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Missing or invalid required fields.',
        reservation_id: null,
      }
    }

    const config = useRuntimeConfig(event)

    if (!config.n8nWebhookUrl || !config.n8nWebhookKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Server configuration error',
      })
    }

    try {
      const response = await $fetch<UpstreamReservationResponse>(
        config.n8nWebhookUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-webhook-key': config.n8nWebhookKey,
          },
          body: payload,
        },
      )
      const normalizedResponse = Array.isArray(response) ? response[0] : response
      return normalizedResponse as ReservationApiResponse
//      return response as ReservationApiResponse

    } catch (error) {
      console.error('Reservation request failed', error)

      return {
        success: false,
        code: 'REQUEST_FAILED',
        message: 'Reservation request failed.',
        reservation_id: null,
      }
    }
  },
)
