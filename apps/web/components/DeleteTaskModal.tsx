import { Button } from '@app/ui/Button'
import { Modal } from './Modal'

type Props = {
  btnName: string
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
}

export const DeleteTaskModal = ({ isOpen, btnName, onClose, onDelete }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      btnName={btnName}
      onClose={onClose}
      dialogFooter={
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="h-8 w-8 text-red-500" />
        <div className="space-y-2 text-center">
          <h3 className="text-lg font-medium">Delete Confirmation</h3>
          <p className="text-muted-foreground">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </div>
      </div>
    </Modal>
  )
}
