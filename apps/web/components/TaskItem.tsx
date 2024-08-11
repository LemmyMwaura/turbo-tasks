import React from 'react'
import { useRouter } from 'next/navigation'

import { Task } from '@app/types/task.types'
import { formatDate } from '@app/utils/date-util'

import { Card, CardContent } from '@app/ui/Card'
import { Badge } from '@app/ui/Badge'

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
              {task?.dueDate ? formatDate(task.dueDate.toISOString()) : ''}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <Badge
          variant={task.status === 'in-progress' ? 'inProgress' : task.status}
          className="px-2 py-1 rounded-full mt-4"
        >
          {task.status}
        </Badge>
      </CardContent>
    </Card>
  )
}
