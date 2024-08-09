import { createStore } from 'zustand/vanilla'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DEMOTASKS, Task } from '@repo/ui'

const PREFIX = 'TASK_TRACKER'

const initTaskState = {
  tasks: DEMOTASKS,
}

export interface TaskStore {
  tasks: Task[]
  addTask: (task: Task) => void
  updateTask: (id: string, updatedTask: Partial<Task>) => void
  removeTask: (id: string) => void
  getTaskById: (id: string) => Task | undefined
}

export const createTaskStore = () => {
  return createStore<TaskStore>()(
    
      (set, get) => ({
        ...initTaskState,
        addTask: (task: Task) => {
          console.log('Adding task:', task)
          set((state) => ({
            tasks: [...state.tasks, task],
          }))
        },
        updateTask: (id: string, updatedTask: Partial<Task>) => {
          console.log('Updating task:', id, updatedTask)
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, ...updatedTask } : task
            ),
          }))
        },
        removeTask: (id: string) => {
          console.log('Removing task:', id)
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          }))
        },
        getTaskById: (id: string) => {
          const { tasks } = get()
          const task = tasks.find((task) => task.id === id)
          console.log('Getting task by id:', id, task)
          return task
        },
      }
      // {
      //   name: `${PREFIX}-tasks`,
      //   storage: createJSONStorage(() => localStorage),
      // }
    )
  )
}