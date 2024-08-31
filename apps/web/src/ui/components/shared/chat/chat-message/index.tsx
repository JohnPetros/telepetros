import type { ReactNode } from 'react'

type ChatMessageProps = {
  text: string
  time: string
  chatter: {
    name: string
    avatar?: string
  }
  isMe: boolean
  avatar: ReactNode
}

export const ChatMessage = ({
  chatter,
  text,
  time,
  avatar,
  isMe = false,
}: ChatMessageProps) => {
  if (isMe)
    return (
      <div className='flex items-end justify-end gap-3'>
        <div className='flex flex-col gap-2 min-w-80 max-w-96 p-3 bg-blue-300/45 rounded-xl rounded-ee-none'>
          <strong className='text-blue-500 font-semibold text-md'>{chatter.name}</strong>
          <p className='text-sm text-slate-800 font-medium'>{text}</p>
          <time className='block ml-auto text-slate-500 text-xs'>{time}</time>
        </div>
        {avatar}
      </div>
    )

  return (
    <div className='flex items-end gap-3'>
      {avatar}
      <div className='flex flex-col gap-2 min-w-80 max-w-96 p-3 bg-slate-300/45 rounded-xl rounded-es-none'>
        <strong className='text-blue-500 font-semibold text-md'>{chatter.name}</strong>
        <p className='text-sm text-slate-800 font-medium'>{text}</p>
        <time className='block ml-auto text-slate-500 text-xs'>{time}</time>
      </div>
    </div>
  )
}
