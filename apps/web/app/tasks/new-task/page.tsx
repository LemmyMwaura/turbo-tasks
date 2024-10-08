'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { uuid } from 'uuidv4'

import { TaskForm } from '@app/components/TaskForm'
import { useTaskStore } from '@app/state/tasks.store'

import { Card, CardContent, CardHeader, CardTitle } from '@app/ui/Card'
import { formatDate } from '@app/utils/date-util'
import { Task } from '@app/types/task.types'

export default function NewTaskPage() {
  const { addTask } = useTaskStore((store) => store)
  const router = useRouter()

  const handleAddTask = (task: Task) => {
    const newTask: Task = {
      ...task,
      id: uuid(),
    }

    addTask(newTask)
    toast('Task has been created', {
      description: formatDate(new Date()),
    })
    router.push('/tasks')
  }

  const handleCancel = () => {
    router.push('/tasks')
  }

  return (
    <div className="p-6 w-[100vw] h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Create Task</CardTitle>
        </CardHeader>

        <CardContent>
          <TaskForm onSubmit={handleAddTask} onClose={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
