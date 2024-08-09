import { Task } from '@repo/ui'
interface TaskListProps {
  tasks: Task[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <span
            className={`task-status task-status-${task.status.toLowerCase()}`}
          >
            {task.status}
          </span>
        </div>
      ))}
    </div>
  )
}

export default TaskList
