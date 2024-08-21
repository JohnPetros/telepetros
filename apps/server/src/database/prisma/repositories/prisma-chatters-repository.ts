import type { Chatter } from '@telepetros/core/entities'
import type { IChattersRepository } from '@telepetros/core/interfaces'

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

  async add(chatter: Chatter): Promise<void> {
    const prismaChatter = this.mapper.toPrisma(chatter)

    // await prisma.chatter.create({
    //   data: prismaChatter,
    // })
  }
}
