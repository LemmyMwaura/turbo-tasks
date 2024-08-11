import { Task } from '@app/types/task.types'

import { Modal } from './Modal'
import { TaskForm } from './TaskForm'

type Props = {
  btnName: string
  task: Task
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Task) => void
}

export const EditTaskModal = ({
  btnName,
  task,
  isOpen,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <Modal btnName={btnName} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center py-4">
        <TaskForm className="w-full" onSubmit={onSubmit} onClose={onClose} task={task} />
      </div>
    </Modal>
  )
}
