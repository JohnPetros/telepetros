'use client'

import { useCallback } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'

import { RealtimeResponse } from '@telepetros/core/responses'

type WsProps = {
  url: string
  onError?: () => void
  onResponse?: (response: RealtimeResponse<any>) => void
}

export function useReactWebsocket({ url, onResponse, onError }: WsProps) {
  const handleWebsocketMessage = useCallback(
    (message: MessageEvent) => {
      if (!onResponse) return
      const response = RealtimeResponse.parseMessage(message.data)
      onResponse(response)
    },
    [onResponse],
  )

  const { sendMessage, readyState } = useWebSocket(url, {
    onMessage: handleWebsocketMessage,
    onError,
  })

  const sendResponse = useCallback(
    (event: string, payload: unknown = null) => {
      const response = new RealtimeResponse({
        event,
        payload,
      })

      sendMessage(response.message)
    },
    [sendMessage],
  )

  return {
    isOpen: readyState === ReadyState.OPEN,
    sendResponse,
  }
}
