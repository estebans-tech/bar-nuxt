import type { ButtonSize, ButtonVariant } from '~/types/button'

export const btnBase =
  'inline-flex items-center justify-center gap-2 font-semibold transition ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ' +
  'disabled:opacity-50 disabled:pointer-events-none select-none'

export const btnVariants: Record<ButtonVariant, string> = {
  // brand gold on dark bg – subtle hover, no layout shift
  primary: 'bg-gold text-onyx hover:brightness-95 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]',

  // glass outline – matches “före”-bilden
  outline: 'text-white ring-1 ring-white/40 bg-white/5 hover:bg-white/10 backdrop-blur-sm',

  // text only
  ghost: 'text-white/90 hover:text-white'
}

export const btnSizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-base',
  lg: 'h-14 px-6 text-base'
}

// pill as default shape for hero; can be overridden via class on <Button>
export const btnClass = (
  variant: ButtonVariant,
  size: ButtonSize,
  full?: boolean,
  pill = true
) => [
  btnBase,
  btnVariants[variant],
  btnSizes[size],
  pill ? 'rounded-full' : 'rounded-xl',
  full ? 'w-full' : ''
].join(' ')
