import type { MessageDto } from '../../dtos'
import type { Chatter } from './chatter'
import { Entity } from '../abstracts'
import { Attachment } from '../structs'
import { Datetime } from '#libs'

type MessageProps = {
  text: string
  parentMessageId: string | null
  chatId: string
  chatterId: string
  attachment: Attachment | null
  replies: Message[]
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
        replies: [],
        attachment: dto.attachment
          ? Attachment.create({
              name: dto.attachment.name,
              size: dto.attachment.size,
              fileId: dto.attachment.fileId,
              fileUrl: dto.attachment.fileUrl,
            })
          : null,
      },
      dto.id,
    )
  }

  isFromChatter(chatter: Chatter) {
    return this.props.chatterId === chatter.id
  }

  addReplies(replies: Message[]) {
    this.props.replies = replies
  }

  get replies(): Message[] {
    return this.props.replies
  }

  get hasReplies(): boolean {
    return this.replies.length > 0
  }

  get text(): string {
    return this.props.text
  }

  set text(newText: string) {
    this.props.text = newText
  }

  get chatterId(): string {
    return this.props.chatterId
  }

  get attachment(): Attachment | null {
    return this.props.attachment
  }

  get parentMessageId(): string | null {
    return this.props.parentMessageId
  }

  get sentAt(): Date {
    return this.props.sentAt
  }

  get time(): string {
    return new Datetime().format(this.sentAt, 'DD/MM/YYYY HH:mm')
  }

  get dto(): MessageDto {
    return {
      id: this.id,
      text: this.text,
      chatId: this.props.chatId,
      chatterId: this.props.chatterId,
      sentAt: this.sentAt,
      parentMessageId: this.props.parentMessageId,
      attachment: this.attachment
        ? {
            name: this.attachment.name,
            size: this.attachment.size,
            fileUrl: this.attachment.fileUrl,
            fileId: this.attachment.fileId,
          }
        : null,
    }
  }
}
