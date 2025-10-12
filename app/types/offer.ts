export type OfferHeading = {
  title: string
  subtitle: string 
}

export type OfferItem = {
    id: string
    title: string               // t.ex. "Cocktail Happy Hour"
    imageSrc: string
    alt?: string
    lines?: string[]            // kort beskrivning i flera rader (valfritt)
    badge?: string              // t.ex. "Neu", "Heute", "17–19 Uhr"
    link?: string          // NEW: länk för CTA
    ctaLabel?: string      // NEW: "Mehr erfahren" som default
  }