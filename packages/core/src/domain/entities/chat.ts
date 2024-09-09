import type { ChatDto } from '#dtos'
import { Chatter } from './chatter'
import { Message } from './message'
import { Entity } from '../abstracts'

type ChatProps = {
  chatters: Chatter[]
  messages: Message[]
}

export class Chat extends Entity<ChatProps> {
  static create(dto?: ChatDto) {
    if (dto) {
      return new Chat(
        {
          chatters: dto.chatters.map(Chatter.create),
          messages: dto.messages.map(Message.create),
        },
        dto.id,
      )
    }

    return new Chat({
      chatters: [],
      messages: [],
    })
  }

  addChatters(chatters: Chatter[]): void {
    this.props.chatters = chatters
  }

  addMessages(messages: Message[]): void {
    this.props.messages = messages
  }

  appendMessage(message: Message): void {
    this.props.messages.push(message)
  }

  editMessage(messageId: string, newText: string): void {
    this.props.messages = this.props.messages.map((message) => {
      if (message.id === messageId) message.text = newText
      return message
    })
  }

  deleteMessage(messageId: string): void {
    this.props.messages = this.props.messages.filter(
      (message) => message.id !== messageId,
    )
  }

  getMessageById(messageId: string): Message | null {
    const message = this.props.messages.find((message) => {
      return message.id === messageId
    })
    return message ?? null
  }

  hasChatter(chatter: Chatter): boolean {
    return this.props.chatters.some((currentChatter) => currentChatter.isEqualTo(chatter))
  }

  getChatterByMessage(message: Message): Chatter | null {
    const chatter = this.props.chatters.find((chatter) => message.isFromChatter(chatter))
    return chatter ?? null
  }

  onConnectChatter(chatterId: string) {
    if (this.includesChatter(chatterId)) this.connectChatter(chatterId)
  }

  onDisconnectChatter(chatterId: string) {
    if (this.includesChatter(chatterId)) this.disconnectChatter(chatterId)
  }

  includesChatter(chatterId: string) {
    const chattersIds = this.props.chatters.map((chatter) => chatter.id)
    return chattersIds.includes(chatterId)
  }

  private connectChatter(chatterId: string) {
    this.props.chatters = this.props.chatters.map((chatter) => {
      if (chatter.id === chatterId) chatter.connect()
      return chatter
    })
  }

  private disconnectChatter(chatterId: string) {
    this.props.chatters = this.props.chatters.map((chatter) => {
      if (chatter.id === chatterId) chatter.disconnect()
      return chatter
    })
  }

  get chattersCount() {
    return this.props.chatters.length
  }

  get onlineChattersCount() {
    return this.props.chatters.reduce((count, currentChatter) => {
      return count + (currentChatter.isOnline ? 1 : 0)
    }, 0)
  }

  get messages(): Message[] {
    return this.props.messages
  }

  get dto(): ChatDto {
    return {
      id: this.id,
      chatters: this.props.chatters.map((chatter) => chatter.dto),
      messages: this.props.messages.map((chatter) => chatter.dto),
    }
  }
}
