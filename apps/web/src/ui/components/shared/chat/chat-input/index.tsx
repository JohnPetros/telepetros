'use client'

import { Button, Input } from '@nextui-org/react'

import { Icon } from '../../icon'
import { useChatInput } from './use-chat-input'

type ChatInputProps = {
  onSend: (text: string, attachment: File | null) => void
}

export const ChatInput = ({ onSend }: ChatInputProps) => {
  const {
    text,
    file,
    handleChangeText,
    handleChangeFile,
    handleKeyDown,
    handleRemoveButtonClick,
  } = useChatInput(onSend)

  return (
    <div>
      {file && (
        <div className='flex items-center justify-between translate-y-2 p-3 rounded-t-xl border border-slate-300 bg-slate-50'>
          <div>
            <strong className='text-sm text-slate-700'>{file.name}</strong>
            <small className='block text-sm text-slate-700 mt-1'>
              {Math.round(file.size / 1024)} KB
            </small>
          </div>
          <Button
            isIconOnly
            color='danger'
            size='sm'
            onClick={() => handleRemoveButtonClick()}
          >
            <Icon name='trash' size={16} />
          </Button>
        </div>
      )}
      <Input
        placeholder='Your message'
        classNames={{
          input: 'text-slate-800 font-semibold',
          inputWrapper: 'h-16',
          mainWrapper: 'w-full shadow-lg rounded-lg ',
        }}
        startContent={
          <label className='grid place-content-center bg-slate-200 rounded-lg p-2 cursor-pointer'>
            <Icon name='clip' size={24} className='text-slate-500' />
            <input
              type='file'
              name='file'
              id='file'
              onChange={handleChangeFile}
              className='sr-only'
            />
          </label>
        }
        endContent={
          <Button isIconOnly className='bg-slate-200'>
            <Icon name='emoticon' size={28} className='text-slate-500' />
          </Button>
        }
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
