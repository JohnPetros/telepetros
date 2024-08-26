'use client'

import { useCallback, useEffect, useState } from 'react'

import { EVENTS } from '@telepetros/core/constants'

import { ENV } from '@/ui/constants'
import { useWs } from '../ws'

export function useChatterSocket(chatterId: string) {
  const [isConnected, setIsConnected] = useState(false)
  const { sendResponse } = useWs({
    url: `${ENV.realTimeUrl}/chatters/connectio`,
    onResponse(response) {
      if (response.event === EVENTS.chatter.connect) {
        alert('CONNECTED')
        setIsConnected(true)
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
    connectChatter,
  }
}
