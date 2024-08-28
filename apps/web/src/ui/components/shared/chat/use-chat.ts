import { type RefObject, useEffect, useState } from 'react'

import { Chat, Message } from '@telepetros/core/entities'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useChatSocket } from '@/ui/realtime/sockets'
import { useChattersConnectionContext } from '@/ui/contexts/chatters-connection-context/hooks'

export function useChat(initialChat: Chat, chatRef: RefObject<HTMLDivElement>) {
  const [chat, setChat] = useState<Chat>(initialChat)
  const { chatter } = useAuthContext()
  const { lastConnectedChatterId, lastDisconnectedChatterId } =
    useChattersConnectionContext()

  function handleReceiveMessage(message: Message) {
    chat.appendMessage(message)
    setChat((chat) => {
      return Chat.create(chat.dto)
    })
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight - 200,
      behavior: 'smooth',
    })
  }

  const { sendMessage } = useChatSocket({
    chatId: chat.id,
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
    if (lastConnectedChatterId) {
      chat.onConnectChatter(lastConnectedChatterId)
      setChat(Chat.create(chat.dto))
    }
  }, [lastConnectedChatterId])

  useEffect(() => {
    if (lastDisconnectedChatterId) {
      chat.onDisconnectChatter(lastDisconnectedChatterId)
      setChat(Chat.create(chat.dto))
    }
  }, [lastDisconnectedChatterId])

  return {
    chat,
    handleSendMessage,
  }
}
