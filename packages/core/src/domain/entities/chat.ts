import type { ChatDto } from '../../dtos'
import { Entity } from '../abstracts'
import { Message } from './message'

type ChatProps = {
  chattersIds: string[]
  messages: Message[]
}

export class Chat extends Entity<ChatProps> {
  static create(dto: ChatDto) {
    return new Chat({ messages: dto.messages.map(Message.create), chattersIds: dto.chattersIds })
  }
}
