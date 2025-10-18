import type { VisitInfo } from '~/types/visit'

const PHONE_HREF = 'tel:+4951116919678'
const MAPS_HREF = 'https://maps.google.com/?q=Bar+Seña+Hannover'

export const VISIT_INFO: VisitInfo = {
  name: 'Bar Seña',
  street: 'Albert-Niemann Str. 11',
  postalCity: '30171 Hannover',
  phoneHref: PHONE_HREF,
  mapsHref: MAPS_HREF,
  mapAnchorHref: '#visit',
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
  mapIframeSrc: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4872.787277201558!2d9.753101317398814!3d52.363282000000005!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b00b360e4192fd%3A0x9e85154a5170b84f!2zQmFyIFNlw7Fh!5e0!3m2!1ssv!2sde!4v1760190109493!5m2!1ssv!2sde'
}
