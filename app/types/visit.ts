// Public types for the Visit / Contact section

export type Weekday =
  | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export type HoursMap = Partial<Record<Weekday, string>>

export interface VisitInfo {
  name: string
  street: string
  postalCity: string
  phoneHref: string
  mapsHref: string
  todayOpenText: string
  hours: HoursMap
  mapStaticSrc: string     // static preview image (avif)
  mapAlt: string
  mapIframeSrc: string     // embeddable maps URL
}
