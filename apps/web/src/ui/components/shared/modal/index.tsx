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
  isDefaultOpen?: boolean
  onConfirm: VoidFunction
}

const ModalComponent = (
  { title, children, trigger, isDefaultOpen = false, onConfirm }: ModalProps,
  ref: ForwardedRef<ModalRef>,
) => {
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure()
  const { handleConfirmButtonClick } = useModal(onConfirm, onClose)

  useImperativeHandle(
    ref,
    () => {
      return {
        close: onClose,
      }
    },
    [onClose],
  )

  return (
    <>
      {trigger && <Slot onClick={onOpen}>{trigger}</Slot>}
      <ModalContainer
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        isDismissable={false}
        defaultOpen={isDefaultOpen}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button color='primary' onPress={handleConfirmButtonClick}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalContainer>
    </>
  )
}

export const Modal = forwardRef(ModalComponent)
