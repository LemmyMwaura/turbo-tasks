'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { TaskForm } from '@app/components/TaskForm'
import { useTaskStore } from '@app/providers/task.store'

import { Task } from '@app/types/task.types'
import { v4 as uuid } from 'uuid';

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
    <div className="p-6 w-[100vw] flex flex-col items-center justify-center mx-auto rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <div className="min-w-[80%] m-auto bg-white p-6 rounded-lg shadow-md">
        <TaskForm onSubmit={handleAddTask} onClose={handleCancel} />
      </div>
    </div>
  )
}
