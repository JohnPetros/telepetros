import { useChatterSocket } from '@/ui/realtime/sockets'
import { useState } from 'react'
import { useAuthContext } from '../../auth-context'

export function useChattersConnectionProvider() {
  const { chatter } = useAuthContext()
  const [lastConnectedChatterId, setLastConnectedChatterId] = useState('')
  const [lastDisconnectedChatterId, setLastDisconnectedChatterId] = useState('')

  function handleChatterConnect(chatterId: string) {
    setLastConnectedChatterId(chatterId)
  }

  function handleChatterDisconnect(chatterId: string) {
    setLastDisconnectedChatterId(chatterId)
  }

  useChatterSocket({
    chatterId: chatter.id,
    onConnectChatter: handleChatterConnect,
    onDisconnectChatter: handleChatterDisconnect,
  })

  return {
    lastConnectedChatterId,
    lastDisconnectedChatterId,
  }
}
