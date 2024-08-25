import { useAuthContext } from '@/ui/contexts/auth-context'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { useChat } from './use-chat'

type ChatProps = {
  id: string
}

export const Chat = ({ id }: ChatProps) => {
  const { messages } = useChat(id)
  const { chatter } = useAuthContext()

  if (chatter)
    return (
      <div className='relative flex-1 flex bg-red-700 flex-col px-6 py-3 bg-gradient-to-b from-sky-50 to-white'>
        <div>
          <h1 className='text-2xl text-slate-700 font-semibold'>Channel Chat</h1>
          <p className='mt-1 text-md text-slate-400'>23 members, 10 online</p>
        </div>

        <div className='space-y-3 mt-6'>
          <ChatMessage chatter={{ name: chatter.name, avatar: chatter.avatar }} />
        </div>
        <div className='absolute bottom-4 left-0 right-0 px-6'>
          <ChatInput />
        </div>
      </div>
    )
}
