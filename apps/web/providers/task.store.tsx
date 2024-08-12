'use client'

import * as React from 'react'
import { useTaskStore } from '@app/state/tasks.store'

const TaskStoreHydration = () => {
  React.useEffect(() => {
    useTaskStore.persist.rehydrate()
  }, [])

  return null
}

export { TaskStoreHydration }
