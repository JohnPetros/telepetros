import type { MessageDto } from '../../dtos'
import type { MessageType } from '../types'
import type { Chatter } from './chatter'
import { Entity } from '../abstracts'
import { Datetime } from '#libs'

type MessageProps = {
  type: MessageType
  value: string
  parentMessageId?: string
  chatId: string
  chatterId: string
  sentAt: Date
}

export class Message extends Entity<MessageProps> {
  static create(dto: MessageDto) {
    const type = dto.type
    if (!Message.isMessageType(type)) {
      throw new Error()
    }

    return new Message(
      {
        type,
        value: dto.value,
        sentAt: dto.sentAt ?? new Date(),
        parentMessageId: dto.parentMessageId,
        chatId: dto.chatId,
        chatterId: dto.chatterId,
      },
      dto.id,
    )
  }

  static isMessageType(type: string): type is MessageType {
    return ['text', 'image'].includes(type)
  }

  isFromChatter(chatter: Chatter) {
    return this.props.chatterId === chatter.id
  }

  get type() {
    return this.props.type
  }

  get value() {
    return this.props.value
  }

  get chatterId() {
    return this.props.chatterId
  }

  get sentAt() {
    return this.props.sentAt
  }

  get time() {
    return new Datetime().format(this.sentAt, 'hh:mm')
  }

  get dto(): MessageDto {
    return {
      id: this.id,
      type: this.type,
      value: this.value,
      chatId: this.props.chatId,
      chatterId: this.props.chatterId,
      sentAt: this.sentAt,
      parentMessageId: this.props.parentMessageId,
    }
  }
}
