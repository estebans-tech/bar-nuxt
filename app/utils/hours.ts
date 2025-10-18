// Helpers to parse opening hours and compute open/closed status
import type { HoursMap, Weekday } from '~/types/visit'
import type { OpenState, TimeRange, NextChange } from '~/types/open'

const WEEK: Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
const OPEN_END_CUTOFF_DEFAULT = 2 * 60 // 2 * 60 = 02:00, 6 * 60 = 06:00

// ----- formatting helpers -----
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, ' ').trim()

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(n => parseInt(n, 10)) as [number, number]
  return h * 60 + m
}

export const fromMin = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440
  const h = Math.floor(m / 60)
  const mm = String(m % 60).padStart(2, '0')
  return `${String(h).padStart(2, '0')}:${mm}`
}

// ----- parsing -----
export const parseRange = (raw?: string | null): TimeRange | null => {
  if (!raw) return null
  const s = normalize(raw)
  if (!s || s === 'geschlossen' || s === '—' || s === '-') return null

  const times = s.match(/\b(\d{1,2}:\d{2})\b/g) || []
  const start = times[0] ? toMin(times[0]) : null
  const end = times[1] ? toMin(times[1]) : null

  const isOpenEnd = /open\s*end/i.test(raw)
  if (start == null) return null

  if (isOpenEnd) {
    return { startMin: start, endMin: null, openEnd: true, overnight: false }
  }

  if (end == null) return null

  return {
    startMin: start,
    endMin: end,
    openEnd: false,
    overnight: end < start
  }
}

// ----- date helpers -----
const inTz = (d: Date, tz?: string) =>
  tz ? new Date(d.toLocaleString('en-US', { timeZone: tz })) : d

export const dayKeyFor = (d: Date, tz?: string): Weekday => {
  const dd = inTz(d, tz)
  const js = dd.getDay() // 0=Sun
  return ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][js] as Weekday
}

export const minutesSinceMidnight = (d: Date, tz?: string) => {
  const dd = inTz(d, tz)
  return dd.getHours() * 60 + dd.getMinutes()
}

export const rangesForDay = (hours: HoursMap, day: Weekday): TimeRange[] => {
  const r = parseRange(hours[day])
  return r ? [r] : []
}

// ----- state computation -----
export const isOpenNow = (
  hours: HoursMap,
  now: Date,
  tz?: string,
  openEndCutoffMin: number = OPEN_END_CUTOFF_DEFAULT
) => {
  const curDay = dayKeyFor(now, tz)
  const curMin = minutesSinceMidnight(now, tz)

  const todays = rangesForDay(hours, curDay)[0] || null

  const prevIdx = (WEEK.indexOf(curDay) + 6) % 7
  const prevDay = WEEK[prevIdx] as Weekday
  const yest = rangesForDay(hours, prevDay)[0] || null

  // 1) Gårdagens fönster kan spilla över (overnight eller Open End)
  if (yest && (yest.openEnd || yest.overnight)) {
    if (yest.openEnd) {
      // Open End gäller bara till cutoff (ex. 06:00)
      if (curMin >= 0 && curMin < openEndCutoffMin) {
        return { open: true as const, day: prevDay, active: { ...yest } }
      }
    } else if (yest.endMin != null) {
      // Normal overnight (t.ex. 22:00–02:00)
      if (curMin < yest.endMin) {
        return { open: true as const, day: prevDay, active: { ...yest } }
      }
    }
  }

  // 2) Dagens fönster
  if (todays) {
    if (todays.openEnd) {
      if (curMin >= todays.startMin) {
        return { open: true as const, day: curDay, active: { ...todays } }
      }
    } else if (todays.endMin != null) {
      const inWindow =
        todays.overnight
          ? curMin >= todays.startMin || curMin < todays.endMin
          : curMin >= todays.startMin && curMin < todays.endMin
      if (inWindow) {
        return { open: true as const, day: curDay, active: { ...todays } }
      }
    }
  }

  return { open: false as const, day: curDay, active: undefined }
}

