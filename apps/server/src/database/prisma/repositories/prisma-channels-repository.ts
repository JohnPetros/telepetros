import type { Channel } from '@telepetros/core/entities'
import type { IChannelsRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'
import { PrismaChannelMapper } from '../mappers'

export class PrismaChannelsRepository implements IChannelsRepository {
  private readonly mapper: PrismaChannelMapper = new PrismaChannelMapper()

  async findById(channelId: string): Promise<Channel | null> {
    const primasChannel = await prisma.channel.findFirst({
      where: {
        id: channelId,
      },
      include: {},
    })

    if (!primasChannel) return null

    return this.mapper.toDomain(primasChannel)
  }

  async findManyByChatterId(ownerId: string): Promise<Channel[]> {
    const primasChannel = await prisma.channel.findMany({
      where: {
        owner_id: ownerId,
      },
    })

    return primasChannel.map(this.mapper.toDomain)
  }

  async add(channel: Channel): Promise<Channel> {
    const [, createdChannel] = await prisma.$transaction([
      prisma.chat.create({ data: { id: channel.chatId } }),
      prisma.channel.create({
        data: {
          id: channel.id,
          name: channel.name,
          hash: channel.hash,
          owner_id: channel.ownerId,
          is_public: channel.isPublic,
          chat_id: channel.chatId,
        },
      }),
    ])

    return this.mapper.toDomain(createdChannel)
  }
}
