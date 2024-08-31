'use client'

import { Button, Input } from '@nextui-org/react'

import { Icon } from '../../icon'
import { useChatInput } from './use-chat-input'

type ChatInputProps = {
  onSend: (value: string) => void
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const { value, handleChangeValue, handleKeyDown } = useChatInput(onSend)

  return (
    <Input
      placeholder='Your message'
      classNames={{
        input: 'text-slate-800 font-semibold',
        inputWrapper: 'h-16 ml-1',
        mainWrapper: 'w-full  shadow-lg rounded-lg ',
      }}
      startContent={
        <Button isIconOnly className='bg-slate-200'>
          <Icon name='clip' size={24} className='text-slate-500' />
        </Button>
      }
      endContent={
        <Button isIconOnly className='bg-slate-200'>
          <Icon name='emoticon' size={28} className='text-slate-500' />
        </Button>
      }
      value={value}
      onChange={handleChangeValue}
      onKeyDown={handleKeyDown}
    />
  )
}
