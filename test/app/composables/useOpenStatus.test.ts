import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, defineComponent } from 'vue'
import { useOpenStatus } from '~/composables/useOpenStatus'
import type { HoursMap } from '~/types/visit'

// Mock format status DE
vi.mock('~/utils/hours', () => ({
  formatStatusDE: vi.fn(),
}))

import { formatStatusDE } from '~/utils/hours'

describe('useOpenStatus', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-21T10:00:00Z'))
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('computes status via formatStatusDE with defaults', async () => {
    ;(formatStatusDE as unknown as ReturnType<typeof vi.fn>).mockReturnValue('OPEN')

    const hours = {} as unknown as HoursMap

    const Component = defineComponent({
      setup() {
        const status = useOpenStatus(hours)
        return () => h('div', status.value)
      },
    })

    const wrapper = mount(Component)

    expect(wrapper.text()).toBe('OPEN')
    expect(formatStatusDE).toHaveBeenCalledTimes(1)

    const [calledHours, calledDate, calledTz, calledSoon] = (formatStatusDE as any).mock.calls[0]

    expect(calledHours).toBe(hours)
    expect(calledDate).toBeInstanceOf(Date)
    expect(calledTz).toBeUndefined()
    expect(calledSoon).toBe(60) // default soonThresholdMin
  })

  it('passes tz and soonThresholdMin from options', () => {
    ;(formatStatusDE as unknown as ReturnType<typeof vi.fn>).mockReturnValue('SOON')

    const hours = {} as unknown as HoursMap

    const Component = defineComponent({
      setup() {
        const status = useOpenStatus(hours, { tz: 'Europe/Berlin', soonThresholdMin: 15, refreshMs: 999999 })
        return () => h('div', status.value)
      },
    })

    mount(Component)

    const [, , calledTz, calledSoon] = (formatStatusDE as any).mock.calls[0]
    expect({ tz: calledTz, soonThresholdMin: calledSoon }).toEqual({
      tz: 'Europe/Berlin',
      soonThresholdMin: 15,
    })
  })

  it('refreshes status on interval and clears interval on unmount', async () => {
    // return something that is dependent on time-lapse, to see if any change
    ;(formatStatusDE as unknown as ReturnType<typeof vi.fn>).mockImplementation(
      (_hours: unknown, now: Date) => now.toISOString()
    )

    const clearSpy = vi.spyOn(globalThis, 'clearInterval')

    const hours = {} as unknown as HoursMap

    const Component = defineComponent({
      setup() {
        const status = useOpenStatus(hours, { refreshMs: 60_000 })
        return () => h('div', status.value)
      },
    })

    const wrapper = mount(Component)

    const before = wrapper.text()
    expect(before).toContain('2026-01-21T10:00:00.000Z')

    // 60 sec tick → setInterval, run and now.value has to update
    vi.advanceTimersByTime(60_000)
    await wrapper.vm.$nextTick()

    const after60s = wrapper.text()
    expect(after60s).not.toBe(before)

    wrapper.unmount()
    expect(clearSpy).toHaveBeenCalled()
  })
})
