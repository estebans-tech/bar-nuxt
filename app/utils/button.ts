import type { ButtonSize, ButtonVariant } from '~/types/button'

/**
 * Bas – samma ring-baseline som Card och samma hover-ring.
 * Ingen yttre box-shadow; vi låter korten stå för djupet.
 */
export const btnBase =
  'inline-flex items-center justify-center gap-2 font-medium select-none ' +
  'transition-colors transition-shadow duration-150 ' +
  'focus:outline-none ring-1 ring-white/10 focus-visible:ring-2 focus-visible:ring-gold/40 ' +
  'hover:ring-white/20' // matchar cardHoverShadow

export const btnVariants: Record<ButtonVariant, string> = {
  // Guld – subtil, elegant (inner-stroke istället för stor skugga)
  primary:
    'bg-gold text-onyx hover:brightness-95 ' +
    'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]',

  // Glas/outline – samma “glas” som card: ring + svag blur
  outline:
    'text-white bg-white/5 hover:bg-white/10 ring-white/25 backdrop-blur-[1px]',

  // Text – diskret, men behåller ring-baseline + liten hover-bg för träffyta
  ghost:
    'ring-transparent text-white/90 hover:text-white hover:bg-white/5'
}

export const btnSizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-base',
  lg: 'h-14 px-6 text-base'
}

/**
 * Shape: default **inte** pill → följer --radius-btn så kort & knappar har samma rundning.
 * Vill du ha pill i något fall så skicka `pill = true`.
 */
export const btnClass = (
  variant: ButtonVariant,
  size: ButtonSize,
  full?: boolean,
  pill?: boolean
) => [
  btnBase,
  btnVariants[variant],
  btnSizes[size],
  pill ? 'rounded-full' : 'rounded-[var(--radius-btn)]',
  full ? 'w-full' : '',
  'hover:ring-white/20'
].join(' ')
