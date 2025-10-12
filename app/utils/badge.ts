import type { BadgeVariant, BadgeSize } from '~/types/badge'

// Shared atomic pieces
const base =
  'inline-flex items-center justify-center select-none uppercase tracking-wide ' +
  'font-semibold rounded-full transition will-change-transform'

// Size presets (kept minimal to avoid layout shifts)
const sizeClass: Record<BadgeSize, string> = {
  sm: 'text-[11px] px-2.5 py-1',
  md: 'text-[12px] px-3 py-1'
}

// Visual variants
export const badgeClass = (
  variant: BadgeVariant = 'elegant',
  size: BadgeSize = 'md'
): string => {
  const common = [base, sizeClass[size]]

  switch (variant) {
    // Monochrome, subtle, “signage-like”
    case 'elegant':
      return [
        ...common,
        'text-white/85 bg-black/50 backdrop-blur-[2px] ring-1 ring-white/15'
      ].join(' ')

    // Very light, only an outline
    case 'outline':
      return [
        ...common,
        'text-white/80 bg-transparent ring-1 ring-white/25'
      ].join(' ')

    // Gentle glass; bar vibe without feeling “app-y”
    case 'glass':
      return [
        ...common,
        'text-white/85 bg-white/[0.06] backdrop-blur-[2px] ring-1 ring-white/10'
      ].join(' ')
  }
}