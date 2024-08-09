'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type TaskStore, createTaskStore } from '@app/state/tasks.store'

export type TaskStoreApi = ReturnType<typeof createTaskStore>

export const TaskStoreContext = createContext<TaskStoreApi | undefined>(
  undefined
)

export interface TaskStoreProviderProps {
  children: ReactNode
}

export const TaskStoreProvider = ({ children }: TaskStoreProviderProps) => {
  const storeRef = useRef<TaskStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createTaskStore()
  }

  return (
    <TaskStoreContext.Provider value={storeRef.current}>
      {children}
    </TaskStoreContext.Provider>
  )
}

export const useTaskStore = <T,>(selector: (store: TaskStore) => T): T => {
  const taskStoreContext = useContext(TaskStoreContext)

  if (!taskStoreContext) {
    throw new Error(`useTaskStore must be used within TaskStoreProvider`)
  }

  return useStore(taskStoreContext, selector)
}
