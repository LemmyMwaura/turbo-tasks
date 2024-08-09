// components/Modal.tsx
import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md p-6 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Modal Title
          </Dialog.Title>
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              onClick={onClose}
            >
              &times;
            </button>
          </Dialog.Close>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
