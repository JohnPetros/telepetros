import { Avatar } from '../avatar'

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
        <Avatar image={chatter.avatar} />
      ) : (
        <Avatar image={chatter.name} />
      )}
      <div className='space-y-3 bg-slate-300/75 rounded-md'>
        <strong className='text-blue-500 text-lg'>{chatter.name}</strong>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi magni sapiente
          repellendus consectetur fugiat, error vel suscipit consequatur inventore id.
          Porro cum odio optio magni quasi laborum iusto amet soluta.
        </p>
        <time className='text-slate-500'>08:57</time>
      </div>
    </div>
  )
}
