import { defineStore } from 'pinia'
import { taskService } from '~/services/task.service'
import type { LoadState, Task, TaskInput } from '~/types/task'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const state = ref<LoadState>('loading')
  const error = ref<string | null>(null)

  const isLoading = computed(() => state.value === 'loading')
  const isEmpty = computed(() => state.value === 'ready' && tasks.value.length === 0)

  async function fetchTasks() {
    state.value = 'loading'
    error.value = null
    try {
      tasks.value = await taskService.list()
      state.value = 'ready'
    } catch {
      state.value = 'error'
      error.value = 'error.loadFailed'
    }
  }

  async function addTask(input: TaskInput): Promise<boolean> {
    try {
      tasks.value = [...tasks.value, await taskService.create(input)]
      return true
    } catch {
      error.value = 'error.saveFailed'
      return false
    }
  }

  async function updateTask(id: string, patch: Partial<Task>): Promise<boolean> {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index === -1) return false

    const previous = tasks.value[index]!
    tasks.value = tasks.value.with(index, { ...previous, ...patch })

    try {
      await taskService.update(id, patch)
      return true
    } catch {
      tasks.value = tasks.value.with(index, previous)
      error.value = 'error.saveFailed'
      return false
    }
  }

  function toggleTask(id: string) {
    const task = tasks.value.find((item) => item.id === id)
    if (task) updateTask(id, { completed: !task.completed })
  }

  async function removeTask(id: string): Promise<boolean> {
    const index = tasks.value.findIndex((task) => task.id === id)
    if (index === -1) return false

    const removed = tasks.value[index]!
    tasks.value = tasks.value.filter((task) => task.id !== id)

    try {
      await taskService.remove(id)
      return true
    } catch {
      tasks.value = tasks.value.toSpliced(index, 0, removed)
      error.value = 'error.deleteFailed'
      return false
    }
  }

  return {
    tasks,
    error,
    isLoading,
    isEmpty,
    fetchTasks,
    addTask,
    updateTask,
    toggleTask,
    removeTask,
  }
})
