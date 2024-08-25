import { Button, Input } from '@nextui-org/react'
import { Icon } from '../../icon'

export const ChatInput = () => {
  return (
    <Input
      placeholder='Your'
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
          <Icon name='emote' size={28} className='text-slate-500' />
        </Button>
      }
    />
  )
}
