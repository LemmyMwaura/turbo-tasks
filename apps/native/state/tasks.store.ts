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
  updateTask: (updatedTask: Task) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: DEMOTASKS,
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      removeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        })),
    }),
    {
      name: `${PREFIX}-tasks`,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
