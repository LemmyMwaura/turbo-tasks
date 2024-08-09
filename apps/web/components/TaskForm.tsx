// components/TaskForm.tsx
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Task, taskSchema } from '@repo/ui'
import { Modal, ModalContent, ModalTrigger } from './Modal'

interface Props {
  task?: Task
  isOpen: boolean
  onSubmit: (data: Task) => void
  onClose: () => void
}

export const TaskForm: React.FC<Props> = ({
  task,
  onSubmit,
  onClose,
  isOpen,
}) => {
  const { handleSubmit, control } = useForm<Task>({
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? '',
      dueDate: task?.dueDate || new Date(),
      status: task?.status ?? 'pending',
    },
    resolver: zodResolver(taskSchema),
  })

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent
        title="Task Form"
        onClose={onClose}
        footerContent={
          <button
            type="submit"
            form="task-form"
            className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        }
      >
        <form
          id="task-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    id="title"
                    {...field}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter task title"
                  />
                  {error && (
                    <p className="text-red-600 text-sm">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <textarea
                    id="description"
                    {...field}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter task description"
                  />
                  {error && (
                    <p className="text-red-600 text-sm">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700"
            >
              Due Date
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <input
                    type="date"
                    {...field}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                  {error && (
                    <p className="text-red-600 text-sm">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <select
                    id="status"
                    {...field}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  {error && (
                    <p className="text-red-600 text-sm">{error.message}</p>
                  )}
                </>
              )}
            />
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}
