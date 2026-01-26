import { describe, it, expect } from 'vitest'
import {
  cardBase,
  cardVariants,
  cardHoverShadow,
  cardHoverLift,
  cardBlur,
  cardClass,
} from '~/utils/card'

describe('card utils', () => {
  it('exposes expected variants', () => {
    expect(cardVariants).toMatchObject({
      elegant: expect.any(String),
      modern: expect.any(String),
      flat: expect.any(String),
    })
  })


  it('builds class string with base + variant + hoverShadow and blur by default', () => {
    const result = cardClass('elegant')

    expect(result.class).toContain(cardBase)
    expect(result.class).toContain(cardVariants.elegant)
    expect(result.class).toContain(cardHoverShadow)

    // default blur on
    expect(result.class).toContain(cardBlur)

    // hover lift is optional (off by default)
    expect(result.class).not.toContain(cardHoverLift)

    // style defaults
    expect(result.style).toEqual({})
  })

  it('adds hover lift when enabled', () => {
    const res = cardClass('modern', { hoverLift: true })
    expect(res.class).toContain(cardHoverLift)
  })

  it('can disable blur', () => {
    const res = cardClass('flat', { blur: false })
    expect(res.class).not.toContain(cardBlur)
  })

  it('sets CSS variables for radius/shadow when provided', () => {
    const res = cardClass('modern', {
      radius: '24px',
      shadow: '0 10px 30px rgba(0,0,0,0.3)',
    })

    expect(res.style).toEqual({
      '--radius-card': '24px',
      '--shadow-card': '0 10px 30px rgba(0,0,0,0.3)',
    })
  })
})
