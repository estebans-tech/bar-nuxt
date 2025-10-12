import type { OfferItem, OfferHeading } from '~/types/offer' 

export const OFFER_HEADING: OfferHeading = {
  title: 'Angebote',
  subtitle: 'Unsere aktuellen Specials – frisch, lecker und fair.'
}

export const OFFERS: OfferItem[] = [
    {
      id: 'happy-hour',
      title: 'Cocktail Happy Hour',
      imageSrc: '/images/cocktails/blackberry-fizz.avif',
      alt: 'Zwei Cocktails an der Bar',
      badge: 'von 17–19 Uhr',
      lines: [
        'Alle Cocktails ',
        'nur für 7,95€.'
      ]
    },
    {
      id: 'food-deal',
      title: 'Montag ist Pizzatag',
      imageSrc: '/images/food/pizza.avif',
      alt: 'Pizza mit frisches Ruckola',
      badge: 'Montags',
      lines: [
        'Erhaltet Ihre Lieblingspizza',
        'mit 20% Ermäßigung.'
      ]
    },    
    {
      id: 'food-deal',
      title: 'Mittwoch ist Salattag',
      imageSrc: '/images/food/sallad.avif',
      alt: 'Frischer Salat mit Brot',
      badge: 'Mittwochs',
      lines: [
        'Erhaltet Ihre Lieblingssalat',
        'mit 20% Ermäßigung.'
      ]
    }
  ]