import type { Channel as PrismaChannel } from '@prisma/client'
import { Channel } from '@telepetros/core/entities'

export class PrismaChannelMapper {
  toDomain(primasChannel: PrismaChannel): Channel {
    return Channel.create({
      id: primasChannel.id,
      inviteCode: primasChannel.invite_code,
      name: primasChannel.name,
      avatar: primasChannel.avatar,
      isPublic: primasChannel.is_public,
      ownerId: primasChannel.owner_id,
      chatId: primasChannel.chat_id,
    })
  }

  toPrisma(channel: Channel): PrismaChannel {
    return {
      id: channel.id,
      invite_code: channel.inviteCode,
      is_public: channel.isPublic,
      name: channel.name,
      owner_id: channel.ownerId,
      chat_id: channel.chatId,
      avatar: channel.avatar,
    }
  }
}
