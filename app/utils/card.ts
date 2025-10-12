import type { CardVariant } from '~/types/card'

export const cardBase =
  'overflow-hidden bg-onyx/80 isolate ring-1 ring-white/10'

export const cardVariants: Record<CardVariant, string> = {
  elegant: 'rounded-lg shadow-[0_18px_42px_-18px_rgba(0,0,0,.65)]',
  modern: 'rounded-[var(--radius-card)] shadow-[var(--shadow-card)]',
  flat: 'rounded-lg shadow-none'
}

// this matches CocktailCard's feel
export const cardHoverShadow =
  'transition-shadow hover:ring-white/20 hover:shadow-lg hover:shadow-black/20'

// only the slight lift (optional)
export const cardHoverLift =
  'transition-transform duration-200 ease-out hover:-translate-y-0.5'

export const cardBlur = 'backdrop-blur-[1px]'

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
    cardHoverShadow,                // always give ring/shadow hover
    opts?.hoverLift ? cardHoverLift : '',
    opts?.blur === false ? '' : cardBlur
  ].filter(Boolean)

  const style: Record<string, string> = {}
  if (opts?.radius) style['--radius-card'] = opts.radius
  if (opts?.shadow) style['--shadow-card'] = opts.shadow

  return { class: parts.join(' '), style }
}