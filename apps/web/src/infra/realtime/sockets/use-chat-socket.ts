'use client'

import { useCallback, useEffect, useState } from 'react'

import { Message } from '@telepetros/core/entities'
import { EVENTS } from '@telepetros/core/constants'
import { RealtimeResponse } from '@telepetros/core/responses'

import { ENV } from '@/ui/constants'

type ChatSocketProps = {
  chatId: string
  onConnectChatter: (chatterId: string) => void
  onReceiveMessage: (message: Message) => void
}

export function useChatSocket({
  chatId,
  onConnectChatter,
  onReceiveMessage,
}: ChatSocketProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [websocket, setWebsocket] = useState<WebSocket | null>(null)

  const sendResponse = useCallback(
    (event: string, payload: unknown) => {
      if (!websocket) return

      const response = new RealtimeResponse({
        event,
        payload,
      })

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

  const connectChatter = useCallback(
    (chatterId: string) => {
      sendResponse(EVENTS.chat.connectChatter, { chatterId })
    },
    [sendResponse],
  )

  useEffect(() => {
    const websocket = new WebSocket(`${ENV.realTimeUrl}/chat/${chatId}`)

    websocket.onopen = () => {
      setWebsocket(websocket)
      setIsOpen(websocket.readyState === websocket.OPEN)
    }

    return () => {
      // websocket.close()
    }
  }, [chatId])

  const handleWebsocketMessage = useCallback(
    (message: MessageEvent) => {
      const response = RealtimeResponse.parseMessage(message.data)
      console.log(response.event)

      switch (response.event) {
        case EVENTS.chat.connectChatter:
          onConnectChatter(response.payload.chatterId)
          break
        case EVENTS.chat.receiveMessage:
          onReceiveMessage(Message.create(response.payload))
          break
      }
    },
    [onConnectChatter, onReceiveMessage],
  )

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
