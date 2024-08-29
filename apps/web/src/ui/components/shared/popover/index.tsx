'use client'

import { forwardRef, useImperativeHandle, type ForwardedRef, type ReactNode } from 'react'
import {
  Popover as PopoverContainer,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react'

import type { PopoverRef } from './types'
import { usePopover } from './use-popover'

type PopoverComponentProps = {
  children: ReactNode
  trigger: ReactNode
}

const PopoverComponent = (
  { children, trigger }: PopoverComponentProps,
  ref: ForwardedRef<PopoverRef>,
) => {
  const { isOpen, close, open, handleTriggerClick } = usePopover()

  useImperativeHandle(
    ref,
    () => {
      return {
        close,
        open,
      }
    },
    [close, open],
  )

  return (
    <div className='flex flex-wrap gap-4'>
      <PopoverContainer
        isOpen={isOpen}
        showArrow
        offset={10}
        placement='bottom'
        backdrop='transparent'
      >
        <PopoverTrigger onClick={handleTriggerClick}>{trigger}</PopoverTrigger>
        <PopoverContent className='w-[240px] z-10'>
          <div className='px-1 py-2 w-full'>{children}</div>
        </PopoverContent>
      </PopoverContainer>
    </div>
  )
}

export const Popover = forwardRef(PopoverComponent)
