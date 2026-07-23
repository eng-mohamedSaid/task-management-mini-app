import { SEARCH_DEBOUNCE_MS } from '~/constants/task'
import type { StatusFilter, Task } from '~/types/task'


export function useTaskFilters(source: Ref<Task[]>) {
  const search = ref('')
  const status = ref<StatusFilter>('all')

  const debouncedSearch = ref('')
  let timer: ReturnType<typeof setTimeout>

  watch(search, (value) => {
    clearTimeout(timer)
    timer = setTimeout(() => (debouncedSearch.value = value), SEARCH_DEBOUNCE_MS)
  })

  onUnmounted(() => clearTimeout(timer))

  const filteredTasks = computed(() => {
    const query = debouncedSearch.value.trim().toLowerCase()

    return source.value.filter((task) => {
      if (status.value === 'complete' && !task.completed) return false
      if (status.value === 'incomplete' && task.completed) return false
      return task.title.toLowerCase().includes(query)
    })
  })

  const hasNoMatches = computed(
    () => source.value.length > 0 && filteredTasks.value.length === 0,
  )

  function clearFilters() {
    search.value = ''
    debouncedSearch.value = ''
    status.value = 'all'
  }

  return { search, status, filteredTasks, hasNoMatches, clearFilters }
}
