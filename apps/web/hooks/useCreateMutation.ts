import { useMutation, useQueryClient } from '@tanstack/react-query'
import { randomUUID } from 'expo-crypto'

import { storeData } from '@app/app/state/local.store'
import { Task } from '@repo/ui'

const QUERYKEY = 'tasks'

type useUpdateProps = {
  onComplete: () => void
}

/** Performs Create Mutation on Tasks */
export const useCreateTaskMutation = ({ onComplete }: useUpdateProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Task) => {
      const newTask = {
        ...data,
        id: randomUUID(),
        dueDate: new Date(),
      }

      const existingTasks = queryClient.getQueryData<Task[]>([QUERYKEY]) || []
      const updatedTasks = [...existingTasks, newTask]
      await storeData(QUERYKEY, updatedTasks)
      return updatedTasks
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY] })
      onComplete()
    },
    onError: (error) => {
      console.error('Error saving task:', error)
    },
  })
}
