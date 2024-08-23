import type { Message as PrismaMessage } from '@prisma/client'
import { Message } from '@telepetros/core/entities'

export class PrismaMessageMapper {
  toDomain(prismaMessage: PrismaMessage): Message {
    return Message.create({
      id: prismaMessage.id,
      value: prismaMessage.value,
      type: prismaMessage.type,
      createdAt: prismaMessage.created_at,
      chatId: prismaMessage.chat_id,
      parentMessageId: prismaMessage.parent_message_id ? prismaMessage.parent_message_id : undefined
    })
  }

  toPrisma(message: Message): PrismaMessage {
    const dto = message.dto
    return {
      id: dto.id,
      value: dto.value,
      type: dto.type,
      created_at: dto.createdAt,
      chat_id: dto.chatId,
      parent_message_id: dto.parentMessageId ? dto.parentMessageId : null,
    }
  }
}
