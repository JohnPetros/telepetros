'use client'

export function useModal(onConfirm?: VoidFunction, closeModal?: VoidFunction) {
  function handleConfirmButtonClick() {
    if (onConfirm) onConfirm()
    if (closeModal) closeModal()
  }

  return {
    handleConfirmButtonClick,
  }
}