export const nextChange = (
  hours: HoursMap,
  now: Date,
  tz?: string,
  openEndCutoffMin: number = OPEN_END_CUTOFF_DEFAULT
): NextChange | null => {
  const curState = isOpenNow(hours, now, tz, openEndCutoffMin)
  const curDay = dayKeyFor(now, tz)
  const curMin = minutesSinceMidnight(now, tz)

  // Om vi är öppna, beräkna när det stänger
  if (curState.open && curState.active) {
    // Öppet p.g.a. gårdagens Open End → stänger vid cutoff idag
    if (curState.active.openEnd && curState.day !== curDay) {
      return { closesAt: { day: curDay, min: openEndCutoffMin, openEnd: false } }
    }
    // Dagens Open End → ingen exakt tid
    if (curState.active.openEnd || curState.active.endMin == null) {
      return { closesAt: { day: curState.day, min: 24 * 60, openEnd: true } }
    }
    return { closesAt: { day: curState.day, min: curState.active.endMin!, openEnd: false } }
  }

  // Annars: hitta nästa öppning inom 7 dagar
  for (let i = 0; i < 7; i++) {
    const idx = (WEEK.indexOf(curDay) + i) % 7
    const day = WEEK[idx] as Weekday
    const r = rangesForDay(hours, day)[0]
    if (!r) continue

    if (i === 0) {
      // idag
      if (r.overnight) {
        if (curMin < r.startMin) return { opensAt: { day, min: r.startMin } }
      } else if (curMin < r.startMin) {
        return { opensAt: { day, min: r.startMin } }
      }
    } else {
      // kommande dag
      return { opensAt: { day, min: r.startMin } }
    }
  }

  return null
}

// ----- UI text (DE) -----
export const formatStatusDE = (
  hours: HoursMap,
  now: Date,
  tz?: string,
  soonThresholdMin = 60,
  openEndCutoffMin = 120 // din nya cutoff för Open End, lämna om du redan har
) => {
  const cur = isOpenNow(hours, now, tz)
  const change = nextChange(hours, now, tz)

  const dayLabel = (d: Weekday) => {
    const m: Record<Weekday,string> = { mon:'Mo', tue:'Di', wed:'Mi', thu:'Do', fri:'Fr', sat:'Sa', sun:'So' }
    return m[d]
  }

  const minutesNow = minutesSinceMidnight(now, tz)

  if (cur.open) {
    if (change && 'closesAt' in change) {
      // Open End → “bis Open End”, ingen “snart”
      if (change.closesAt.openEnd) {
        return { state: 'open' as OpenState, text: 'Jetzt geöffnet – bis Open End' }
      }
      // Beräkna minuter kvar till stängning (säkert även över midnatt)
      const minutesToClose =
        (change.closesAt.min - minutesNow + 1440) % 1440

      if (minutesToClose <= soonThresholdMin) {
        // “stänger snart”
        return {
          state: 'soon' as OpenState,
          text: `Schließt bald – um ${fromMin(change.closesAt.min)}`
        }
      }
      // Vanligt öppet
      return { state: 'open' as OpenState, text: `Jetzt geöffnet – bis ${fromMin(change.closesAt.min)}` }
    }
    // Fallback om ingen change hittas
    return { state: 'open' as OpenState, text: 'Jetzt geöffnet' }
  }

  // Stängd → öppnar snart/idag eller annan dag
  if (change && 'opensAt' in change) {
    const isToday = change.opensAt.day === dayKeyFor(now, tz)
    const minutesUntil = isToday
      ? change.opensAt.min - minutesNow
      : change.opensAt.min + 1440 * ((WEEK.indexOf(change.opensAt.day) - WEEK.indexOf(dayKeyFor(now, tz)) + 7) % 7)

    const soon = minutesUntil > 0 && minutesUntil <= soonThresholdMin
    if (isToday) {
      return {
        state: soon ? 'soon' as OpenState : 'closed' as OpenState,
        text: `Heute geöffnet ab ${fromMin(change.opensAt.min)}`
      }
    }
    return {
      state: 'closed' as OpenState,
      text: `Geschlossen – wieder ab ${dayLabel(change.opensAt.day)} ${fromMin(change.opensAt.min)}`
    }
  }

  return { state: 'closed' as OpenState, text: 'Geschlossen' }
}