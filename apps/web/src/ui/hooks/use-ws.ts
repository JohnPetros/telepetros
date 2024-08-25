import { BrowserWs } from '@/infra/realtime/browser-ws'
import type { IWs } from '@telepetros/core/interfaces'
import { useEffect, useState } from 'react'

type UseWsProps = {
  url: string
  onOpen: VoidFunction
}

export function useWs({ url, onOpen }: UseWsProps) {
  const [ws, setWs] = useState<IWs | null>(null)

  useEffect(() => {
    const websocket = new WebSocket(url)

    websocket.onopen = () => {
      const ws = BrowserWs(websocket)
      setWs(ws)
    }

    return () => {
      websocket.close()
    }
  }, [url])

  return ws
}
