import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Task } from '@app/types/task.types'
import { DEMOTASKS } from '@app/utils/seed.tasks'

const initTaskState = {
  tasks: DEMOTASKS,
}

const PREFIX = 'TASK_TRACKER'

export interface TaskStore {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (id: string, updatedTask: Partial<Task>) => void
  removeTask: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: `${PREFIX}-tasks`,
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export const seedLocalStorage = () => {
  const storageKey = `${PREFIX}-tasks`
  const existingData = localStorage.getItem(storageKey)

  if (!existingData) {
    const initialState = {
      state: {
        tasks: DEMOTASKS,
      },
      version: 0,
    }
    localStorage.setItem(storageKey, JSON.stringify(initialState))
    console.log('Local storage seeded with initial tasks.')
  } else {
    console.log('Tasks already exist in local storage. No seeding required.')
  }
}

seedLocalStorage()