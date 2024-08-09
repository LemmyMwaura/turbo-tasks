'use client'

import { useRouter } from 'next/navigation'

import { Task } from '@app/types/task.types'
import React from 'react'

const TaskItem = ({ task }: { task: Task }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`tasks/${task.id}`)
  }

  return (
    <div
      key={task.id}
      onClick={handleClick}
      className="p-4 bg-white  border border-gray-200 rounded-lg duration-300 cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{task.title}</h3>
      <p className="text-gray-700 mb-2">{task.description}</p>
      <span
        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
          task.status === 'completed'
            ? 'bg-green-100 text-green-800'
            : task.status === 'in-progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {task.status}
      </span>
    </div>
  )
}

export default TaskItem
