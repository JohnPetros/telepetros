import type { Chatter } from '@telepetros/core/entities'
import type { ChattersRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'

export class PrismaChattersRepository implements ChattersRepository {
  async add(chatter: Chatter): Promise<void> {
    await prisma.chatter.create({
      data: {
        email: chatter.email,
        name: chatter.name,
        avatar_url: chatter.avatar,
        banner_url: chatter.banner,
      },
    })
  }
}
