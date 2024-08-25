import { useEffect, useState } from 'react'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useWs } from '@/ui/hooks'
import { ENV } from '@/ui/constants'
import { ChatSocket } from '@/infra/realtime/sockets'
import type { IChatSocket } from '@telepetros/core/interfaces'
import type { MessageDto } from '@telepetros/core/dtos'

export function useChat(chatId: string) {
  const { chatter } = useAuthContext()
  const ws = useWs({
    url: `${ENV.realTimeUrl}/chat/${chatId}`,
    onOpen: () => console.log('OPEN'),
  })
  const [messages, setMessages] = useState<string[]>([])
  const [chatSocket, setChatSocket] = useState<IChatSocket | null>(null)

  function handleMessageSend() {}

  useEffect(() => {
    function handleConnectChatter(messagesDto: MessageDto[]) {
      console.log('messagesDto', messagesDto)
    }

    if (ws && chatter) {
      const chatSocket = ChatSocket(ws)
      chatSocket.connectChatter(chatter.id, handleConnectChatter)
      setChatSocket(chatSocket)
    }
  }, [ws, chatter])

  return {
    messages,
  }
}
