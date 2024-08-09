import { z } from 'zod'

export const taskSchema = z
  .object({
    id: z.string(),
    title: z
      .string({ required_error: 'Task title is required' })
      .min(5, 'Task title is too short'),
    description: z.string().optional(),
    dueDate: z.date({ required_error: 'Due date is required' }),
    status: z.enum(['pending', 'in-progress', 'completed'], {
      required_error: 'Status is required',
    }),
  })
  .strict()

export const taskFormSchema = taskSchema.omit({ id: true })

export type TaskForm = z.infer<typeof taskFormSchema>
export type Task = z.infer<typeof taskSchema>
