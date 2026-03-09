import type { ReservationLabels, ReservationMessages } from './types'

export const defaultReservationLabels: ReservationLabels = {
  title: 'Book a table',
  date: 'Date',
  time: 'Time',
  partySize: 'Guests',
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  submit: 'Send reservation',
  submitting: 'Sending...',
  open: 'Book a table',
}

export const defaultReservationMessages: ReservationMessages = {
  RESERVATION_CREATED: 'Reservation sent.',
  NO_AVAILABILITY: 'No availability for the selected time.',
  VALIDATION_ERROR: 'Please fill in all required fields.',
  REQUEST_FAILED: 'Reservation request failed.',
  UNKNOWN_ERROR: 'Something went wrong.',
}
