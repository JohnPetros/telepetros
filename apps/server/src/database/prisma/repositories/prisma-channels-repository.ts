import type { Channel } from '@telepetros/core/entities'
import type { IChannelsRepository } from '@telepetros/core/interfaces'

import { prisma } from '../client'
import { PrismaChannelMapper } from '../mappers'
import type { PrismaChannel } from '../types'

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

  async findByInviteCode(inviteCode: string): Promise<Channel | null> {
    const primasChannel = await prisma.channel.findFirst({
      where: {
        invite_code: inviteCode,
      },
      include: {},
    })

    if (!primasChannel) return null

    return this.mapper.toDomain(primasChannel)
  }

  async findManyByChatterId(chatterId: string): Promise<Channel[]> {
    const prismaChannels = await prisma.$queryRaw`
      SELECT C.* FROM channels C
      JOIN chatter_chats CC ON CC.chat_id = C.chat_id
      WHERE CC.chatter_id = ${chatterId}
    `

    return (prismaChannels as PrismaChannel[]).map(this.mapper.toDomain)
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
          invite_code: channel.inviteCode,
          avatar: String(channel.avatar),
          owner_id: channel.ownerId,
          is_public: channel.isPublic,
          chat_id: channel.chatId,
        },
      }),
    ])

    return this.mapper.toDomain(createdChannel)
  }

  async updateVisibility(channelId: string, isChannelPublic: boolean): Promise<void> {
    await prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        is_public: isChannelPublic,
      },
    })
  }
}
