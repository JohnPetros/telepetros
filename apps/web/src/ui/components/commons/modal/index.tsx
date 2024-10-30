'use client'

import { type ForwardedRef, useImperativeHandle, type ReactNode, forwardRef } from 'react'
import {
  Modal as ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react'
import { Slot } from '@radix-ui/react-slot'

import { useModal } from './use-modal'
import type { ModalRef } from './types'

type ModalProps = {
  title: string
  children: ReactNode
  trigger?: ReactNode
  isLarge?: boolean
  isDefaultOpen?: boolean
  buttonTitle?: string
  onClose?: VoidFunction
  onConfirm?: VoidFunction
}

const ModalComponent = (
  {
    title,
    children,
    trigger,
    isLarge,
    isDefaultOpen = false,
    buttonTitle = 'Confirm',
    onConfirm,
  }: ModalProps,
  ref: ForwardedRef<ModalRef>,
) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
  const { handleConfirmButtonClick } = useModal(onConfirm, onClose)

  useImperativeHandle(
    ref,
    () => {
      return {
        close: onClose,
        open: onOpen,
      }
    },
    [onClose, onOpen],
  )

  return (
    <>
      {trigger && <Slot onClick={onOpen}>{trigger}</Slot>}
      <ModalContainer
        size={isLarge ? '5xl' : 'lg'}
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        isDismissable={false}
        defaultOpen={isDefaultOpen}
        isKeyboardDismissDisabled={true}
        className='z-[100]'
      >
        <ModalContent className='p-2'>
          <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter className='mt-1'>
            <Button color='primary' fullWidth onPress={handleConfirmButtonClick}>
              {buttonTitle}
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </>
  )
}

export const Modal = forwardRef(ModalComponent)
