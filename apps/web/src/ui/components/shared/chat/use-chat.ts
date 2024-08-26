import { useEffect, useState } from 'react'

import { Chat, Message } from '@telepetros/core/entities'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useChatSocket } from '@/infra/realtime/sockets'

export function useChat(initialChat: Chat) {
  const [chat, setChat] = useState<Chat>(initialChat)
  const [isConnected, setIsConnected] = useState(false)
  const [onlineChattersCount, setOnlineChattersCount] = useState(0)
  const { chatter } = useAuthContext()

  function handleReceiveMessage(message: Message) {
    chat.appendMessage(message)
    setChat((chat) => {
      return Chat.create(chat.dto)
    })
  }

  function handleConnectChatter(onlineChattersCount: number) {
    setOnlineChattersCount(onlineChattersCount)
    // chat.appendOnlineChatterId(chatterId)
    // setChat(chat)
  }
  function handleDisConnectChatter(onlineChattersCount: number) {
    setOnlineChattersCount(onlineChattersCount)
    // chat.appendOnlineChatterId(chatterId)
    // setChat(chat)
  }

  const { isOpen, connectChatter, sendMessage } = useChatSocket({
    chatId: chat.id,
    onConnectChatter: handleConnectChatter,
    onDisconnectChatter: handleDisConnectChatter,
    onReceiveMessage: handleReceiveMessage,
  })

  function handleSendMessage(messageValue: string) {
    if (!chatter) return

    const message = Message.create({
      type: 'text',
      value: messageValue,
      chatId: chat.id,
      chatterId: chatter.id,
    })
    sendMessage(message)
  }

  useEffect(() => {
    if (isOpen && !isConnected) {
      connectChatter()
      setIsConnected(true)
    }
  }, [isOpen, isConnected, connectChatter])

  return {
    chat,
    onlineChattersCount,
    handleSendMessage,
  }
}
