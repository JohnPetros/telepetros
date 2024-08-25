import type { IChattersRepository } from '@telepetros/core/interfaces'
import type { Chatter } from '@telepetros/core/entities'

import { prisma } from '../client'
import { PrismaChatterMapper } from '../mappers'

export class PrismaChattersRepository implements IChattersRepository {
  private readonly mapper: PrismaChatterMapper

  constructor() {
    this.mapper = new PrismaChatterMapper()
  }

  async findById(id: string): Promise<Chatter | null> {
    const prismaChatter = await prisma.chatter.findFirst({
      where: {
        id,
      },
    })
    if (!prismaChatter) return null

    return this.mapper.toDomain(prismaChatter)
  }

  async findByEmail(email: string): Promise<Chatter | null> {
    const prismaChatter = await prisma.chatter.findFirst({
      where: {
        email,
      },
    })
    if (!prismaChatter) return null

    return this.mapper.toDomain(prismaChatter)
  }

  async add(chatter: Chatter): Promise<Chatter> {
    const prismaChatter = this.mapper.toPrisma(chatter)

    const createdChatter = await prisma.chatter.create({
      data: prismaChatter,
    })

    return this.mapper.toDomain(createdChatter)
  }

  async findManyByChatterId(chatterId: string): Promise<Chatter[]> {
    const chatterChats = await prisma.chatterChat.findMany({
      where: {
        OR: [{ chatter_1_id: chatterId }, { chatter_2_id: chatterId }],
      },
      include: {
        chatter_1: true,
        chatter_2: true,
      },
    })

    const chatters = []

    for (const { chatter_1_id, chatter_1, chatter_2_id, chatter_2 } of chatterChats) {
      if (chatter_1_id === chatterId) {
        chatters.push(chatter_2)
      } else if (chatter_2_id === chatterId) {
        chatters.push(chatter_1)
      }
    }

    return chatters.map(this.mapper.toDomain)
  }
}
