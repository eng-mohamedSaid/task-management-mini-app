import { MOCK_LATENCY_MS, TASKS_STORAGE_KEY } from '~/constants/task'
import type { Task, TaskInput } from '~/types/task'
import { todayISO } from '~/utils/date'

const delay = () => new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS))

function read(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? (parsed as Task[]) : []
  } catch {
    return []
  }
}

function write(tasks: Task[]): void {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
}

function seed(): Task[] {
  const now = new Date().toISOString()
  return [
    { id: crypto.randomUUID(), title: 'NOTE #1', dueDate: todayISO(), completed: false, createdAt: now },
    { id: crypto.randomUUID(), title: 'NOTE #2', dueDate: todayISO(), completed: true, createdAt: now },
    { id: crypto.randomUUID(), title: 'NOTE #3', dueDate: todayISO(), completed: false, createdAt: now },
  ]
}

export const taskService = {
  async list(): Promise<Task[]> {
    await delay()
    if (localStorage.getItem(TASKS_STORAGE_KEY) === null) {
      const seeded = seed()
      write(seeded)
      return seeded
    }
    return read()
  },

  async create(input: TaskInput): Promise<Task> {
    await delay()
    const task: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      dueDate: input.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    write([...read(), task])
    return task
  },

  async update(id: string, patch: Partial<Task>): Promise<Task> {
    await delay()
    const tasks = read()
    const index = tasks.findIndex((task) => task.id === id)
    if (index === -1) throw new Error('Task not found')

    const updated = { ...tasks[index]!, ...patch }
    tasks[index] = updated
    write(tasks)
    return updated
  },

  async remove(id: string): Promise<void> {
    await delay()
    write(read().filter((task) => task.id !== id))
  },
}
