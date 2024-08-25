import { Avatar } from '@nextui-org/react'

type ChatMessageProps = {
  chatter: {
    name: string
    avatar?: string
  }
}

export const ChatMessage = ({ chatter }: ChatMessageProps) => {
  return (
    <div className='flex items-end gap-3'>
      {chatter.avatar ? (
        <Avatar src={chatter.avatar} size='lg' />
      ) : (
        <Avatar name={chatter.name} size='lg' />
      )}
      <div className='flex flex-col gap-2 max-w-96 p-3 bg-slate-300/45 rounded-xl rounded-es-none'>
        <strong className='text-blue-500 font-semibold text-md'>{chatter.name}</strong>
        <p className='text-sm text-slate-800 font-medium'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magni sapiente
          repellendus consectetur fugiat, error vel suscipit consequatur inventore id
        </p>
        <time className='block ml-auto text-slate-500 text-xs'>08:57</time>
      </div>
    </div>
  )
}
