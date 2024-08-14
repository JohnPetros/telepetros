import type { MessageDto } from '../../dtos'
import { Entity } from '../abstracts'

type MessageType = 'text' | 'image'

type MessageProps = {
  type: MessageType
  value: string
  parentMessageId?: string
  createdAt: Date
}

export class Message extends Entity<MessageProps> {
  static create(dto: MessageDto) {
    const type = dto.type
    if (!Message.isMessageType(type)) {
      throw new Error()
    }

    return new Message({
      type,
      value: dto.value,
      createdAt: dto.createdAt,
      parentMessageId: dto.parentMessageId,
    })
  }

  static isMessageType(type: string): type is MessageType {
    return ['text', 'image'].includes(type)
  }

  get value() {
    return this.props.value
  }

  get createdAt() {
    return this.props.createdAt
  }
}
