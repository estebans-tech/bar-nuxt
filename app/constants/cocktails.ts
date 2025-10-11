// Initial signature cocktails shown on Home
// Images should live in /public/images/cocktails/

import type { CocktailCard } from '~/types/cocktail'

export const SIGNATURE_COCKTAILS: CocktailCard[] = [
  {
    id: 'smoked-old-fashioned',
    name: 'Smoked Old Fashioned',
    flavorNote: 'Rauchig, robust und elegant mit Zitruszeste',
    price: 12.5,
    imageSrc: '/images/cocktails/smoked-old-fashioned.avif'
  },
  {
    id: 'pineapple-negroni',
    name: 'Pineapple Negroni',
    flavorNote: 'Bitter-süß, klar und fruchtig – mit Ananasnote',
    price: 12.0,
    imageSrc: '/images/cocktails/pineapple-negroni.avif'
  },
  {
    id: 'blackberry-fizz',
    name: 'Blackberry Fizz',
    flavorNote: 'Brombeere, Minze und Spritz – erfrischend',
    price: 11.2,
    imageSrc: '/images/cocktails/blackberry-fizz.avif'
  },
  {
    id: 'sena-sour',
    name: 'Seña Sour',
    flavorNote: 'Zitrusfrisch mit seidigem Schaum',
    price: 11.5,
    imageSrc: '/images/cocktails/sena-sour.avif'
  }
]