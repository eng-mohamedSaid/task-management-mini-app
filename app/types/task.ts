export interface Task {
  id: string
  title: string
  dueDate: string
  completed: boolean
  createdAt: string
}

export type TaskInput = Pick<Task, 'title' | 'dueDate'>

export type StatusFilter = 'all' | 'complete' | 'incomplete'

export type LoadState = 'loading' | 'ready' | 'error'
