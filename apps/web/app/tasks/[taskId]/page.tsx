'use client'

import { Metadata } from 'next/types'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'

import { useTaskStore } from '@app/providers/task.store'

import { Task } from '@app/types/task.types'
import { formatDate } from '@app/utils/date-util'

import { Badge } from '@app/ui/Badge'
import { Button } from '@app/ui/Button'

import { DeleteTaskModal } from '@app/components/DeleteTaskModal'
import { EditTaskModal } from '@app/components/EditTaskModal'

const TaskDetailsPage = ({ params }: { params: { taskId: string } }) => {
  const router = useRouter()
  const { getTaskById, updateTask, removeTask } = useTaskStore((store) => store)

  const taskId = params.taskId
  const task = getTaskById(taskId)

  const [showEditModal, setShowEditModal] = useState(false)
  const [showDelModal, setShowDelModal] = useState(false)

  const handleUpdateTask = (data: Task) => {
    if (task) {
      updateTask(taskId, data)
      setShowEditModal(false)
      router.refresh()
    }
  }

  const handleDelete = () => {
    removeTask(taskId)
    router.push('/tasks')
  }

  const goBack = () => {
    router.back()
  }

  const closeDelModal = useCallback(() => {
    setShowDelModal(false)
  }, [])

  const closeEditModal = useCallback(() => {
    setShowEditModal(false)
  }, [])

  if (!taskId) {
    router.push('/not-found')
    return
  }

  if (!task) {
    return
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background justify-center">
      <main className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Task Details
              </h1>
              <p className="mt-2 text-muted-foreground">
                View and manage the details of your task.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={goBack}>
                Go Back
              </Button>
              <Button variant="outline" onClick={() => setShowEditModal(true)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => setShowDelModal(true)}
              >
                Delete
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="grid gap-4">
              <div>
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <Badge
                    variant={
                      task.status === 'in-progress' ? 'inProgress' : task.status
                    }
                    className="px-2 py-1 rounded-full"
                  >
                    {task.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Compile and submit the Q4 financial report for the company.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  {task.dueDate ? formatDate(task.dueDate.toISOString()) : ''}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p>{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div />
      <DeleteTaskModal
        btnName="Delete"
        isOpen={showDelModal}
        onClose={closeDelModal}
        onDelete={handleDelete}
      />

      <EditTaskModal
        btnName="Edit"
        isOpen={showEditModal}
        onClose={closeEditModal}
        task={task}
        onSubmit={handleUpdateTask}
      />
      <div />
    </div>
  )
}

export default TaskDetailsPage
