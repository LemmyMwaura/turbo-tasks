import React from 'react'
import { useRouter } from 'next/navigation'

import { Task } from '@app/types/task.types'
import { Card, CardContent } from '@app/ui/Card'
import { Checkbox } from '@app/ui/Checkbox'

export const TaskItem = ({ task }: { task: Task }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`tasks/${task.id}`)
  }

  return (
    <Card onClick={handleClick} className="cursor-pointer">
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-sm text-muted-foreground">
              {task?.dueDate ? new Date(task.dueDate).toISOString() : ''}
            </p>
          </div>
          <Checkbox defaultChecked={task.status === 'completed'} />
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
      </CardContent>
    </Card>
  )
}
