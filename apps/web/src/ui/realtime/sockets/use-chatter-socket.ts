'use client'

import { useCallback, useEffect, useState } from 'react'

import { EVENTS } from '@telepetros/core/constants'

import { ENV } from '@/ui/constants'
import { useWs } from '../ws'

type UseChatterSocketProps = {
  chatterId: string
  onDisconnectChatter: (chatterId: string) => void
  onConnectChatter: (chatterId: string) => void
}

export function useChatterSocket({
  chatterId,
  onConnectChatter,
  onDisconnectChatter,
}: UseChatterSocketProps) {
  const [isConnected, setIsConnected] = useState(false)
  const { sendResponse } = useWs({
    url: `${ENV.realTimeUrl}/chatters/connection`,
    onResponse(response) {
      switch (response.event) {
        case EVENTS.chatter.connect:
          onConnectChatter(String(response.payload))
          setIsConnected(true)
          break
        case EVENTS.chatter.disconnect:
          onDisconnectChatter(String(response.payload))
          break
      }
    },
    onError() {
      alert('error')
    },
  })

  const connectChatter = useCallback(() => {
    sendResponse(EVENTS.chatter.connect, chatterId)
  }, [sendResponse, chatterId])

  useEffect(() => {
    if (isConnected) return

    connectChatter()
    setIsConnected(true)
  }, [isConnected, connectChatter])

  return {
    isConnected,
    connectChatter,
  }
}
