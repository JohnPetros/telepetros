'use client'

import { type RefObject, useEffect, useState } from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

import { Chat, Message } from '@telepetros/core/entities'

import { useAuthContext } from '@/ui/contexts/auth-context'
import { useChatSocket } from '@/ui/realtime/sockets'
import { useChattersConnectionContext } from '@/ui/contexts/chatters-connection-context/hooks'
import { useApi, useToast } from '@/ui/hooks'

export function useChat(initialChat: Chat, chatRef: RefObject<HTMLDivElement>) {
  const [chat, setChat] = useState<Chat>(initialChat)
  const [isUploading, setIsUploading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [messageToReply, setMessageToReply] = useState<{
    id: string
    chatterName: string
  } | null>(null)
  const [messageBeingEditedId, setMessageBeingEditingId] = useState('')
  const [_, copyMessageText] = useCopyToClipboard()
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

  function handleEditedMessage(messageId: string, newText: string) {
    chat.editMessage(messageId, newText)
    updateChat(chat)
    setMessageBeingEditingId('')
    setIsEditing(false)
  }

  function handleDeletedMessage(deletedMessageId: string) {
    chat.deleteMessage(deletedMessageId)
    updateChat(chat)
  }

  const { sendMessage, deleteMessage, editMessage } = useChatSocket({
    chatId: chat.id,
    onEditMessage: handleEditedMessage,
    onReceiveMessage: handleReceivedMessage,
    onDeleteMessage: handleDeletedMessage,
  })

  async function sendMessageWithAttachment(
    attachment: File,
    messageText: string,
    parentMessageId: string | null = null,
  ) {
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
      parentMessageId,
    })
    sendMessage(message)
  }

  async function handleSendMessage(messageText: string, attachment: File | null) {
    if (!authChatter) return
    setMessageToReply(null)

    if (attachment) {
      sendMessageWithAttachment(
        attachment,
        messageText,
        messageToReply ? messageToReply.id : null,
      )
      return
    }

    const message = Message.create({
      text: messageText,
      chatId: chat.id,
      chatterId: authChatter.id,
      parentMessageId: messageToReply ? messageToReply.id : null,
    })
    sendMessage(message)
  }

  function handleDeleteMessage(messageId: string) {
    deleteMessage(messageId)
  }

  function handleEditMessageStart(messageId: string) {
    setMessageBeingEditingId(messageId)
  }

  function handleEditMessage(newText: string) {
    setIsEditing(true)
    editMessage(messageBeingEditedId, newText)
  }

  function handleReplyMessage(messageId: string, chatterName: string) {
    setMessageToReply({ id: messageId, chatterName })
  }

  function handleCancelReply() {
    setMessageToReply(null)
  }

  function handleCancelEditing() {
    setMessageBeingEditingId('')
  }

  async function handleCopyMessage(messageText: string) {
    const isCopied = await copyMessageText(messageText)
    if (!isCopied) showError('Erro ao tentar copiar mensagem')
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
    isEditing,
    messageToReply,
    messageBeingEditedId,
    handleEditMessageStart,
    handleEditMessage,
    handleCancelEditing,
    handleReplyMessage,
    handleCopyMessage,
    handleDeleteMessage,
    handleCancelReply,
    handleSendMessage,
  }
}
