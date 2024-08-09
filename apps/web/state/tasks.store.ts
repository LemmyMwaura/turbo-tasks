import { createStore } from 'zustand/vanilla'

import { Task } from '@app/types/task.types'
import { DEMOTASKS } from '@app/utils/seed.tasks'

const initTaskState = {
  tasks: DEMOTASKS,
}

// Note: We experienced intermittent issues with Zustand state persistence using local storage during hydration. As a result, we are temporarily avoiding local storage for state management.
// TODO@: downgrade to safer nextjs version

export interface TaskStore {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (id: string, updatedTask: Partial<Task>) => void
  removeTask: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}

export const createTaskStore = () => {
  return createStore<TaskStore>()((set, get) => ({
    ...initTaskState,
    addTask: (task: Task) => {
      set((state) => ({
        tasks: [...state.tasks, task],
      }))
    },
    updateTask: (id: string, updatedTask: Partial<Task>) => {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        ),
      }))
    },
    removeTask: (id: string) => {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }))
    },
    getTaskById: (id: string) => {
      const { tasks } = get()
      const task = tasks.find((task) => task.id === id)
      return task
    },
  }))
}
