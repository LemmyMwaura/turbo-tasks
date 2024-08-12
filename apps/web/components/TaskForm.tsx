import { ChangeEvent } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Task, taskSchema } from '@app/types/task.types'
import { cn } from '@app/utils/cn'

import { Button } from '@app/ui/Button'
import { Label } from '@app/ui/Label'
import { Input } from '@app/ui/Input'
import { Textarea } from '@app/ui/TextArea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@app/ui/Select'

interface Props {
  task?: Task
  className?: string
  onClose: () => void
  onSubmit: (data: Task) => void
}

export const TaskForm: React.FC<Props> = ({
  task,
  onSubmit,
  onClose,
  className,
}) => {
  const { handleSubmit, control } = useForm<Task>({
    defaultValues: {
      title: task?.title ? task.title : undefined,
      description: task?.description ? task.description : undefined,
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
      status: task?.status ? task.status : undefined,
    },
    resolver: zodResolver(taskSchema),
  })

  return (
    <form
      id="task-form"
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-4', className)}
    >
      <div className="space-y-1">
        <Label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </Label>
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                id="title"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter task title"
              />
              {error && <p className="text-red-600 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </Label>
        <Controller
          name="description"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Textarea
                id="description"
                {...field}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter task description"
              />
              {error && <p className="text-red-600 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </Label>
        <Controller
          name="dueDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input
                type="date"
                {...field}
                value={
                  field.value
                    ? new Date(field.value).toISOString().split('T')[0]
                    : ''
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  field.onChange(new Date(e.target.value))
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              {error && <p className="text-red-600 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div className="space-y-1">
        <Label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </Label>
        <Controller
          name="status"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                {...field}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {error && <p className="text-red-600 text-sm">{error.message}</p>}
            </>
          )}
        />
      </div>

      <div className="space-y-1 flex justify-between items-center space-x-4 mt-4">
        <Button type="button" onClick={onClose} className="bg-black text-white">
          Cancel
        </Button>

        <Button type="submit" className="bg-black text-white">
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  )
}
