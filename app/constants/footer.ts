import type { FooterConfig } from '~/types/footer'
import { MAPS_HREF, PHONE_HREF } from '~/constants/links'

export const FOOTER: FooterConfig = {
  brand: { name: 'Bar Seña', tagline: 'Cocktails & Nights in Hannover' },
  address: { line1: 'Albert-Niemann Str. 11', line2: '30171 Hannover' },
  phone: { label: '+49 511 16919678', href: PHONE_HREF },
  links: {
    quick: [
      { label: 'Home', href: '/' },
      { label: 'Karten', href: '/karten' },
      { label: 'Hier finden', href: MAPS_HREF, external: true },
      { label: 'Öffnungszeiten', href: '#visit' },
      { label: 'Über uns', href: '/about' }
    ],
    legal: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'Cookies', href: '/cookies' }
    ]
  },
  social: [
    { label: 'Instagram', href: 'https://instagram.com/barsenahannover', external: true },
    { label: 'Facebook', href: 'https://www.facebook.com/BarSenahannover', external: true }
  ],
  todayOpenText: 'Heute geöffnet ab 17:00'
}
