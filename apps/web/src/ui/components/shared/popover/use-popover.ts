'use client'

import { useCallback, useState } from 'react'

export function usePopover() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  function handleTriggerClick() {
    if (isOpen) close()
    else open()
  }

  return {
    isOpen,
    open,
    close,
    handleTriggerClick,
  }
}
