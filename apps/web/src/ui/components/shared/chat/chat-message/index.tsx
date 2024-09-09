import type { ReactNode } from 'react'

import type { Attachment } from '@telepetros/core/structs'

import { ChatMessageBody } from './chat-message-body'

type ChatMessageProps = {
  chatter: {
    name: string
    avatar?: string
  }
  parentMessage?: {
    chatterName: string
    text: string
  } | null
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
  parentMessage,
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
            parentMessage={parentMessage}
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
