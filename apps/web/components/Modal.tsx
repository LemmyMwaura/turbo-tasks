import { forwardRef, ReactNode } from 'react';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

export type ModalContentProps = DialogPrimitive.DialogContentProps & {
  title?: ReactNode;
  subTitle?: ReactNode;
  footerContent?: ReactNode;
  onClose?: () => void;
  overlayClassName?: string;
};

export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  (
    {
      children,
      title,
      subTitle,
      className,
      overlayClassName,
      footerContent,
      onClose,
      ...props
    },
    forwardedRef
  ) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay
        className={twMerge(
          'fixed inset-0 z-30 h-full w-full animate-fadeIn',
          overlayClassName
        )}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      />
      <DialogPrimitive.Content {...props} ref={forwardedRef}>
        <div
          className={twMerge(
            'fixed top-1/2 left-1/2 z-40 max-w-[70rem] -translate-y-2/4 -translate-x-2/4 animate-popIn rounded-lg bg-white p-6  dark:bg-bunker-800',
            className
          )}
          style={{ maxHeight: '90%' }}
        >
          <div className="mb-4">
            {title && (
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {title}
              </h2>
            )}
            {subTitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subTitle}
              </p>
            )}
          </div>
          <div className="space-y-4">{children}</div>
          {footerContent && (
            <div className="mt-6 flex justify-end space-x-4">
              {footerContent}
            </div>
          )}
          <DialogPrimitive.Close aria-label="Close" asChild onClick={onClose}>
            <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100">
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                className="cursor-pointer"
              />
            </button>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

ModalContent.displayName = 'ModalContent';

export type ModalProps = Omit<DialogPrimitive.DialogProps, 'open'> & {
  isOpen?: boolean;
};
export const Modal = ({ isOpen, ...props }: ModalProps) => (
  <DialogPrimitive.Root open={isOpen} {...props} />
);

export const ModalTrigger = DialogPrimitive.Trigger;
export type ModalTriggerProps = DialogPrimitive.DialogTriggerProps;

export const ModalClose = DialogPrimitive.Close;
export type ModalCloseProps = DialogPrimitive.DialogCloseProps;
