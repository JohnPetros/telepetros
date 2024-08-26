'use client'

import { useCallback } from 'react'

import { Message } from '@telepetros/core/entities'
import { EVENTS } from '@telepetros/core/constants'

import { ENV } from '@/ui/constants'
import { useWs } from '../ws'

type ChatSocketProps = {
  chatId: string
  onReceiveMessage: (message: Message) => void
}

export function useChatSocket({ chatId, onReceiveMessage }: ChatSocketProps) {
  const { sendResponse } = useWs({
    url: `${ENV.realTimeUrl}/chat/${chatId}`,
    onResponse(response) {
      switch (response.event) {
        case EVENTS.chat.receiveMessage:
          onReceiveMessage(Message.create(response.payload))
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

  return {
    sendMessage,
  }
}
