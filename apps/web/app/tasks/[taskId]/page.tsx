'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import { Modal } from '@app/app/components/Modal'
import { Task } from '@repo/ui'
import { TaskForm } from '@app/components/TaskForm'

import { useUpdateTaskMutation } from '@app/hooks/useUpdateMutation'
import { useDeleteMutation } from '@app/hooks/useDeleteMutation'

const TaskDetailsPage = ({ params }: { params: { taskId: string } }) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const taskId = params.taskId

  const existingTasks = queryClient.getQueryData<Task[]>(['tasks']) || []
  const task = existingTasks.find((task) => task.id === taskId)

  const [editModalVisible, setModalVisible] = useState(false)
  const [delModalVisible, setDelModalVisible] = useState(false)

  const editMutation = useUpdateTaskMutation({
    onComplete: () => setModalVisible(false),
  })

  const delMutation = useDeleteMutation({
    onComplete: () => {
      router.push('/tasks')
    },
  })

  const handleUpdateTask = (data: Task) => {
    if (task) {
      editMutation.mutate({ ...task, ...data })
    }
  }

  const handleDelete = () => {
    if (task && task.id) {
      delMutation.mutate(task.id)
    }
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-[#f5e0dc]">
        <p className="text-red-600 text-xl">Task not found</p>
      </div>
    )
  }

  return (
    <div className="p-6 flex justify-center items-center bg-[#f5e0dc] min-h-screen w-[100vw]">
      <div className="max-w-lg m-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{task.title}</h1>
        <p className="text-gray-600 mb-4">{task.description}</p>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`text-lg ${task.status === 'completed' ? 'text-blue-500' : 'text-red-500'}`}
            >
              {task.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Due Date:</span>
            <span className="text-gray-800">
              {task.dueDate
                ? new Date(task.dueDate)
                    .toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                    .replace(/(\d{1,2})(st|nd|rd|th)?/, (day) => `${day}th`)
                : ''}
            </span>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold"
            onClick={() => setModalVisible(true)}
          >
            Edit Task
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg font-semibold"
            onClick={() => setDelModalVisible(true)}
          >
            Delete Task
          </button>
        </div>

        {/* <Modal
          isOpen={delModalVisible}
          onClose={() => setDelModalVisible(false)}
        >
          {'modal'}
        </Modal> */}

        <TaskForm
          task={task}
          onSubmit={handleUpdateTask}
          onClose={() => setModalVisible(false)}
          isOpen={editModalVisible}
        />
      </div>
    </div>
  )
}

export default TaskDetailsPage
