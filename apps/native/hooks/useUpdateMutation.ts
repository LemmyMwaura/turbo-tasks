import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Task } from '@app/types/task.types'
import { storeData } from '@app/state/async.state'

const QUERYKEY = 'tasks'

type useUpdateProps = {
  onComplete: () => void
}

/** Performs Update Mutation on Tasks */
export const useUpdateTaskMutation = ({ onComplete }: useUpdateProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedTask: Task) => {
      const existingTasks = queryClient.getQueryData<Task[]>([QUERYKEY]) || []
      const updatedTasks = existingTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
      await storeData(QUERYKEY, updatedTasks)
      return updatedTasks
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY] })
      onComplete()
    },
    onError: (error) => {
      console.error('Something went wrong:', error)
    },
  })
}