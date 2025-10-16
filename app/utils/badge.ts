import type { BadgeVariant, BadgeSize, BadgeTone } from '~/types/badge'

// Shared atomic pieces
const base =
  'inline-flex items-center justify-center select-none uppercase tracking-wide ' +
  'font-semibold rounded-full transition will-change-transform shrink-0'

// Size presets (kept minimal to avoid layout shifts)
const sizes: Record<BadgeSize, string> = {
  xs: 'text-[11px] px-2 py-1',
  sm: 'text-[11px] px-2.5 py-1',
  md: 'text-[12px] px-3 py-1'
}

const glass: Record<BadgeTone, string> = {
  neutral: 'bg-white/10 text-white/90 ring-white/15 backdrop-blur-[2px]',
  gold: 'bg-gold/20 text-gold ring-gold/30 backdrop-blur-[2px]',
  success: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/25 backdrop-blur-[2px]',
  danger: 'bg-rose-500/15 text-rose-300 ring-rose-400/25 backdrop-blur-[2px]'
}

const elegant: Record<BadgeTone, string> = {
  neutral: 'bg-white/10 text-white/90 ring-white/15 backdrop-blur-[2px]',
  gold: 'bg-gold/20 text-gold ring-gold/30 backdrop-blur-[2px]',
  success: 'bg-emerald-500/15 text-emerald-300 ring-emerald-400/25 backdrop-blur-[2px]',
  danger: 'bg-rose-500/15 text-rose-300 ring-rose-400/25 backdrop-blur-[2px]'
}

const solid: Record<BadgeTone, string> = {
  neutral: 'bg-white text-onyx ring-black/5',
  gold: 'bg-gold text-onyx ring-black/5',
  success: 'bg-emerald-500 text-white ring-black/5',
  danger: 'bg-rose-500 text-white ring-black/5'
}

const outline: Record<BadgeTone, string> = {
  neutral: 'bg-transparent text-white/80 ring-white/25',
  gold: 'bg-transparent text-gold ring-gold/30',
  success: 'bg-transparent text-emerald-300 ring-emerald-400/30',
  danger: 'bg-transparent text-rose-300 ring-rose-400/30'
}

const subtle: Record<BadgeTone, string> = {
  neutral: 'bg-white/[0.08] text-white/90 ring-white/12',
  gold: 'bg-gold/[0.12] text-gold ring-gold/20',
  success: 'bg-emerald-500/[0.12] text-emerald-300 ring-emerald-400/20',
  danger: 'bg-rose-500/[0.12] text-rose-300 ring-rose-400/20'
}

// Visual variants
export const badgeClass = (
  variant: BadgeVariant = 'elegant',
  size: BadgeSize = 'md',
  tone: BadgeTone = 'neutral',
  hover?: boolean
): string => {
  const hoverRing = hover ? 'hover:ring-white/20' : ''
  const toneMap = variant === 'glass' ? glass : variant === 'elegant' ? elegant : variant === 'outline' ? outline : variant === 'solid' ? solid : subtle
  return [base, sizes[size], toneMap[tone], hoverRing].join(' ')
}