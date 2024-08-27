'use client'

import { useCallback, useEffect, useState } from 'react'

import { RealtimeResponse } from '@telepetros/core/responses'

type ChatSocketProps = {
  url: string
  onResponse: (response: RealtimeResponse<any>) => void
  onError: VoidFunction
}

export function useBrowserWebsocket({ url, onResponse }: ChatSocketProps) {
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
    }
  }, [url])

  useEffect(() => {
    if (!websocket) return

    websocket.addEventListener('message', handleWebsocketMessage)

    return () => {
      websocket.removeEventListener('message', handleWebsocketMessage)
    }
  }, [websocket, handleWebsocketMessage])

  return {
    sendResponse,
  }
}
