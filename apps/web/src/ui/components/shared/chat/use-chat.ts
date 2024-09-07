'use client'

import { type RefObject, useEffect, useState } from 'react'

import { Chat, Message } from '@telepetros/core/entities'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useChatSocket } from '@/ui/realtime/sockets'
import { useChattersConnectionContext } from '@/ui/contexts/chatters-connection-context/hooks'
import { useApi, useToast } from '@/ui/hooks'

export function useChat(initialChat: Chat, chatRef: RefObject<HTMLDivElement>) {
  const [chat, setChat] = useState<Chat>(initialChat)
  const [isUploading, setIsUploading] = useState(false)
  const { authChatter } = useAuthContext()
  const { uploadService } = useApi()
  const { showError } = useToast()
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

  async function sendMessageWithAttachment(attachment: File, messageText: string) {
    setIsUploading(true)
    const uploadResponse = await uploadService.saveFile('attachments', attachment)
    setIsUploading(false)

    if (uploadResponse.isFailure) {
      showError(uploadResponse.errorMessage)
      return
    }

    const message = Message.create({
      text: messageText,
      chatId: chat.id,
      chatterId: authChatter.id,
      attachment: {
        name: attachment.name,
        value: uploadResponse.body.fileUrl,
      },
    })
    console.log(message)
    sendMessage(message)
  }

  async function handleSendMessage(messageText: string, attachment: File | null) {
    if (!authChatter) return

    if (attachment) {
      sendMessageWithAttachment(attachment, messageText)
      return
    }

    const message = Message.create({
      text: messageText,
      chatId: chat.id,
      chatterId: authChatter.id,
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
    isUploading,
    handleSendMessage,
  }
}
