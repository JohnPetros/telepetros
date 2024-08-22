import type { ReactNode } from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button, Input } from '@nextui-org/react'

type PopoverComponentProps = {
  children: ReactNode
  trigger: ReactNode
}

const PopoverComponent = ({ children, trigger }: PopoverComponentProps) => {
  return (
    <div className='flex flex-wrap gap-4'>
      <Popover showArrow offset={10} placement='bottom' backdrop='transparent'>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent className='w-[240px]'>
          <div className='px-1 py-2 w-full'>{children}</div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { PopoverComponent as Popover }
