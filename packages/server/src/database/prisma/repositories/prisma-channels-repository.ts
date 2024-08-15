import type { Channel } from '@telepetros/core/entities'
import type { ChannelsRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'

export class PrismaChannelsRepository implements ChannelsRepository {
  async add(channel: Channel): Promise<void> {
    await prisma.channel.create({
      data: {
        name: channel.name,
        hash: channel.hash,
      },
    })
  }
}
