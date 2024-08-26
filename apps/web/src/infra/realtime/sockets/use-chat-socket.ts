'use client'

import { useCallback, useEffect, useState } from 'react'

import { Message } from '@telepetros/core/entities'
import { EVENTS } from '@telepetros/core/constants'
import { RealtimeResponse } from '@telepetros/core/responses'

import { ENV } from '@/ui/constants'

type ChatSocketProps = {
  chatId: string
  onConnectChatter: (onlineChattersCount: number) => void
  onDisconnectChatter: (onlineChattersCount: number) => void
  onReceiveMessage: (message: Message) => void
}

export function useChatSocket({
  chatId,
  onConnectChatter,
  onDisconnectChatter,
  onReceiveMessage,
}: ChatSocketProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [websocket, setWebsocket] = useState<WebSocket | null>(null)

  const sendResponse = useCallback(
    (event: string, payload: unknown = null) => {
      if (!websocket) return

      const response = new RealtimeResponse({
        event,
        payload,
      })

      console.log(response.message)
      websocket.send(response.message)
    },
    [websocket],
  )

  const sendMessage = useCallback(
    (message: Message) => {
      sendResponse(EVENTS.chat.sendMessage, message.dto)
    },
    [sendResponse],
  )

  const connectChatter = useCallback(() => {
    sendResponse(EVENTS.chat.connectChatter)
  }, [sendResponse])

  const handleWebsocketMessage = useCallback(
    (message: MessageEvent) => {
      const response = RealtimeResponse.parseMessage(message.data)

      switch (response.event) {
        case EVENTS.chat.connectChatter:
          onConnectChatter(response.payload.chatterId)
          break
        case EVENTS.chat.disconnectChatter:
          onDisconnectChatter(response.payload.chatterId)
          break
        case EVENTS.chat.receiveMessage:
          onReceiveMessage(Message.create(response.payload))
          break
      }
    },
    [onConnectChatter, onDisconnectChatter, onReceiveMessage],
  )

  useEffect(() => {
    const websocket = new WebSocket(`${ENV.realTimeUrl}/chat/${chatId}`)

    websocket.onopen = () => {
      setWebsocket(websocket)
      setIsOpen(websocket.readyState === websocket.OPEN)
    }
  }, [chatId])

  useEffect(() => {
    if (!websocket || !isOpen) return

    websocket.addEventListener('message', handleWebsocketMessage)

    return () => {
      websocket.removeEventListener('message', handleWebsocketMessage)
    }
  }, [isOpen, websocket, handleWebsocketMessage])

  return {
    isOpen,
    sendMessage,
    connectChatter,
  }
}
