import type { IChattersRepository } from '@telepetros/core/interfaces'
import type { Chatter } from '@telepetros/core/entities'

import { prisma } from '../client'
import { PrismaChatterMapper } from '../mappers'
import type { PrismaChatter } from '../types'

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
    const prismaChatters = await prisma.$queryRaw`
        SELECT C.* FROM chatters C
        JOIN chatter_chats CC ON CC.chatter_id = C.id 
        WHERE 
          C.id != ${chatterId} AND 
          CC.chat_id IN (
            SELECT chat_id 
            FROM chatter_chats 
            WHERE chatter_id = ${chatterId}
          )
        `

    return (prismaChatters as PrismaChatter[]).map(this.mapper.toDomain)
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
}
