import { useAuthContext } from '@/ui/contexts/auth-context'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { useChat } from './use-chat'
import type { Chat as ChatEntity } from '@telepetros/core/entities'
import { useRef } from 'react'

type ChatProps = {
  initialChat: ChatEntity
}

export const Chat = ({ initialChat }: ChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null)
  const { chat, handleSendMessage } = useChat(initialChat, chatRef)
  const { chatter } = useAuthContext()

  if (chatter && chat)
    return (
      <div
        ref={chatRef}
        className='flex-1 flex flex-col px-6 pt-3 bg-gradient-to-b from-sky-50 to-white overflow-auto'
      >
        <div>
          <h1 className='text-2xl text-slate-700 font-semibold'>Channel Chat</h1>
          <p className='mt-1 text-md text-slate-400'>
            {chat.chattersCount} members, {chat.onlineChattersCount} online
          </p>
        </div>

        <div className='flex-1 space-y-3 mt-6 w-full pb-56'>
          {chat.messages.map((message) => {
            const messageChatter = chat.getChatterByMessage(message)
            if (messageChatter)
              return (
                <ChatMessage
                  key={message.id}
                  type={message.type}
                  time={message.time}
                  chatter={{ name: messageChatter.name, avatar: messageChatter.avatar }}
                  value={message.value}
                  isMe={message.isFromChatter(chatter)}
                />
              )
          })}
        </div>
        <div className='fixed bottom-4 left-80 right-12'>
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    )
}
