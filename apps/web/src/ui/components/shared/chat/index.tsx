'use client'

import { type ReactNode, useRef } from 'react'

import type { Chat as ChatEntity } from '@telepetros/core/entities'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { ChatAvatar } from '../chatter-avatar'
import { useChat } from './use-chat'
import { Datetime } from '@telepetros/core/libs'
import { ChatMessageMenu } from './chat-message-menu'

type ChatProps = {
  initialChat: ChatEntity
  children: (chat: ChatEntity) => ReactNode
}

export const Chat = ({ initialChat, children: header }: ChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null)
  const {
    chat,
    isUploading,
    handleSendMessage,
    handleEditMessage,
    handleReplyMessage,
    handleCopyMessage,
    handleDeleteMessage,
  } = useChat(initialChat, chatRef)
  const { authChatter } = useAuthContext()

  if (authChatter && chat)
    return (
      <div
        ref={chatRef}
        className='flex-1 flex flex-col px-6 pt-3 bg-gradient-to-b from-sky-50 to-white overflow-auto'
      >
        {header(chat)}

        <div className='flex-1 space-y-3 mt-6 w-full pb-56'>
          {chat.messages.map((message) => {
            const messageChatter = chat.getChatterByMessage(message)
            if (messageChatter)
              return (
                <ChatMessage
                  key={message.id}
                  time={message.time}
                  chatter={{ name: messageChatter.name, avatar: messageChatter.avatar }}
                  text={message.text}
                  isMe={message.isFromChatter(authChatter)}
                  attachment={message.attachment}
                  menu={
                    <ChatMessageMenu
                      onClickCopy={() => handleCopyMessage(message.text)}
                      onClickDelete={() => handleDeleteMessage(message.id)}
                      onClickReply={() => handleReplyMessage(message.id)}
                      onClickEdit={() => handleEditMessage(message.id)}
                    />
                  }
                  avatar={
                    <ChatAvatar
                      name={messageChatter.name}
                      avatar={messageChatter.avatar}
                      isOnline={messageChatter.isOnline}
                      size='lg'
                    />
                  }
                />
              )
          })}
          {isUploading && (
            <div className='animate-pulse'>
              <ChatMessage
                time={new Datetime().format(new Date(), 'DD/MM/YYYY HH:mm')}
                chatter={{ name: authChatter.name, avatar: authChatter.avatar }}
                text={'...Uploading'}
                attachment={null}
                isMe={true}
                avatar={
                  <ChatAvatar
                    name={authChatter.name}
                    avatar={authChatter.avatar}
                    isOnline={true}
                    size='lg'
                  />
                }
              />
            </div>
          )}
        </div>
        <div className='fixed bottom-4 left-80 right-12 z-40'>
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>
    )
}
