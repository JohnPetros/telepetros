import type { Message as PrismaMessage } from '@prisma/client'
import { Message } from '@telepetros/core/entities'

export class PrismaMessageMapper {
  toDomain(prismaMessage: PrismaMessage): Message {
    return Message.create({
      id: prismaMessage.id,
      text: prismaMessage.text,
      sentAt: prismaMessage.sent_at,
      chatId: prismaMessage.chat_id,
      chatterId: prismaMessage.chatter_id,
      parentMessageId: prismaMessage.parent_message_id
        ? prismaMessage.parent_message_id
        : undefined,
    })
  }

  toPrisma(message: Message): PrismaMessage {
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
