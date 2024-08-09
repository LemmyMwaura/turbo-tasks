import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Task } from '@app/types/task.types'
import { storeData } from '@app/state/async.state'

const QUERYKEY = 'tasks'

type Props = {
  onComplete: () => void
}

/** Performs Delete Mutation on Tasks */
export const useDeleteMutation = ({ onComplete }: Props) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (taskId: string) => {
      const existingTasks = queryClient.getQueryData<Task[]>([QUERYKEY]) || []
      const updatedTasks = existingTasks.filter((task) => task.id !== taskId)
      return updatedTasks
    },
    onSuccess: async (updatedTasks) => {
      await storeData(QUERYKEY, updatedTasks)
      queryClient.invalidateQueries({ queryKey: [QUERYKEY] })
      onComplete()
    },
    onError: (error) => {
      console.error('Something went wrong:', error)
    },
  })
}
