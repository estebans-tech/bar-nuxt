export type ReservationApiResponse = {
  success: boolean
  code: string
  message: string
  reservation_id: number | null
}

export type ReservationLabels = {
  title: string
  date: string
  time: string
  partySize: string
  name: string
  phone: string
  email: string
  submit: string
  submitting: string
  open: string
}

export type ReservationMessages = {
  RESERVATION_CREATED: string
  NO_AVAILABILITY: string
  VALIDATION_ERROR: string
  REQUEST_FAILED: string
  UNKNOWN_ERROR: string
}

export type ReservationForm = {
  p_reservation_date: string
  p_reservation_time: string
  p_party_size: number
  p_guest_name: string
  p_guest_phone: string
  p_guest_email: string
}

export type ReservationBubbleProps = {
  endpoint?: string
  labels?: Partial<ReservationLabels>
  messages?: Partial<ReservationMessages>
}
