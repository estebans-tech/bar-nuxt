// TODO:
// 1. Test li (7)
// 2. aria-current
// 3. css highlight-class
// 4. ours fallback
// 5. Title
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import HoursList from '~/components/visit/HoursList.vue'
import type { HoursMap } from '~/types/visit'

describe('HoursList', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // Local date constructor => stable weekday regardless of TZ settings
    vi.setSystemTime(new Date(2026, 0, 26, 12, 0, 0)) // 2026-01-26 is Monday
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders 7 days with correct labels in order', () => {
    const hours = { mon: '10:00–18:00' } as unknown as HoursMap

    const wrapper = mount(HoursList, {
      props: { hours },
    })

    const items = wrapper.findAll('li')
    expect(items).toHaveLength(7)

    const labels = items.map((li) => li.findAll('span')[0].text())
    expect(labels).toEqual(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'])
  })

  it('renders title only when provided', () => {
    const hours = {} as unknown as HoursMap

    const withTitle = mount(HoursList, {
      props: { hours, title: 'Öffnungszeiten' },
    })
    expect(withTitle.find('h3').exists()).toBe(true)
    expect(withTitle.find('h3').text()).toContain('Öffnungszeiten')

    const withoutTitle = mount(HoursList, { props: { hours } })
    expect(withoutTitle.find('h3').exists()).toBe(false)
  })
  it('marks today with aria-current="date" and highlight classes', () => {
    const hours = { mon: '10:00–18:00' } as unknown as HoursMap

    const wrapper = mount(HoursList, { props: { hours } })

    const todayLis = wrapper.findAll('li[aria-current="date"]')
    expect(todayLis).toHaveLength(1)

    const today = todayLis[0]
    const todayLabel = today.findAll('span')[0].text()
    expect(todayLabel).toBe('Mo') // eftersom vi satte systemtid till en måndag

    // Signaturklasser för "idag"
    expect(today.classes()).toContain('bg-white/5')
    expect(today.classes()).toContain('-mx-2')

    // En annan dag ska INTE ha aria-current och ska sakna signaturklasserna
    const tue = wrapper.findAll('li')[1] // Di
    expect(tue.attributes('aria-current')).toBeUndefined()
    expect(tue.classes()).not.toContain('bg-white/5')
    expect(tue.classes()).not.toContain('-mx-2')
    // (Den har px-0 via dynamic class)
    expect(tue.classes()).toContain('px-0')
  })

  it('shows closedLabel when hours for a day is missing (default and custom)', () => {
    const hours = { mon: '10:00–18:00' } as unknown as HoursMap

    const wrapperDefault = mount(HoursList, { props: { hours } })

    // Hitta "Mi" och kolla att andra span (tiden) visar default "-"
    const wedLi = wrapperDefault.findAll('li').find((li) => li.text().includes('Mi'))
    expect(wedLi).toBeTruthy()
    expect(wedLi!.findAll('span')[1].text()).toBe('-')

    const wrapperCustom = mount(HoursList, {
      props: { hours, closedLabel: 'geschlossen' },
    })

    const wedLi2 = wrapperCustom.findAll('li').find((li) => li.text().includes('Mi'))
    expect(wedLi2).toBeTruthy()
    expect(wedLi2!.findAll('span')[1].text()).toBe('geschlossen')
  })
})
