import type { MessageDto } from '../../dtos'
import type { Chatter } from './chatter'
import { Entity } from '../abstracts'
import { Datetime } from '#libs'

type MessageProps = {
  text: string
  parentMessageId?: string
  chatId: string
  chatterId: string
  attachment: string | null
  sentAt: Date
}

export class Message extends Entity<MessageProps> {
  static create(dto: MessageDto) {
    return new Message(
      {
        text: dto.text,
        sentAt: dto.sentAt ?? new Date(),
        parentMessageId: dto.parentMessageId,
        chatId: dto.chatId,
        chatterId: dto.chatterId,
        attachment: dto.attachment ?? null,
      },
      dto.id,
    )
  }

  isFromChatter(chatter: Chatter) {
    return this.props.chatterId === chatter.id
  }

  get text() {
    return this.props.text
  }

  get chatterId() {
    return this.props.chatterId
  }

  get attachment() {
    return String(this.props.attachment)
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
      text: this.text,
      chatId: this.props.chatId,
      chatterId: this.props.chatterId,
      sentAt: this.sentAt,
      attachment: this.attachment,
      parentMessageId: this.props.parentMessageId,
    }
  }
}
