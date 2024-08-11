import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { Task } from '@app/types/task.types'
import { DEMOTASKS } from '@app/utils/seed.tasks'

const PREFIX = 'TASK_TRACKER'

interface TaskState {
  tasks: Task[]
  addTask: (task: Task) => void
  removeTask: (taskId: string) => void
  updateTask: (updatedTask: Task) => Task
  getTaskByID: (taskId: string) => Task | undefined
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [], // replace [] with Demotasks to seed initial data.
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      updateTask: (updatedTask) => {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
          return { tasks: updatedTasks }
        })

        return updatedTask
      },
      getTaskByID: (taskID) => {
        const { tasks } = get()
        return tasks.find((task) => task.id === taskID)
      },
    }),
    {
      name: `${PREFIX}-tasks`,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
