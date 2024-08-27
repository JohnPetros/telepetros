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
  const handleMessage = useCallback(
    (message: MessageEvent) => {
      if (!onResponse) return
      const response = RealtimeResponse.parseMessage(message.data)
      console.log('useChatSocket', response)

      onResponse(response)
    },
    [onResponse],
  )

  const { sendMessage, readyState } = useWebSocket(url, {
    onMessage: handleMessage,
    onError,
    share: false,
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
