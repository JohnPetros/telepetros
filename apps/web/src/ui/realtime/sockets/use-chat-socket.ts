'use client'

import { useCallback } from 'react'

import { Message } from '@telepetros/core/entities'
import { EVENTS } from '@telepetros/core/constants'

import { ENV } from '@/ui/constants'
import { useWs } from '../ws'

type ChatSocketProps = {
  chatId: string
  onReceiveMessage: (message: Message) => void
  onDeleteMessage: (deletedMessageId: string) => void
  onEditMessage: (editedMessageId: string) => void
}

export function useChatSocket({
  chatId,
  onEditMessage,
  onReceiveMessage,
  onDeleteMessage,
}: ChatSocketProps) {
  const { sendResponse } = useWs({
    url: `${ENV.realTimeUrl}/chat/${chatId}`,
    onResponse(response) {
      switch (response.event) {
        case EVENTS.chat.receiveMessage:
          onReceiveMessage(Message.create(response.payload))
          break
        case EVENTS.chat.editMessage:
          onEditMessage(response.payload)
          break
        case EVENTS.chat.deleteMessage:
          onDeleteMessage(response.payload)
          break
      }
    },
  })

  const sendMessage = useCallback(
    (message: Message) => {
      sendResponse(EVENTS.chat.sendMessage, message.dto)
    },
    [sendResponse],
  )

  const editMessage = useCallback(
    (messageId: string, newText: string) => {
      sendResponse(EVENTS.chat.sendMessage, {
        messageId,
        newText,
      })
    },
    [sendResponse],
  )

  const deleteMessage = useCallback(
    (messageId: string) => {
      sendResponse(EVENTS.chat.deleteMessage, messageId)
    },
    [sendResponse],
  )

  return {
    sendMessage,
    editMessage,
    deleteMessage,
  }
}
