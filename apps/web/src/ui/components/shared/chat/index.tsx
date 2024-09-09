'use client'

import { type ReactNode, useRef } from 'react'

import type { Chat as ChatEntity } from '@telepetros/core/entities'
import type { ChatDto } from '@telepetros/core/dtos'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { ChatMessage } from './chat-message'
import { ChatInput } from './chat-input'
import { ChatAvatar } from '../chatter-avatar'
import { useChat } from './use-chat'
import { Datetime } from '@telepetros/core/libs'
import { ChatMessageMenu } from './chat-message-menu'
import { ChatMessageBeingEdited } from './chat-message-being-editing'

type ChatProps = {
  chatDto: ChatDto
  children: (chat: ChatEntity) => ReactNode
}

export const Chat = ({ chatDto, children: header }: ChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null)
  const {
    chat,
    messageToReply,
    isUploading,
    isEditing,
    messageBeingEditedId,
    handleSendMessage,
    handleCancelEditing,
    handleReplyMessage,
    handleEditMessage,
    handleEditMessageStart,
    handleCopyMessage,
    handleCancelReply,
    handleDeleteMessage,
  } = useChat(chatDto, chatRef)
  const { authChatter } = useAuthContext()

  if (authChatter)
    return (
      <div
        ref={chatRef}
        className='flex-1 flex flex-col px-6 pt-3 bg-gradient-to-b from-sky-50 to-white overflow-auto'
      >
        {header(chat)}

        <div className='flex-1 space-y-3 mt-6 w-full pb-56'>
          {chat.messages.map((message) => {
            if (message.id === messageBeingEditedId) {
              return (
                <div className='flex items-end justify-end'>
                  <ChatMessageBeingEdited
                    currentText={message.text}
                    isEditing={isEditing}
                    onEdit={handleEditMessage}
                    onCancel={handleCancelEditing}
                  />
                </div>
              )
            }

            const messageChatter = chat.getChatterByMessage(message)
            const parentMessage = message.parentMessageId
              ? chat.getMessageById(message.parentMessageId)
              : null

            const parentMessageChatter = parentMessage
              ? chat.getChatterByMessage(parentMessage)
              : null

            if (messageChatter)
              return (
                <ChatMessage
                  key={message.id}
                  time={message.time}
                  chatter={{ name: messageChatter.name, avatar: messageChatter.avatar }}
                  text={message.text}
                  isMe={message.isFromChatter(authChatter)}
                  attachment={message.attachment}
                  parentMessage={
                    parentMessageChatter && parentMessage
                      ? {
                          chatterName: parentMessageChatter.name,
                          text: parentMessage.text,
                        }
                      : null
                  }
                  menu={
                    <ChatMessageMenu
                      onClickCopy={() => handleCopyMessage(message.text)}
                      onClickDelete={() => handleDeleteMessage(message.id)}
                      onClickReply={() =>
                        handleReplyMessage(message.id, messageChatter.name)
                      }
                      onClickEdit={() => handleEditMessageStart(message.id)}
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
          <ChatInput
            messageToReply={messageToReply}
            onSend={handleSendMessage}
            onCancelReply={handleCancelReply}
          />
        </div>
      </div>
    )
}
