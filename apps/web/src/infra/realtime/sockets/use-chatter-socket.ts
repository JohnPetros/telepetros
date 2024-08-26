'use client'

import { useCallback, useEffect, useState } from 'react'

import { EVENTS } from '@telepetros/core/constants'
import { RealtimeResponse } from '@telepetros/core/responses'

import { ENV } from '@/ui/constants'

type ChatSocketProps = {
  chatId: string
  onConnectChatter: (onlineChattersCount: number) => void
  onDisconnectChatter: (onlineChattersCount: number) => void
}

export function useChatterSocket({
  chatId,
  onConnectChatter,
  onDisconnectChatter,
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

      websocket.send(response.message)
    },
    [websocket],
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
      }
    },
    [onConnectChatter, onDisconnectChatter],
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
    connectChatter,
  }
}
