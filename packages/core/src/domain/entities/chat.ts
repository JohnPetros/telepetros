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

  addChatters(chatters: Chatter[]) {
    this.props.chatters = chatters
  }

  addMessages(messages: Message[]) {
    this.props.messages = messages
  }

  appendMessage(message: Message) {
    this.props.messages.push(message)
  }

  getChatterByMessage(message: Message): Chatter | null {
    const chatter = this.props.chatters.find((chatter) => message.isFromChatter(chatter))
    return chatter ?? null
  }

  get chattersCount() {
    return this.props.chatters.length
  }

  get messages() {
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
