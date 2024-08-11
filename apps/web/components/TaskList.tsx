import { Task } from '@app/types/task.types'
import { TaskItem } from './TaskItem'

type Props = {
  tasks: Task[]
}

export const TaskList: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
