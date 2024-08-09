import { useMutation, useQueryClient } from '@tanstack/react-query'

import { storeData } from '@app/app/state/local.store'
import { Task } from '@repo/ui'

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
      await storeData(QUERYKEY, updatedTasks)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY] })
      onComplete()
    },
    onError: (error) => {
      console.error('Something went wrong:', error)
    },
  })
}
