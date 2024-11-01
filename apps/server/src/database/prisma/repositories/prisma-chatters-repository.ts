import type { IChattersRepository } from '@telepetros/core/interfaces'
import type { Chatter } from '@telepetros/core/entities'

import { prisma } from '../client'
import { PrismaChatterMapper } from '../mappers'
import type { PrismaChatter } from '../types'

export class PrismaChattersRepository implements IChattersRepository {
  private readonly mapper: PrismaChatterMapper = new PrismaChatterMapper()

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

  async findManyByName(chatterName: string, chatterId: string): Promise<Chatter[]> {
    const prismaChatters = await prisma.chatter.findMany({
      where: {
        ...(chatterName && { name: chatterName }),
        NOT: { id: chatterId },
      },
    })

    return prismaChatters.map(this.mapper.toDomain)
  }

  async findManyByChatterId(chatterId: string): Promise<Chatter[]> {
    const prismaChatters = await prisma.$queryRaw`
        SELECT C.* FROM chatters C
        JOIN chatter_chats CC ON CC.chatter_id = C.id 
        WHERE 
          C.id != ${chatterId} AND 
          CC.chat_id IN (
            SELECT chat_id 
            FROM chatter_chats 
            WHERE chatter_id = ${chatterId}
          ) AND 
          CC.chat_id NOT IN (SELECT chat_id FROM channels)
        `

    return (prismaChatters as PrismaChatter[]).map(this.mapper.toDomain)
  }

  async add(chatter: Chatter): Promise<Chatter> {
    const prismaChatter = this.mapper.toPrisma(chatter)

    const createdChatter = await prisma.chatter.create({
      data: prismaChatter,
    })

    return this.mapper.toDomain(createdChatter)
  }

  async updateChatter(chatter: Chatter): Promise<void> {
    const prismaChatter = this.mapper.toPrisma(chatter)

    await prisma.chatter.update({
      where: {
        id: chatter.id,
      },
      data: prismaChatter,
    })
  }

  async remove(chatterId: string): Promise<void> {
    await prisma.chatter.delete({ where: { id: chatterId } })
  }
}
