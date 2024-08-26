import { useAuthContext } from '@/ui/contexts/auth-context'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { useChat } from './use-chat'
import type { Chat as ChatEntity } from '@telepetros/core/entities'

type ChatProps = {
  initialChat: ChatEntity
}

export const Chat = ({ initialChat }: ChatProps) => {
  const { chat, onlineChattersCount, handleSendMessage } = useChat(initialChat)
  const { chatter } = useAuthContext()

  if (chatter && chat)
    return (
      <div className='relative flex-1 flex bg-red-700 flex-col px-6 py-3 bg-gradient-to-b from-sky-50 to-white'>
        <div>
          <h1 className='text-2xl text-slate-700 font-semibold'>Channel Chat</h1>
          <p className='mt-1 text-md text-slate-400'>
            {chat.chattersCount} members, {onlineChattersCount} online
          </p>
        </div>

        <div className='space-y-3 mt-6'>
          {chat.messages.map((message) => {
            const messageChatter = chat.getChatterByMessage(message)
            if (messageChatter)
              return (
                <ChatMessage
                  key={message.id}
                  type={message.type}
                  createdAt={message.createdAt}
                  chatter={{ name: messageChatter.name, avatar: messageChatter.avatar }}
                  value={message.value}
                />
              )
          })}
        </div>
        <div className='absolute bottom-4 left-0 right-0 px-6'>
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    )
}
