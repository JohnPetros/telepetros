'use client'

export function useModal(onConfirm: VoidFunction, closeModal: VoidFunction) {
  function handleConfirmButtonClick() {
    onConfirm()
    closeModal()
  }

  return {
    handleConfirmButtonClick,
  }
}
