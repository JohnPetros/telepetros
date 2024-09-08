'use client'

import { type RefObject, useCallback, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

export function usePopover(containerRef: RefObject<HTMLDivElement>) {
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

  useOnClickOutside(containerRef, close)

  return {
    isOpen,
    open,
    close,
    handleTriggerClick,
  }
}
