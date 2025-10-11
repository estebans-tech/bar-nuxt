import type { VisitInfo } from '~/types/visit'

const PHONE_HREF = 'tel:+4951116919678'
const MAPS_HREF = 'https://maps.google.com/?q=Bar+Seña+Hannover'

export const VISIT_INFO: VisitInfo = {
  name: 'Bar Seña',
  street: 'Albert-Niemann Str. 11',
  postalCity: '30171 Hannover',
  phoneHref: PHONE_HREF,
  mapsHref: MAPS_HREF,
  todayOpenText: 'Heute geöffnet ab 17:00',
  hours: {
    mon: '17:00 – Open End',
    tue: '17:00 – Open End',
    wed: '17:00 – Open End',
    thu: '17:00 – Open End',
    fri: '17:00 – Open End',
    sat: '17:00 – Open End',
    sun: 'Geschlossen'
  },
  mapStaticSrc: '/images/map/map-preview.avif',
  mapAlt: 'Karte: Bar Seña in Hannover',
  // tip: use "Embed a map" on Google Maps to generate this URL
  mapIframeSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2436.3936346292585!2d9.75271497667163!3d52.36328207202062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b00b360e4192fd%3A0x9e85154a5170b84f!2zQmFyIFNlw7Fh!5e0!3m2!1ssv!2sde!4v1760136271457!5m2!1ssv!2sde'
}
