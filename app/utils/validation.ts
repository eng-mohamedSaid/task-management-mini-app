import { TITLE_MAX_LENGTH } from '~/constants/task'
import { isPastDate } from '~/utils/date'
import type { TaskInput } from '~/types/task'

export type TaskErrors = Partial<Record<keyof TaskInput, string>>

export function validateTask(values: TaskInput, enforceFutureDate = true): TaskErrors {
  const errors: TaskErrors = {}
  const title = values.title.trim()

  if (!title) {
    errors.title = 'validation.titleRequired'
  } else if (title.length > TITLE_MAX_LENGTH) {
    errors.title = 'validation.titleTooLong'
  }

  if (!values.dueDate) {
    errors.dueDate = 'validation.dueDateRequired'
  } else if (enforceFutureDate && isPastDate(values.dueDate)) {
    errors.dueDate = 'validation.dueDatePast'
  }

  return errors
}

export function isValid(errors: TaskErrors): boolean {
  return Object.keys(errors).length === 0
}
