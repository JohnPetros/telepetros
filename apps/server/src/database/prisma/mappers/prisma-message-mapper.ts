import { Message } from '@telepetros/core/entities'

import type { PrismaMessage } from '../types'

export class PrismaMessageMapper {
  toDomain(prismaMessage: PrismaMessage): Message {
    const attachment = prismaMessage.MessageAttachment
      ? {
          name: prismaMessage.MessageAttachment.name,
          value: prismaMessage.MessageAttachment.value,
        }
      : null

    return Message.create({
      id: prismaMessage.id,
      text: prismaMessage.text,
      sentAt: prismaMessage.sent_at,
      chatId: prismaMessage.chat_id,
      chatterId: prismaMessage.chatter_id,
      parentMessageId: prismaMessage.parent_message_id
        ? prismaMessage.parent_message_id
        : undefined,
      attachment,
    })
  }

  toPrisma(message: Message): Omit<PrismaMessage, 'MessageAttachment'> {
    const dto = message.dto
    return {
      id: message.id,
      sent_at: message.sentAt,
      text: dto.text,
      chat_id: dto.chatId,
      chatter_id: dto.chatterId,
      parent_message_id: dto.parentMessageId ? dto.parentMessageId : null,
    }
  }
}
