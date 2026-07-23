import { describe, expect, it } from 'vitest'
import { validateTask } from '~/utils/validation'
import { todayISO } from '~/utils/date'

describe('validateTask', () => {
  it('requires a title and rejects a past due date', () => {
    const errors = validateTask({ title: '   ', dueDate: '2020-01-01' })

    expect(errors.title).toBe('validation.titleRequired')
    expect(errors.dueDate).toBe('validation.dueDatePast')
  })

  it('accepts today, and allows a past date when the future rule is off', () => {
    expect(validateTask({ title: 'Write the README', dueDate: todayISO() })).toEqual({})
    expect(validateTask({ title: 'Write the README', dueDate: '2020-01-01' }, false)).toEqual({})
  })
})
