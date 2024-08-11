'use client'

import { Metadata } from 'next/types'
import { useRouter } from 'next/navigation'

import { TaskForm } from '@app/components/TaskForm'
import { useTaskStore } from '@app/providers/task.store'

import { Card, CardContent, CardHeader, CardTitle } from '@app/ui/Card'
import { Task } from '@app/types/task.types'
import { uuid } from 'uuidv4'

export default function NewTaskPage() {
  const { addTask } = useTaskStore((store) => store)
  const router = useRouter()

  const handleAddTask = (task: Task) => {
    const newTask: Task = {
      ...task,
      id: uuid(),
    }

    addTask(newTask)
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
