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

  function scrollToBottom() {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight - 200,
      behavior: 'smooth',
    })
  }

  function updateChat(chat: Chat) {
    setChat(() => {
      return Chat.create(chat.dto)
    })
  }

  function handleReceivedMessage(message: Message) {
    chat.appendMessage(message)
    updateChat(chat)
    scrollToBottom()
  }

  function handleDeletedMessage(deletedMessageId: string) {
    chat.deleteMessage(deletedMessageId)
    updateChat(chat)
  }

  const { sendMessage, deleteMessage } = useChatSocket({
    chatId: chat.id,
    onReceiveMessage: handleReceivedMessage,
    onDeleteMessage: handleDeletedMessage,
  })

  async function sendMessageWithAttachment(attachment: File, messageText: string) {
    scrollToBottom()
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
        fileId: uploadResponse.body.fileId,
        fileUrl: uploadResponse.body.fileUrl,
        size: attachment.size,
        name: attachment.name,
      },
    })
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

  function handleDeleteMessage(messageId: string) {
    deleteMessage(messageId)
  }

  function handleEditMessage(messageId: string) {}
  function handleReplyMessage(messageId: string) {}
  function handleCopyMessage(messageId: string) {}

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
    handleEditMessage,
    handleReplyMessage,
    handleCopyMessage,
    handleDeleteMessage,
    handleSendMessage,
  }
}
