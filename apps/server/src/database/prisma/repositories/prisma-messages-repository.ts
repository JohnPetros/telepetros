import type { Message } from '@telepetros/core/entities'
import type { IMessagesRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'
import { PrismaMessageMapper } from '../mappers'

export class PrismaMessagesRepository implements IMessagesRepository {
  private readonly mapper: PrismaMessageMapper = new PrismaMessageMapper()

  async findManyByChatId(chatId: string): Promise<Message[] | null> {
    const prismaMessages = await prisma.message.findMany({
      where: {
        chat_id: chatId
      }
    })

    return prismaMessages.map((prismaMessage) => this.mapper.toDomain(prismaMessage))
  }

}
