import { describe, it, expect } from 'vitest'
import { weekdayKeyFromDate } from '~/utils/hours'

describe('hours', () => {
  it('weekdayKeyFromDate(): maps Date to our Weekday keys', () => {
    // Local-time dates (stable across environments)
    const cases: Array<[Date, string]> = [
      [new Date(2026, 0, 26, 12), 'mon'], // Jan 26 2026
      [new Date(2026, 0, 27, 12), 'tue'],
      [new Date(2026, 0, 28, 12), 'wed'],
      [new Date(2026, 0, 29, 12), 'thu'],
      [new Date(2026, 0, 30, 12), 'fri'],
      [new Date(2026, 0, 31, 12), 'sat'],
      [new Date(2026, 1,  1, 12), 'sun'], // Feb 1 2026
    ]

    for (const [d, expected] of cases) {
      expect(weekdayKeyFromDate(d)).toBe(expected)
    }
  })
})
