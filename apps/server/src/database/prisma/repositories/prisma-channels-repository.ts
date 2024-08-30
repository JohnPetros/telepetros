import type { Channel } from '@telepetros/core/entities'
import type { IChannelsRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'
import { PrismaChannelMapper } from '../mappers'

export class PrismaChannelsRepository implements IChannelsRepository {
  private readonly channelMapper: PrismaChannelMapper = new PrismaChannelMapper()

  async findById(channelId: string): Promise<Channel | null> {
    const primasChannel = await prisma.channel.findFirst({
      where: {
        id: channelId,
      },
      include: {},
    })

    if (!primasChannel) return null

    return this.channelMapper.toDomain(primasChannel)
  }

  async findByName(channelName: string): Promise<Channel | null> {
    const primasChannel = await prisma.channel.findFirst({
      where: {
        name: channelName,
      },
      include: {},
    })

    if (!primasChannel) return null

    return this.channelMapper.toDomain(primasChannel)
  }

  async findManyByChatterId(ownerId: string): Promise<Channel[]> {
    const primasChannel = await prisma.channel.findMany({
      where: {
        owner_id: ownerId,
      },
    })

    return primasChannel.map(this.channelMapper.toDomain)
  }

  async add(channel: Channel): Promise<Channel> {
    const [, , createdChannel] = await prisma.$transaction([
      prisma.chat.create({ data: { id: channel.chatId } }),
      prisma.chattersChats.create({
        data: { chatter_id: channel.ownerId, chat_id: channel.chatId },
      }),
      prisma.channel.create({
        data: {
          id: channel.id,
          name: channel.name,
          hash: channel.hash,
          avatar: String(channel.avatar),
          owner_id: channel.ownerId,
          is_public: channel.isPublic,
          chat_id: channel.chatId,
        },
      }),
    ])

    return this.channelMapper.toDomain(createdChannel)
  }
}
