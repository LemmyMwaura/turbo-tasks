'use client'

import { useRouter } from 'next/navigation'

import { TaskList } from '@app/components/TaskList'
import { useTaskStore } from '@app/state/tasks.store'

import { Button } from '@app/ui/Button'
import { NoTasks } from '@app/components/NoTasks'

export default function TaskPage() {
  const router = useRouter()
  const { tasks } = useTaskStore((store) => store)

  const handleAddTask = () => {
    router.push('/tasks/new-task')
  }

  return (
    <div>
      <div className="mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h1 className="text-2xl font-bold md:text-3xl">Tasks</h1>
          <Button onClick={handleAddTask}>Add New Task</Button>
        </div>
        {tasks.length ? <TaskList tasks={tasks} /> : <NoTasks />}
      </div>
    </div>
  )
}
