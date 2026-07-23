import type { StatusFilter } from '~/types/task'

export const TASKS_STORAGE_KEY = 'todo_tasks_v1'

export const THEME_STORAGE_KEY = 'todo_theme'

export const MOCK_LATENCY_MS = 500

export const SEARCH_DEBOUNCE_MS = 300

export const TITLE_MAX_LENGTH = 120

export const STATUS_FILTERS: { value: StatusFilter, labelKey: string }[] = [
  { value: 'all', labelKey: 'filter.all' },
  { value: 'incomplete', labelKey: 'filter.incomplete' },
  { value: 'complete', labelKey: 'filter.complete' },
]
