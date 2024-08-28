'use client'

import { useCallback, useEffect, useState } from 'react'

import { RealtimeResponse } from '@telepetros/core/responses'

import type { UseChatSocketProps } from './use-chat-socket-props'

export function useBrowserWebsocket({
  url,
  onResponse,
  onError,
  onOpen,
}: UseChatSocketProps) {
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

  const handleWebsocketMessage = useCallback(
    (message: MessageEvent) => {
      const response = RealtimeResponse.parseMessage(message.data)
      onResponse(response)
    },
    [onResponse],
  )

  useEffect(() => {
    const websocket = new WebSocket(url)

    websocket.onopen = () => {
      setWebsocket(websocket)
      setIsOpen(true)
    }

    websocket.onerror = () => {
      if (onError) onError()
    }
  }, [url, onError])

  useEffect(() => {
    if (!websocket) return

    websocket.addEventListener('message', handleWebsocketMessage)

    return () => {
      websocket.removeEventListener('message', handleWebsocketMessage)
    }
  }, [websocket, handleWebsocketMessage])

  return {
    isOpen,
    sendResponse,
  }
}
