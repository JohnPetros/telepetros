import type { Channel } from '@telepetros/core/entities'
import type { ChannelsRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'
import { PrismaChannelMapper } from '../mappers'

export class PrismaChannelsRepository implements ChannelsRepository {
  async add(channel: Channel): Promise<void> {
    await prisma.channel.create({
      data: {
        name: channel.name,
        hash: channel.hash,
        is_public: channel.isPublic,
        owner_id: channel.ownerId,
      },
    })
  }

  async findManyByChatterId(ownerId: string): Promise<Channel[]> {
    const primasChannel = await prisma.channel.findMany({
      where: {
        owner_id: ownerId,
      },
    })

    return primasChannel.map(PrismaChannelMapper.toDomain)
  }
}
