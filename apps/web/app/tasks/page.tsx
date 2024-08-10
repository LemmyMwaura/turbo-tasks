'use client'

import { useRouter } from 'next/navigation'

import { TaskList } from '@app/components/TaskList'
import { useTaskStore } from '@app/providers/task.store'

export default function TaskPage() {
  const router = useRouter()
  const { tasks } = useTaskStore((store) => store)

  const handleAddTask = () => {
    router.push('/tasks/new-task')
  }

  return (
    <div>
      <div className="flex p-2 items-center w-full">
        <h4 className="m-auto font-bold text-2xl">Tasks</h4>
        <button
          onClick={handleAddTask}
          className="ml-auto bg-blue-500 text-white py-2 px-4 rounded-md font-semibold"
        >
          Add New Task
        </button>
      </div>
      {tasks && <TaskList tasks={tasks} />}
    </div>
  )
}
