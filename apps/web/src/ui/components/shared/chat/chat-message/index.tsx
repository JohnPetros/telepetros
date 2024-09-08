import type { ReactNode } from 'react'

import type { Attachment } from '@telepetros/core/structs'

import { useChatMessage } from './use-chat-message'
import { ChatMessageBody } from './chat-message-body'
import { ChatMessageMenu } from '../chat-message-menu'

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
  menu?: ReactNode
}

export const ChatMessage = ({
  chatter,
  text,
  time,
  avatar,
  attachment,
  menu,
  isMe = false,
}: ChatMessageProps) => {
  if (isMe)
    return (
      <div className='relative flex items-end justify-end gap-3'>
        <div className='peer'>
          <ChatMessageBody
            chatterName={chatter.name}
            text={text}
            time={time}
            attachment={attachment}
          />
        </div>
        {menu && (
          <div className='absolute -top-4 right-16 invisible hover:visible peer-hover:visible'>
            {menu}
          </div>
        )}
        {avatar}
      </div>
    )

  return (
    <div className='flex items-end gap-3'>
      {avatar}
      <ChatMessageBody
        chatterName={chatter.name}
        text={text}
        time={time}
        attachment={attachment}
      />
    </div>
  )
}
