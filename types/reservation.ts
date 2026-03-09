export type ReservationRequestBody = {
  p_reservation_date?: unknown
  p_reservation_time?: unknown
  p_party_size?: unknown
  p_guest_name?: unknown
  p_guest_phone?: unknown
  p_guest_email?: unknown
}

export type ReservationPayload = {
  p_reservation_date: string
  p_reservation_time: string
  p_party_size: number
  p_guest_name: string
  p_guest_phone: string
  p_guest_email: string
}

export type UpstreamReservationResponse = {
  success?: unknown
  code?: unknown
  message?: unknown
  reservation_id?: unknown
}

export type ReservationApiResponse = {
  success: boolean
  code: string
  message: string
  reservation_id: number | null
}
