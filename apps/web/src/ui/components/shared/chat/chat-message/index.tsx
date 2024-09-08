import type { ReactNode } from 'react'

import type { Attachment } from '@telepetros/core/structs'

import { useChatMessage } from './use-chat-message'
import { Image } from '@nextui-org/react'

type ChatMessageProps = {
  chatter: {
    name: string
    avatar?: string
  }
  text: string
  time: string
  isMe: boolean
  attachment?: Attachment | null
  avatar: ReactNode
}

export const ChatMessage = ({
  chatter,
  text,
  time,
  avatar,
  attachment,
  isMe = false,
}: ChatMessageProps) => {
  if (isMe)
    return (
      <div className='flex items-end justify-end gap-3'>
        <div className='flex flex-col gap-2 min-w-80 max-w-96 p-3 bg-blue-200/45 rounded-xl rounded-ee-none'>
          <strong className='text-blue-500 font-semibold text-md'>{chatter.name}</strong>
          <p className='text-sm text-slate-800 font-medium'>{text}</p>
          {attachment && <Image src={attachment.value} alt={attachment.name} />}
          <time className='block ml-auto text-slate-500 text-xs'>{time}</time>
        </div>
        {avatar}
      </div>
    )

  return (
    <div className='flex items-end gap-3'>
      {avatar}
      <div className='flex flex-col gap-2 min-w-80 max-w-96 p-3 bg-slate-200/45 rounded-xl rounded-es-none'>
        <strong className='text-blue-500 font-semibold text-md'>{chatter.name}</strong>
        <p className='text-sm text-slate-800 font-medium'>{text}</p>
        <Image
          src='https://res.cloudinary.com/dswcdkj9c/image/upload/v1725756808/attachments/ansdh2kinlr2gobnvkbj.jpg'
          alt=''
        />
        <time className='block ml-auto text-slate-500 text-xs'>{time}</time>
      </div>
    </div>
  )
}
