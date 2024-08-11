import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@app/ui/Dialog'

type Props = {
  children: React.ReactNode
  btnName: string
  isOpen: boolean
  onClose?: () => void
  dialogFooter?: React.ReactNode
}

export const Modal = ({
  btnName,
  isOpen,
  onClose,
  children,
  dialogFooter,
}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle title={btnName} />
        {children}
        <DialogFooter>{dialogFooter}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
