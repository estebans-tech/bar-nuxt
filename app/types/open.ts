import type { Weekday } from '~/types/visit'

export type OpenState = 'open' | 'soon' | 'closed'
export type OpenStatus = {
  state: OpenState
  text: string
  until?: Date
  openAt?: Date
  dayKey: Weekday
}

export type TimeRange = {
  startMin: number
  endMin: number | null        // null => no closing time (Open End)
  openEnd: boolean
  overnight: boolean           // end < start (spans past midnight)
}

export type NextChange =
  | { opensAt: { day: Weekday, min: number } }
  | { closesAt: { day: Weekday, min: number, openEnd: boolean } }

// Options for the composable
export type UseOpenStatusOpts = {
  tz?: string
  soonThresholdMin?: number
  refreshMs?: number
}

export type FormatStatus = {
  state: OpenState
  text: string
}