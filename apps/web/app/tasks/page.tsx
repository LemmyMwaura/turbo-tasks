'use client'

import TaskList from '@app/components/TaskList'
import { useTaskStore } from '@app/providers/task.store'

export default function TaskPage() {
  const tasks = useTaskStore((store) => store.tasks)

  return (
    <div>
      <div className="flex p-2 items-center w-full">
        <h4 className="m-auto font-bold text-2xl">Tasks</h4>
      </div>
      {tasks && <TaskList tasks={tasks} />}
    </div>
  )
}
