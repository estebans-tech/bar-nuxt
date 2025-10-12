import type { CardVariant } from '~/types/card'

export const cardBase =
  'overflow-hidden bg-onyx/80 isolate ' +
  'ring-1 ring-white/10 ' // baseline ring

// varianter (utseende)
export const cardVariants: Record<CardVariant, string> = {
  elegant:
    // något mindre rund, tydlig men mjuk skugga
    'rounded-lg shadow-[0_18px_42px_-18px_rgba(0,0,0,.65)]',
  modern:
    // använder dina CSS-var: hållbart om du vill fintrimma per sida
    'rounded-[var(--radius-card)] shadow-[var(--shadow-card)]',
  flat:
    // nästan platt, ingen skugga
    'rounded-lg shadow-none'
}

// valfri hover-lift
export const cardHover =
  'transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:ring-white/20'

// liten “glas”-känsla kan slås på/av
export const cardBlur = 'backdrop-blur-[1px]'

// Bygger class + inline style (radius/shadow via CSS-variabler)
export const cardClass = (
  variant: CardVariant,
  opts?: {
    hoverLift?: boolean
    blur?: boolean
    radius?: string
    shadow?: string
  }
) => {
  const parts = [
    cardBase,
    cardVariants[variant],
    opts?.hoverLift ? cardHover : '',
    opts?.blur === false ? '' : cardBlur
  ].filter(Boolean)

  const style: Record<string, string> = {}
  if (opts?.radius) style['--radius-card'] = opts.radius
  if (opts?.shadow) style['--shadow-card'] = opts.shadow

  return { class: parts.join(' '), style }
}
